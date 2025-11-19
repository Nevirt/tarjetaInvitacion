/**
 * CONFIGURACIÓN DE LA INVITACIÓN
 * 
 * Edita este archivo para personalizar todos los datos del evento.
 * No necesitas modificar los componentes, solo cambia los valores aquí.
 */

export interface InvitacionConfig {
  // Información principal
  honoreeName: string;
  eventTitle: string;
  eventDateTime: string; // Formato ISO: "2025-06-15T18:00:00"
  rsvpDeadlineDateTime: string; // Fecha límite para confirmar asistencia: "2025-12-10T23:59:59"
  eventLocationName: string;
  eventAddress: string;
  
  // Google Maps
  googleMapsEmbedUrl: string; // URL del iframe embed de Google Maps
  googleMapsPlaceUrl: string; // URL para abrir en Google Maps app/web
  
  // Código de vestimenta
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeImagePath: string; // Ruta relativa desde /public
  
  // Música de fondo
  musicUrl: string; // Ruta relativa desde /public/audio
  
  // Agradecimientos
  acknowledgementsTitle: string;
  acknowledgements: string[];
  
  // Agradecimientos especiales con fotos
  specialAcknowledgements?: Array<{
    images: Array<{ src: string; alt: string }> | string; // Array de imágenes o string único (retrocompatibilidad)
    imageSrc?: string; // Retrocompatibilidad - usar 'images' en su lugar
    imageAlt?: string; // Retrocompatibilidad
    text: string;
  }>;
  
  // Colores personalizados (opcional, usa los del tailwind.config si no especificas)
  primaryColor?: string;
  accentColor?: string;
  
  // Mensajes
  countdownExpiredMessage: string;
  rsvpSuccessMessage: string;
  
  // Número destacado (año, número especial, etc.)
  featuredNumber: string;
}

export const invitacionConfig: InvitacionConfig = {
  // ============================================
  // EDITA ESTOS VALORES PARA PERSONALIZAR
  // ============================================
  
  honoreeName: "Fatima Cubells Gomez",
  eventTitle: "Acto de Colación",
  eventDateTime: "2025-12-13T19:00:00", // Cambia la fecha y hora aquí
  rsvpDeadlineDateTime: "2025-12-10T23:59:59", // Fecha límite para confirmar asistencia
  eventLocationName: "Salón de Eventos Primero",
  eventAddress: "Av. Principal 123, Ciudad",
  
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.1234567890!2d-99.1234567890!3d19.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA5OcKwMDcnMjQuNCJX!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx",
  googleMapsPlaceUrl: "https://goo.gl/maps/XXXXXXXXXXXX",
  
  dressCodeTitle: "Código de Vestimenta",
  dressCodeDescription: "Formal elegante. Colores pastel sugeridos. Evitar jeans y zapatos deportivos. Preferimos vestidos largos o trajes formales.",
  dressCodeImagePath: "/dresscode.png", // Coloca tu imagen en /public/dresscode.png
  
  musicUrl: "/audio/ambient.mp3", // Coloca tu archivo de música en /public/audio/ambient.mp3
  
  acknowledgementsTitle: "Agradecimientos",
  acknowledgements: [
    "Agradecemos profundamente a todos los que han sido parte de este camino.",
    "Gracias a nuestra familia por su apoyo incondicional.",
    "A nuestros amigos y compañeros por acompañarnos en cada paso.",
  ],
  
  // Agradecimientos especiales con fotos en marcos dorados animados
  // Coloca las fotos en /public/photos/ y referencia aquí
  // IMPORTANTE: Se recomienda mínimo 5 imágenes por sector para el efecto aesthetic completo
  // Las imágenes se mostrarán en un carrusel con efecto de profundidad
  specialAcknowledgements: [
    {
      // Ejemplo con múltiples imágenes (mínimo 5 recomendado para mejor efecto)
      images: [
        { src: "/photos/family1.jpg", alt: "Fatima con su familia" },
        { src: "/photos/family2.jpg", alt: "Momento especial con la familia" },
        { src: "/photos/family3.jpg", alt: "Celebración familiar" },
        { src: "/photos/family4.jpg", alt: "Recuerdo familiar especial" },
        { src: "/photos/family5.jpg", alt: "Momento único con la familia" },
      ],
      text: "A mi familia, por ser mi pilar y mi inspiración en cada paso de este camino. Sin ustedes, este logro no sería posible.",
    },
    {
      // Ejemplo con múltiples imágenes (pueden ser más de 5)
      images: [
        { src: "/photos/friends1.jpg", alt: "Fatima con sus amigos" },
        { src: "/photos/friends2.jpg", alt: "Momento con compañeros" },
        { src: "/photos/friends3.jpg", alt: "Celebración con amigos" },
        { src: "/photos/friends4.jpg", alt: "Recuerdo especial" },
        { src: "/photos/friends5.jpg", alt: "Momento inolvidable" },
        { src: "/photos/friends6.jpg", alt: "Aventura compartida" }, // Puedes agregar más
      ],
      text: "A mis amigos y compañeros, por acompañarme en los momentos más importantes y hacer de esta experiencia algo inolvidable.",
    },
    {
      // Ejemplo con múltiples imágenes
      images: [
        { src: "/photos/special1.jpg", alt: "Fatima sonriendo" },
        { src: "/photos/special2.jpg", alt: "Momento especial" },
        { src: "/photos/special3.jpg", alt: "Celebración" },
        { src: "/photos/special4.jpg", alt: "Recuerdo único" },
        { src: "/photos/special5.jpg", alt: "Momento memorable" },
      ],
      text: "A todos los que han creído en mí y me han apoyado. Este momento es también suyo, porque juntos lo hemos logrado.",
    },
  ],
  
  countdownExpiredMessage: "¡El gran día ha llegado!",
  rsvpSuccessMessage: "¡Gracias por confirmar tu asistencia! Te esperamos con mucha ilusión.",
  
  featuredNumber: "2025", // Puede ser el año, un número especial, etc.
};

