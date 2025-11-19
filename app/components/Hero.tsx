'use client'

import { motion } from 'framer-motion'
import { invitacionConfig } from '../config/invitacion'
import MusicPlayer from './MusicPlayer'

export default function Hero() {
  const config = invitacionConfig
  
  // Formatear fecha y hora
  const eventDate = new Date(config.eventDateTime)
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  
  const dayName = dayNames[eventDate.getDay()]
  const day = eventDate.getDate()
  const month = monthNames[eventDate.getMonth()]
  const year = eventDate.getFullYear()
  const hours = eventDate.getHours().toString().padStart(2, '0')
  const minutes = eventDate.getMinutes().toString().padStart(2, '0')

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo decorativa */}
      {/* 
        INSTRUCCIONES: Coloca tu imagen de fondo decorativa en /public/
        con el nombre: hero-background.png (o el nombre que prefieras)
      */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay sutil para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Contenido principal - Capa superior con z-index alto */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 text-center px-4 py-20 max-w-5xl mx-auto"
      >
        {/* Título del evento - Serif elegante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl md:text-3xl font-serif text-text-primary mb-8 tracking-wide"
        >
          {config.eventTitle}
        </motion.div>

        {/* Nombre de la homenajeada - Script elegante y grande con brillo dorado */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl md:text-8xl lg:text-9xl font-script mb-12 leading-tight golden-shine golden-glow relative"
        >
          {config.honoreeName}
        </motion.h1>

        {/* Subtítulo elegante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl font-serif text-text-secondary mb-12 tracking-wide"
        >
          Acompáñanos a celebrar este día especial
        </motion.div>

        {/* Fecha - Diseño estructurado como en la referencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-8"
        >
          {/* Día - Número grande con brillo dorado */}
          <div className="text-5xl md:text-7xl font-serif font-bold golden-shine golden-glow">
            {day}
          </div>
          
          {/* Separador vertical con brillo */}
          <div className="h-16 md:h-20 w-px bg-gradient-to-b from-transparent via-amber-300/40 to-transparent"></div>
          
          {/* Mes - Script elegante con brillo dorado */}
          <div className="text-4xl md:text-6xl font-script golden-shine golden-glow">
            {month}
          </div>
          
          {/* Separador vertical con brillo */}
          <div className="h-16 md:h-20 w-px bg-gradient-to-b from-transparent via-amber-300/40 to-transparent"></div>
          
          {/* Año - Número grande con brillo dorado */}
          <div className="text-5xl md:text-7xl font-serif font-bold golden-shine golden-glow">
            {year}
          </div>
        </motion.div>

        {/* Hora - Destacada y más grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="text-3xl md:text-5xl font-serif font-semibold mb-2 golden-shine golden-glow">
            {hours}:{minutes} HS.
          </div>
          <div className="text-base md:text-lg font-sans text-text-secondary">
            {config.eventLocationName}
          </div>
          <div className="text-sm md:text-base font-sans text-text-secondary">
            {config.eventAddress}
          </div>
        </motion.div>
      </motion.div>

      {/* Reproductor de música */}
      <MusicPlayer musicUrl={config.musicUrl} />
    </div>
  )
}

