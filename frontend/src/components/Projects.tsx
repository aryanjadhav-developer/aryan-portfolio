import { Github, ExternalLink, Star } from 'lucide-react'
import { motion, stagger, staggerItem, SectionHeading, TiltCard } from './motion'
import type { Project } from '../types'

const SPANS = ['col-8', 'col-4', 'col-6', 'col-6', 'col-4', 'col-4', 'col-4']

export default function Projects({ projects }: { projects: Project[] }) {
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading idx="03 / work" title={<>Things I&apos;ve <span className="grad-text-warm">built</span></>} sub="Real-time systems, full-stack apps, and data engineering." />
        <motion.div className="bento" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
          {ordered.map((p, i) => {
            const big = i === 0
            return (
              <motion.div className={SPANS[i] ?? 'col-4'} variants={staggerItem} key={p.slug}>
                <TiltCard as="article" className={`glass spot pad-lg project ${big ? 'feature' : ''}`} max={5}>
                  <div className="ptop">
                    <h3>{p.title}</h3>
                    {p.featured
                      ? <span className="featured-tag"><Star size={10} /> Featured</span>
                      : <span className="num-badge">0{i + 1}</span>}
                  </div>
                  <p className="summary">{p.summary}</p>
                  <ul>{p.highlights.slice(0, big ? 4 : 2).map((h, j) => <li key={j}>{h}</li>)}</ul>
                  <div className="tech">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                  <div className="links">
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener"><Github size={15} /> Code</a>}
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener"><ExternalLink size={15} /> Live</a>}
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
