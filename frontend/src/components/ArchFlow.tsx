/**
 * Futuristic architecture diagram — layered backend nodes with glowing packets
 * streaming left → right along the lanes. Decorative (aria-hidden).
 * Motion is pure CSS (see .arch-dot), so it halts under prefers-reduced-motion.
 */
const NODES: { x: number; y: number; w: number; label: string; accent?: string }[] = [
  { x: 14, y: 86, w: 58, label: 'Client' },
  { x: 120, y: 86, w: 60, label: 'API' },
  { x: 232, y: 34, w: 62, label: 'Auth', accent: 'var(--violet)' },
  { x: 232, y: 86, w: 72, label: 'Services' },
  { x: 232, y: 138, w: 62, label: 'Cache', accent: 'var(--cyan)' },
  { x: 356, y: 86, w: 66, label: 'Database' },
]

// packets: lane y, start delay, duration, colour
const DOTS = [
  { y: 105, d: 0.0, t: 5.5, c: 'var(--neon)' },
  { y: 105, d: 1.8, t: 5.5, c: 'var(--cyan)' },
  { y: 105, d: 3.4, t: 5.5, c: 'var(--neon)' },
  { y: 53, d: 0.8, t: 6.5, c: 'var(--violet)' },
  { y: 53, d: 3.6, t: 6.5, c: 'var(--violet)' },
  { y: 157, d: 0.4, t: 6, c: 'var(--cyan)' },
  { y: 157, d: 3.0, t: 6, c: 'var(--cyan)' },
]

export default function ArchFlow() {
  return (
    <div className="archflow glass" aria-hidden="true">
      <div className="archflow-head">
        <span className="dot-r" /><span className="dot-y" /><span className="dot-g" />
        <span className="af-title">system.architecture</span>
      </div>
      <svg viewBox="0 0 436 196" width="100%" role="img">
        {/* lane guides */}
        {[53, 105, 157].map((y) => (
          <line key={y} x1="14" y1={y} x2="422" y2={y} stroke="var(--glass-border)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
        {/* branch connectors from API out to Auth/Cache and in to DB */}
        <path d="M180 105 Q210 105 212 53 H232" fill="none" stroke="var(--glass-border-str)" strokeWidth="1.5" />
        <path d="M180 105 Q210 105 212 157 H232" fill="none" stroke="var(--glass-border-str)" strokeWidth="1.5" />
        <path d="M294 53 Q334 53 336 105 H356" fill="none" stroke="var(--glass-border-str)" strokeWidth="1.5" />
        <path d="M294 157 Q334 157 336 105 H356" fill="none" stroke="var(--glass-border-str)" strokeWidth="1.5" />

        {/* nodes */}
        {NODES.map((n) => (
          <g key={n.label}>
            <rect x={n.x} y={n.y} width={n.w} height="24" rx="7" fill="#0c1218" stroke={n.accent ?? 'var(--cyan)'} strokeWidth="1.5" />
            <text x={n.x + n.w / 2} y={n.y + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-muted)">{n.label}</text>
          </g>
        ))}

        {/* streaming packets (left → right) */}
        {DOTS.map((p, i) => (
          <circle
            key={i}
            className="arch-dot"
            cx="18"
            cy={p.y}
            r="3.2"
            fill={p.c}
            style={{ animationDuration: `${p.t}s`, animationDelay: `${p.d}s`, filter: `drop-shadow(0 0 4px ${p.c})` }}
          />
        ))}
      </svg>
    </div>
  )
}
