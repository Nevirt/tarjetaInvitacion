// app/[slug]/page.tsx - Routing dinámico para eventos
'use client';

import { useEventoConfig } from '@/hooks/useEventoConfig';
import { InvitacionConfig } from '@/types/config';
import Plantilla1 from '@/templates/plantilla-1';

export default function EventoPage({ params }: { params: { slug: string } }) {
  const { config, loading, error } = useEventoConfig(params.slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FAF7F2] via-[#FFF9F0] to-[#FAF7F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FAF7F2] via-[#FFF9F0] to-[#FAF7F2]">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-serif text-gray-800 mb-4">Invitación no encontrada</h1>
          <p className="text-gray-600">{error || 'El evento que buscas no existe o es privado.'}</p>
        </div>
      </div>
    );
  }

  // Por ahora, todas las plantillas usan Plantilla1
  // En el futuro, aquí se puede hacer un switch basado en plantillaId
  return <Plantilla1 config={config as InvitacionConfig & { id: number }} />;
}

