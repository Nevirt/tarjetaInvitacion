// types/config.ts - Tipos para configuración de invitación
export interface InvitacionConfig {
  // Información principal
  honoreeName: string;
  eventTitle: string;
  heroSubtitle?: string;
  eventDateTime: string;
  rsvpDeadlineDateTime?: string;
  eventLocationName: string;
  eventAddress: string;

  // Ubicación
  locationTitle?: string;
  locationAddress?: string;

  // Google Maps
  googleMapsEmbedUrl?: string;
  googleMapsPlaceUrl?: string;

  // Footer
  footerText?: string;

  // Código de vestimenta
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeImagePath?: string;
  dressCodeDetails?: string;

  // Música de fondo
  musicUrl?: string;

  // Agradecimientos
  acknowledgementsTitle: string;
  acknowledgements: string[];
  specialAcknowledgements?: Array<{ text: string; images?: string[] }>;

  // Personalización visual
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;

  // Tipografía
  headingFont?: string;
  bodyFont?: string;
  decorativeFont?: string;

  // Mensajes
  countdownExpiredMessage?: string;
  rsvpSuccessMessage?: string;

  // Número destacado
  featuredNumber?: string;

  // Efectos visuales
  enableParticles?: boolean;
  enablePetals?: boolean;
  enableGlitter?: boolean;

  // Imágenes
  heroImageUrl?: string;
  galleryImages?: string[];

  // Elementos visuales por sector
  elements?: {
    hero?: {
      showFlowerTopLeft?: boolean;
      showFlowerBottomLeft?: boolean;
      showFlowerTopRight?: boolean;
      showGoldenFrame?: boolean;
      showGoldenDivider?: boolean;
      showBubbles?: boolean;
    };
  };

  // Visibilidad de secciones
  showHero?: boolean;
  showCountdown?: boolean;
  showAcknowledgements?: boolean;
  showDressCode?: boolean;
  showLocation?: boolean;
  showRsvp?: boolean;
  showFooter?: boolean;
}

export function parseConfigFromEvento(evento: any): InvitacionConfig {
  let config: Partial<InvitacionConfig> = {};

  // Parse JSON configuracion if exists
  if (evento.configuracion) {
    try {
      config = JSON.parse(evento.configuracion);
    } catch (e) {
      console.error('Error parsing configuracion:', e);
    }
  }

  // Merge with evento data
  const eventDate = new Date(evento.fechaEvento);
  // horaEvento puede venir como "HH:mm" string o como objeto TimeSpan
  let hours = 0, minutes = 0;
  if (typeof evento.horaEvento === 'string') {
    const parts = evento.horaEvento.split(':');
    hours = parseInt(parts[0]) || 0;
    minutes = parseInt(parts[1]) || 0;
  } else if (evento.horaEvento?.hours !== undefined) {
    hours = evento.horaEvento.hours;
    minutes = evento.horaEvento.minutes || 0;
  }
  eventDate.setHours(hours, minutes);

  return {
    honoreeName: config.honoreeName || evento.titulo,
    eventTitle: config.eventTitle || evento.titulo,
    eventDateTime: eventDate.toISOString(),
    rsvpDeadlineDateTime: config.rsvpDeadlineDateTime,
    eventLocationName: evento.ubicacion,
    eventAddress: evento.direccionMap || evento.ubicacion,
    locationTitle: config.locationTitle || 'Ubicación',
    locationAddress: config.locationAddress || evento.direccionMap || evento.ubicacion,
    googleMapsEmbedUrl: config.googleMapsEmbedUrl || config.googleMapsUrl || evento.googleMapsUrl,
    googleMapsPlaceUrl: config.googleMapsPlaceUrl || config.googleMapsUrl || evento.googleMapsUrl,
    footerText: config.footerText,
    dressCodeTitle: config.dressCodeTitle || 'Código de Vestimenta',
    dressCodeDescription: config.dressCodeDescription || '',
    dressCodeImagePath: config.dressCodeImagePath,
    musicUrl: config.musicUrl || '/audio/ambient.mp3',
    acknowledgementsTitle: config.acknowledgementsTitle || 'Agradecimientos',
    acknowledgements: config.acknowledgements || [],
    specialAcknowledgements: config.specialAcknowledgements,
    primaryColor: config.primaryColor,
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    headingFont: config.headingFont,
    bodyFont: config.bodyFont,
    decorativeFont: config.decorativeFont,
    countdownExpiredMessage: config.countdownExpiredMessage || '¡El gran día ha llegado!',
    rsvpSuccessMessage: config.rsvpSuccessMessage || '¡Gracias por confirmar tu asistencia!',
    featuredNumber: config.featuredNumber,
    enableParticles: config.enableParticles !== false,
    enablePetals: config.enablePetals !== false,
    enableGlitter: config.enableGlitter !== false,
    heroImageUrl: config.heroImageUrl,
    galleryImages: config.galleryImages,
    // Visibilidad de secciones (por defecto true si no está definido)
    showHero: config.showHero !== false,
    showCountdown: config.showCountdown !== false,
    showAcknowledgements: config.showAcknowledgements !== false,
    showDressCode: config.showDressCode !== false,
    showLocation: config.showLocation !== false,
    showRsvp: config.showRsvp !== false,
    showFooter: config.showFooter !== false,
    elements: config.elements,
  };
}

