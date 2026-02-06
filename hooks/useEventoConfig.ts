// hooks/useEventoConfig.ts - Hook para obtener configuración del evento
'use client';

import { useState, useEffect } from 'react';
import { getEventoBySlug, parseConfigFromEvento } from '@/lib/api/evento';
import { InvitacionConfig } from '@/types/config';

export function useEventoConfig(slug: string) {
  const [config, setConfig] = useState<(InvitacionConfig & { id: number }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const evento = await getEventoBySlug(slug);
        if (!evento) {
          setError('Evento no encontrado');
          setLoading(false);
          return;
        }
        
        if (!evento.isPublic) {
          setError('Este evento es privado');
          setLoading(false);
          return;
        }
        
        const parsedConfig = parseConfigFromEvento(evento);
        setConfig({ ...parsedConfig, id: evento.id });
      } catch (err) {
        setError('Error al cargar la invitación');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      loadConfig();
    }
  }, [slug]);

  return { config, loading, error };
}

