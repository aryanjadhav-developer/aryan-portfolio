import { Code2, Boxes, Database, Wrench, GitBranch } from 'lucide-react'
import { motion, stagger, staggerItem, SectionHeading, TiltCard } from './motion'
import type { Profile } from '../types'

const ICONS: Record<string, typeof Code2> = {
  Languages: Code2,
  Frameworks: Boxes,
  Databases: Database,
  'Platforms & Tools': Wrench,
  Practices: GitBranch,
}
// uniform 3-column grid — every card the same width, aligned
const SPANS = ['col-4', 'col-4', 'col-4', 'col-4', 'col-4']

export default function Skills({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading idx="02 / skills" title={<>The <span className="grad-text">toolkit</span></>} sub="A pragmatic stack centred on .NET, with Java and data work alongside it." />
        <motion.div className="bento" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {profile.skills.map((group, i) => {
            const Icon = ICONS[group.category] ?? Code2
            return (
              <motion.div className={SPANS[i] ?? 'col-4'} variants={staggerItem} key={group.category}>
                <TiltCard className="glass spot pad" max={6}>
                  <div className="skill-head"><Icon size={18} /> {group.category}</div>
                  <div className="chips">
                    {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
