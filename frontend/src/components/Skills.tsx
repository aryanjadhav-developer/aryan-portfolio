import { Code2, Boxes, Database, Wrench, GitBranch } from 'lucide-react'
import { Reveal, SectionHeading, TiltCard } from './motion'
import type { Profile } from '../types'

const ICONS: Record<string, typeof Code2> = {
  Languages: Code2,
  Frameworks: Boxes,
  Databases: Database,
  'Platforms & Tools': Wrench,
  Practices: GitBranch,
}

export default function Skills({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading idx="02 / skills" title={<>The <span className="grad-text">toolkit</span></>} sub="A pragmatic stack centred on .NET, with Java and data work alongside it." />
        {/* masonry columns pack cards by height — no empty stretched boxes */}
        <div className="skills-masonry">
          {profile.skills.map((group, i) => {
            const Icon = ICONS[group.category] ?? Code2
            return (
              <Reveal key={group.category} delay={i * 0.05}>
                <TiltCard className="glass spot pad skill-card" max={6}>
                  <div className="skill-head"><Icon size={18} /> {group.category}</div>
                  <div className="chips">
                    {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
