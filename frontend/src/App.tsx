import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import { fetchProfile, fetchProjects } from './lib/api'
import { fallbackProfile, fallbackProjects } from './data/portfolio'
import type { Profile, Project } from './types'

export default function App() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile)
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [apiLive, setApiLive] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all([fetchProfile(), fetchProjects()]).then(([p, pr]) => {
      if (!active) return
      setProfile(p.data); setProjects(pr.data); setApiLive(p.live && pr.live)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Background />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero profile={profile} />
        <Marquee />
        <About />
        <Skills profile={profile} />
        <Projects projects={projects} />
        <Experience profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} apiLive={apiLive} />
      {showTop && (
        <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      )}
    </>
  )
}
