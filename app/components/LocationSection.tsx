'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { invitacionConfig } from '../config/invitacion'
import Section from './Section'
import GeometricBackground from './GeometricBackground'

interface FloatingIcon {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  icon: string
  size: number
}

export default function LocationSection() {
  const config = invitacionConfig
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])
  const [isHoveringMap, setIsHoveringMap] = useState(false)

  useEffect(() => {
    const elements: FloatingIcon[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 4,
      icon: '', // No longer needed
      size: 22 + Math.random() * 28,
    }))
    setFloatingIcons(elements)
  }, [])

  // Parse fecha y hora del evento
  const eventDate = new Date(config.eventDateTime)
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Section id="location" className="bg-gradient-to-b from-white/50 via-[#FFF5E8]/40 to-white/50 py-16 md:py-24 relative overflow-hidden">
      <GeometricBackground variant="sepia" density="medium" />
      
      {/* Imagen decorativa esquina superior izquierda */}
      <motion.div 
        className="absolute -top-6 left-0 w-60 md:w-64 lg:w-80 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      >
        <motion.div
          style={{ transformOrigin: "top left" }}
          animate={{ 
            rotate: [0, 3, 0],
            y: [0, 2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/floral-branch.png"
            alt=""
            width={320}
            height={320}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
      
      {/* Imagen decorativa esquina superior derecha (volteada) */}
      <motion.div 
        className="absolute -top-6 right-0 w-60 md:w-64 lg:w-80 z-10 pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      >
        <motion.div
          style={{ transformOrigin: "top right" }}
          animate={{ 
            rotate: [0, -3, 0],
            y: [0, 2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Image
            src="/floral-branch.png"
            alt=""
            width={320}
            height={320}
            className="w-full h-auto transform scale-x-[-1]"
          />
        </motion.div>
      </motion.div>
      
      {/* Floating geometric shapes decorative */}
      {floatingIcons.map((element, index) => {
        const shapeType = index % 5
        return (
          <motion.div
            key={element.id}
            className="absolute pointer-events-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.35, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {shapeType === 0 && (
              // Location pin shape
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="#D4AF37" opacity="0.4">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            )}
            {shapeType === 1 && (
              // Hexagon outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.4" />
              </svg>
            )}
            {shapeType === 2 && (
              // Circle with center dot
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="3" opacity="0.3" />
                <circle cx="50" cy="50" r="10" fill="#FFD700" opacity="0.5" />
              </svg>
            )}
            {shapeType === 3 && (
              // Triangle filled
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,10 90,90 10,90" fill="#F0E6D2" opacity="0.4" />
              </svg>
            )}
            {shapeType === 4 && (
              // Star outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.4" />
              </svg>
            )}
          </motion.div>
        )
      })}

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-text-primary text-center mb-12 md:mb-16"
        >
          Ubicación
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Information Cards Section */}
          <div className="space-y-6">
            {/* Venue Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-[#FFE5B4]/90 via-white/95 to-[#FFD700]/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#D4AF37]/30 relative overflow-hidden"
                style={{ rotate: -1 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative corner stamp */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                  <svg viewBox="0 0 100 100" fill="#D4AF37">
                    <circle cx="50" cy="50" r="45" />
                    <circle cx="50" cy="50" r="35" fill="white" />
                    <path d="M50,25 L55,40 L70,45 L57,57 L60,72 L50,65 L40,72 L43,57 L30,45 L45,40 Z" fill="#D4AF37" />
                  </svg>
                </div>

                {/* Pin decoration */}
                <div className="absolute -top-3 left-12 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#A0826D] shadow-lg border-2 border-white flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-script text-[#6B5644] mb-2">
                        {config.eventLocationName}
                      </h3>
                      <p className="text-text-primary font-sans text-base md:text-lg leading-relaxed">
                        {config.eventAddress}
                      </p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full my-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />

                  {/* Date and Time Info */}
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary font-sans uppercase tracking-wide">Fecha</p>
                        <p className="text-text-primary font-serif text-sm md:text-base capitalize">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary font-sans uppercase tracking-wide">Hora</p>
                        <p className="text-text-primary font-serif text-sm md:text-base">
                          {formattedTime} hrs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Google Maps Button Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <motion.a
                href={config.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-[#8B7355]/90 via-[#A0826D]/90 to-[#8B7355]/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#6B5644]/40 relative overflow-hidden group"
                  style={{ rotate: 1 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-serif text-xl md:text-2xl mb-1 group-hover:translate-x-2 transition-transform">
                        Abrir en Google Maps
                      </p>
                      <p className="text-white/80 font-sans text-sm">
                        Obtén direcciones para llegar
                      </p>
                    </div>
                    <motion.svg
                      className="w-6 h-6 text-white flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Decorative Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-[#F5F1E8]/80 to-[#EDE7DC]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4C5B0]/50"
                style={{ rotate: -0.5 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative tape */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#FFE5B4]/70 opacity-80 shadow-sm"
                  style={{
                    rotate: '-5deg',
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)'
                  }}
                />

                <div className="flex items-center gap-3 relative z-10">
                  <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#D4AF37">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <p className="text-[#6B5644] font-sans text-sm md:text-base italic">
                    ¡Nos encantaría contar contigo en este día tan especial!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section - Polaroid Style */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative order-first lg:order-last"
            onHoverStart={() => setIsHoveringMap(true)}
            onHoverEnd={() => setIsHoveringMap(false)}
          >
            {/* Polaroid frame */}
            <motion.div
              className="relative bg-white p-4 md:p-6 rounded-lg shadow-2xl"
              style={{ rotate: 2 }}
              animate={{
                rotate: isHoveringMap ? 0 : 2,
                scale: isHoveringMap ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative clips */}
              <div className="absolute -top-5 left-12 w-12 h-10 z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#D4AF37">
                  <ellipse cx="50" cy="25" rx="40" ry="20" opacity="0.3" />
                  <rect x="30" y="15" width="40" height="45" rx="8" />
                  <rect x="35" y="20" width="30" height="35" rx="5" fill="#FFD700" />
                </svg>
              </div>

              <div className="absolute -top-5 right-12 w-12 h-10 z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#8B7355">
                  <ellipse cx="50" cy="25" rx="40" ry="20" opacity="0.3" />
                  <rect x="30" y="15" width="40" height="45" rx="8" />
                  <rect x="35" y="20" width="30" height="35" rx="5" fill="#A0826D" />
                </svg>
              </div>

              {/* Map */}
              <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded overflow-hidden shadow-inner">
                <iframe
                  src={config.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Polaroid caption */}
              <div className="mt-4 text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p className="font-handwriting text-lg md:text-xl text-gray-700">
                  Te esperamos aquí
                </p>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,18 L6,21 L7,14 L2,9 L9,8 Z" />
                </svg>
              </div>

              {/* Decorative elements around polaroid */}
              <motion.div
                className="absolute -right-6 top-1/3 w-24 h-24 opacity-50"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#FFD700">
                  <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-1/4 w-16 h-16 opacity-50"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#D4AF37">
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="25" fill="white" />
                  <circle cx="50" cy="50" r="15" fill="#FFD700" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Scattered decorative cards effect */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-40 h-48 bg-gradient-to-br from-[#FFE5B4]/50 to-[#FFD700]/50 rounded-lg shadow-lg border-4 border-white -z-10"
              style={{ rotate: -12 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-40 bg-gradient-to-br from-[#F5F1E8]/50 to-[#EDE7DC]/50 rounded-lg shadow-lg border-4 border-white -z-10"
              style={{ rotate: 15 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

