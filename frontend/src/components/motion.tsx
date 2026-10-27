import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

/** Fade + rise on scroll into view. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Stagger container + item for lists/grids. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export { motion, useReducedMotion }
