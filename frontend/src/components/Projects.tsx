import type { MouseEvent } from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'
import { motion, stagger, staggerItem, Reveal } from './motion'
import type { Project } from '../types'

function onMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal><span className="eyebrow">03 — Projects</span></Reveal>
        <Reveal delay={0.05}><h2 className="section-title">Things I&apos;ve built</h2></Reveal>
        <Reveal delay={0.1}><p className="section-lead">A mix of real-time systems, full-stack apps, and data engineering.</p></Reveal>
        <motion.div
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {ordered.map((p) => (
            <motion.article className="card project" variants={staggerItem} key={p.slug} onMouseMove={onMove}>
              <div className="project-top">
                <h3>{p.title}</h3>
                {p.featured && <span className="featured-tag"><Star size={11} style={{ verticalAlign: '-1px' }} /> Featured</span>}
              </div>
              <p className="summary">{p.summary}</p>
              <ul>
                {p.highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              <div className="tech">
                {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              <div className="links">
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener"><Github size={15} /> Code</a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener"><ExternalLink size={15} /> Live</a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
