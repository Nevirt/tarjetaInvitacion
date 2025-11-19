'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  type: 'golden' | 'rose' | 'pearl' | 'sparkle'
  direction: number
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Crear partículas decorativas variadas
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => {
      const types: ('golden' | 'rose' | 'pearl' | 'sparkle')[] = ['golden', 'rose', 'pearl', 'sparkle']
      return {
        id: i,
        x: Math.random() * 100, // Posición inicial X aleatoria
        y: Math.random() * 100, // Posición inicial Y aleatoria
        delay: Math.random() * 5, // Delay aleatorio
        duration: 8 + Math.random() * 12, // Duración entre 8-20 segundos
        size: 5 + Math.random() * 12, // Tamaño entre 5-17px (más grandes)
        type: types[Math.floor(Math.random() * types.length)],
        direction: Math.random() * 360, // Dirección aleatoria en grados
      }
    })
    setParticles(newParticles)
  }, [])

  const getParticleColor = (type: string) => {
    switch (type) {
      case 'golden':
        return {
          fill: '#FFD700',
          gradient: ['#FFD700', '#FFA500', '#FFD700'],
          glow: 'rgba(255, 215, 0, 0.8)',
        }
      case 'rose':
        return {
          fill: '#E8B8B0',
          gradient: ['#F4E4E1', '#E8B8B0', '#F4E4E1'],
          glow: 'rgba(232, 184, 176, 0.6)',
        }
      case 'pearl':
        return {
          fill: '#F8E5D6',
          gradient: ['#FFFFFF', '#F8E5D6', '#FFFFFF'],
          glow: 'rgba(248, 229, 214, 0.5)',
        }
      case 'sparkle':
        return {
          fill: '#D4AF37',
          gradient: ['#FFD700', '#D4AF37', '#FFD700'],
          glow: 'rgba(212, 175, 55, 0.7)',
        }
      default:
        return {
          fill: '#FFD700',
          gradient: ['#FFD700', '#FFA500', '#FFD700'],
          glow: 'rgba(255, 215, 0, 0.8)',
        }
    }
  }

  const getParticleShape = (type: string, id: number) => {
    const colors = getParticleColor(type)
    
    switch (type) {
      case 'golden':
        // Estrella dorada brillante
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`goldenGrad-${id}`}>
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity="1" />
                <stop offset="50%" stopColor={colors.gradient[1]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colors.gradient[2]} stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50,10 L55,35 L80,35 L60,50 L65,75 L50,60 L35,75 L40,50 L20,35 L45,35 Z"
              fill={`url(#goldenGrad-${id})`}
              opacity="0.9"
            />
            <circle cx="50" cy="50" r="8" fill={colors.fill} opacity="0.7" />
          </svg>
        )
      
      case 'rose':
        // Círculo suave rosa
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`roseGrad-${id}`}>
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colors.gradient[1]} stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="35" fill={`url(#roseGrad-${id})`} opacity="0.8" />
            <circle cx="50" cy="50" r="20" fill={colors.fill} opacity="0.6" />
          </svg>
        )
      
      case 'pearl':
        // Perla brillante
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`pearlGrad-${id}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="50%" stopColor={colors.gradient[1]} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.gradient[2]} stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill={`url(#pearlGrad-${id})`} opacity="0.85" />
            <ellipse cx="35" cy="35" rx="12" ry="18" fill="#FFFFFF" opacity="0.6" />
          </svg>
        )
      
      case 'sparkle':
        // Chispa dorada
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`sparkleGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity="1" />
                <stop offset="50%" stopColor={colors.gradient[1]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colors.gradient[2]} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M50,5 L52,45 L95,47 L53,49 L50,95 L47,49 L5,47 L48,45 Z"
              fill={`url(#sparkleGrad-${id})`}
              opacity="0.9"
            />
            <circle cx="50" cy="50" r="6" fill={colors.fill} opacity="0.8" />
          </svg>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[18] overflow-hidden">
      {particles.map((particle) => {
        const colors = getParticleColor(particle.type)
        const distanceX = Math.cos((particle.direction * Math.PI) / 180) * 50
        const distanceY = Math.sin((particle.direction * Math.PI) / 180) * 50
        
        return (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [0, distanceX, 0],
              y: [0, distanceY, 0],
              opacity: [0, 0.9, 1, 0.85, 0],
              scale: [0, 1.1, 1, 0.95, 0],
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
              filter: `drop-shadow(0 0 ${particle.size / 2}px ${colors.glow})`,
            }}
          >
            {getParticleShape(particle.type, particle.id)}
          </motion.div>
        )
      })}
    </div>
  )
}

