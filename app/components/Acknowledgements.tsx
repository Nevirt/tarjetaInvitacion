'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { invitacionConfig } from '../config/invitacion'
import Section from './Section'
import AnimatedGoldenFrame from './AnimatedGoldenFrame'
import GeometricBackground from './GeometricBackground'

export default function Acknowledgements() {
  const config = invitacionConfig

  return (
    <Section id="acknowledgements" className="bg-gradient-to-b from-white/50 via-white/70 to-white/50 py-16 md:py-24 overflow-x-hidden relative">
      <GeometricBackground variant="gold" density="low" />
      
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
      
      <div className="w-full px-4 md:px-8 lg:px-12 overflow-x-hidden relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-text-primary text-center mb-16 md:mb-20"
        >
          {config.acknowledgementsTitle}
        </motion.h2>

        {/* Agradecimientos especiales con marcos aesthetic scrapbook */}
        {config.specialAcknowledgements && config.specialAcknowledgements.length > 0 && (
          <div className="space-y-16 md:space-y-20 lg:space-y-24 mb-16 md:mb-20 max-w-7xl mx-auto">
            {config.specialAcknowledgements.map((acknowledgement, index) => {
              // Soporta tanto el nuevo formato (images) como el antiguo (imageSrc) para retrocompatibilidad
              const images = acknowledgement.images 
                ? (Array.isArray(acknowledgement.images) 
                    ? acknowledgement.images 
                    : [{ src: acknowledgement.images, alt: acknowledgement.imageAlt || 'Foto especial' }])
                : acknowledgement.imageSrc 
                  ? [{ src: acknowledgement.imageSrc, alt: acknowledgement.imageAlt || 'Foto especial' }]
                  : []

              return (
                <AnimatedGoldenFrame
                  key={index}
                  images={images}
                  imageAlt={acknowledgement.imageAlt}
                  text={acknowledgement.text}
                  variant={(index % 3 + 1) as 1 | 2 | 3}
                  delay={index * 0.2}
                />
              )
            })}
          </div>
        )}
      </div>
    </Section>
  )
}

