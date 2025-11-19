'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { invitacionConfig } from '../config/invitacion'
import GeometricBackground from './GeometricBackground'

export default function Countdown() {
  const config = invitacionConfig
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [rsvpTimeLeft, setRsvpTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)
  const [isRsvpExpired, setIsRsvpExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const eventTime = new Date(config.eventDateTime).getTime()
      const difference = eventTime - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    const calculateRsvpTimeLeft = () => {
      const now = new Date().getTime()
      const rsvpDeadline = new Date(config.rsvpDeadlineDateTime).getTime()
      const difference = rsvpDeadline - now

      if (difference <= 0) {
        setIsRsvpExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    setRsvpTimeLeft(calculateRsvpTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
      setRsvpTimeLeft(calculateRsvpTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [config.eventDateTime, config.rsvpDeadlineDateTime])

  const AnimatedNumber = ({ value, label, isHighlighted = false }: { value: number; label: string; isHighlighted?: boolean }) => {
    const displayValue = value.toString().padStart(2, '0')
    
    return (
      <div
        className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 border border-beige/50 card-shadow relative overflow-hidden flex flex-col items-center justify-center ${
          isHighlighted ? 'ring-2 ring-amber-300/40' : ''
        }`}
        style={{ width: '120px', minHeight: '140px' }}
      >
        {/* Efecto de brillo de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect opacity-50"></div>
        
        {/* Número - Sin animaciones que causen parpadeo */}
        <div className="text-4xl md:text-6xl font-serif mb-2 relative text-center">
          <span className={`${isHighlighted ? 'golden-shine golden-glow' : 'text-accent-rose'}`}>
            {displayValue}
          </span>
        </div>
        {/* Label */}
        <div className="text-sm md:text-base text-text-secondary font-sans uppercase tracking-wide text-center">
          {label}
        </div>
      </div>
    )
  }

  const RsvpCountdown = () => {
    if (isRsvpExpired) {
      return (
        <div className="mt-10 mb-4">
          <div className="inline-block px-4 py-2 bg-rose/20 rounded-full border border-beige/50">
            <div className="text-xs md:text-sm font-serif text-text-secondary/70 italic">
              El plazo para confirmar asistencia ha finalizado
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="mt-10 mb-4">
        <div className="inline-block px-5 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-beige/40 shadow-sm">
          <div className="text-xs md:text-sm font-serif text-text-secondary/80 mb-2 tracking-wide text-center">
            Tiempo para confirmar asistencia
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Diseño horizontal compacto y elegante */}
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-serif text-text-primary font-semibold">
                {rsvpTimeLeft.days}
              </span>
              <span className="text-xs font-sans text-text-secondary/60">d</span>
            </div>
            
            <span className="text-text-secondary/30 text-lg">•</span>
            
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-serif text-text-primary font-semibold">
                {rsvpTimeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-text-secondary/60">h</span>
            </div>
            
            <span className="text-text-secondary/30 text-lg">•</span>
            
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-serif text-text-primary font-semibold">
                {rsvpTimeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-text-secondary/60">m</span>
            </div>
            
            <span className="text-text-secondary/30 text-lg">•</span>
            
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-serif text-accent-rose font-semibold">
                {rsvpTimeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-text-secondary/60">s</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.section
      id="countdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-b from-paper to-rose/30 relative overflow-hidden"
    >
      <GeometricBackground variant="rose" density="medium" />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-script text-accent-rose py-12"
          >
            {config.countdownExpiredMessage}
          </motion.div>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-serif text-text-primary mb-12"
            >
              Cuenta Regresiva
            </motion.h2>
            <div className="flex justify-center items-stretch gap-3 md:gap-6 mb-8 w-full max-w-4xl mx-auto">
              <AnimatedNumber value={timeLeft.days} label="Días" />
              <AnimatedNumber value={timeLeft.hours} label="Horas" isHighlighted />
              <AnimatedNumber value={timeLeft.minutes} label="Minutos" />
              <AnimatedNumber value={timeLeft.seconds} label="Segundos" />
            </div>
            {/* Cuenta regresiva para confirmación de asistencia */}
            <RsvpCountdown />
          </>
        )}
      </div>
    </motion.section>
  )
}

