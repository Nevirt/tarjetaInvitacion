'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GeometricShape {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  rotation: number
  type: 'hexagon' | 'hexagon-outline' | 'hexagon-nested' | 'circle' | 'triangle' | 'lines'
  opacity: number
}

interface GeometricBackgroundProps {
  variant?: 'gold' | 'rose' | 'blue' | 'sepia' | 'mixed'
  density?: 'low' | 'medium' | 'high'
  className?: string
}

export default function GeometricBackground({ 
  variant = 'mixed', 
  density = 'medium',
  className = ''
}: GeometricBackgroundProps) {
  const [shapes, setShapes] = useState<GeometricShape[]>([])

  useEffect(() => {
    const shapeCount = density === 'low' ? 10 : density === 'medium' ? 16 : 22
    const types: GeometricShape['type'][] = [
      'hexagon', 'hexagon-outline', 'hexagon-nested', 'circle', 'triangle', 'lines'
    ]
    
    const generatedShapes: GeometricShape[] = Array.from({ length: shapeCount }, (_, i) => ({
      id: i,
      x: -5 + Math.random() * 110, // Permite que salgan un poco del borde
      y: -5 + Math.random() * 110,
      size: 80 + Math.random() * 180, // Tamaños aún más grandes
      delay: Math.random() * 3,
      duration: 20 + Math.random() * 20, // Más lento para más sutileza
      rotation: Math.random() * 360,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: 0.15 + Math.random() * 0.25, // MUCHO más visible
    }))
    
    setShapes(generatedShapes)
  }, [density])

  const getColorByVariant = (type: string) => {
    const colors = {
      gold: {
        fill: '#D4AF37',
        stroke: '#FFD700',
        secondary: '#F0E6D2',
      },
      rose: {
        fill: '#FFB6C1',
        stroke: '#FFD7D7',
        secondary: '#FFC0CB',
      },
      blue: {
        fill: '#4FC3F7',
        stroke: '#81D4FA',
        secondary: '#B3E5FC',
      },
      sepia: {
        fill: '#8B7355',
        stroke: '#A0826D',
        secondary: '#C9B8A0',
      },
      mixed: {
        fill: (i: number) => {
          const palette = ['#D4AF37', '#FFB6C1', '#8B7355', '#F0E6D2']
          return palette[i % palette.length]
        },
        stroke: (i: number) => {
          const palette = ['#FFD700', '#FFD7D7', '#A0826D', '#D4AF37']
          return palette[i % palette.length]
        },
        secondary: (i: number) => {
          const palette = ['#F0E6D2', '#FFC0CB', '#C9B8A0', '#FFE5B4']
          return palette[i % palette.length]
        },
      },
    }
    
    return colors[variant]
  }

  const renderShape = (shape: GeometricShape, index: number) => {
    const colors = getColorByVariant(shape.type)
    const fill = typeof colors.fill === 'function' ? colors.fill(index) : colors.fill
    const stroke = typeof colors.stroke === 'function' ? colors.stroke(index) : colors.stroke

    switch (shape.type) {
      case 'hexagon':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              fill={fill} 
              opacity="0.25"
            />
          </svg>
        )
      
      case 'hexagon-outline':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="4" 
              opacity="0.4"
            />
          </svg>
        )
      
      case 'hexagon-nested':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="3" 
              opacity="0.35"
            />
            <polygon 
              points="50,20 75,32.5 75,67.5 50,80 25,67.5 25,32.5" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.3"
            />
            <polygon 
              points="50,35 60,40 60,60 50,65 40,60 40,40" 
              fill={fill} 
              opacity="0.2"
            />
          </svg>
        )
      
      case 'circle':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="3" 
              opacity="0.35"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="25" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.3"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="10" 
              fill={fill} 
              opacity="0.25"
            />
          </svg>
        )
      
      case 'triangle':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,10 90,85 10,85" 
              fill="none" 
              stroke={stroke} 
              strokeWidth="3.5" 
              opacity="0.35"
            />
            <polygon 
              points="50,30 70,70 30,70" 
              fill={fill} 
              opacity="0.2"
            />
          </svg>
        )
      
      case 'lines':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <line 
              x1="20" y1="50" x2="80" y2="50" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.35"
            />
            <line 
              x1="50" y1="20" x2="50" y2="80" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.35"
            />
            <line 
              x1="30" y1="30" x2="70" y2="70" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.3"
            />
            <line 
              x1="70" y1="30" x2="30" y2="70" 
              stroke={stroke} 
              strokeWidth="2.5" 
              opacity="0.3"
            />
            <circle cx="50" cy="50" r="7" fill={fill} opacity="0.4" />
            <circle cx="20" cy="50" r="5" fill={stroke} opacity="0.35" />
            <circle cx="80" cy="50" r="5" fill={stroke} opacity="0.35" />
            <circle cx="50" cy="20" r="5" fill={stroke} opacity="0.35" />
            <circle cx="50" cy="80" r="5" fill={stroke} opacity="0.35" />
          </svg>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          initial={{
            rotate: shape.rotation,
            opacity: 0,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0.3, 0.6, 1, 0.8, 0.3],
            y: [0, -40, -80, -120],
            scale: [0.7, 1, 1.05, 0.9],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape, index)}
        </motion.div>
      ))}
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent pointer-events-none" />
    </div>
  )
}

