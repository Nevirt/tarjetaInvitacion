import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route para manejar las confirmaciones de asistencia (RSVP)
 * 
 * Sistema basado en backend API:
 * - GET: Busca invitados por número de teléfono usando el backend
 * - POST: Actualiza la asistencia usando el backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5137/api';

interface InvitadoRsvp {
  id: number
  nombre: string
  apellido: string
  asistencia?: string
}

interface GrupoInvitados {
  lider: InvitadoRsvp & { acompanantes?: number | null }
  grupo: InvitadoRsvp[]
  totalPersonas: number
  yaConfirmado?: boolean
}

/**
 * GET - Buscar invitados por número de teléfono usando el backend
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const telefono = searchParams.get('telefono')
    const slug = searchParams.get('slug')

    if (!telefono) {
      return NextResponse.json(
        { error: 'Número de teléfono es obligatorio' },
        { status: 400 }
      )
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug del evento es obligatorio' },
        { status: 400 }
      )
    }

    // Llamar al backend para buscar el invitado
    const backendResponse = await fetch(
      `${API_URL}/rsvp/${encodeURIComponent(slug)}/buscar?telefono=${encodeURIComponent(telefono)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        return NextResponse.json(
          { 
            error: 'Número no encontrado',
            message: 'No encontramos tu número en nuestra lista de invitados. Por favor, verifica el número o contacta a los organizadores.'
          },
          { status: 404 }
        )
      }
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: errorData.error || 'Error al buscar invitado',
          message: errorData.message || 'No encontramos tu número en nuestra lista de invitados. Por favor, verifica el número o contacta a los organizadores.'
        },
        { status: backendResponse.status }
      )
    }

    const backendData = await backendResponse.json()

    if (!backendData.encontrado) {
      return NextResponse.json(
        { 
          error: 'Número no encontrado',
          message: 'No encontramos tu número en nuestra lista de invitados. Por favor, verifica el número o contacta a los organizadores.'
        },
        { status: 404 }
      )
    }

    // Transformar la respuesta del backend al formato esperado por el frontend
    const respuesta: GrupoInvitados = {
      lider: {
        id: backendData.lider.id,
        nombre: backendData.lider.nombre,
        apellido: backendData.lider.apellido,
        asistencia: backendData.lider.asistencia === 1 ? 'Si' : backendData.lider.asistencia === 2 ? 'No' : '',
        acompanantes: null, // Esto se manejará en el backend
      },
      grupo: backendData.grupo.map((inv: any) => ({
        id: inv.id,
        nombre: inv.nombre,
        apellido: inv.apellido,
        asistencia: inv.asistencia === 1 ? 'Si' : inv.asistencia === 2 ? 'No' : '',
      })),
      totalPersonas: backendData.totalPersonas,
      yaConfirmado: backendData.yaConfirmo,
    }

    return NextResponse.json(respuesta, { status: 200 })
  } catch (error) {
    console.error('Error al buscar invitado:', error)
    return NextResponse.json(
      { 
        error: 'Error al buscar en la lista de invitados',
        message: 'Hubo un error al buscar tu invitación. Por favor, intenta nuevamente.'
      },
      { status: 500 }
    )
  }
}

/**
 * POST - Actualizar asistencia usando el backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, invitadoId, asistencia, comentarios } = body

    if (!slug || !invitadoId || !asistencia) {
      return NextResponse.json(
        { error: 'Slug, ID del invitado y asistencia son obligatorios' },
        { status: 400 }
      )
    }

    if (!['Si', 'No'].includes(asistencia)) {
      return NextResponse.json(
        { error: 'Asistencia debe ser "Si" o "No"' },
        { status: 400 }
      )
    }

    // Convertir asistencia a formato del backend (1 = Si, 2 = No)
    const asistenciaBackend = asistencia === 'Si' ? 1 : 2

    // Llamar al backend para confirmar asistencia
    const backendResponse = await fetch(
      `${API_URL}/rsvp/${encodeURIComponent(slug)}/confirmar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitadoId,
          asistencia: asistenciaBackend,
          comentarios: comentarios || null,
        }),
      }
    )

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: errorData.error || 'Error al confirmar asistencia',
          message: errorData.message || 'Hubo un error al confirmar tu asistencia. Por favor, intenta nuevamente.'
        },
        { status: backendResponse.status }
      )
    }

    const backendData = await backendResponse.json()

    return NextResponse.json(
      { 
        message: backendData.mensaje || 'Asistencia confirmada exitosamente',
        totalPersonas: backendData.totalPersonas,
        asistencia: backendData.asistencia === 1 ? 'Si' : 'No',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al actualizar asistencia:', error)
    return NextResponse.json(
      { 
        error: 'Error al actualizar la asistencia',
        message: 'Hubo un error al confirmar tu asistencia. Por favor, intenta nuevamente.'
      },
      { status: 500 }
    )
  }
}

