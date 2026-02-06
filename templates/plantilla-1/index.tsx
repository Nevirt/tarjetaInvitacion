// templates/plantilla-1/index.tsx - Plantilla base con Context Provider
'use client';

import { InvitacionConfig } from '@/types/config';
import { InvitacionConfigProvider } from '@/contexts/InvitacionConfigContext';

// Importar componentes originales
import Hero from '@/app/components/Hero';
import Countdown from '@/app/components/Countdown';
import Acknowledgements from '@/app/components/Acknowledgements';
import DressCode from '@/app/components/DressCode';
import LocationSection from '@/app/components/LocationSection';
import RsvpSection from '@/app/components/RsvpSection';
import Footer from '@/app/components/Footer';
import FloatingPetals from '@/app/components/FloatingPetals';
import GoldenGlitter from '@/app/components/GoldenGlitter';
import FloatingParticles from '@/app/components/FloatingParticles';

interface Plantilla1Props {
  config: InvitacionConfig & { id: number };
}

export default function Plantilla1({ config }: Plantilla1Props) {
  return (
    <InvitacionConfigProvider config={config}>
      <main className="min-h-screen overflow-x-hidden">
        {/* Efectos decorativos globales */}
        {config.enablePetals && <FloatingPetals />}
        {config.enableGlitter && <GoldenGlitter />}
        {config.enableParticles && <FloatingParticles />}

        {/* Secciones condicionales basadas en configuración */}
        {config.showHero === true && <Hero />}
        {config.showCountdown === true && <Countdown />}
        {config.showAcknowledgements === true && <Acknowledgements />}
        {config.showDressCode === true && <DressCode />}
        {config.showLocation === true && <LocationSection />}
        {config.showRsvp === true && <RsvpSection eventoId={config.id} />}
        {config.showFooter === true && <Footer />}
      </main>
    </InvitacionConfigProvider>
  );
}
