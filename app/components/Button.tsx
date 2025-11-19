'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'variant' | 'className'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-script text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
  
  const variantClasses = {
    primary: 'bg-accent-rose text-white hover:bg-accent-peach',
    secondary: 'bg-sage text-text-primary hover:bg-sage/80',
    outline: 'bg-transparent border-2 border-accent-rose text-accent-rose hover:bg-accent-rose hover:text-white',
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

