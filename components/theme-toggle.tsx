"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary w-9 h-9">
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
        Theme
      </span>
    </button>
  )
}
