// lib/api/evento.ts - API client para obtener configuración del evento
import { InvitacionConfig } from '@/types/config';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5137/api';

export interface EventoPublicConfig {
  id: number;
  titulo: string;
  descripcion?: string;
  fechaEvento: string;
  horaEvento: string;
  ubicacion: string;
  direccionMap?: string;
  googleMapsUrl?: string;
  slug: string;
  plantillaId: number;
  plantillaNombre?: string;
  configuracion?: string; // JSON string
  isPublic: boolean;
}

export async function getEventoBySlug(slug: string): Promise<EventoPublicConfig | null> {
  try {
    const response = await fetch(`${API_URL}/eventos/public/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching evento:', error);
    return null;
  }
}

export function parseConfigFromEvento(evento: EventoPublicConfig): InvitacionConfig {
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
  // Usar eventDateTime del config si está disponible, sino construir desde fechaEvento y horaEvento
  let eventDateTime: string;
  if (config.eventDateTime) {
    eventDateTime = config.eventDateTime;
  } else {
    const eventDate = new Date(evento.fechaEvento);
    // horaEvento puede venir como "HH:mm" string o como objeto TimeSpan
    let hours = 0, minutes = 0;
    if (typeof evento.horaEvento === 'string') {
      const parts = evento.horaEvento.split(':');
      hours = parseInt(parts[0]) || 0;
      minutes = parseInt(parts[1]) || 0;
    } else if (evento.horaEvento && typeof evento.horaEvento === 'object' && 'hours' in evento.horaEvento) {
      hours = (evento.horaEvento as any).hours;
      minutes = (evento.horaEvento as any).minutes || 0;
    }
    eventDate.setHours(hours, minutes);
    eventDateTime = eventDate.toISOString();
  }
  
  return {
    honoreeName: config.honoreeName || evento.titulo,
    eventTitle: config.eventTitle || evento.titulo,
    heroSubtitle: config.heroSubtitle || 'Acompáñanos a celebrar este día especial',
    eventDateTime: eventDateTime,
    rsvpDeadlineDateTime: config.rsvpDeadlineDateTime,
    eventLocationName: config.eventLocationName || evento.ubicacion,
    eventAddress: config.locationAddress || evento.direccionMap || evento.ubicacion,
    locationTitle: config.locationTitle || 'Ubicación',
    locationAddress: config.locationAddress || evento.direccionMap || evento.ubicacion,
    googleMapsEmbedUrl: config.googleMapsEmbedUrl || evento.googleMapsUrl,
    googleMapsPlaceUrl: config.googleMapsPlaceUrl || evento.googleMapsUrl,
    footerText: config.footerText,
    dressCodeTitle: config.dressCodeTitle || 'Código de Vestimenta',
    dressCodeDescription: config.dressCodeDescription || '',
    dressCodeImagePath: config.dressCodeImagePath,
    dressCodeDetails: config.dressCodeDetails,
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
    // Visibilidad de secciones - usar el valor explícito del config, o true por defecto si no está definido
    showHero: config.showHero !== undefined ? config.showHero : true,
    showCountdown: config.showCountdown !== undefined ? config.showCountdown : true,
    showAcknowledgements: config.showAcknowledgements !== undefined ? config.showAcknowledgements : true,
    showDressCode: config.showDressCode !== undefined ? config.showDressCode : true,
    showLocation: config.showLocation !== undefined ? config.showLocation : true,
    showRsvp: config.showRsvp !== undefined ? config.showRsvp : true,
    showFooter: config.showFooter !== undefined ? config.showFooter : true,
  };
}

