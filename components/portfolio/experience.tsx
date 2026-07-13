'use client'

export function Experience() {
  const experiences = [
    {
      role: "Full Stack Intern",
      company: "Capri Global Capital Limited, Noida",
      duration: "Feb 2026 - Present",
      highlights: [
        <span key="badge" className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/20 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
            𓀋
          </span>
        </span>,
      ],
    },
  ]

  return (
    <section id="experience" className="mb-16">
      <h2 className="text-xl font-sans font-medium mb-8 tracking-tight">
        <span className="text-primary">𖤊</span> Experience
      </h2>

      <div className="space-y-2">
        {experiences.map((exp) => (
          <div key={exp.role} className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-[1.5] group-hover:shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all duration-300 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {exp.role}
                </h3>
                <span className="font-mono font-semibold text-xs text-muted-foreground whitespace-nowrap">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {exp.company}
              </p>
              <ul className="space-y-1.5">
                {exp.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm font-medium text-muted-foreground flex items-start">
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
