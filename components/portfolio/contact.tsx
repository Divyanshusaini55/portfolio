import { Github, Linkedin, Mail, Phone, Instagram } from "lucide-react"

function XIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.865 6.694H2.556l7.73-8.835L1.488 2.25h6.687l4.622 6.122 5.313-6.122zM17.55 19.69h1.863L6.305 4.286H4.332l13.218 15.404z" />
    </svg>
  )
}

export function Contact() {
  return (
    <section className="mb-16" id="contact">
      <h2 className="text-lg font-sans font-medium mb-6 text-foreground flex items-center gap-2">
        <span className="text-primary">###</span> Contact
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">
            <span className="text-primary font-mono">*</span> my contacts
          </p>
          <div className="space-y-3">
            <a 
              href="mailto:divyanshusai47@email.com"
              className="flex items-center gap-3 font-mono text-sm text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              [mail me]
            </a>
            <p className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              +91 9193005455
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">
            <span className="text-primary font-mono">*</span> links
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Divyanshusaini55"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/divyanshu47"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/dvyanshusaini"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/dvyanshux"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              aria-label="X"
            >
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
