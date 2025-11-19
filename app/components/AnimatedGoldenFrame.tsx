'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ImageCarousel from './ImageCarousel'
import ImageGalleryModal from './ImageGalleryModal'
import Image from 'next/image'

interface ImageItem {
  src: string
  alt: string
}

interface AnimatedGoldenFrameProps {
  images: ImageItem[] | string // Soporta array de imágenes o string único (retrocompatibilidad)
  imageAlt?: string // Para retrocompatibilidad
  text: string
  variant: 1 | 2 | 3
  delay?: number
}

interface GlitterParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export default function AnimatedGoldenFrame({
  images,
  imageAlt,
  text,
  variant,
  delay = 0,
}: AnimatedGoldenFrameProps) {
  const [glitterParticles, setGlitterParticles] = useState<GlitterParticle[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInitialIndex, setModalInitialIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Normalizar imágenes: convertir string único a array o usar array directamente
  const imageArray: ImageItem[] = Array.isArray(images)
    ? images
    : [{ src: images, alt: imageAlt || 'Foto especial' }]

  useEffect(() => {
    const particles: GlitterParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 1.5,
      size: 5 + Math.random() * 8,
    }))
    setGlitterParticles(particles)
  }, [])

  // Auto-rotate images
  useEffect(() => {
    if (imageArray.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [imageArray.length])

  const handleImageClick = (index: number) => {
    setModalInitialIndex(index)
    setIsModalOpen(true)
  }
  
  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  // Colores y estilos según variante (aesthetic scrapbook style)
  const getVariantStyles = () => {
    const styles = [
      {
        rotation: -3,
        bgGradient: 'from-pink-100/80 via-white/90 to-purple-100/80',
        borderColor: 'border-pink-300/60',
        accentColor: '#FF69B4',
        shadowColor: 'shadow-pink-300/40',
        tapeColor: 'bg-yellow-200/70',
        tapeRotation: -12,
      },
      {
        rotation: 2,
        bgGradient: 'from-blue-100/80 via-white/90 to-cyan-100/80',
        borderColor: 'border-blue-300/60',
        accentColor: '#4FC3F7',
        shadowColor: 'shadow-blue-300/40',
        tapeColor: 'bg-yellow-100/70',
        tapeRotation: 8,
      },
      {
        rotation: -2,
        bgGradient: 'from-yellow-100/80 via-white/90 to-orange-100/80',
        borderColor: 'border-orange-300/60',
        accentColor: '#FFA726',
        shadowColor: 'shadow-orange-300/40',
        tapeColor: 'bg-pink-200/70',
        tapeRotation: -15,
      },
    ]
    return styles[(variant - 1) % 3]
  }

  const variantStyle = getVariantStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Aesthetic Scrapbook Card */}
      <motion.div
        className={`relative bg-gradient-to-br ${variantStyle.bgGradient} backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl ${variantStyle.shadowColor} cursor-pointer group overflow-hidden`}
        style={{
          rotate: variantStyle.rotation,
        }}
        whileHover={{ 
          scale: 1.02, 
          rotate: 0,
          transition: { duration: 0.3 }
        }}
        onClick={handleCardClick}
      >
        {/* Decorative tape at the top */}
        <div 
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 ${variantStyle.tapeColor} opacity-80 shadow-md z-10`}
          style={{ 
            rotate: `${variantStyle.tapeRotation}deg`,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)'
          }}
        />

        {/* Glitter particles floating */}
        {glitterParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{ 
                backgroundColor: variantStyle.accentColor,
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center relative z-10">
          {/* Image Grid Section - Estilo Scrapbook */}
          <div className="relative flex-shrink-0 w-full md:w-80 lg:w-96">
            {/* Main container with multiple images displayed */}
            <div className="relative h-80 md:h-96">
              {/* Primary image - Large */}
              <motion.div
                className={`absolute top-0 left-0 w-56 h-56 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white ${variantStyle.shadowColor} z-20`}
                style={{ rotate: -5 }}
                whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageArray[currentImageIndex].src}
                  alt={imageArray[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 256px"
                />
                {/* Polaroid-style caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-2 text-center">
                  <p className="text-xs font-handwriting text-gray-700">
                    {imageArray.length > 1 ? `${currentImageIndex + 1}/${imageArray.length}` : '♥'}
                  </p>
                </div>
              </motion.div>

              {/* Secondary image - if available */}
              {imageArray.length > 1 && (
                <motion.div
                  className={`absolute top-8 right-0 w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white ${variantStyle.shadowColor} z-10`}
                  style={{ rotate: 8 }}
                  whileHover={{ scale: 1.05, rotate: 4, zIndex: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={imageArray[(currentImageIndex + 1) % imageArray.length].src}
                    alt={imageArray[(currentImageIndex + 1) % imageArray.length].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 192px"
                  />
                </motion.div>
              )}

              {/* Tertiary image - if available */}
              {imageArray.length > 2 && (
                <motion.div
                  className={`absolute bottom-4 right-8 w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-lg border-3 border-white ${variantStyle.shadowColor} opacity-90 z-5`}
                  style={{ rotate: -8 }}
                  whileHover={{ scale: 1.05, rotate: -4, zIndex: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={imageArray[(currentImageIndex + 2) % imageArray.length].src}
                    alt={imageArray[(currentImageIndex + 2) % imageArray.length].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 144px"
                  />
                </motion.div>
              )}

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-2 -left-2 w-16 h-16 opacity-40 pointer-events-none"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill={variantStyle.accentColor}>
                  <path d="M50,10 L61,35 L88,41 L69,60 L73,87 L50,74 L27,87 L31,60 L12,41 L39,35 Z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute top-4 -right-2 w-12 h-12 opacity-40 pointer-events-none"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill={variantStyle.accentColor}>
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="20" fill="white" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Text Section with decorative elements */}
          <div className="flex-1 relative">
            {/* Decorative corner accent */}
            <div className={`absolute -top-3 -left-3 w-20 h-20 opacity-20 ${variantStyle.borderColor}`}>
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="3">
                <path d="M 10 10 L 10 90 M 10 10 L 90 10" />
                <circle cx="10" cy="10" r="5" fill="currentColor" />
              </svg>
            </div>

            <motion.p
              className="text-text-primary font-serif text-lg md:text-xl lg:text-2xl leading-relaxed relative z-10 px-4 md:px-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {text}
            </motion.p>

            {/* Hand-drawn underline effect */}
            <motion.div
              className="mt-4 mx-4 md:mx-6 h-1 rounded-full"
              style={{ backgroundColor: variantStyle.accentColor }}
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              transition={{ delay: delay + 0.4, duration: 0.8 }}
            />

            {/* Decorative doodles */}
            <div className="absolute -bottom-2 right-4 w-16 h-16 opacity-30 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={variantStyle.accentColor} strokeWidth="2">
                <path d="M 20 50 Q 35 20, 50 50 T 80 50" strokeLinecap="round" />
                <circle cx="20" cy="50" r="3" fill={variantStyle.accentColor} />
                <circle cx="80" cy="50" r="3" fill={variantStyle.accentColor} />
              </svg>
            </div>
          </div>
        </div>

        {/* Animated "Click Here" indicator - Canva Style */}
        <motion.div
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 z-30 pointer-events-none"
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            x: [-5, 0, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              style={{ 
                border: `2px solid ${variantStyle.accentColor}`,
              }}
            >
              <span 
                className="text-sm md:text-base font-bold"
                style={{ color: variantStyle.accentColor }}
              >
                Click here
              </span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke={variantStyle.accentColor}
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </div>
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: variantStyle.accentColor }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none rounded-2xl"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Modal de galería para ver imágenes en grande */}
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={imageArray}
        initialIndex={currentImageIndex}
      />
    </motion.div>
  )
}

