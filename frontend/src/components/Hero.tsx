import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDown, FileDown } from 'lucide-react'
import { motion, useReducedMotion } from './motion'
import type { Profile } from '../types'

const ROLES = [
  '.NET Backend Developer',
  'ASP.NET Core Engineer',
  'Full-Stack Web Developer',
  'Clean-Code Advocate',
]

function useTypewriter(words: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? '' : words[0])
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const current = words[i % words.length]
    const done = text === current
    const empty = text === ''
    let delay = del ? 45 : 85
    if (done && !del) delay = 1600
    if (empty && del) delay = 300

    const t = setTimeout(() => {
      if (done && !del) setDel(true)
      else if (empty && del) {
        setDel(false)
        setI((n) => n + 1)
      } else {
        setText(current.slice(0, text.length + (del ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, del, i, words, enabled])

  return text
}

export default function Hero({ profile }: { profile: Profile }) {
  const reduce = useReducedMotion() ?? false
  const typed = useTypewriter(ROLES, !reduce)

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-status"><span className="pulse" aria-hidden="true" /> Available for opportunities</span>
          <h1>
            Hi, I&apos;m <span className="accent">{profile.name.split(' ')[0]}</span>.<br />
            I ship reliable software.
          </h1>
          <p className="hero-role" aria-live="polite">
            {reduce ? ROLES[0] : <>{typed}<span className="hero-cursor" aria-hidden="true">&nbsp;</span></>}
          </p>
          <p className="hero-lead">{profile.summary}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects"><ArrowDown size={16} /> View my work</a>
            <a className="btn btn-ghost" href="#contact"><Mail size={16} /> Get in touch</a>
            <a className="btn btn-ghost" href="/Aryan_Jadhav_Resume.pdf" target="_blank" rel="noopener"><FileDown size={16} /> Résumé</a>
          </div>
          <div className="hero-socials">
            <a className="icon-link" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><Github size={20} /></a>
            <a className="icon-link" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a className="icon-link" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20} /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="terminal">
            <div className="terminal-bar">
              <span className="tdot r" /><span className="tdot y" /><span className="tdot g" />
              <span className="title">developer.ts</span>
            </div>
            <div className="terminal-body">
              <div className="ln"><span className="prompt">$</span> <span className="cmd">whoami</span></div>
              <div className="ln"><span className="key">const</span> dev = {'{'}</div>
              <div className="ln">{'  '}<span className="key">name</span>: <span className="str">&apos;{profile.name}&apos;</span>,</div>
              <div className="ln">{'  '}<span className="key">role</span>: <span className="str">&apos;Software Developer&apos;</span>,</div>
              <div className="ln">{'  '}<span className="key">stack</span>: [<span className="str">&apos;C#&apos;</span>, <span className="str">&apos;.NET&apos;</span>, <span className="str">&apos;React&apos;</span>, <span className="str">&apos;SQL&apos;</span>],</div>
              <div className="ln">{'  '}<span className="key">based</span>: <span className="str">&apos;Pune, IN&apos;</span>,</div>
              <div className="ln">{'  '}<span className="key">openToWork</span>: <span className="str">true</span>,</div>
              <div className="ln">{'}'}</div>
              <div className="ln"><span className="com">// let&apos;s build something solid →</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
