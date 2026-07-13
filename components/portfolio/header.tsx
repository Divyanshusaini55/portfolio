'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, BookOpen, Check, Home, FileText, Mail } from 'lucide-react'
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

const NAV_LINKS = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Notes', href: '/notes', Icon: BookOpen },
  { label: 'Resume', href: '/resume', Icon: FileText },
]

export function Header() {
  const [copied, setCopied] = useState(false)

  const playSound = useCallback(() => {
    try {
      const audio = new Audio('/fahhhhh.mp3')
      audio.volume = 0.5
      audio.play().catch((error) => {
        console.warn('Failed to play sound:', error)
      })
    } catch (error) {
      console.warn('Audio playback not supported:', error)
    }
  }, [])

  const copyEmail = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText('divyanshusai47@gmail.com')
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = 'divyanshusai47@gmail.com'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <header className="mb-16">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between mb-12 md:mb-16">
        <nav className="flex items-center gap-2 md:gap-3">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.label}
              href={link.href}
              className="group relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={link.label}
            >
              <link.Icon className="w-5 h-5" />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        
        <div className="flex gap-2 items-center">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Visit my ${label} profile`}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
                {label}
              </span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6">
        <ProfileZoom
          src="/profile.png"
          alt="Divyanshu Saini"
          className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-background shadow-xl"
        />
        
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-sans font-bold mb-2 tracking-tight text-foreground flex items-center gap-2">
            divyanshu saini <span className="font-normal text-3xl sm:text-4xl">𓀛</span>
          </h1>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-muted-foreground font-medium text-sm sm:text-[15px]">
            <span>Software Engineer</span>
            <span className="text-border px-1">·</span>
            <span>Machine Learning Enthusiast</span>
            <span className="text-border px-1">·</span>
            <button 
              onClick={copyEmail}
              className="group relative flex items-center justify-center p-1.5 -ml-1.5 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
                {copied ? 'Copied!' : 'divyanshusai47@gmail.com'}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <p className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-lg">
        here's my digital coordinates.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8">
        <Link
          href="/resume"
          onClick={playSound}
          className="group inline-flex items-center gap-2 px-3 py-1 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="View my resume"
        >
          <FileText className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          view resume
        </Link>
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="View my notes"
        >
          <BookOpen className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          view notes
        </Link>
      </div>

      <SpotifyNowPlaying />
    </header>
  )
}
