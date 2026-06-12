'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { FileDown, Github, Linkedin, BookOpen } from 'lucide-react'
import { ProfileZoom } from './profile-zoom'
import { ThemeToggle } from '@/components/theme-toggle'
import { SpotifyNowPlaying } from '@/components/spotify-now-playing'

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/Divyanshusaini55',
    label: 'GitHub',
    Icon: Github,
  },
  {
    href: 'https://linkedin.com/in/divyanshu47',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
] as const

export function Header() {
  const playSound = useCallback(() => {
    try {
      const audio = new Audio('/fahhhhh.mp3')
      audio.volume = 0.5 // Set reasonable default volume
      audio.play().catch((error) => {
        console.warn('Failed to play sound:', error)
      })
    } catch (error) {
      console.warn('Audio playback not supported:', error)
    }
  }, [])

  return (
    <header className="mb-16">
      <div className="flex items-center justify-between mb-8">
        {/* Profile Image */}
        <ProfileZoom
          src="/profile.png"
          alt="Divyanshu Saini - Full Stack Developer"
        />

        {/* Social Links & Theme Toggle */}
        <div className="flex gap-3 items-center">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Visit my ${label} profile`}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-sans font-medium mb-4 tracking-tight">
        divyanshu saini 𓀛
      </h1>

      {/* Role Description */}
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <span className="text-primary font-mono text-sm">Software Engineer</span>
        <span className="text-border">|</span>
        <span className="font-mono text-sm">Machine Learning Enthusiast</span>
      </div>

      {/* Introduction */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {"Here's my digital coordinates."}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <a
          href="/resume.pdf"
          download="Divyanshu_Saini_Resume.pdf"
          onClick={playSound}
          className="group inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 font-mono text-xs md:text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Download my resume"
        >
          <FileDown className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          download resume
        </a>
        <Link
          href="/notes"
          className="group inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/25 active:scale-95 font-mono text-xs md:text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="View my notes"
        >
          <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          view notes
        </Link>
      </div>

      <SpotifyNowPlaying />
    </header>
  )
}
