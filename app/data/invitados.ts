/**
 * LISTA DE INVITADOS
 * 
 * Edita este archivo para agregar/modificar tus invitados.
 * No necesitas Excel ni bases de datos externas.
 */

export interface Invitado {
  id: number
  nombre: string
  apellido: string
  acompanantes: number | null
  whatsapp: string
  asistencia: '' | 'Si' | 'No'
  lider: number
  comentarios: string
}

/**
 * IMPORTANTE: Cómo llenar los datos
 * 
 * - id: Número único para cada persona (1, 2, 3...)
 * - nombre: Nombre del invitado
 * - apellido: Apellido del invitado
 * - acompanantes: Solo si trae personas SIN nombre (ej: niños pequeños). Poner 0 si todos están registrados.
 * - whatsapp: Número con código de país (ej: +5491112345678)
 * - asistencia: Dejar en '' (se llenará automáticamente cuando confirmen)
 * - lider: ID de la persona responsable del grupo (usualmente su propio ID si es líder)
 * - comentarios: Dejar en '' (se llenará cuando confirmen)
 * 
 * EJEMPLOS:
 * 
 * 1. Familia de 3 (Juan, María, Carlos):
 *    - Juan: id=1, lider=1, acompanantes=0
 *    - María: id=2, lider=1, acompanantes=0
 *    - Carlos: id=3, lider=1, acompanantes=0
 *    Total: 3 personas
 * 
 * 2. Persona con niños sin nombre (Laura + 2 niños):
 *    - Laura: id=6, lider=6, acompanantes=2
 *    Total: 3 personas (1 + 2)
 * Marta Lerra
Nelson Ramirez
Vitoria Horst
Tia carla 3
Tia lety y sofi 2
Tia lou 2
Tia mafi 3
Tio josé 4
Nosotros 10 con cuñadas
Juanjo
Maria Garay
Leticia Meza
 Rodrigo Benitez profe
Tia Cristi 3
Tania Benegas 

Marta ‪+54 9 376 432-3215‬
Nelson ‪+595 992 276329‬
Vito ‪+595 986 345235‬
Tia carla ‪+595 985 498973‬
Cristinita Cubells  ‪+595 991 453491‬
Tia Lety ‪+595 972 529375‬
Sofi Ayala ‪+595 985 178767‬
Tia Lourdes ‪+595 981 808390‬
Tia Mafi ‪+595 981 808144‬
Tio José ‪+595 992 208908‬
Judith ‪+595 975 163170‬
Lara ‪+595 975 762054‬
Maria Garay ‪+595 976 322793‬
Leticia Meza ‪+595 975 146956‬
Rodrigo Benitez ‪+595 971 310602‬
Tia Cristi ‪+595 983 463146‬
Tania Benegas ‪+595 982 213888‬
Cindy ‪+595 983 996682‬
Juan Cubells ‪+595 975773921‬
Fatima Gómez ‪+595 994172210‬
Juan Jesús Cubells ‪+595 976 147913‬
Jose Cubells ‪+595 992 785910‬
Sebastian Cubells ‪+595 984 598009‬
Maria Paz Cubells ‪+595 976 534549

 */

