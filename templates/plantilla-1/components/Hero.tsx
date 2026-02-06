// templates/plantilla-1/components/Hero.tsx - Wrapper que acepta config
'use client';

import dynamic from 'next/dynamic';
import { InvitacionConfig } from '@/types/config';

// Importar el componente original
const OriginalHero = dynamic(() => import('@/app/components/Hero'), { ssr: false });

interface HeroProps {
  config: InvitacionConfig;
}

export default function Hero({ config }: HeroProps) {
  // Inyectar config en el contexto o pasar como prop si el componente lo acepta
  // Por ahora, vamos a crear una versión que use config directamente
  return <OriginalHero />;
}
