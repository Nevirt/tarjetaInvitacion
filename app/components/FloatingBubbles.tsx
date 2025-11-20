'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
  color: 'rose' | 'beige' | 'gold' | 'pearl'
}

interface GoldenParticle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  rotation: number
}

function FloatingBubblesComponent() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [particles, setParticles] = useState<GoldenParticle[]>([])

  useEffect(() => {
    // Detectar móviles para reducir carga
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    // Crear burbujas/humo suaves
    const bubbleCount = isMobile ? 10 : 18
    const newBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 120 + 20, // Empiezan más abajo
      size: 100 + Math.random() * 250, // Tamaños variados grandes
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15, // Movimiento visible
      opacity: 0.08 + Math.random() * 0.12, // MÁS VISIBLES
      color: ['rose', 'beige', 'gold', 'pearl'][Math.floor(Math.random() * 4)] as Bubble['color'],
    }))

    // Crear partículas doradas pequeñas (confetti)
    const particleCount = isMobile ? 15 : 30
    const newParticles: GoldenParticle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 120,
      size: 3 + Math.random() * 5, // Un poco más grandes
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 12,
      rotation: Math.random() * 360,
    }))

    setBubbles(newBubbles)
    setParticles(newParticles)
  }, [])

  const getBubbleColor = (color: Bubble['color']) => {
    switch (color) {
      case 'rose':
        return 'radial-gradient(circle, rgba(248,228,214,0.7) 0%, rgba(232,184,176,0.4) 50%, transparent 100%)'
      case 'beige':
        return 'radial-gradient(circle, rgba(250,247,242,0.8) 0%, rgba(237,231,220,0.5) 50%, transparent 100%)'
      case 'gold':
        return 'radial-gradient(circle, rgba(255,229,180,0.6) 0%, rgba(212,175,55,0.3) 50%, transparent 100%)'
      case 'pearl':
        return 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(248,245,240,0.4) 50%, transparent 100%)'
      default:
        return 'radial-gradient(circle, rgba(250,247,242,0.5) 0%, transparent 100%)'
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {/* Burbujas/humo suaves de fondo */}
      {bubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: getBubbleColor(bubble.color),
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, bubble.opacity, bubble.opacity * 1.2, bubble.opacity, 0],
            scale: [0.5, 1, 1.1, 1, 0.9],
            y: [0, -80, -160, -240],
            x: [0, Math.sin(bubble.id) * 40, Math.cos(bubble.id) * 30, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Blur interno para efecto humo */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: getBubbleColor(bubble.color),
            }}
          />
        </motion.div>
      ))}

      {/* Partículas doradas tipo confetti */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
          initial={{
            opacity: 0,
            rotate: particle.rotation,
          }}
          animate={{
            opacity: [0, 0.8, 1, 0.8, 0],
            y: [0, -100, -200, -300],
            x: [0, Math.sin(particle.id * 2) * 25, 0],
            rotate: [particle.rotation, particle.rotation + 360, particle.rotation + 720],
            scale: [0, 1.2, 1.4, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Partícula dorada circular */}
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(212,175,55,0.6) 50%, transparent 100%)',
              boxShadow: '0 0 4px rgba(255,215,0,0.6)',
            }}
          />
        </motion.div>
      ))}

      {/* Overlay de textura suave opcional */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(248,228,214,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(255,229,180,0.12) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

// React.memo para optimización
export default memo(FloatingBubblesComponent)

