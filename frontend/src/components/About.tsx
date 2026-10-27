import { Sparkles, Rocket, Gauge, Layers } from 'lucide-react'
import { Reveal, SectionHeading, Counter, TiltCard } from './motion'
import type { Profile } from '../types'

const TILES = [
  { icon: Rocket, to: 3, suffix: '+', label: 'Roles & internships' },
  { icon: Layers, to: 4, suffix: '', label: 'Shipped projects' },
  { icon: Gauge, to: 20, suffix: '%', label: 'Perf gain delivered' },
  { icon: Sparkles, to: 2, suffix: '', label: 'Backend ecosystems' },
]

export default function About({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading idx="01 / about" title={<>Engineer who sweats <span className="grad-text">the details</span></>} />
        <div className="bento">
          <Reveal className="col-7">
            <div className="glass spot pad-lg about" style={{ height: '100%' }}>
              <div className="tile-ico"><Sparkles size={20} /></div>
              <p>{profile.summary}</p>
              <p>
                Lately I&apos;ve been building business apps on <strong>Acumatica ERP</strong> and{' '}
                <strong>ASP.NET Core</strong>. Before that: MVC apps, <strong>~20% faster</strong> via tuned LINQ and SQL Server,
                and Spring Boot services across two internships.
              </p>
              <p style={{ margin: 0 }}>
                {profile.education.degree} — {profile.education.institution}. Based in {profile.location}.
                I care about clean architecture and code the next person can actually read.
              </p>
            </div>
          </Reveal>

          <div className="col-5">
            <div className="bento">
              {TILES.map((t, i) => {
                const Icon = t.icon
                return (
                  <Reveal key={t.label} delay={i * 0.06} className="col-6">
                    <TiltCard className="glass spot pad" max={10}>
                      <div className="tile-ico"><Icon size={18} /></div>
                      <div className="counter grad-text"><Counter to={t.to} suffix={t.suffix} /></div>
                      <div className="counter-l">{t.label}</div>
                    </TiltCard>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
