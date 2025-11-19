import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, readFile, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'

/**
 * API Route para manejar las confirmaciones de asistencia (RSVP)
 * 
 * Guarda las respuestas en /data/rsvp.json
 * 
 * Para producción, considera usar una base de datos o servicio externo.
 */

interface RsvpData {
  nombre: string
  acompanantes: string
  telefono: string
  comentarios: string
  fecha: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RsvpData = await request.json()

    // Validación básica
    if (!body.nombre || !body.telefono) {
      return NextResponse.json(
        { error: 'Nombre y teléfono son obligatorios' },
        { status: 400 }
      )
    }

    // Crear directorio data si no existe
    const dataDir = join(process.cwd(), 'data')
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (error) {
      // El directorio ya existe, continuar
    }

    // Leer datos existentes o crear array vacío
    let existingData: RsvpData[] = []
    try {
      const filePath = join(dataDir, 'rsvp.json')
      // Verificar si el archivo existe
      await access(filePath, constants.F_OK)
      // Si existe, leerlo
      const fileContent = await readFile(filePath, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch (error) {
      // Archivo no existe o está vacío, empezar con array vacío
      existingData = []
    }

    // Agregar nueva confirmación con timestamp
    const newRsvp: RsvpData = {
      ...body,
      fecha: new Date().toISOString(),
    }

    existingData.push(newRsvp)

    // Guardar en archivo JSON
    const filePath = join(dataDir, 'rsvp.json')
    await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8')

    return NextResponse.json(
      { message: 'Confirmación guardada exitosamente', data: newRsvp },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al procesar RSVP:', error)
    return NextResponse.json(
      { error: 'Error al procesar la confirmación' },
      { status: 500 }
    )
  }
}

