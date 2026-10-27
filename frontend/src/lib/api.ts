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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Posts the contact message. The free-tier API may be asleep and take ~30-50s to
 * wake (or briefly return 502/503), so we retry a few times before giving up.
 */
export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  if (!BASE) {
    return { ok: false, message: 'Contact API is not configured. Email me directly instead.' }
  }

  const maxAttempts = 4
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 60_000)
    try {
      const res = await fetch(`${BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (res.ok) {
        const body = await res.json()
        return { ok: true, message: body.message ?? 'Message sent!' }
      }
      if (res.status === 400) {
        const body = await res.json().catch(() => ({}))
        return { ok: false, errors: body.errors, message: 'Please fix the highlighted fields.' }
      }
      // 502/503/504 = server waking up on Render free tier — retry.
      if ([502, 503, 504].includes(res.status) && attempt < maxAttempts) {
        await sleep(3000)
        continue
      }
      return { ok: false, message: `Something went wrong (HTTP ${res.status}). Please try again.` }
    } catch {
      clearTimeout(timer)
      if (attempt < maxAttempts) {
        await sleep(3000)
        continue
      }
      return { ok: false, message: 'Could not reach the server. Please email me directly instead.' }
    }
  }
  return { ok: false, message: 'Could not reach the server. Please email me directly instead.' }
}
