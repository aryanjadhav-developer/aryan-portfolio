import { GraduationCap, Award } from 'lucide-react'
import { Reveal } from './motion'
import type { Profile } from '../types'

export default function Experience({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal><span className="eyebrow">04 — Experience</span></Reveal>
        <Reveal delay={0.05}><h2 className="section-title">Where I&apos;ve worked</h2></Reveal>

        <div className="timeline">
          {profile.experience.map((xp, i) => (
            <Reveal delay={0.05 * i} key={xp.company + xp.period}>
              <div className="tl-item">
                <div className="tl-period">{xp.period}</div>
                <div className="tl-body">
                  <h3>{xp.role}</h3>
                  <div className="tl-company">{xp.company} · {xp.location}</div>
                  <ul>{xp.highlights.map((h, j) => <li key={j}>{h}</li>)}</ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="about-grid" style={{ marginTop: '2.5rem' }}>
          <Reveal>
            <div className="card">
              <div className="skill-head"><GraduationCap size={18} /> Education</div>
              <h3 style={{ fontSize: '1.1rem' }}>{profile.education.degree}</h3>
              <div className="tl-company">{profile.education.institution}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>
                {profile.education.period} · {profile.education.location}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card">
              <div className="skill-head"><Award size={18} /> Certifications</div>
              <div className="chips">
                {profile.certifications.map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
