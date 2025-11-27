import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { obtenerListaInvitados } from '@/app/data/invitados'

/**
 * Endpoint SECRETO para descargar el Excel con todas las confirmaciones
 * 
 * URL: /api/descargar-excel-confirmaciones-secreto
 * 
 * IMPORTANTE: 
 * - Esta URL es secreta, NO la compartas públicamente
 * - Solo úsala tú para descargar el reporte de confirmaciones
 * - Si quieres más seguridad, agrega un token/password en la query string
 */

export async function GET(request: NextRequest) {
  try {
    // Opcional: Agregar validación de token para mayor seguridad
    // const { searchParams } = new URL(request.url)
    // const token = searchParams.get('token')
    // if (token !== 'TU_TOKEN_SECRETO') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    // }

    // Obtener lista actualizada de invitados
    const listaInvitados = obtenerListaInvitados()

    // Log de debug para ver qué datos se están descargando
    if (process.env.NODE_ENV === 'development') {
      const confirmados = listaInvitados.filter(inv => inv.asistencia !== '')
      console.log('[EXCEL] Descargando Excel:', {
        totalInvitados: listaInvitados.length,
        confirmados: confirmados.length,
        confirmadosData: confirmados.map(inv => ({
          id: inv.id,
          nombre: inv.nombre,
          asistencia: inv.asistencia,
          acompanantes: inv.acompanantes
        }))
      })
    }

    // Crear workbook
    const wb = XLSX.utils.book_new()

    // Convertir datos a hoja de Excel
    const ws = XLSX.utils.json_to_sheet(listaInvitados)

    // Configurar anchos de columna
    ws['!cols'] = [
      { wch: 5 },  // id
      { wch: 15 }, // nombre
      { wch: 15 }, // apellido
      { wch: 15 }, // acompanantes
      { wch: 18 }, // whatsapp
      { wch: 12 }, // asistencia
      { wch: 8 },  // lider
      { wch: 35 }, // comentarios
    ]

    // Agregar la hoja al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Confirmaciones')

    // Generar el archivo Excel en memoria (como buffer)
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    // Generar nombre de archivo con fecha y hora actual
    const now = new Date()
    const fileName = `confirmaciones_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}.xlsx`

    // Devolver el archivo como descarga
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error('Error al generar Excel:', error)
    return NextResponse.json(
      { error: 'Error al generar el archivo Excel' },
      { status: 500 }
    )
  }
}

/**
 * ESTADÍSTICAS RÁPIDAS (opcional)
 * 
 * Si prefieres ver un resumen en JSON antes de descargar:
 * Agrega ?format=json a la URL
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')

    if (format === 'json') {
      // Obtener lista actualizada
      const listaInvitados = obtenerListaInvitados()
      
      // Calcular estadísticas
      const totalInvitados = listaInvitados.length
      const confirmadosSi = listaInvitados.filter(inv => inv.asistencia === 'Si').length
      const confirmadosNo = listaInvitados.filter(inv => inv.asistencia === 'No').length
      const sinResponder = listaInvitados.filter(inv => !inv.asistencia).length

      // Calcular total de personas que asisten
      const gruposConfirmados = new Set<number>()
      let personasQueAsisten = 0

      listaInvitados.forEach(inv => {
        if (inv.asistencia === 'Si') {
          if (!gruposConfirmados.has(inv.lider)) {
            gruposConfirmados.add(inv.lider)
            // Contar registros del grupo
            const miembrosGrupo = listaInvitados.filter(i => i.lider === inv.lider).length
            // Más acompañantes del líder
            const lider = listaInvitados.find(i => i.id === inv.lider)
            const acompanantes = lider?.acompanantes || 0
            personasQueAsisten += miembrosGrupo + acompanantes
          }
        }
      })

      return NextResponse.json({
        resumen: {
          totalInvitados,
          confirmadosSi,
          confirmadosNo,
          sinResponder,
          personasQueAsisten
        },
        invitados: listaInvitados
      })
    }

    return NextResponse.json({ error: 'Método no soportado' }, { status: 405 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al procesar' }, { status: 500 })
  }
}