// IMPORTANTE: Usamos globalThis para que persista entre hot-reloads de Next.js
// Esto evita que se reinicialice el array cuando se recompilan módulos
const INVITADOS_INICIALES: Invitado[] = [
  // GRUPO 1: Familia Pérez (Juan, María, Carlos)
  {
    id: 1,
    nombre: "Marta",
    apellido: "Lerra",
    acompanantes: 0,
    whatsapp: "+5493764323215",
    asistencia: "",
    lider: 1,
    comentarios: ""
  },
  {
    id: 2,
    nombre: "Nelson",
    apellido: "Ramirez",
    acompanantes: 0,
    whatsapp: "+595992276329",
    asistencia: "",
    lider: 2,
    comentarios: ""
  },
  {
    id: 3,
    nombre: "Vitoria",
    apellido: "Horst",
    acompanantes: 0,
    whatsapp: "+595986345235",
    asistencia: "",
    lider: 3,
    comentarios: ""
  },
  {
    id: 4,
    nombre: "Carla",
    apellido: "Cubells",
    acompanantes: null,
    whatsapp: "+595985498973",
    asistencia: "",
    lider: 4,
    comentarios: ""
  },
  {
    id: 5,
    nombre: "Cristinita",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595991453491",
    asistencia: "",
    lider: 5,
    comentarios: ""
  },
  {
    id: 6,
    nombre: "Lety",
    apellido: "Ayala",
    acompanantes: 0,
    whatsapp: "+595972529375",
    asistencia: "",
    lider: 6,
    comentarios: ""
  },
  {
    id: 7,
    nombre: "Sofi",
    apellido: "Ayala",
    acompanantes: 0,
    whatsapp: "+595985178767",
    asistencia: "",
    lider: 7,
    comentarios: ""
  },
  {
    id: 8,
    nombre: "Lourdes",
    apellido: "Gómez",
    acompanantes: null,
    whatsapp: "+595981808390",
    asistencia: "",
    lider: 8,
    comentarios: ""
  },
  {
    id: 9,
    nombre: "Mafalda",
    apellido: "Gómez",
    acompanantes: null,
    whatsapp: "+595981808144",
    asistencia: "",
    lider: 9,
    comentarios: ""
  },
  {
    id: 10,
    nombre: "José",
    apellido: "Gómez",
    acompanantes: null,
    whatsapp: "+595992208908",
    asistencia: "",
    lider: 10,
    comentarios: ""
  },
  {
    id: 11,
    nombre: "Judith",
    apellido: "Amarilla",
    acompanantes: 0,
    whatsapp: "+595975163170",
    asistencia: "",
    lider: 11,
    comentarios: ""
  },
  {
    id: 12,
    nombre: "Lara",
    apellido: "",
    acompanantes: 0,
    whatsapp: "+595975762054",
    asistencia: "",
    lider: 12,
    comentarios: ""
  },
  {
    id: 13,
    nombre: "Maria",
    apellido: "Garay",
    acompanantes: 0,
    whatsapp: "+595976322793",
    asistencia: "",
    lider: 13,
    comentarios: ""
  },
  {
    id: 14,
    nombre: "Leticia",
    apellido: "Meza",
    acompanantes: 0,
    whatsapp: "+595975146956",
    asistencia: "",
    lider: 14,
    comentarios: ""
  },
  {
    id: 15,
    nombre: "Rodrigo",
    apellido: "Benitez",
    acompanantes: 0,
    whatsapp: "+595971310602",
    asistencia: "",
    lider: 15,
    comentarios: ""
  },
  {
    id: 16,
    nombre: "Cristina",
    apellido: "Cubells",
    acompanantes: null,
    whatsapp: "+595983463146",
    asistencia: "",
    lider: 16,
    comentarios: ""
  },
  {
    id: 17,
    nombre: "Tania",
    apellido: "Benegas",
    acompanantes: 0,
    whatsapp: "+595982213888",
    asistencia: "",
    lider: 17,
    comentarios: ""
  },
  {
    id: 18,
    nombre: "Cindy",
    apellido: "Sosa",
    acompanantes: 0,
    whatsapp: "+595983996682",
    asistencia: "",
    lider: 18,
    comentarios: ""
  },
  {
    id: 19,
    nombre: "Juan",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595975773921",
    asistencia: "",
    lider: 19,
    comentarios: ""
  },
  {
    id: 20,
    nombre: "Fatima",
    apellido: "Gómez",
    acompanantes: 0,
    whatsapp: "+595994172210",
    asistencia: "",
    lider: 20,
    comentarios: ""
  },
  {
    id: 21,
    nombre: "Juan Jesús",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595976147913",
    asistencia: "",
    lider: 21,
    comentarios: ""
  },
  {
    id: 22,
    nombre: "Jose",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595992785910",
    asistencia: "",
    lider: 22,
    comentarios: ""
  },
  {
    id: 23,
    nombre: "Sebastian",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595984598009",
    asistencia: "",
    lider: 23,
    comentarios: ""
  },
  {
    id: 24,
    nombre: "Maria Paz",
    apellido: "Cubells",
    acompanantes: 0,
    whatsapp: "+595976534549",
    asistencia: "",
    lider: 24,
    comentarios: ""
  },
  {
    id: 25,
    nombre: "Juanma",
    apellido: "Gómez",
    acompanantes: 0,
    whatsapp: "+595972140076",
    asistencia: "",
    lider: 25,
    comentarios: ""
  }
];

