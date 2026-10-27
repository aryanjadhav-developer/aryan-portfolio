import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, Loader2 } from 'lucide-react'
import { Reveal } from './motion'
import { sendContact } from '../lib/api'
import type { Profile } from '../types'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [note, setNote] = useState('')

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrors({})
    setNote('')
    const res = await sendContact(form)
    if (res.ok) {
      setStatus('ok')
      setNote(res.message)
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
      setErrors(res.errors ?? {})
      setNote(res.message)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal><span className="eyebrow">05 — Contact</span></Reveal>
        <Reveal delay={0.05}><h2 className="section-title">Let&apos;s build something</h2></Reveal>
        <Reveal delay={0.1}><p className="section-lead">Have a role, a project, or just want to say hi? Drop a message — it lands straight in my inbox.</p></Reveal>

        <div className="contact-grid">
          <Reveal delay={0.1}>
            <div className="contact-info">
              <a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
              <a href={profile.github} target="_blank" rel="noopener"><Github size={16} /> github.com/aryanjadhav-developer</a>
              <a href={profile.linkedin} target="_blank" rel="noopener"><Linkedin size={16} /> linkedin.com/in/aryan-jadhav07</a>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}><MapPin size={16} /> {profile.location}</a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form className="card" onSubmit={onSubmit} noValidate>
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
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? <><Loader2 size={16} className="spin" /> Sending…</> : <><Send size={16} /> Send message</>}
              </button>
              {note && <p className={`form-note ${status === 'ok' ? 'ok' : 'bad'}`} role="status">{note}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
