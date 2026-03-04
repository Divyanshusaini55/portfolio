import { FileDown, Github, Linkedin } from "lucide-react"

export function Header() {
  const playSound = () => {
    const audio = new Audio('/fahhhhh.mp3')
    audio.play()
  }

  return (
    <header className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img
            src="/profile.png"
            alt="Divyanshu Saini"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3 items-center">
          <a
            href="https://github.com/Divyanshusaini55"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/divyanshu47"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-sans font-medium mb-4 tracking-tight">
        𓀛 divyanshu saini
      </h1>
      
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <span className="text-primary font-mono text-sm">Software Engineer</span>
        <span className="text-border">|</span>
        <span className="font-mono text-sm"> Machine Learning Student</span>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-6">
        {"Here's my digital coordinates."}
      </p>
      
      <a
        href="/resume.pdf"
        download
        onClick={playSound}
        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-mono text-sm"
      >
        <FileDown className="w-4 h-4" />
        download resume
      </a>
    </header>
  )
}
