'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { invitacionConfig } from '../config/invitacion'
import Section from './Section'
import Image from 'next/image'
import GeometricBackground from './GeometricBackground'

interface FloatingElement {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  rotation: number
}

export default function DressCode() {
  const config = invitacionConfig
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const elements: FloatingElement[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 10 + Math.random() * 18,
      rotation: Math.random() * 360,
    }))
    setFloatingElements(elements)
  }, [])

  // Parse descripción en puntos
  const descriptionPoints = config.dressCodeDescription
    .split('.')
    .filter(point => point.trim().length > 0)
    .map(point => point.trim())

  const mainDescription = descriptionPoints[0] || config.dressCodeDescription
  const detailedPoints = descriptionPoints.slice(1)

  return (
    <Section id="dresscode" className="bg-gradient-to-b from-white/60 via-[#FFF9F0]/50 to-white/60 py-16 md:py-24 relative overflow-hidden">
      <GeometricBackground variant="mixed" density="medium" />
      
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
      {floatingElements.map((element, index) => {
        const shapeType = index % 4
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
              y: [0, -30, 0],
              opacity: [0, 0.4, 0],
              rotate: [element.rotation, element.rotation + 180, element.rotation + 360],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {shapeType === 0 && (
              // Circle with gradient fill
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="url(#goldGradient)" opacity="0.6" />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {shapeType === 1 && (
              // Triangle outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,10 90,85 10,85" fill="none" stroke="#D4AF37" strokeWidth="3" opacity="0.5" />
              </svg>
            )}
            {shapeType === 2 && (
              // Star filled
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50,15 L61,40 L88,45 L69,63 L73,90 L50,77 L27,90 L31,63 L12,45 L39,40 Z" fill="#FFD700" opacity="0.4" />
              </svg>
            )}
            {shapeType === 3 && (
              // Square/Diamond outline
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="25" y="25" width="50" height="50" fill="none" stroke="#F0E6D2" strokeWidth="3" opacity="0.5" transform="rotate(45 50 50)" />
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
          {config.dressCodeTitle}
        </motion.h2>

        {/* Main Content - Scrapbook Style */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
          {/* Image Section - Polaroid Style */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            {/* Main polaroid frame */}
            <motion.div
              className="relative bg-white p-4 md:p-6 rounded-lg shadow-2xl"
              style={{ rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative geometric element at top */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-12 z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <ellipse cx="50" cy="30" rx="45" ry="25" fill="#8B7355" opacity="0.2" />
                  <rect x="35" y="20" width="30" height="40" rx="5" fill="#8B7355" opacity="0.8" />
                  <rect x="40" y="25" width="20" height="30" rx="3" fill="#A0826D" />
                  <circle cx="50" cy="35" r="3" fill="white" opacity="0.6" />
                </svg>
              </div>

              {/* Image */}
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] bg-gray-100 rounded overflow-hidden">
                <Image
                  src={config.dressCodeImagePath}
                  alt="Código de vestimenta"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>

              {/* Polaroid caption */}
              <div className="mt-4 text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,18 L6,21 L7,14 L2,9 L9,8 Z" />
                </svg>
                <p className="font-handwriting text-lg md:text-xl text-gray-700">
                  Dress Code
                </p>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,18 L6,21 L7,14 L2,9 L9,8 Z" />
                </svg>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-4 top-1/4 w-20 h-20 opacity-60"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="#D4AF37">
                  <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Scattered decorative photos effect */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-40 bg-gradient-to-br from-[#FFE5B4]/60 to-[#FFD700]/60 rounded-lg shadow-lg border-4 border-white -z-10"
              style={{ rotate: 12 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-32 bg-gradient-to-br from-[#F5F1E8]/60 to-[#EDE7DC]/60 rounded-lg shadow-lg border-4 border-white -z-10"
              style={{ rotate: -15 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            />
          </motion.div>

          {/* Text Section - Sticky Notes Style */}
          <div className="flex-1 space-y-6">
            {/* Main description card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-[#FFE5B4]/90 via-white/95 to-[#FFD700]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#D4AF37]/30"
                style={{ rotate: 1 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative pin */}
                <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] shadow-lg border-2 border-white" />
                
                <p className="text-text-primary font-sans text-lg md:text-xl leading-relaxed mb-4">
                  {mainDescription}
                </p>

                {/* Expand button */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-[#8B7355] font-semibold hover:text-[#6B5644] transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span>{isExpanded ? 'Ver menos' : 'Ver más detalles'}</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Detailed points - Sticky notes */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {detailedPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <motion.div
                        className="bg-gradient-to-br from-white/95 to-[#F5F1E8]/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-[#D4C5B0]/40"
                        style={{ rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                        whileHover={{ rotate: 0, x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Decorative tape */}
                        <div
                          className="absolute -top-2 right-8 w-16 h-6 bg-[#F0E6D2]/80 opacity-70 shadow-sm"
                          style={{
                            rotate: `${-8 + index * 3}deg`,
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)'
                          }}
                        />

                        <div className="flex items-start gap-3">
                          {/* Bullet point decorative */}
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-md">
                            <svg className="w-4 h-4" fill="white" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          
                          <p className="text-text-primary font-sans text-base md:text-lg leading-relaxed flex-1">
                            {point}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Decorative quote card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: detailedPoints.length * 0.1 + 0.2 }}
                    className="relative mt-8"
                  >
                    <motion.div
                      className="bg-gradient-to-br from-[#8B7355]/20 to-[#A0826D]/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-[#8B7355]/30"
                      style={{ rotate: -1 }}
                      whileHover={{ rotate: 0 }}
                    >
                      <div className="flex items-start gap-4">
                        <svg className="w-8 h-8 text-[#D4AF37] flex-shrink-0 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-[#6B5644] font-serif text-base md:text-lg italic leading-relaxed">
                          Tu elegancia y estilo harán de este día un momento aún más especial.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-[#D4AF37]/30">
            <motion.div
              className="w-6 h-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="#D4AF37">
                <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,18 L6,21 L7,14 L2,9 L9,8 Z" />
              </svg>
            </motion.div>
            <span className="font-serif text-text-primary text-sm md:text-base">
              Esperamos verte con tu mejor atuendo
            </span>
            <motion.div
              className="w-6 h-6"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="#D4AF37">
                <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,18 L6,21 L7,14 L2,9 L9,8 Z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

