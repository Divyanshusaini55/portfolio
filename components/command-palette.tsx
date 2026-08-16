'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Search,
  BookOpen,
  FileText,
  Home,
  Lock,
  Mail,
  Sun,
  Moon,
  Download,
  Github,
  Linkedin,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Code2,
  Briefcase,
  GraduationCap,
  Terminal,
  Quote
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  category: 'Notes' | 'Navigation' | 'Actions' | 'Social' | 'Terminal'
  action: () => void
  keywords?: string[]
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const copyEmail = () => {
    navigator.clipboard.writeText('divyanshusai47@gmail.com')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setIsOpen(false)
    }, 1200)
  }

  const items: CommandItem[] = React.useMemo(() => [
    // Notes
    {
      id: 'note-knn',
      title: 'K-Nearest Neighbors (KNN)',
      subtitle: 'Mathematical intuition & algorithm notes',
      icon: BookOpen,
      category: 'Notes',
      action: () => { router.push('/notes/knn'); setIsOpen(false) },
      keywords: ['machine learning', 'classification', 'ml', 'math', 'distance']
    },
    {
      id: 'note-lr',
      title: 'Linear Regression',
      subtitle: 'Cost functions, gradients & optimization',
      icon: BookOpen,
      category: 'Notes',
      action: () => { router.push('/notes/lr'); setIsOpen(false) },
      keywords: ['gradient descent', 'loss', 'optimization', 'math']
    },
    {
      id: 'note-cot',
      title: 'Chain-of-Thought Prompting',
      subtitle: 'Reasoning capabilities in Large Language Models',
      icon: BookOpen,
      category: 'Notes',
      action: () => { router.push('/notes/chain-of-thought'); setIsOpen(false) },
      keywords: ['llm', 'prompt engineering', 'ai', 'reasoning']
    },
    {
      id: 'note-hope',
      title: 'Hope',
      subtitle: 'Personal reflections and philosophy',
      icon: Sparkles,
      category: 'Notes',
      action: () => { router.push('/notes/hope'); setIsOpen(false) },
      keywords: ['philosophy', 'life', 'essay']
    },
    {
      id: 'note-me',
      title: 'Me & Background',
      subtitle: 'Poetry, roots & principles',
      icon: BookOpen,
      category: 'Notes',
      action: () => { router.push('/notes/me'); setIsOpen(false) },
      keywords: ['about', 'bio', 'poetry']
    },

    // Navigation
    {
      id: 'nav-home',
      title: 'Home',
      subtitle: 'Go to main portfolio overview',
      icon: Home,
      category: 'Navigation',
      action: () => { router.push('/'); setIsOpen(false) }
    },
    {
      id: 'nav-notes',
      title: 'All Notes & Essays',
      subtitle: 'Explore technical write-ups and essays',
      icon: BookOpen,
      category: 'Navigation',
      action: () => { router.push('/notes'); setIsOpen(false) }
    },
    {
      id: 'nav-resume',
      title: 'Resume View',
      subtitle: 'Interactive & printable developer resume',
      icon: FileText,
      category: 'Navigation',
      action: () => { router.push('/resume'); setIsOpen(false) }
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      subtitle: 'Jump to architecture & engineering projects',
      icon: Code2,
      category: 'Navigation',
      action: () => { 
        router.push('/#projects')
        setIsOpen(false)
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    },
    {
      id: 'nav-experience',
      title: 'Work Experience',
      subtitle: 'Jump to professional history & internships',
      icon: Briefcase,
      category: 'Navigation',
      action: () => { 
        router.push('/#experience')
        setIsOpen(false)
        setTimeout(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    },
    {
      id: 'nav-education',
      title: 'Education',
      subtitle: 'IIT Madras & B.Tech background',
      icon: GraduationCap,
      category: 'Navigation',
      action: () => { 
        router.push('/#education')
        setIsOpen(false)
        setTimeout(() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    },
    {
      id: 'nav-space',
      title: 'Personal Space (/space)',
      subtitle: 'Private roadmap tracker & visitor inbox',
      icon: Lock,
      category: 'Navigation',
      action: () => { router.push('/space'); setIsOpen(false) },
      keywords: ['gate', 'roadmap', 'private', 'inbox']
    },

    // Actions
    {
      id: 'action-copy-email',
      title: copied ? 'Copied to Clipboard!' : 'Copy Email Address',
      subtitle: 'divyanshusai47@gmail.com',
      icon: copied ? Check : Copy,
      category: 'Actions',
      action: copyEmail,
      keywords: ['contact', 'mail', 'email']
    },
    {
      id: 'action-send-email',
      title: 'Send Direct Email',
      subtitle: 'Open default email app to write to Divyanshu',
      icon: Mail,
      category: 'Actions',
      action: () => {
        window.location.href = 'mailto:divyanshusai47@gmail.com'
        setIsOpen(false)
      },
      keywords: ['contact', 'mail', 'email', 'message']
    },
    {
      id: 'action-download-resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Download latest resume document',
      icon: Download,
      category: 'Actions',
      action: () => {
        window.open('/divyanshu_saini_resume.pdf', '_blank')
        setIsOpen(false)
      }
    },
    {
      id: 'action-toggle-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle color scheme',
      icon: theme === 'dark' ? Sun : Moon,
      category: 'Actions',
      action: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        setIsOpen(false)
      }
    },

    // Terminal / CLI Commands
    {
      id: 'cli-neofetch',
      title: 'neofetch --specs',
      subtitle: 'System specs: Next.js 16 · PyTorch · Python · Django · IIT Madras',
      icon: Terminal,
      category: 'Terminal',
      action: () => {
        alert("Divyanshu Saini\n━━━━━━━━━━━━━━━━━━━━\nOS: macOS / Linux (Ubuntu)\nEducation: IIT Madras (Data Science) + B.Tech (AIML)\nCore: Next.js 16, TypeScript, Tailwind 4, Python, PyTorch, Django, Redis, Docker, Celery\nStatus: Engineering AI systems & preparing for GATE 2027");
        setIsOpen(false);
      },
      keywords: ['neofetch', 'specs', 'system', 'hardware', 'stack', 'terminal', 'cli']
    },
    {
      id: 'cli-gate',
      title: 'gate --countdown',
      subtitle: 'Open private GATE 2027 milestone tracker (/space)',
      icon: Terminal,
      category: 'Terminal',
      action: () => { router.push('/space'); setIsOpen(false) },
      keywords: ['gate', '2027', 'roadmap', 'exam', 'iit', 'tracker']
    },
    {
      id: 'cli-quote',
      title: 'quote --random',
      subtitle: '“vo to khushbu hai hawaon mein bikhar jaega...”',
      icon: Quote,
      category: 'Terminal',
      action: () => { router.push('/notes/me'); setIsOpen(false) },
      keywords: ['quote', 'poetry', 'shayari', 'urdu', 'ambrish', 'parveen']
    },
    {
      id: 'cli-whoami',
      title: 'whoami',
      subtitle: 'Full Stack & Machine Learning Engineer from Noida, India',
      icon: Terminal,
      category: 'Terminal',
      action: () => { 
        router.push('/#about')
        setIsOpen(false)
        setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
      },
      keywords: ['whoami', 'bio', 'about', 'divyanshu']
    },

    // Social
    {
      id: 'social-github',
      title: 'GitHub Profile',
      subtitle: 'github.com/Divyanshusaini55',
      icon: Github,
      category: 'Social',
      action: () => { window.open('https://github.com/Divyanshusaini55', '_blank'); setIsOpen(false) }
    },
    {
      id: 'social-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/divyanshu47',
      icon: Linkedin,
      category: 'Social',
      action: () => { window.open('https://linkedin.com/in/divyanshu47', '_blank'); setIsOpen(false) }
    }
  ], [router, theme, setTheme, copied])

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items
    const lowerQuery = query.toLowerCase().trim()
    return items.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery)
      const matchSubtitle = item.subtitle?.toLowerCase().includes(lowerQuery)
      const matchKeywords = item.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
      const matchCategory = item.category.toLowerCase().includes(lowerQuery)
      return matchTitle || matchSubtitle || matchKeywords || matchCategory
    })
  }, [items, query])

  // Keyboard shortcut listener (Cmd+K, Ctrl+K, /)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
        return
      }

      // Quick slash trigger when not in an input
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName) &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault()
        setIsOpen(true)
        return
      }

      // If open, handle arrows and enter
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex])

  // Reset selectedIndex when filter changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <>
      {/* Top Navbar Trigger Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
          Search (⌘K)
        </span>
      </button>

      {/* Command Palette Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] sm:pt-[18vh] p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 bg-secondary/20">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search notes..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-secondary rounded border border-border shrink-0">
                ESC
              </kbd>
            </div>

            {/* Items List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex
                  const Icon = item.icon

                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected 
                          ? 'bg-secondary text-foreground shadow-xs' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-lg border transition-colors ${
                          isSelected 
                            ? 'bg-background border-border text-primary' 
                            : 'bg-secondary/40 border-transparent text-muted-foreground'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold font-sans text-foreground truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] font-mono text-muted-foreground truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-primary animate-in slide-in-from-left-1 duration-150" />
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2.5 bg-secondary/30 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-background border border-border rounded text-[10px]">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-background border border-border rounded text-[10px]">↓</kbd> to navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↵</kbd> to select
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/70">
                Divyanshu Saini
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
