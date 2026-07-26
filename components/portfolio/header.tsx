'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, BookOpen, Check, Home, FileText, Mail, MessageSquare, X, Send, Loader2 } from 'lucide-react'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState('')

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageContent.trim()) return

    setIsSending(true)
    setSendError('')

    try {
      const res = await fetch('/api/gate-tracker?action=send-public-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim() || 'Anonymous Visitor',
          content: messageContent.trim()
        })
      })

      if (res.ok) {
        setSendSuccess(true)
      } else {
        const data = await res.json()
        setSendError(data.error || 'Failed to send message')
      }
    } catch {
      setSendError('Connection error. Please try again.')
    } finally {
      setIsSending(false)
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Send message"
        >
          <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          send message
        </button>
      </div>

      <SpotifyNowPlaying />

      {/* Message Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-background border border-border rounded-xl p-6 shadow-2xl space-y-4 text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground text-base">Send me a message</h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setSendSuccess(false)
                  setSendError('')
                }}
                className="p-1 text-muted-foreground hover:text-foreground rounded-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sendSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">Message Sent!</h4>
                <p className="text-muted-foreground text-xs font-mono">
                  Thank you! Your note has been delivered to my private space.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setSendSuccess(false)
                    setSenderName('')
                    setMessageContent('')
                  }}
                  className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Your Name or Contact (optional)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name or Contact"
                    className="w-full px-3 py-2 text-sm bg-secondary/40 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Write your message or note..."
                    className="w-full px-3 py-2 text-sm bg-secondary/40 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
                  />
                </div>

                {sendError && (
                  <p className="text-xs text-red-500 font-mono">{sendError}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending || !messageContent.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Note</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
