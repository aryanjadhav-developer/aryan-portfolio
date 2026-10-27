import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowRight, FileDown } from 'lucide-react'
import { motion, useReducedMotion, Magnetic, Counter } from './motion'
import { useScroll, useTransform } from 'framer-motion'
import type { Profile } from '../types'

const ROLES = ['.NET Backend Developer', 'ASP.NET Core Engineer', 'Full-Stack Web Developer', 'Clean-Code Advocate']

function useTypewriter(words: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? '' : words[0])
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    if (!enabled) return
    const current = words[i % words.length]
    const done = text === current
    const empty = text === ''
    let delay = del ? 40 : 80
    if (done && !del) delay = 1500
    if (empty && del) delay = 300
    const t = setTimeout(() => {
      if (done && !del) setDel(true)
      else if (empty && del) { setDel(false); setI((n) => n + 1) }
      else setText(current.slice(0, text.length + (del ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, del, i, words, enabled])
  return text
}

const lineV = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero({ profile }: { profile: Profile }) {
  const reduce = useReducedMotion() ?? false
  const typed = useTypewriter(ROLES, !reduce)
  const first = profile.name.split(' ')[0]

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const termY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const termRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 6])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="container hero-grid">
        <div>
          <motion.span className="hero-badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pulse" /> Available for opportunities · Pune, IN
          </motion.span>

          <h1>
            <span className="line"><motion.span style={{ display: 'inline-block' }} custom={0} variants={lineV} initial="hidden" animate="show">Hi, I&apos;m <span className="grad-text">{first}</span></motion.span></span>
            <span className="line"><motion.span style={{ display: 'inline-block' }} custom={1} variants={lineV} initial="hidden" animate="show">I ship reliable</motion.span></span>
            <span className="line"><motion.span style={{ display: 'inline-block' }} custom={2} variants={lineV} initial="hidden" animate="show">software.</motion.span></span>
          </h1>

          <p className="hero-role" aria-live="polite">
            <span className="tag">&lt;role&gt;</span>
            {reduce ? ROLES[0] : <>{typed}<span className="hero-cursor" aria-hidden="true" /></>}
            <span className="tag">&lt;/role&gt;</span>
          </p>

          <motion.p className="hero-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            {profile.summary}
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
            <Magnetic><a className="btn btn-primary" href="#projects">View my work <ArrowRight size={16} /></a></Magnetic>
            <Magnetic><a className="btn" href="#contact"><Mail size={16} /> Get in touch</a></Magnetic>
            <a className="btn" href="/Aryan_Jadhav_Resume.pdf" target="_blank" rel="noopener"><FileDown size={16} /> Résumé</a>
          </motion.div>

          <div className="hero-socials">
            <Magnetic strength={0.5}><a className="icon-link" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><Github size={20} /></a></Magnetic>
            <Magnetic strength={0.5}><a className="icon-link" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin size={20} /></a></Magnetic>
            <Magnetic strength={0.5}><a className="icon-link" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20} /></a></Magnetic>
          </div>
        </div>

        <div className="hero-right">
        <motion.div style={{ y: termY, rotate: termRot }} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
          <div className="terminal glass">
            <div className="terminal-bar">
              <span className="tdot r" /><span className="tdot y" /><span className="tdot g" />
              <span className="title">~/aryan — developer.ts</span>
            </div>
            <div className="terminal-body">
              <div><span className="prompt">➜</span> <span className="fn">whoami</span></div>
              <div><span className="key">const</span> dev = {'{'}</div>
              <div>{'  '}<span className="key">name</span>: <span className="str">&apos;{profile.name}&apos;</span>,</div>
              <div>{'  '}<span className="key">role</span>: <span className="str">&apos;Software Developer&apos;</span>,</div>
              <div>{'  '}<span className="key">stack</span>: [<span className="str">&apos;C#&apos;</span>, <span className="str">&apos;.NET&apos;</span>, <span className="str">&apos;React&apos;</span>, <span className="str">&apos;SQL&apos;</span>],</div>
              <div>{'  '}<span className="key">focus</span>: <span className="str">&apos;scalable backends&apos;</span>,</div>
              <div>{'  '}<span className="key">openToWork</span>: <span className="fn">true</span>,</div>
              <div>{'}'}</div>
              <div><span className="com">// let&apos;s build something solid →</span></div>
            </div>
          </div>
        </motion.div>

          <motion.div className="hero-stats glass" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="hstat"><div className="n grad-text"><Counter to={3} suffix="+" /></div><div className="l">roles &amp; internships</div></div>
            <div className="hstat"><div className="n grad-text"><Counter to={4} /></div><div className="l">shipped projects</div></div>
            <div className="hstat"><div className="n grad-text"><Counter to={2} /></div><div className="l">backend ecosystems</div></div>
          </motion.div>
        </div>
      </div>

      <div className="scroll-cue"><span>scroll</span><span className="bar" /></div>
    </section>
  )
}
