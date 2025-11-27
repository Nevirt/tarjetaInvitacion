# Sistema de Confirmación de Asistencia (RSVP)

## 🎯 Descripción

Sistema de gestión de confirmaciones de asistencia **100% en código**, sin dependencias de archivos externos ni APIs. Los invitados confirman ingresando su número de teléfono/WhatsApp, y puedes descargar las confirmaciones como Excel mediante una URL secreta.

## ✨ Características

- ✅ **Todo en código**: Lista de invitados definida en TypeScript
- 📱 **Identificación automática**: Por número de teléfono
- 👥 **Gestión de grupos**: Un líder confirma por todo su grupo
- 💾 **Sin base de datos externa**: Todo en memoria
- 📊 **Descarga Excel secreto**: URL privada para exportar confirmaciones
- 🔄 **Tiempo real**: Las confirmaciones se actualizan instantáneamente

## 📝 Cómo Agregar Invitados

Edita el archivo `app/data/invitados.ts` y agrega tus invitados al array `listaInvitados`:

```typescript
{
  id: 7,                    // Número único
  nombre: "María",          // Nombre
  apellido: "González",     // Apellido
  acompanantes: 0,          // 0 si todos están registrados
  whatsapp: "+5491123456789", // Con código de país
  asistencia: "",           // Dejar vacío (se llena automáticamente)
  lider: 7,                 // Su propio ID si es líder
  comentarios: ""           // Dejar vacío
}
```

### Ejemplos de Configuración

**1. Familia de 3 personas (todos con nombre conocido):**

```typescript
// Juan, María y Carlos Pérez
{
  id: 1,
  nombre: "Juan",
  apellido: "Pérez",
  acompanantes: 0,  // María y Carlos están registrados abajo
  whatsapp: "+5491112345678",
  asistencia: "",
  lider: 1,  // Juan es el líder
  comentarios: ""
},
{
  id: 2,
  nombre: "María",
  apellido: "Pérez",
  acompanantes: 0,
  whatsapp: "+5491112345678",
  asistencia: "",
  lider: 1,  // Juan es el líder del grupo
  comentarios: ""
},
{
  id: 3,
  nombre: "Carlos",
  apellido: "Pérez",
  acompanantes: 0,
  whatsapp: "+5491112345678",
  asistencia: "",
  lider: 1,  // Juan es el líder del grupo
  comentarios: ""
}
// Total: 3 personas
```

**2. Persona con acompañantes sin nombre (ej: niños pequeños):**

```typescript
{
  id: 6,
  nombre: "Laura",
  apellido: "Martínez",
  acompanantes: 2,  // 2 niños sin registrar individualmente
  whatsapp: "+5491198765432",
  asistencia: "",
  lider: 6,  // Ella es la líder
  comentarios: ""
}
// Total: 1 + 2 = 3 personas
```

**3. Invitado individual:**

```typescript
{
  id: 10,
  nombre: "Roberto",
  apellido: "López",
  acompanantes: 0,
  whatsapp: "+5491145678901",
  asistencia: "",
  lider: 10,  // Él mismo es el líder
  comentarios: ""
}
// Total: 1 persona
```

## 🔐 Descargar Excel con Confirmaciones

### URL Secreta

Para descargar el Excel con todas las confirmaciones, visita:

```
http://tu-dominio.com/api/descargar-excel-confirmaciones-secreto
```

O en desarrollo local:

```
http://localhost:3000/api/descargar-excel-confirmaciones-secreto
```

**⚠️ IMPORTANTE:** 
- Esta URL es **SECRETA**, no la compartas públicamente
- Solo úsala tú para descargar el reporte
- El archivo se llama automáticamente con fecha y hora: `confirmaciones_2025-12-13_15-30.xlsx`

### Ver Estadísticas en JSON (opcional)

Si prefieres ver un resumen antes de descargar:

```
POST http://localhost:3000/api/descargar-excel-confirmaciones-secreto?format=json
```

Respuesta:
```json
{
  "resumen": {
    "totalInvitados": 6,
    "confirmadosSi": 3,
    "confirmadosNo": 1,
    "sinResponder": 2,
    "personasQueAsisten": 8
  },
  "invitados": [...]
}
```

### Agregar Token de Seguridad (opcional)

Si quieres más seguridad, descomenta estas líneas en `app/api/descargar-excel-confirmaciones-secreto/route.ts`:

```typescript
const { searchParams } = new URL(request.url)
const token = searchParams.get('token')
if (token !== 'TU_TOKEN_SECRETO_AQUI') {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}
```

Luego usa la URL con el token:
```
http://localhost:3000/api/descargar-excel-confirmaciones-secreto?token=TU_TOKEN_SECRETO_AQUI
```

## 🚀 Flujo de Confirmación

### Para el Invitado:

1. **Abre la invitación** y hace clic en "Confirmar asistencia"
2. **Ingresa su número de teléfono** (con código de país)
3. **El sistema muestra:**
   - Mensaje de bienvenida personalizado
   - Lista de todos en su grupo
   - Total de personas
4. **Selecciona** "Sí, asistiré" o "No podré asistir"
5. **Opcionalmente** agrega comentarios (restricciones alimentarias, etc.)
6. **Confirma** y listo

### Para el Organizador:

1. **Visita la URL secreta** para descargar el Excel
2. **Abre el archivo** en Excel o Google Sheets
3. **Ve todas las confirmaciones** actualizadas en tiempo real

