'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  images: Array<{ src: string; alt: string }>
  onImageClick?: (index: number) => void
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function ImageCarousel({
  images,
  onImageClick,
  autoPlay = true,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index)
    }
  }

  // Función para obtener el índice de una imagen relativa a la actual
  const getImageIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length
  }

  // Función para obtener las propiedades de estilo según la posición
  const getImageStyle = (position: number) => {
    const absPosition = Math.abs(position)
    
    if (absPosition === 0) {
      // Imagen central - opacidad completa
      return {
        opacity: 1,
        scale: 1,
        zIndex: 5,
      }
    } else if (absPosition === 1) {
      // Imágenes adyacentes - opacidad reducida
      return {
        opacity: 0.6,
        scale: 0.9,
        zIndex: 4,
      }
    } else if (absPosition === 2) {
      // Imágenes en los extremos - opacidad aún más reducida
      return {
        opacity: 0.3,
        scale: 0.8,
        zIndex: 3,
      }
    } else {
      // Imágenes más lejanas - ocultas
      return {
        opacity: 0,
        scale: 0.7,
        zIndex: 2,
      }
    }
  }

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center p-4">
          <svg className="w-16 h-16 mx-auto mb-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-pink-400 font-serif">Foto especial</p>
        </div>
      </div>
    )
  }

  // Mostrar mínimo 5 imágenes visibles (o todas si hay menos de 5)
  const visibleCount = Math.min(5, images.length)
  const positions = []
  for (let i = -Math.floor(visibleCount / 2); i <= Math.floor(visibleCount / 2); i++) {
    positions.push(i)
  }

  return (
    <div className="relative w-full h-full group overflow-hidden">
      {/* Contenedor principal con imágenes separadas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {positions.map((position) => {
          const imageIndex = getImageIndex(position)
          const style = getImageStyle(position)
          const isCenter = position === 0
          
          // Calcular posición X para separar las imágenes
          const offsetX = position * 45 // Separación entre imágenes

          return (
            <motion.div
              key={`${imageIndex}-${currentIndex}`}
              initial={{ 
                opacity: style.opacity,
                scale: style.scale,
                x: offsetX,
              }}
              animate={{ 
                opacity: style.opacity,
                scale: style.scale,
                x: offsetX,
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: style.zIndex,
                cursor: isCenter ? 'pointer' : 'default',
                left: '50%',
                marginLeft: '-50%',
              }}
              onClick={() => isCenter && handleImageClick(imageIndex)}
              className="flex items-center justify-center"
            >
              {!imageErrors.has(imageIndex) ? (
                <motion.div
                  className="relative w-full h-full rounded-lg overflow-hidden border-2 border-white/30 shadow-xl"
                  style={{
                    transform: `scale(${style.scale})`,
                  }}
                  whileHover={isCenter ? { scale: style.scale * 1.05 } : {}}
                >
                  <Image
                    src={images[imageIndex].src}
                    alt={images[imageIndex].alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 150px, 200px"
                    onError={() => {
                      setImageErrors((prev) => new Set(prev).add(imageIndex))
                    }}
                  />
                  {/* Overlay sutil para integración */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                  
                  {/* Marco decorativo para cada imagen */}
                  <div className="absolute inset-0 border-2 border-white/40 rounded-lg pointer-events-none" />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-blue-100 flex items-center justify-center rounded-lg opacity-50 border-2 border-white/30">
                  <div className="text-center p-2">
                    <svg className="w-8 h-8 mx-auto mb-1 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Flechas de navegación - siempre visibles */}
      {images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 flex items-center justify-center z-20 shadow-lg border-2 border-pink-200/50"
            onClick={goToPrevious}
            aria-label="Imagen anterior"
            disabled={isTransitioning}
          >
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 flex items-center justify-center z-20 shadow-lg border-2 border-pink-200/50"
            onClick={goToNext}
            aria-label="Siguiente imagen"
            disabled={isTransitioning}
          >
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Indicador de múltiples imágenes */}
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-serif z-20 border border-white/20">
            {currentIndex + 1}/{images.length}
          </div>
        </>
      )}

      {/* Icono de click para ampliar */}
      {(images.length > 1 || onImageClick) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-lg cursor-pointer border border-pink-200/50"
          onClick={() => handleImageClick(currentIndex)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-4 h-4 text-pink-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
