import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Acknowledgements from './components/Acknowledgements'
import DressCode from './components/DressCode'
import LocationSection from './components/LocationSection'
import RsvpSection from './components/RsvpSection'
import Footer from './components/Footer'
import FloatingPetals from './components/FloatingPetals'
import GoldenGlitter from './components/GoldenGlitter'
import FloatingParticles from './components/FloatingParticles'

/**
 * PÁGINA PRINCIPAL DE LA INVITACIÓN
 * 
 * Esta página compone todas las secciones leyendo la configuración
 * desde app/config/invitacion.ts
 * 
 * Para personalizar el contenido, edita solo el archivo de configuración.
 */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Efectos decorativos globales - fuera del Hero para que funcionen correctamente */}
      <FloatingPetals />
      <GoldenGlitter />
      <FloatingParticles />
      
      <Hero />
      <Countdown />
      <Acknowledgements />
      <DressCode />
      <LocationSection />
      <RsvpSection />
      <Footer />
    </main>
  )
}

