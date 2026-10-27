import type { Profile, Project } from '../types'
import { fallbackProfile, fallbackProjects } from '../data/portfolio'

const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

async function getJson<T>(path: string, fallback: T): Promise<{ data: T; live: boolean }> {
  if (!BASE) return { data: fallback, live: false }
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { data: (await res.json()) as T, live: true }
  } catch {
    // Cold start / offline / CORS — fall back to bundled data so the page still renders.
    return { data: fallback, live: false }
  }
}

export const fetchProfile = () => getJson<Profile>('/api/profile', fallbackProfile)
export const fetchProjects = () => getJson<Project[]>('/api/projects', fallbackProjects)

export interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; errors?: Record<string, string[]>; message: string }

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  if (!BASE) {
    return { ok: false, message: 'Contact API is not configured. Email me directly instead.' }
  }
  try {
    const res = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const body = await res.json()
      return { ok: true, message: body.message ?? 'Message sent!' }
    }
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}))
      return { ok: false, errors: body.errors, message: 'Please fix the highlighted fields.' }
    }
    return { ok: false, message: `Something went wrong (HTTP ${res.status}). Try again later.` }
  } catch {
    return { ok: false, message: 'Could not reach the server. Please try again shortly.' }
  }
}
