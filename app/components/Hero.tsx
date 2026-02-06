'use client'

import { motion } from 'framer-motion'
import { useInvitacionConfig } from '@/contexts/InvitacionConfigContext'
import MusicPlayer from './MusicPlayer'
import Image from 'next/image'
import { memo } from 'react'
import FloatingBubbles from './FloatingBubbles'
import GeometricBackground from './GeometricBackground'

function Hero() {
  const { config } = useInvitacionConfig()

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

  // Usar colores dinámicos si están disponibles
  const bgColor = config.backgroundColor || '#FAF7F2'
  const bgColor2 = config.backgroundColor || '#FFF9F0'
  
  // Función helper para estilos de texto dorado dinámico
  const getGoldenTextStyle = () => {
    if (config.primaryColor) {
      return {
        background: `linear-gradient(90deg, ${config.primaryColor} 0%, ${config.accentColor || config.primaryColor} 50%, ${config.primaryColor} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'shimmer 3s infinite',
      } as React.CSSProperties
    }
    return {}
  }
  
  return (
    <div 
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom, ${bgColor}, ${bgColor2}, ${bgColor})`
      }}
    >

      {/* Efecto de burbujas/humo etéreo de fondo */}
      <FloatingBubbles />

      {/* Fondo geométrico elegante */}
      <GeometricBackground variant="mixed" density="medium" />

      {/* FLORES ANIMADAS DE FONDO - Diseño Aesthetic Premium */}

      {/* Flor 1: Esquina superior izquierda - EXTRA GRANDE como marco decorativo */}
      <motion.div
        className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 md:-top-48 md:-left-48 lg:-top-56 lg:-left-56 pointer-events-none z-[30]"
        initial={{ opacity: 0, x: -150, y: -100, rotate: -20 }}
        animate={{
          opacity: 1,
          x: -20,
          y: 20,
          rotate: 0,
        }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          opacity: { duration: 0.8 }
        }}
      >
        <motion.div
          className="relative w-[470px] h-[470px] sm:w-[630px] sm:h-[630px] md:w-[850px] md:h-[850px] lg:w-[1050px] lg:h-[1050px]"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <Image
            src="/hero-flower-1.png"
            alt="Flor decorativa"
            fill
            className="object-contain"
            style={{
              opacity: 1,
              filter: 'drop-shadow(0 12px 35px rgba(0,0,0,0.12))',
              willChange: 'transform',
            }}
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Flor 2: Esquina inferior izquierda - Rama dorada elegante (volteada) */}
      <motion.div
        className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 md:-bottom-32 md:-left-32 lg:-bottom-40 lg:-left-40 pointer-events-none z-[30]"
        initial={{ opacity: 0, x: -120, y: 80, rotate: -18 }}
        animate={{
          opacity: 1,
          x: -30,
          y: 0,
          rotate: 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: 'easeOut',
          opacity: { duration: 0.8 }
        }}
      >
        <motion.div
          className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[580px] md:h-[580px] lg:w-[750px] lg:h-[750px]"
          animate={{
            y: [0, 18, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <Image
            src="/hero-flower-2.png"
            alt="Rama decorativa"
            fill
            className="object-contain transform scale-x-[-1]"
            style={{
              opacity: 1,
              filter: 'drop-shadow(0 10px 30px rgba(212,175,55,0.18))',
              willChange: 'transform',
            }}
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Flor 3: Esquina superior derecha - Composición floral aesthetic */}
      <motion.div
        className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 md:-top-40 md:-right-40 lg:-top-48 lg:-right-48 pointer-events-none z-[30]"
        initial={{ opacity: 0, x: 150, y: -80, rotate: 20, scale: 0.7 }}
        animate={{
          opacity: 1,
          x: 15,
          y: -80,
          rotate: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: 'easeOut',
          opacity: { duration: 0.8 }
        }}
      >
        <motion.div
          className="relative w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] md:w-[750px] md:h-[750px] lg:w-[900px] lg:h-[900px]"
          animate={{
            y: [0, -10, 0],
            rotate: [0, -3, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <Image
            src="/hero-flower-3.png"
            alt="Flores decorativas"
            fill
            className="object-contain"
            style={{
              opacity: 1,
              filter: 'drop-shadow(0 10px 28px rgba(212,175,55,0.12))',
              willChange: 'transform',
            }}
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Imagen division dorado */}
      <motion.div 
        className="absolute -bottom-16 sm:-bottom-20 middle-center w-64 sm:w-80 md:w-96 lg:w-[30rem] z-10 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
          ease: "easeOut"
        }}
      >
        <motion.div>
          <Image
            src="/golden-divider.png"
            alt=""
            width={320}
            height={320}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* Overlay sutil para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/20 z-[8]"></div>

      {/* Contenido principal - Capa superior con z-index alto */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="relative z-20 text-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 max-w-5xl mx-auto w-full"
      >
        {/* Marco dorado elegante con animación */}
        <motion.div
          className="absolute inset-4 sm:inset-6 md:inset-12 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Marco exterior dorado */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: config.primaryColor || '#FFD700', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: config.accentColor || config.primaryColor || '#D4AF37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: config.primaryColor || '#FFD700', stopOpacity: 0.8 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Marco rectangular con esquinas decorativas */}
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="url(#goldenGradient)"
              strokeWidth="3"
              filter="url(#glow)"
              rx="8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
            />

            {/* Línea interior para efecto doble marco */}
            <motion.rect
              x="8"
              y="8"
              width="calc(100% - 16px)"
              height="calc(100% - 16px)"
              fill="none"
              stroke="url(#goldenGradient)"
              strokeWidth="1.5"
              opacity="0.6"
              rx="6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
            />
          </svg>

          {/* Esquinas decorativas con detalles dorados */}
          {/* Esquina superior izquierda */}
          <motion.div
            className="absolute -top-1 -left-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 10 50 L 10 10 L 50 10"
                fill="none"
                stroke="url(#goldenGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="5" fill="#FFD700" opacity="0.8" />
              <path
                d="M 15 15 L 35 15 L 15 35 Z"
                fill="#D4AF37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Esquina superior derecha */}
          <motion.div
            className="absolute -top-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50 10 L 90 10 L 90 50"
                fill="none"
                stroke="url(#goldenGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="90" cy="10" r="5" fill="#FFD700" opacity="0.8" />
              <path
                d="M 85 15 L 65 15 L 85 35 Z"
                fill="#D4AF37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Esquina inferior izquierda */}
          <motion.div
            className="absolute -bottom-1 -left-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 10 50 L 10 90 L 50 90"
                fill="none"
                stroke="url(#goldenGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="10" cy="90" r="5" fill="#FFD700" opacity="0.8" />
              <path
                d="M 15 85 L 35 85 L 15 65 Z"
                fill="#D4AF37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Esquina inferior derecha */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50 90 L 90 90 L 90 50"
                fill="none"
                stroke="url(#goldenGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="90" cy="90" r="5" fill="#FFD700" opacity="0.8" />
              <path
                d="M 85 85 L 65 85 L 85 65 Z"
                fill="#D4AF37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Partículas doradas flotantes en las esquinas */}
          <motion.div
            className="absolute top-8 left-8 w-2 h-2 rounded-full bg-amber-400"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-8 right-8 w-2 h-2 rounded-full bg-amber-400"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-amber-400"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-amber-400"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        {/* Fondo sutil para el contenido dentro del marco */}
        <motion.div
          className="absolute inset-6 sm:inset-8 md:inset-12 lg:inset-16 bg-white/30 backdrop-blur-sm rounded-lg -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Título del evento - Serif elegante */}
        {(config.eventTitle || config.honoreeName) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-serif text-text-primary mb-6 sm:mb-8 tracking-wide"
          >
            {config.eventTitle || config.honoreeName}
          </motion.div>
        )}

        {/* Nombre de la homenajeada - Script elegante y grande con brillo dorado */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-script mb-8 sm:mb-10 md:mb-12 leading-tight relative px-2 ${!config.primaryColor ? 'golden-shine golden-glow' : ''}`}
          style={getGoldenTextStyle()}
        >
          {config.honoreeName}
        </motion.h1>

        {/* Subtítulo elegante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl font-serif text-text-secondary mb-8 sm:mb-10 md:mb-12 tracking-wide px-2"
        >
          {config.heroSubtitle || 'Acompáñanos a celebrar este día especial'}
        </motion.div>

        {/* Fecha - Diseño estructurado como en la referencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6 mb-6 sm:mb-8 px-2"
        >
          {/* Día - Número grande con brillo dorado */}
          <div 
            className={`text-4xl sm:text-5xl md:text-7xl font-serif font-bold ${!config.primaryColor ? 'golden-shine golden-glow' : ''}`}
            style={getGoldenTextStyle()}
          >
            {day}
          </div>

          {/* Separador vertical con brillo */}
          <div 
            className="h-12 sm:h-16 md:h-20 w-px bg-gradient-to-b from-transparent to-transparent"
            style={{
              background: `linear-gradient(to bottom, transparent, ${config.primaryColor || '#FCD34D'}40, transparent)`
            }}
          ></div>

          {/* Mes - Script elegante con brillo dorado */}
          <div 
            className={`text-3xl sm:text-4xl md:text-6xl font-script ${!config.primaryColor ? 'golden-shine golden-glow' : ''}`}
            style={getGoldenTextStyle()}
          >
            {month}
          </div>

          {/* Separador vertical con brillo */}
          <div 
            className="h-12 sm:h-16 md:h-20 w-px bg-gradient-to-b from-transparent to-transparent"
            style={{
              background: `linear-gradient(to bottom, transparent, ${config.primaryColor || '#FCD34D'}40, transparent)`
            }}
          ></div>

          {/* Año - Número grande con brillo dorado */}
          <div 
            className={`text-4xl sm:text-5xl md:text-7xl font-serif font-bold ${!config.primaryColor ? 'golden-shine golden-glow' : ''}`}
            style={getGoldenTextStyle()}
          >
            {year}
          </div>
        </motion.div>

        {/* Hora - Destacada y más grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-2 px-2"
        >
          <div 
            className={`text-2xl sm:text-3xl md:text-5xl font-serif font-semibold mb-2 ${!config.primaryColor ? 'golden-shine golden-glow' : ''}`}
            style={getGoldenTextStyle()}
          >
            {hours}:{minutes} HS.
          </div>
          <div className="text-sm sm:text-base md:text-lg font-sans text-text-secondary">
            {config.eventLocationName}
          </div>
          <div className="text-xs sm:text-sm md:text-base font-sans text-text-secondary">
            {config.eventAddress}
          </div>
        </motion.div>
      </motion.div>

      {/* Reproductor de música */}
      <MusicPlayer musicUrl={config.musicUrl} />
    </div>
  )
}

// React.memo para optimización (OPTIMIZACIÓN ChatGPT #2)
export default memo(Hero)

