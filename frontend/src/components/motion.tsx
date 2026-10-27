import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import {
  motion, useReducedMotion, useInView, useMotionValue, useSpring, animate,
  type Variants,
} from 'framer-motion'

/** Fade + rise (+ optional blur) on scroll into view. Respects reduced-motion. */
export function Reveal({
  children, delay = 0, y = 26, blur = true, className,
}: { children: ReactNode; delay?: number; y?: number; blur?: boolean; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: blur && !reduce ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/** Magnetic hover — element eases toward the pointer. */
export function Magnetic({ children, strength = 0.4, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  function move(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function leave() { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} className={className} style={{ x, y, display: 'inline-flex' }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  )
}

/** 3D tilt + spotlight tracking for cards. Writes --mx/--my for the CSS spotlight. */
export function TiltCard({
  children, className = '', max = 8, as = 'div',
}: { children: ReactNode; className?: string; max?: number; as?: 'div' | 'article' }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  function move(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (!reduce) { ry.set((px - 0.5) * max * 2); rx.set(-(py - 0.5) * max * 2) }
  }
  function leave() { rx.set(0); ry.set(0) }

  const Comp = as === 'article' ? motion.article : motion.div
  return (
    <Comp
      ref={ref as never}
      className={className}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </Comp>
  )
}

/** Count-up number when scrolled into view. */
export function Counter({ to, suffix = '', prefix = '', duration = 1.4 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(to); return }
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) })
    return () => controls.stop()
  }, [inView, to, duration, reduce])
  return <span ref={ref}>{prefix}{Math.round(val)}{suffix}</span>
}

/** Section heading with gradient index + rule. */
export function SectionHeading({ idx, title, sub }: { idx: string; title: ReactNode; sub?: string }) {
  return (
    <>
      <Reveal>
        <div className="shead">
          <span className="idx">{idx}</span>
          <h2>{title}</h2>
          <span className="rule" />
        </div>
      </Reveal>
      {sub && <Reveal delay={0.05}><p className="sub">{sub}</p></Reveal>}
    </>
  )
}

export { motion, useReducedMotion }
