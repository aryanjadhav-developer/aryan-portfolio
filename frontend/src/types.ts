export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  location: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  summary: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  skills: SkillGroup[]
  experience: Experience[]
  education: Education
  certifications: string[]
}

export interface Project {
  slug: string
  title: string
  summary: string
  highlights: string[]
  tech: string[]
  repoUrl: string | null
  liveUrl: string | null
  featured: boolean
}
