'use client'

import { motion } from 'framer-motion'
import { invitacionConfig } from '../config/invitacion'
import { useState, useEffect } from 'react'
import GeometricBackground from './GeometricBackground'

interface FloatingElement {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  emoji: string
}

export default function Footer() {
  const config = invitacionConfig
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 3,
      size: 18 + Math.random() * 22,
      emoji: '', // No longer needed
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <footer className="relative bg-gradient-to-b from-white/50 via-[#F5F1E8]/50 to-[#EDE7DC]/70 py-12 md:py-16 overflow-hidden">
      <GeometricBackground variant="gold" density="medium" />
      {/* Floating geometric shapes decorative */}
      {floatingElements.map((element, index) => {
        const shapeType = index % 3
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
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
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
              // Star outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />
              </svg>
            )}
            {shapeType === 1 && (
              // Circle filled
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="35" fill="#FFD700" opacity="0.3" />
              </svg>
            )}
            {shapeType === 2 && (
              // Pentagon outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 95,40 75,95 25,95 5,40" fill="none" stroke="#F0E6D2" strokeWidth="2.5" opacity="0.4" />
              </svg>
            )}
          </motion.div>
        )
      })}

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Main decorative card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-white/90 via-[#FFF9F0]/90 to-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border-2 border-[#D4AF37]/20 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="#D4AF37">
                  <path d="M0,0 L30,0 L0,30 Z" />
                  <circle cx="15" cy="15" r="8" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="#8B7355">
                  <path d="M100,100 L70,100 L100,70 Z" />
                  <circle cx="85" cy="85" r="8" />
                </svg>
              </div>

              <div className="relative z-10 text-center space-y-6">
                {/* Animated heart icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>

                {/* Main message */}
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-script text-[#6B5644]">
                    {config.honoreeName}
                  </h3>
                  <p className="text-text-primary font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Gracias por acompañarme en este día tan especial
                  </p>
                  
                  {/* Decorative divider */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full mx-auto"
                    style={{ width: '40%' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </div>

                {/* Event info badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <motion.div
                    className="inline-flex items-center gap-2 bg-[#FFE5B4]/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-[#D4AF37]/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span className="font-sans text-sm text-text-primary">
                      {new Date(config.eventDateTime).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric' 
                      })}
                    </span>
                  </motion.div>

                  <motion.div
                    className="inline-flex items-center gap-2 bg-[#F5F1E8]/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-[#8B7355]/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#8B7355">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-sans text-sm text-text-primary">
                      {config.eventLocationName}
                    </span>
                  </motion.div>

                  <motion.div
                    className="inline-flex items-center gap-2 bg-[#FFD7D7]/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-pink-300/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFB6C1">
                      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                    </svg>
                    <span className="font-sans text-sm text-text-primary">
                      {config.eventTitle}
                    </span>
                  </motion.div>
                </div>

                {/* Social/Share message */}
                <div className="pt-6">
                  <p className="text-text-secondary font-sans text-sm md:text-base italic">
                    Un momento que quedará en nuestros corazones para siempre
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom section */}
          <div className="space-y-4">
            {/* Decorative geometric shapes row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-6"
            >
              <motion.div
                className="w-10 h-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" fill="#D4AF37" />
                </svg>
              </motion.div>
              <motion.div
                className="w-10 h-10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFD700">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>
              <motion.div
                className="w-10 h-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="#FFB6C1" />
                  <circle cx="50" cy="50" r="25" fill="white" opacity="0.5" />
                </svg>
              </motion.div>
              <motion.div
                className="w-10 h-10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,10 90,90 10,90" fill="#F0E6D2" />
                </svg>
              </motion.div>
              <motion.div
                className="w-10 h-10"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="25" y="25" width="50" height="50" fill="none" stroke="#D4AF37" strokeWidth="4" transform="rotate(45 50 50)" />
                  <circle cx="50" cy="50" r="8" fill="#FFD700" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Copyright and credits */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-2"
            >
              <p className="text-text-secondary font-sans text-sm">
                © {currentYear} • {config.honoreeName}
              </p>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p className="text-text-secondary/60 font-sans text-xs">
                  Hecho con amor y dedicación
                </p>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </motion.div>

            {/* Final decorative divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent max-w-md mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
    </footer>
  )
}

