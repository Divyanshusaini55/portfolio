'use client'

export function Experience() {
  const experiences = [
    {
      role: "Full Stack Intern",
      company: "Capri Global Capital Limited, Noida",
      duration: "Feb 2026 - Present",
      highlights: [
        "𓀋",
      ],
    },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-xl font-sans font-medium mb-8 tracking-tight">
        <span className="text-primary">𖤊</span> Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.role} className="flex items-start gap-4 group">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-125 transition-transform flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-mono text-sm text-foreground">
                  {exp.role}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {exp.company}
              </p>
              <ul className="space-y-1">
                {exp.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary/60 flex-shrink-0">•</span>
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
