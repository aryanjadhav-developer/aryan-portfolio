import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Friendly neon robot. Eyes follow the pointer, it bobs gently, blinks, and
 * gives a little wave. Purely decorative (aria-hidden). Respects reduced-motion.
 */
export default function RobotMascot({ size = 180, className = '' }: { size?: number; className?: string }) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const el = rootRef.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height * 0.42 // eye line
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.9)))
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.9)))
        el.style.setProperty('--px', String(dx))
        el.style.setProperty('--py', String(dy))
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [reduce])

  return (
    <motion.div
      ref={rootRef}
      className={`robot ${className}`}
      aria-hidden="true"
      style={{ width: size }}
      animate={reduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 160 190" width="100%" role="img">
        <defs>
          <linearGradient id="rbody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#141b23" />
            <stop offset="1" stopColor="#0b1016" />
          </linearGradient>
        </defs>

        {/* antenna */}
        <line x1="80" y1="28" x2="80" y2="10" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="8" r="5" fill="var(--neon)">
          {!reduce && <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>

        {/* waving arm (left) */}
        <motion.g
          style={{ transformOrigin: '34px 120px', transformBox: 'view-box' }}
          animate={reduce ? {} : { rotate: [0, -22, 0, -14, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
        >
          <line x1="34" y1="120" x2="18" y2="104" stroke="var(--neon)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="16" cy="102" r="5" fill="var(--neon)" />
        </motion.g>
        {/* arm (right) */}
        <line x1="126" y1="120" x2="144" y2="132" stroke="var(--cyan)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="146" cy="134" r="5" fill="var(--cyan)" />

        {/* body */}
        <rect x="42" y="104" width="76" height="66" rx="16" fill="url(#rbody)" stroke="var(--glass-border-str)" strokeWidth="2" />
        <rect x="56" y="120" width="48" height="30" rx="8" fill="#05070a" stroke="var(--glass-border)" strokeWidth="1.5" />
        <text x="80" y="140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--neon)">{'</>'}</text>

        {/* head */}
        <rect x="30" y="30" width="100" height="70" rx="20" fill="url(#rbody)" stroke="var(--cyan)" strokeWidth="2.5" />

        {/* eyes */}
        <g className="r-eye">
          <circle cx="60" cy="64" r="13" fill="#05070a" stroke="var(--glass-border-str)" strokeWidth="1.5" />
          <circle cx="100" cy="64" r="13" fill="#05070a" stroke="var(--glass-border-str)" strokeWidth="1.5" />
          <circle className="pupil" cx="60" cy="64" r="6" fill="var(--cyan)" />
          <circle className="pupil" cx="100" cy="64" r="6" fill="var(--cyan)" />
          {/* blink lids */}
          {!reduce && (
            <>
              <rect className="lid" x="47" y="51" width="26" height="0" rx="4" fill="#05070a">
                <animate attributeName="height" values="0;0;26;0;0" keyTimes="0;0.92;0.96;0.99;1" dur="5s" repeatCount="indefinite" />
              </rect>
              <rect className="lid" x="87" y="51" width="26" height="0" rx="4" fill="#05070a">
                <animate attributeName="height" values="0;0;26;0;0" keyTimes="0;0.92;0.96;0.99;1" dur="5s" repeatCount="indefinite" />
              </rect>
            </>
          )}
        </g>

        {/* cheeks + mouth */}
        <circle cx="44" cy="82" r="3.5" fill="var(--neon)" opacity="0.7" />
        <circle cx="116" cy="82" r="3.5" fill="var(--neon)" opacity="0.7" />
        <rect x="68" y="84" width="24" height="5" rx="2.5" fill="var(--neon)" opacity="0.8" />

        {/* legs */}
        <line x1="62" y1="170" x2="62" y2="182" stroke="var(--glass-border-str)" strokeWidth="6" strokeLinecap="round" />
        <line x1="98" y1="170" x2="98" y2="182" stroke="var(--glass-border-str)" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}
