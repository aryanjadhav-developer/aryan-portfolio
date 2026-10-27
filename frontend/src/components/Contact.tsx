import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, Loader2 } from 'lucide-react'
import { Reveal, SectionHeading } from './motion'
import RobotMascot from './RobotMascot'
import { sendContact } from '../lib/api'
import type { Profile } from '../types'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [note, setNote] = useState('')

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending'); setErrors({}); setNote('')
    const res = await sendContact(form)
    if (res.ok) { setStatus('ok'); setNote(res.message); setForm({ name: '', email: '', subject: '', message: '' }) }
    else { setStatus('error'); setErrors(res.errors ?? {}); setNote(res.message) }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading idx="05 / contact" title={<>Let&apos;s <span className="grad-text-warm">build</span> something</>} />
        <div className="contact-wrap">
          <Reveal>
            <div className="contact-cta">
              <h2>Have a role, a project, or just want to say hi?</h2>
              <p className="sub" style={{ margin: 0 }}>Drop a message — it lands straight in my inbox.</p>
              <div className="contact-info">
                <a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
                <a href={profile.github} target="_blank" rel="noopener"><Github size={16} /> github.com/aryanjadhav-developer</a>
                <a href={profile.linkedin} target="_blank" rel="noopener"><Linkedin size={16} /> linkedin.com/in/aryan-jadhav07</a>
                <span style={{ color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', padding: '0.5rem 0' }}><MapPin size={16} /> {profile.location}</span>
              </div>
              <div className="contact-robot"><RobotMascot size={150} /></div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="glass spot pad-lg" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" value={form.name} onChange={update('name')} autoComplete="name" required />
                {errors.name && <div className="err">{errors.name[0]}</div>}
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" value={form.email} onChange={update('email')} autoComplete="email" required />
                {errors.email && <div className="err">{errors.email[0]}</div>}
              </div>
              <div className="field">
                <label htmlFor="c-subject">Subject <span style={{ color: 'var(--text-dim)' }}>(optional)</span></label>
                <input id="c-subject" value={form.subject} onChange={update('subject')} />
              </div>
              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" value={form.message} onChange={update('message')} required minLength={10} />
                {errors.message && <div className="err">{errors.message[0]}</div>}
              </div>
              <button className="btn btn-primary btn-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? <><Loader2 size={16} className="spin" /> Sending…</> : <><Send size={16} /> Send message</>}
              </button>
              {status === 'sending' && <p className="form-note" style={{ color: 'var(--text-dim)' }} role="status">Sending… the server may take ~30s to wake on first send.</p>}
              {note && status !== 'sending' && <p className={`form-note ${status === 'ok' ? 'ok' : 'bad'}`} role="status">{note}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
