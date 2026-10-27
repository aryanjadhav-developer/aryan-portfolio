import { useEffect, useRef } from 'react'

/** A soft neon glow that follows the pointer. Hidden on touch / reduced-motion via CSS. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
