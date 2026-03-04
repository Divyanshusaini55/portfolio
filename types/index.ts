// Component prop types
export interface SocialLink {
  href: string
  label: string
  ariaLabel: string
}

export interface Project {
  title: string
  description: string
  details: string[]
  link: string
  technologies?: string[]
  startDate?: string
  endDate?: string
}

export interface Experience {
  role: string
  company: string
  duration: string
  highlights: string[]
  location?: string
}

export interface Education {
  degree: string
  school: string
  field: string
  startYear: number
  endYear: number | 'Present'
  description?: string
  gpa?: string
}

export interface Contact {
  email: string
  phone?: string
  location?: string
  website?: string
}

// Utility types
export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'instagram' | 'email'
