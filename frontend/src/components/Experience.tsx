import { GraduationCap, Award } from 'lucide-react'
import { Reveal, SectionHeading, TiltCard } from './motion'
import type { Profile } from '../types'

export default function Experience({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading idx="04 / path" title={<>Where I&apos;ve <span className="grad-text">worked</span></>} />

        <div className="timeline">
          {profile.experience.map((xp, i) => (
            <Reveal delay={0.05 * i} key={xp.company + xp.period}>
              <div className="tl-item">
                <div className="tl-period">{xp.period}</div>
                <TiltCard className="glass spot tl-body" max={4}>
                  <h3>{xp.role}</h3>
                  <div className="tl-company">{xp.company} · {xp.location}</div>
                  <ul>{xp.highlights.map((h, j) => <li key={j}>{h}</li>)}</ul>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="bento" style={{ marginTop: '1rem' }}>
          <Reveal className="col-6">
            <div className="glass spot pad-lg" style={{ height: '100%' }}>
              <div className="skill-head"><GraduationCap size={18} /> Education</div>
              <h3 style={{ fontSize: '1.15rem' }}>{profile.education.degree}</h3>
              <div className="tl-company">{profile.education.institution}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 0', fontFamily: 'var(--font-mono)' }}>
                {profile.education.period} · {profile.education.location}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="col-6">
            <div className="glass spot pad-lg" style={{ height: '100%' }}>
              <div className="skill-head"><Award size={18} /> Certifications</div>
              <div className="chips">{profile.certifications.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
