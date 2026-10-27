import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Home">
          <span className="b1">{'</>'}</span> Aryan<span className="b1"> . </span>Developer
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a href="#contact" className="nav-cta">Let&apos;s talk</a>
        </nav>
        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
