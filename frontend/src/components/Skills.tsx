import { Code2, Boxes, Database, Wrench, GitBranch } from 'lucide-react'
import { motion, stagger, staggerItem, Reveal } from './motion'
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
        <Reveal><span className="eyebrow">02 — Skills</span></Reveal>
        <Reveal delay={0.05}><h2 className="section-title">Tools I reach for</h2></Reveal>
        <Reveal delay={0.1}><p className="section-lead">A pragmatic stack centred on .NET, with Java and data work alongside it.</p></Reveal>
        <motion.div
          className="skills-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {profile.skills.map((group) => {
            const Icon = ICONS[group.category] ?? Code2
            return (
              <motion.div className="card" variants={staggerItem} key={group.category}>
                <div className="skill-head"><Icon size={18} /> {group.category}</div>
                <div className="chips">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
