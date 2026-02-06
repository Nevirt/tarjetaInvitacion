'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con fondo semi-transparente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-paper rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto card-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con botón cerrar */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-beige/50">
                  <h2 className="text-2xl font-serif text-text-primary">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-text-secondary hover:text-text-primary transition-colors text-2xl leading-none"
                    aria-label="Cerrar"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {/* Contenido */}
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

