'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'

interface Petal {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  rotation: number
  direction: number // Ángulo de dirección en grados
  fallDistance: number // Distancia de caída guardada
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  useEffect(() => {
    // Crear múltiples pétalos con propiedades aleatorias
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Posición inicial X aleatoria (0-100%)
      y: -10 - Math.random() * 20, // Empiezan arriba de la pantalla
      delay: Math.random() * 10, // Delay aleatorio para que no todos empiecen juntos
      duration: 15 + Math.random() * 10, // Duración entre 15-25 segundos
      size: 20 + Math.random() * 30, // Tamaño entre 20-50px
      rotation: Math.random() * 360, // Rotación inicial aleatoria
      direction: -30 + Math.random() * 60, // Dirección entre -30° y 30° (principalmente hacia la derecha)
      fallDistance: 110 + Math.random() * 20, // Distancia de caída guardada
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[16] overflow-hidden">
      {petals.map((petal) => {
        // Variaciones de formas de pétalos
        const petalTypes = [
          // Pétalo tipo 1: Rosa clásica
          <path
            key="type1"
            d="M50,10 Q60,30 70,40 Q65,50 50,60 Q35,50 30,40 Q40,30 50,10 Z"
            fill={`url(#petalGradient-${petal.id})`}
            stroke="#E8B8B0"
            strokeWidth="0.5"
            opacity="0.85"
          />,
          // Pétalo tipo 2: Más alargado
          <path
            key="type2"
            d="M50,5 Q55,25 65,35 Q60,55 50,65 Q40,55 35,35 Q45,25 50,5 Z"
            fill={`url(#petalGradient-${petal.id})`}
            stroke="#F4E4E1"
            strokeWidth="0.5"
            opacity="0.8"
          />,
          // Pétalo tipo 3: Más redondeado
          <ellipse
            key="type3"
            cx="50"
            cy="35"
            rx="25"
            ry="30"
            fill={`url(#petalGradient-${petal.id})`}
            stroke="#F8E5D6"
            strokeWidth="0.5"
            opacity="0.75"
            transform="rotate(-20 50 50)"
          />,
        ]
        const selectedPetal = petalTypes[petal.id % petalTypes.length]
        
        // Calcular posiciones en píxeles basadas en viewport
        const vwToPx = windowWidth / 100
        const vhToPx = windowHeight / 100
        
        const startX = (petal.x * vwToPx) - (petal.size / 2)
        const startY = (petal.y * vhToPx) - (petal.size / 2)
        const endX = startX + (120 * vwToPx)
        const endY = startY + (petal.fallDistance * vhToPx)
        
        return (
          <motion.div
            key={petal.id}
            initial={{
              x: startX,
              y: startY,
              rotate: petal.rotation,
              opacity: 0.6,
            }}
            animate={{
              x: [startX, endX],
              y: [startY, endY],
              rotate: petal.rotation + 360 + Math.random() * 360,
              opacity: [0.6, 0.9, 0.8, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Pétalo SVG con forma variada */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(232,184,176,0.3))' }}
            >
              <defs>
                <linearGradient id={`petalGradient-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4E4E1" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F8E5D6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E8B8B0" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              {selectedPetal}
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}

