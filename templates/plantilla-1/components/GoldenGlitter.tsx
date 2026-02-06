'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

interface GlitterParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

function GoldenGlitterComponent() {
  const [particles, setParticles] = useState<GlitterParticle[]>([])

  useEffect(() => {
    // Detectar móviles para reducir carga (OPTIMIZACIÓN ChatGPT #6)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const particleCount = isMobile ? 6 : 10 // 40% menos en móvil
    
    // Crear partículas de brillo dorado
    const newParticles: GlitterParticle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Posición X aleatoria
      y: Math.random() * 100, // Posición Y aleatoria
      delay: Math.random() * 3, // Delay aleatorio
      duration: 2 + Math.random() * 2, // Duración entre 2-4 segundos
      size: 6 + Math.random() * 10, // Tamaño entre 6-16px (más grandes)
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      {particles.map((particle) => {
        // Variaciones de formas de brillo
        const glitterTypes = [
          // Estrella de 8 puntas
          <path
            key="star8"
            d="M50,10 L55,35 L80,35 L60,50 L65,75 L50,60 L35,75 L40,50 L20,35 L45,35 Z"
            fill={`url(#glitterGradient-${particle.id})`}
            opacity="0.9"
          />,
          // Estrella de 6 puntas
          <path
            key="star6"
            d="M50,5 L55,30 L80,30 L60,45 L70,70 L50,55 L30,70 L40,45 L20,30 L45,30 Z"
            fill={`url(#glitterGradient-${particle.id})`}
            opacity="0.85"
          />,
          // Cruz brillante
          <g key="cross">
            <rect x="40" y="20" width="20" height="60" rx="5" fill={`url(#glitterGradient-${particle.id})`} opacity="0.8" />
            <rect x="20" y="40" width="60" height="20" rx="5" fill={`url(#glitterGradient-${particle.id})`} opacity="0.8" />
          </g>,
        ]
        const selectedGlitter = glitterTypes[particle.id % glitterTypes.length]
        
        return (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.9, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.95, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              marginLeft: `-${particle.size / 2}px`,
              marginTop: `-${particle.size / 2}px`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)', // GPU acceleration (OPTIMIZACIÓN ChatGPT #7)
            }}
          >
            {/* Partícula de brillo dorado */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.7))' }} // Reducir drop-shadow múltiple (OPTIMIZACIÓN ChatGPT #3)
            >
              <defs>
                <radialGradient id={`glitterGradient-${particle.id}`}>
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </radialGradient>
              </defs>
              {selectedGlitter}
              {/* Círculo central brillante */}
              <circle
                cx="50"
                cy="50"
                r="12"
                fill="#FFD700"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}

// React.memo para evitar re-renders innecesarios (OPTIMIZACIÓN ChatGPT #2)
export default memo(GoldenGlitterComponent)

