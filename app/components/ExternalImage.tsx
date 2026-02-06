'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ExternalImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  onError?: () => void
  [key: string]: any
}

/**
 * Componente que maneja imágenes externas automáticamente.
 * Si la URL es externa y no está configurada en next.config.js,
 * usa un <img> normal en lugar de next/image
 */
export default function ExternalImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  sizes,
  onError,
  ...props
}: ExternalImageProps) {
  const [useFallback, setUseFallback] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Detectar si es una URL externa (no localhost ni dominio configurado)
  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://')
  const isLocalhost = src.includes('localhost') || src.startsWith('/')
  
  // Dominios configurados en next.config.js
  const configuredDomains = [
    'i.pinimg.com',
    'in.pinterest.com',
    'googleusercontent.com',
    'lh3.googleusercontent.com',
    'images.unsplash.com',
    'imgur.com',
    'cloudinary.com',
    'amazonaws.com',
    'cdn.pixabay.com',
    'images.pexels.com',
    'githubusercontent.com',
  ]
  
  const isConfiguredDomain = configuredDomains.some(domain => src.includes(domain))
  
  // Si es una URL externa no configurada, usar fallback directamente
  if (isExternalUrl && !isLocalhost && !isConfiguredDomain) {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={() => {
            setImgError(true)
            onError?.()
          }}
          {...props}
        />
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => {
          setImgError(true)
          onError?.()
        }}
        {...props}
      />
    )
  }

  // Si hay error, usar fallback
  if (useFallback || imgError) {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={() => {
            setImgError(true)
            onError?.()
          }}
          {...props}
        />
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => {
          setImgError(true)
          onError?.()
        }}
        {...props}
      />
    )
  }

  // Intentar usar next/image
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      onError={() => {
        setUseFallback(true)
        onError?.()
      }}
      {...props}
    />
  )
}
