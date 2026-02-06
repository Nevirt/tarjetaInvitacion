'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedGoldenFrameProps {
  text: string
  variant: 1 | 2 | 3
  delay?: number
}

interface FloatingParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export default function AnimatedGoldenFrame({
  text,
  variant,
  delay = 0,
}: AnimatedGoldenFrameProps) {
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([])

  useEffect(() => {
    const particles: FloatingParticle[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 4 + Math.random() * 6,
    }))
    setFloatingParticles(particles)
  }, [])

  // Estilos elegantes y profesionales
  const getVariantStyles = () => {
    const styles = [
      {
        // Dorado elegante
        bgGradient: 'from-amber-50 via-white to-amber-50',
        borderColor: 'border-amber-400/60',
        accentColor: '#D4AF37',
        accentGradient: 'from-amber-400 to-yellow-600',
        shadowColor: 'shadow-amber-200/50',
      },
      {
        // Rosa elegante
        bgGradient: 'from-rose-50 via-white to-rose-50',
        borderColor: 'border-rose-400/60',
        accentColor: '#E91E63',
        accentGradient: 'from-rose-400 to-pink-600',
        shadowColor: 'shadow-rose-200/50',
      },
      {
        // Azul elegante
        bgGradient: 'from-sky-50 via-white to-sky-50',
        borderColor: 'border-sky-400/60',
        accentColor: '#3B82F6',
        accentGradient: 'from-sky-400 to-blue-600',
        shadowColor: 'shadow-sky-200/50',
      },
    ]
    return styles[(variant - 1) % 3]
  }

  const variantStyle = getVariantStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="relative w-full max-w-5xl mx-auto px-4"
    >
      {/* Marco principal profesional */}
      <motion.div
        className={`relative bg-gradient-to-br ${variantStyle.bgGradient} rounded-2xl overflow-hidden shadow-2xl ${variantStyle.shadowColor} border-2 ${variantStyle.borderColor}`}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3 }
        }}
      >
        {/* Partículas flotantes decorativas */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: variantStyle.accentColor,
              filter: 'blur(1.5px)',
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -40, -80],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Contenido del marco */}
        <div className="relative p-10 md:p-14 lg:p-16">
          {/* Decoración superior - Línea con círculo central */}
          <motion.div
            className="flex items-center justify-center mb-8 md:mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`h-[2px] bg-gradient-to-r ${variantStyle.accentGradient} rounded-full`}
                style={{ width: '60px' }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className={`w-3 h-3 rounded-full bg-gradient-to-br ${variantStyle.accentGradient} shadow-lg`}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className={`h-[2px] bg-gradient-to-r ${variantStyle.accentGradient} rounded-full`}
                style={{ width: '60px' }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              />
            </div>
          </motion.div>

          {/* Texto principal con comillas decorativas */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            className="relative"
          >
            {/* Comilla inicial grande y elegante */}
            <motion.div
              className={`absolute -top-8 -left-2 md:-left-4 text-7xl md:text-8xl font-serif opacity-15`}
              style={{ color: variantStyle.accentColor }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 0.15, x: 0 }}
              transition={{ delay: delay + 0.4, duration: 0.6 }}
            >
              &ldquo;
            </motion.div>

            {/* Texto del mensaje */}
            <p className="text-gray-700 font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-center relative z-10 px-4 md:px-8">
              {text}
            </p>

            {/* Comilla final grande y elegante */}
            <motion.div
              className={`absolute -bottom-16 md:-bottom-20 -right-2 md:-right-4 text-7xl md:text-8xl font-serif opacity-15`}
              style={{ color: variantStyle.accentColor }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 0.15, x: 0 }}
              transition={{ delay: delay + 0.4, duration: 0.6 }}
            >
              &rdquo;
            </motion.div>
          </motion.div>

          {/* Decoración inferior - Ornamento elegante */}
          <motion.div
            className="flex justify-center mt-10 md:mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            <svg
              className="w-32 h-8 md:w-40 md:h-10"
              viewBox="0 0 160 40"
              fill="none"
            >
              {/* Línea curva central */}
              <motion.path
                d="M20,20 Q50,10 80,20 T140,20"
                stroke={variantStyle.accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: delay + 0.6, duration: 1.2 }}
              />
              
              {/* Círculos decorativos */}
              <motion.circle
                cx="20"
                cy="20"
                r="3"
                fill={variantStyle.accentColor}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: delay + 0.7, duration: 0.4 }}
              />
              <motion.circle
                cx="80"
                cy="20"
                r="4"
                fill={variantStyle.accentColor}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: delay + 0.8, duration: 0.4 }}
              />
              <motion.circle
                cx="140"
                cy="20"
                r="3"
                fill={variantStyle.accentColor}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: delay + 0.9, duration: 0.4 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Brillo sutil al hacer hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Esquinas decorativas elegantes */}
        <div className="absolute top-4 left-4 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
          <svg viewBox="0 0 40 40" fill={variantStyle.accentColor} opacity="0.25">
            <path d="M0,0 L0,15 Q0,0 15,0 Z" />
            <circle cx="5" cy="5" r="1.5" />
          </svg>
        </div>

        <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 pointer-events-none rotate-90">
          <svg viewBox="0 0 40 40" fill={variantStyle.accentColor} opacity="0.25">
            <path d="M0,0 L0,15 Q0,0 15,0 Z" />
            <circle cx="5" cy="5" r="1.5" />
          </svg>
        </div>

        <div className="absolute bottom-4 left-4 w-8 h-8 md:w-10 md:h-10 pointer-events-none -rotate-90">
          <svg viewBox="0 0 40 40" fill={variantStyle.accentColor} opacity="0.25">
            <path d="M0,0 L0,15 Q0,0 15,0 Z" />
            <circle cx="5" cy="5" r="1.5" />
          </svg>
        </div>

        <div className="absolute bottom-4 right-4 w-8 h-8 md:w-10 md:h-10 pointer-events-none rotate-180">
          <svg viewBox="0 0 40 40" fill={variantStyle.accentColor} opacity="0.25">
            <path d="M0,0 L0,15 Q0,0 15,0 Z" />
            <circle cx="5" cy="5" r="1.5" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
