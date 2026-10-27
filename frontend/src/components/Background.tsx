import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Particle field — slow drifting dots with proximity links. Skipped on reduced-motion / mobile (CSS hides canvas). */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    type P = { x: number; y: number; vx: number; vy: number }
    let pts: P[] = []

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * DPR; canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const count = Math.min(70, Math.floor((w * h) / 22000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }))
    }
    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 16000) {
            const o = 1 - d2 / 16000
            ctx.strokeStyle = `rgba(42,212,255,${o * 0.18})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(120,200,255,0.5)'
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
}

export default function Background() {
  const reduce = useReducedMotion()
  const float = (d: number) =>
    reduce ? {} : { x: [0, 30, -20, 0], y: [0, -25, 15, 0], transition: { duration: d, repeat: Infinity, ease: 'easeInOut' } }

  return (
    <div className="bg-root" aria-hidden="true">
      <motion.div className="aurora a1" animate={float(22)} />
      <motion.div className="aurora a2" animate={float(26)} />
      <motion.div className="aurora a3" animate={float(30)} />
      <div className="bg-grid" />
      <Particles />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  )
}
