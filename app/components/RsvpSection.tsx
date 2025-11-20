'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { invitacionConfig } from '../config/invitacion'
import Section from './Section'
import Modal from './Modal'
import GeometricBackground from './GeometricBackground'

interface RsvpFormData {
  nombre: string
  acompanantes: string
  telefono: string
  comentarios: string
}

interface FloatingHeart {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
  emoji: string
}

export default function RsvpSection() {
  const config = invitacionConfig
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([])
  const [formData, setFormData] = useState<RsvpFormData>({
    nombre: '',
    acompanantes: '0',
    telefono: '',
    comentarios: '',
  })
  const [errors, setErrors] = useState<Partial<RsvpFormData>>({})

  useEffect(() => {
    const hearts: FloatingHeart[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 22 + Math.random() * 28,
      emoji: '', // No longer needed
    }))
    setFloatingHearts(hearts)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<RsvpFormData> = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          setFormData({
            nombre: '',
            acompanantes: '0',
            telefono: '',
            comentarios: '',
          })
          setSubmitSuccess(false)
          setIsModalOpen(false)
        }, 3000)
      } else {
        alert('Hubo un error al enviar la confirmación. Por favor, intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error al enviar RSVP:', error)
      alert('Hubo un error al enviar la confirmación. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof RsvpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Calcular fecha límite
  const rsvpDeadline = new Date(config.rsvpDeadlineDateTime)
  const formattedDeadline = rsvpDeadline.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <Section id="rsvp" className="bg-gradient-to-b from-white/50 via-[#FFE5E5]/30 to-white/50 py-16 md:py-24 relative overflow-hidden">
        <GeometricBackground variant="rose" density="high" />
        
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
        {floatingHearts.map((heart, index) => {
          const shapeType = index % 4
          return (
            <motion.div
              key={heart.id}
              className="absolute pointer-events-none"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.35, 0.1],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {shapeType === 0 && (
                // Heart shape outline
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFB6C1" strokeWidth="1.5" opacity="0.4" />
                </svg>
              )}
              {shapeType === 1 && (
                // Flower petal shape
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="30" r="15" fill="#FFD7D7" opacity="0.3" />
                  <circle cx="70" cy="50" r="15" fill="#FFD7D7" opacity="0.3" />
                  <circle cx="50" cy="70" r="15" fill="#FFD7D7" opacity="0.3" />
                  <circle cx="30" cy="50" r="15" fill="#FFD7D7" opacity="0.3" />
                  <circle cx="50" cy="50" r="12" fill="#D4AF37" opacity="0.4" />
                </svg>
              )}
              {shapeType === 2 && (
                // Circle with gradient
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="url(#roseGradient)" opacity="0.4" />
                  <defs>
                    <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFB6C1" />
                      <stop offset="100%" stopColor="#FFD7D7" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              {shapeType === 3 && (
                // Diamond outline
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,10 80,50 50,90 20,50" fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.4" />
                  <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.3" />
                </svg>
              )}
            </motion.div>
          )
        })}

        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-text-primary text-center mb-8 md:mb-12"
          >
            Confirma tu Asistencia
          </motion.h2>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-[#FFE5B4]/80 via-white/95 to-[#FFD7D7]/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#D4AF37]/30 relative overflow-hidden"
              style={{ rotate: -0.5 }}
              whileHover={{ rotate: 0, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" fill="#D4AF37">
                  <path d="M50,20 L61,40 L83,43 L66,59 L70,81 L50,70 L30,81 L34,59 L17,43 L39,40 Z" />
                </svg>
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full opacity-60 blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#FF69B4] to-[#FFB6C1] rounded-full opacity-40 blur-xl" />

              <div className="relative z-10 text-center space-y-6">
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] shadow-lg mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>

                <div className="space-y-4">
                  <p className="text-text-primary font-serif text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                    Sería un honor contar con tu presencia en este día tan especial.
                  </p>
                  
                  <p className="text-text-secondary font-sans text-base md:text-lg">
                    Por favor, confirma tu asistencia antes del{' '}
                    <span className="font-bold text-[#D4AF37]">{formattedDeadline}</span>
                  </p>
                </div>

                {/* Button */}
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white font-serif text-lg md:text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10">Confirmar asistencia</span>
                  <motion.svg
                    className="w-6 h-6 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>

                {/* Decorative divider */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full mt-8 mx-auto"
                  style={{ width: '60%' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />

                {/* Additional info */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                    <path d="M20,12 L22,6 L12,2 L2,6 L4,12 L2,18 L12,22 L22,18 Z" opacity="0.6" />
                  </svg>
                  <p className="text-text-secondary font-sans text-sm md:text-base italic">
                    ¡Tu presencia es el mejor regalo!
                  </p>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                    <path d="M20,12 L22,6 L12,2 L2,6 L4,12 L2,18 L12,22 L22,18 Z" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsModalOpen(false)
            setSubmitSuccess(false)
            setFormData({
              nombre: '',
              acompanantes: '0',
              telefono: '',
              comentarios: '',
            })
            setErrors({})
          }
        }}
        title="Confirmación de Asistencia"
      >
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] shadow-xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-script text-[#D4AF37]">
                ¡Confirmación Exitosa!
              </h3>
              <p className="text-xl font-serif text-text-primary max-w-md mx-auto">
                {config.rsvpSuccessMessage}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <motion.div
                  className="w-12 h-12"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" fill="#D4AF37" />
                  </svg>
                </motion.div>
                <motion.div
                  className="w-12 h-12"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFD700">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>
                <motion.div
                  className="w-12 h-12"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="#FFB6C1" />
                    <circle cx="35" cy="40" r="8" fill="white" />
                    <circle cx="65" cy="40" r="8" fill="white" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre completo */}
            <div>
              <label htmlFor="nombre" className="block text-text-primary font-sans font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all outline-none font-sans"
                placeholder="Tu nombre completo"
                disabled={isSubmitting}
              />
              {errors.nombre && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                  </svg>
                  {errors.nombre}
                </motion.p>
              )}
            </div>

            {/* Número de acompañantes */}
            <div>
              <label htmlFor="acompanantes" className="block text-text-primary font-sans font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                Número de acompañantes
              </label>
              <input
                id="acompanantes"
                type="number"
                min="0"
                max="10"
                value={formData.acompanantes}
                onChange={(e) => handleChange('acompanantes', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all outline-none font-sans"
                placeholder="0"
                disabled={isSubmitting}
              />
            </div>

            {/* Teléfono / WhatsApp */}
            <div>
              <label htmlFor="telefono" className="block text-text-primary font-sans font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Teléfono / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all outline-none font-sans"
                placeholder="+52 123 456 7890"
                disabled={isSubmitting}
              />
              {errors.telefono && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                  </svg>
                  {errors.telefono}
                </motion.p>
              )}
            </div>

            {/* Comentarios / Restricciones alimentarias */}
            <div>
              <label htmlFor="comentarios" className="block text-text-primary font-sans font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                </svg>
                Comentarios / Restricciones alimentarias
              </label>
              <textarea
                id="comentarios"
                value={formData.comentarios}
                onChange={(e) => handleChange('comentarios', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all outline-none font-sans min-h-[100px] resize-y"
                placeholder="Cualquier comentario o restricción alimentaria que debamos conocer..."
                disabled={isSubmitting}
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white font-serif text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-5 h-5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                      </svg>
                    </motion.div>
                    Enviando...
                  </span>
                ) : (
                  'Enviar confirmación'
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 bg-white text-text-primary font-serif text-lg px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                Cerrar
              </motion.button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}