// Declaración de tipo para globalThis
declare global {
  var _invitadosEnMemoria: Invitado[] | undefined;
}

// Inicializar en globalThis para persistir entre hot-reloads
// Solo inicializa si no existe, para mantener los cambios en memoria
if (!globalThis._invitadosEnMemoria) {
  globalThis._invitadosEnMemoria = [...INVITADOS_INICIALES];
  console.log('[INVITADOS] Inicializando array en globalThis con', globalThis._invitadosEnMemoria.length, 'invitados');
} else {
  console.log('[INVITADOS] Reutilizando array existente con', globalThis._invitadosEnMemoria.length, 'invitados');
}

// Referencia local para uso interno
const _invitadosEnMemoria = globalThis._invitadosEnMemoria;

/**
 * Getter para acceder a la lista de invitados
 */
export function obtenerListaInvitados(): Invitado[] {
  return globalThis._invitadosEnMemoria!;
}

/**
 * Función helper para actualizar la asistencia de un grupo
 */
export function actualizarAsistenciaGrupo(
  liderId: number,
  asistencia: 'Si' | 'No',
  comentarios: string,
  numAcompanantes?: number
): void {
  const invitados = globalThis._invitadosEnMemoria!;
  
  // Actualizar todos los invitados del grupo
  for (let i = 0; i < invitados.length; i++) {
    const inv = invitados[i]
    if (inv.lider === liderId) {
      // Actualizar asistencia y comentarios
      invitados[i] = {
        ...inv,
        asistencia,
        comentarios: comentarios || inv.comentarios,
        // Si es el líder y tiene acompañantes flexibles (null), actualizar con el número seleccionado
        acompanantes: (inv.id === liderId && inv.acompanantes === null && numAcompanantes !== undefined)
          ? numAcompanantes
          : inv.acompanantes
      }
    }
  }
  
  // Log para debug en desarrollo
  if (process.env.NODE_ENV === 'development') {
    const grupoActualizado = invitados.filter(inv => inv.lider === liderId)
    console.log(`[INVITADOS] Grupo ${liderId} actualizado en globalThis:`, {
      asistencia,
      numAcompanantes,
      invitados: grupoActualizado.map(inv => ({ id: inv.id, nombre: inv.nombre, asistencia: inv.asistencia, acompanantes: inv.acompanantes }))
    })
  }
}

/**
 * Función helper para normalizar números de teléfono de Paraguay
 * Acepta formatos:
 * - Internacional: +595976570130
 * - Local: 0976570130
 * - Sin prefijo: 976570130
 */
function normalizarTelefonoParaguay(telefono: string): string {
  // Quitar espacios, guiones, paréntesis y el símbolo +
  let normalizado = telefono.replace(/[\s\-()+ ]/g, '')
  
  // Si empieza con 595 (código de Paraguay), quitarlo
  if (normalizado.startsWith('595')) {
    normalizado = normalizado.substring(3)
  }
  
  // Si empieza con 0 (formato local paraguayo 09...), quitarlo
  if (normalizado.startsWith('0')) {
    normalizado = normalizado.substring(1)
  }
  
  return normalizado
}

/**
 * Función helper para buscar invitados por teléfono
 * Acepta tanto formato internacional (+595) como local paraguayo (09)
 */
export function buscarPorTelefono(telefono: string): Invitado | undefined {
  const telefonoNormalizado = normalizarTelefonoParaguay(telefono)
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[BUSCAR] Teléfono ingresado:', telefono, '-> Normalizado:', telefonoNormalizado)
  }
  
  return globalThis._invitadosEnMemoria!.find((inv) => {
    const whatsappNormalizado = normalizarTelefonoParaguay(inv.whatsapp)
    return whatsappNormalizado === telefonoNormalizado
  })
}

/**
 * Función helper para obtener grupo por líder
 */
export function obtenerGrupoPorLider(liderId: number): Invitado[] {
  return globalThis._invitadosEnMemoria!.filter((inv) => inv.lider === liderId)
}

