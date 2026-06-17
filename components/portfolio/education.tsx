export function Education() {
  return (
    <section className="mb-16" id="education">
      <h2 className="text-lg font-sans font-medium mb-6 text-foreground flex items-center gap-2">
        <span className="text-primary">𖤊</span> Education
      </h2>
      
      <div className="space-y-2">
        <div className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-border/50">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-[1.5] group-hover:shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all duration-300 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <a 
                href="#"
                className="font-mono text-sm text-foreground group-hover:text-primary transition-colors"
              >
                [B.Tech CSE(AIML)]
              </a>
              <span className="font-mono text-xs text-muted-foreground">
                2021 - 2025
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">

            </p>
          </div>
        </div>

        <div className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-border/50">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-[1.5] group-hover:shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all duration-300 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <a 
                href="#"
                className="font-mono text-sm text-foreground group-hover:text-primary transition-colors"
              >
                [B.S (Data Science & Application)]
              </a>
              <span className="font-mono text-xs text-muted-foreground">
                2022 - 2026
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">

            </p>
          </div>
        </div>
        
        <div className="pl-6 mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            <span className="text-primary font-mono font-semibold">skills:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {["Python", "Java", "PyTorch","Scikit-learn","NumPy, Pandas", "HTML", "CSS","React","JavaScript", "SQL", "Django", "FastAPI","Git", "Docker", "GCP", "LLMs"].map((skill) => (
              <span 
                key={skill}
                className="font-mono text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
