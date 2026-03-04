export function About() {
  return (
    <section className="mb-16" id="about">
      <h2 className="text-lg font-sans font-medium mb-4 text-foreground flex items-center gap-2">
        <span className="text-primary">###</span> About
      </h2>
      
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>

          B.Tech CSE graduate and currently pursuing B.S. (Online) from IIT Madras. I work in Machine Learning, Artificial Intelligence, LLMs, and Data Science to turn ideas into intelligent systems, data-driven solutions. Always up for building something interesting — feel free to reach out!

        </p>
        
        <p>
          An introvert who finds beauty in minimalism.  
        </p>
        
        <div className="font-mono text-sm space-y-1 pl-4 border-l-2 border-border">
          <p className="text-muted-foreground/80">{">"} from UP11, got lost somewhere in Noida</p>
          <p className="text-muted-foreground/80">{">"} turning caffeine into code, one bug at a time</p>
          <p className="text-muted-foreground/80">{">"} not just training ml models — training muscles too.</p>
        </div>
        
        <p className="text-sm">
          faith {"->"}
          <a
            href="/shiv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary ml-2 hover:underline inline-block"
          >
            [consciousness]
          </a>
        </p>
      </div>
    </section>
  )
}
