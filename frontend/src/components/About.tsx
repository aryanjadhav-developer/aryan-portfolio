import { Reveal } from './motion'
import type { Profile } from '../types'

const STATS = [
  ['3+', 'Internships & roles'],
  ['4', 'Shipped projects'],
  ['20%', 'Perf gain delivered'],
  ['2', 'Backend ecosystems'],
] as const

export default function About({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal><span className="eyebrow">01 — About</span></Reveal>
        <Reveal delay={0.05}><h2 className="section-title">Engineer who cares about the details</h2></Reveal>
        <div className="about-grid about">
          <Reveal delay={0.1}>
            <div>
              <p>{profile.summary}</p>
              <p>
                Most recently I&apos;ve been building business applications on <strong>Acumatica ERP</strong> and{' '}
                <strong>ASP.NET Core</strong>, after internships where I shipped MVC apps, tuned LINQ and SQL Server for a{' '}
                ~20% performance gain, and worked across Spring Boot services.
              </p>
              <p>
                I&apos;m a {profile.education.degree} graduate from {profile.education.institution}, based in {profile.location}.
                I like clean architecture, readable code, and systems that are easy for the next person to reason about.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="stat-grid">
              {STATS.map(([num, lbl]) => (
                <div className="stat" key={lbl}>
                  <div className="num">{num}</div>
                  <div className="lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
