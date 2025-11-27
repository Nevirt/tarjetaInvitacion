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
  
  // Agradecimientos especiales con marcos de texto profesionales
  specialAcknowledgements?: Array<{
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
  eventDateTime: "2025-12-13T20:00:00", // Cambia la fecha y hora aquí
  rsvpDeadlineDateTime: "2025-12-10T23:59:59", // Fecha límite para confirmar asistencia
  eventLocationName: "Club Primero de Enero",
  eventAddress: "Av. Coronel Alfredo Ramos, San Juan Btta.",
  //<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1499.0744531309426!2d-57.15338888196659!3d-26.667046439071715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945bcce6e2cf2809%3A0xdc6fa792c91e615e!2sClub%20Primero%20De%20Enero!5e0!3m2!1sen!2spy!4v1764269234707!5m2!1sen!2spy
  // " width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1499.0744531309426!2d-57.15338888196659!3d-26.667046439071715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945bcce6e2cf2809%3A0xdc6fa792c91e615e!2sClub%20Primero%20De%20Enero!5e0!3m2!1sen!2spy!4v1764269234707!5m2!1sen!2spy",
  googleMapsPlaceUrl: "https://maps.app.goo.gl/vhrvUSQ7fGAQ5PAa9",
  
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
  
  // Agradecimientos especiales con marcos de texto profesionales y modernos
  specialAcknowledgements: [
    {
      text: "A mi familia, por ser mi pilar y mi inspiración en cada paso de este camino. Sin ustedes, este logro no sería posible.",
    },
    {
      text: "A mis amigos y compañeros, por acompañarme en los momentos más importantes y hacer de esta experiencia algo inolvidable.",
    },
    {
      text: "A todos los que han creído en mí y me han apoyado. Este momento es también suyo, porque juntos lo hemos logrado.",
    },
  ],
  
  countdownExpiredMessage: "¡El gran día ha llegado!",
  rsvpSuccessMessage: "¡Gracias por confirmar tu asistencia! Te esperamos con mucha ilusión.",
  
  featuredNumber: "2025", // Puede ser el año, un número especial, etc.
};

