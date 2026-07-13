import Link from 'next/link'

export function About() {
  return (
    <section className="mb-16" id="about">
      <h2 className="text-lg font-sans font-medium mb-4 text-foreground flex items-center gap-2">
        <span className="text-primary" aria-hidden="true">𖤊</span> 
        <span>About</span>
      </h2>

      <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
        <p>
          B.Tech CSE graduate and currently pursuing B.S. (Online) from IIT Madras. I work in 
          Machine Learning, Artificial Intelligence, LLMs, and Data Science to turn ideas into 
          intelligent systems and data-driven solutions. Always up for building something interesting 
          — feel free to reach out!
        </p>

        <p>
          An introvert who finds beauty in minimalism.
        </p>

        <div className="font-mono font-medium text-sm space-y-1 pl-4 border-l-2 border-border">
          <p className="text-muted-foreground/80">
            <span aria-hidden="true">{">"}</span> from local, got lost in localhost
          </p>
          <p className="text-muted-foreground/80">
            <span aria-hidden="true">{">"}</span> turning caffeine into bugs, one bug at a time
          </p>
          <p className="text-muted-foreground/80">
            <span aria-hidden="true">{">"}</span> lone and peaceful.
          </p>
        </div>

        <p className="text-sm">
          faith {"->"}
          <Link
            href="/shiv"
            className="text-primary ml-2 hover:underline inline-block focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="View consciousness exploration"
          >
            [consciousness]
          </Link>
        </p>
      </div>
    </section>
  )
}
