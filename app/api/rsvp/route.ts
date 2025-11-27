import { NextRequest, NextResponse } from 'next/server'
import { 
  obtenerListaInvitados,
  actualizarAsistenciaGrupo, 
  buscarPorTelefono, 
  obtenerGrupoPorLider,
  type Invitado 
} from '@/app/data/invitados'

/**
 * API Route para manejar las confirmaciones de asistencia (RSVP)
 * 
 * Sistema basado en datos en memoria con validación por número de teléfono:
 * - GET: Busca invitados por número de teléfono
 * - POST: Actualiza la asistencia en memoria
 */

interface GrupoInvitados {
  lider: Invitado
  grupo: Invitado[]
  totalPersonas: number
  yaConfirmado?: boolean
}

/**
 * GET - Buscar invitados por número de teléfono
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const telefono = searchParams.get('telefono')

    if (!telefono) {
      return NextResponse.json(
        { error: 'Número de teléfono es obligatorio' },
        { status: 400 }
      )
    }

    // Buscar el invitado por teléfono
    const invitadoEncontrado = buscarPorTelefono(telefono)

    if (!invitadoEncontrado) {
      return NextResponse.json(
        { 
          error: 'Número no encontrado',
          message: 'No encontramos tu número en nuestra lista de invitados. Por favor, verifica el número o contacta a los organizadores.'
        },
        { status: 404 }
      )
    }

    // Obtener el ID del líder
    const liderId = invitadoEncontrado.lider

    // Buscar todos los invitados del mismo grupo (mismo líder)
    const grupoCompleto = obtenerGrupoPorLider(liderId)
    
    // Encontrar al líder
    const lider = grupoCompleto.find(inv => inv.id === liderId)!

    // Calcular total de personas:
    // - Registros individuales del grupo (ej: Juan, María, Carlos = 3)
    // - Más acompañantes sin nombre del líder (ej: niños pequeños)
    // Si acompanantes es null, no se suma nada aún (se definirá al confirmar)
    const totalPersonas = grupoCompleto.length + (lider.acompanantes ?? 0)

    // Verificar si ya hay asistencia confirmada
    const yaConfirmado = grupoCompleto[0].asistencia !== ''
    
    const respuesta: GrupoInvitados = {
      lider,
      grupo: grupoCompleto,
      totalPersonas,
      yaConfirmado
    }

    return NextResponse.json(respuesta, { status: 200 })
  } catch (error) {
    console.error('Error al buscar invitado:', error)
    return NextResponse.json(
      { error: 'Error al buscar en la lista de invitados' },
      { status: 500 }
    )
  }
}

/**
 * POST - Actualizar asistencia en memoria
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { liderId, asistencia, comentarios, numAcompanantes } = body

    if (!liderId || !asistencia) {
      return NextResponse.json(
        { error: 'ID del líder y asistencia son obligatorios' },
        { status: 400 }
      )
    }

    if (!['Si', 'No'].includes(asistencia)) {
      return NextResponse.json(
        { error: 'Asistencia debe ser "Si" o "No"' },
        { status: 400 }
      )
    }

    // Log de debug antes de actualizar
    if (process.env.NODE_ENV === 'development') {
      const grupoAntes = obtenerGrupoPorLider(liderId)
      console.log('[RSVP POST] Antes de actualizar:', {
        liderId,
        asistencia,
        numAcompanantes,
        grupoAntes: grupoAntes.map(inv => ({ 
          id: inv.id, 
          nombre: inv.nombre, 
          asistencia: inv.asistencia,
          acompanantes: inv.acompanantes 
        }))
      })
    }

    // Actualizar todos los invitados del grupo en memoria
    // Si numAcompanantes está definido, significa que el líder tiene acompañantes flexibles
    actualizarAsistenciaGrupo(liderId, asistencia, comentarios || '', numAcompanantes)

    // Obtener el grupo actualizado
    const grupoActualizado = obtenerGrupoPorLider(liderId)

    // Log de debug después de actualizar
    if (process.env.NODE_ENV === 'development') {
      console.log('[RSVP POST] Después de actualizar:', {
        liderId,
        grupoActualizado: grupoActualizado.map(inv => ({ 
          id: inv.id, 
          nombre: inv.nombre, 
          asistencia: inv.asistencia,
          acompanantes: inv.acompanantes 
        }))
      })
    }

    return NextResponse.json(
      { 
        message: 'Asistencia confirmada exitosamente',
        grupo: grupoActualizado
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al actualizar asistencia:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la asistencia' },
      { status: 500 }
    )
  }
}