## 📊 Estructura del Excel Descargado

| Columna | Descripción |
|---------|-------------|
| `id` | Identificador único |
| `nombre` | Nombre del invitado |
| `apellido` | Apellido |
| `acompanantes` | Acompañantes sin nombre |
| `whatsapp` | Número de WhatsApp |
| `asistencia` | "Si", "No" o vacío |
| `lider` | ID del líder del grupo |
| `comentarios` | Restricciones/observaciones |

## 🔧 API Endpoints

### GET `/api/rsvp?telefono={numero}`

Busca un invitado por su número de teléfono.

**Ejemplo:**
```
GET /api/rsvp?telefono=+5491112345678
```

**Respuesta exitosa:**
```json
{
  "lider": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    ...
  },
  "grupo": [
    { "id": 1, "nombre": "Juan", ... },
    { "id": 2, "nombre": "María", ... },
    { "id": 3, "nombre": "Carlos", ... }
  ],
  "totalPersonas": 3
}
```

### POST `/api/rsvp`

Actualiza la asistencia de un grupo.

**Body:**
```json
{
  "liderId": 1,
  "asistencia": "Si",
  "comentarios": "Sin gluten por favor"
}
```

**Respuesta:**
```json
{
  "message": "Asistencia confirmada exitosamente",
  "grupo": [...]
}
```

### GET `/api/descargar-excel-confirmaciones-secreto`

Descarga el Excel con todas las confirmaciones.

**Respuesta:** Archivo Excel (descarga automática)

## 📱 Formato del Número de Teléfono

⚠️ **Importante:** Siempre usa formato internacional con código de país:

✅ **Correcto:**
- `+5491112345678` (Argentina)
- `+525512345678` (México)
- `+34912345678` (España)

❌ **Incorrecto:**
- `1112345678` (sin código de país)
- `+54 9 11 1234-5678` (aunque se normalizan espacios, mejor evitarlos)

## 💡 Preguntas Frecuentes

### ¿Cómo funciona el campo `acompanantes`?

- **Si conoces el nombre:** Registra a la persona individualmente con `acompanantes = 0`
- **Si NO conoces el nombre** (ej: bebés): Usa el campo `acompanantes` del líder
- **Total de personas = registros del grupo + acompañantes del líder**

### ¿Quién puede confirmar la asistencia?

Cualquier persona del grupo puede confirmar:
- Si Juan ingresa su número → puede confirmar por Juan, María y Carlos
- Si María ingresa su número → puede confirmar por Juan, María y Carlos
- La confirmación se aplica a **TODO el grupo**

### ¿Puedo cambiar una confirmación?

Sí, simplemente vuelve a ingresar el número y cambia la respuesta. La última confirmación sobrescribe la anterior.

### ¿Las confirmaciones persisten después de reiniciar el servidor?

**No**, las confirmaciones están en memoria. Cuando reinicias el servidor de desarrollo, se pierden. Para producción, considera:
- Usar una base de datos (MongoDB, PostgreSQL, etc.)
- O al menos descargar el Excel regularmente

### ¿Puedo ver las confirmaciones en tiempo real?

Sí, simplemente recarga la URL secreta para descargar el Excel actualizado. O haz un GET con `?format=json` para ver el resumen.

### ¿Cómo protejo mejor la URL de descarga?

1. Usa un nombre más aleatorio para la ruta (cambia el nombre de la carpeta)
2. Agrega el sistema de token (descomentar el código)
3. En producción, usa autenticación de Next.js

### ¿Qué pasa si dos grupos tienen el mismo número?

No es recomendable. Cada grupo debería tener un número único. Si es necesario:
- Usa el celular del padre para un grupo
- Usa el celular de la madre para otro grupo

## 🛠️ Ventajas de este Sistema

### ✅ Ventajas

- **Sin dependencias externas**: No necesitas Excel, base de datos ni APIs
- **100% código**: Todo versionado con Git
- **Fácil de editar**: Solo editas un archivo TypeScript
- **Type-safe**: TypeScript te avisa si cometes errores
- **Rápido**: Todo en memoria, sin latencia de DB
- **Portátil**: Funciona en cualquier servidor Next.js
- **Secreto**: Solo tú conoces la URL de descarga

### ⚠️ Limitaciones

- **En desarrollo**: Las confirmaciones se pierden al reiniciar
- **Sin historial**: No guarda versiones anteriores
- **Acceso concurrente**: Múltiples confirmaciones simultáneas pueden tener race conditions

### 🚀 Para Producción

Si vas a usar esto en producción, considera:

1. **Persistencia**: Guardar en una base de datos real
2. **Backup**: Exportar automáticamente el Excel cada X minutos
3. **Logs**: Registrar cada confirmación con timestamp
4. **Autenticación**: Proteger la URL de descarga con login

## 📝 Resumen de Archivos

```
app/
├── data/
│   └── invitados.ts                           ← AQUÍ agregas invitados
├── api/
│   ├── rsvp/
│   │   └── route.ts                          ← API de confirmación
│   └── descargar-excel-confirmaciones-secreto/
│       └── route.ts                          ← URL secreta de descarga
└── components/
    └── RsvpSection.tsx                        ← Modal de confirmación
```

---

¡Listo! Sistema completo sin archivos externos ni APIs. 🎉
