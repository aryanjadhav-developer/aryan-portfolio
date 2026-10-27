/**
 * Neon robotic car that drives left → right across a dark strip, headlights
 * blazing, light-trail streaks behind it, wheels spinning. Decorative
 * (aria-hidden). Motion is pure CSS, so it halts under prefers-reduced-motion.
 */
export default function RobotCar() {
  return (
    <div className="car-card glass" aria-hidden="true">
      <div className="car-head">
        <span className="dot-r" /><span className="dot-y" /><span className="dot-g" />
        <span className="af-title">drive.mode</span>
      </div>
      <div className="car-track">
        <div className="car-ground" />
        <div className="car">
          <svg viewBox="0 0 170 86" width="128" role="img">
            {/* speed / light trails (behind the car) */}
            <g className="car-trails">
              <rect x="-70" y="30" width="78" height="3" rx="1.5" fill="var(--cyan)" opacity="0.5" />
              <rect x="-95" y="44" width="96" height="3" rx="1.5" fill="var(--neon)" opacity="0.4" />
              <rect x="-60" y="58" width="66" height="3" rx="1.5" fill="var(--cyan)" opacity="0.35" />
            </g>

            {/* headlight glow cone */}
            <path d="M150 44 L172 32 L172 60 Z" fill="var(--neon)" opacity="0.22" />

            {/* chassis */}
            <path
              d="M18 60 L30 40 Q34 34 44 33 L92 33 Q100 33 108 40 L128 44 Q146 46 150 58 L150 62 Q150 66 144 66 L24 66 Q18 66 18 60 Z"
              fill="#0e151c" stroke="var(--cyan)" strokeWidth="2.2" strokeLinejoin="round"
            />
            {/* cabin / windows */}
            <path d="M44 38 L62 38 L60 50 L40 50 Z" fill="#071017" stroke="var(--neon)" strokeWidth="1.6" />
            <path d="M68 38 L88 38 Q94 38 100 46 L72 50 Z" fill="#071017" stroke="var(--neon)" strokeWidth="1.6" />
            {/* roof sensor (robotic) */}
            <line x1="64" y1="38" x2="64" y2="28" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="64" cy="26" r="3" fill="var(--violet)" />
            {/* headlight */}
            <circle cx="149" cy="52" r="3.4" fill="var(--neon)" />

            {/* wheels */}
            <g>
              <circle cx="52" cy="66" r="15" fill="#05070a" stroke="var(--glass-border-str)" strokeWidth="3" />
              <g className="car-wheel" style={{ transformOrigin: '52px 66px' }}>
                <circle cx="52" cy="66" r="7" fill="none" stroke="var(--cyan)" strokeWidth="2" />
                <line x1="52" y1="59" x2="52" y2="73" stroke="var(--cyan)" strokeWidth="2" />
                <line x1="45" y1="66" x2="59" y2="66" stroke="var(--cyan)" strokeWidth="2" />
              </g>
            </g>
            <g>
              <circle cx="120" cy="66" r="15" fill="#05070a" stroke="var(--glass-border-str)" strokeWidth="3" />
              <g className="car-wheel" style={{ transformOrigin: '120px 66px' }}>
                <circle cx="120" cy="66" r="7" fill="none" stroke="var(--cyan)" strokeWidth="2" />
                <line x1="120" y1="59" x2="120" y2="73" stroke="var(--cyan)" strokeWidth="2" />
                <line x1="113" y1="66" x2="127" y2="66" stroke="var(--cyan)" strokeWidth="2" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
