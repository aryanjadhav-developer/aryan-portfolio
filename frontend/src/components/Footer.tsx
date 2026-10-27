import type { Profile } from '../types'

export default function Footer({ profile, apiLive }: { profile: Profile; apiLive: boolean }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <small>© {new Date().getFullYear()} {profile.name} · Built with React, framer-motion &amp; ASP.NET Core</small>
        <span className={`api-badge ${apiLive ? 'live' : 'offline'}`}>
          <span className="d" aria-hidden="true" /> API {apiLive ? 'live' : 'static fallback'}
        </span>
      </div>
    </footer>
  )
}
