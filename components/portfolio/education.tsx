export function Education() {
  return (
    <section className="mb-16" id="education">
      <h2 className="text-lg font-sans font-medium mb-6 text-foreground flex items-center gap-2">
        <span className="text-primary">𖤊</span> Education
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4 group">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-125 transition-transform" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <a 
                href="#"
                className="font-mono text-sm text-foreground hover:text-primary transition-colors"
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

        <div className="flex items-start gap-4 group">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-125 transition-transform" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <a 
                href="#"
                className="font-mono text-sm text-foreground hover:text-primary transition-colors"
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
            <span className="text-primary font-mono">skills:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {["Python", "Java", "PyTorch","Scikit-learn","NumPy, Pandas", "HTML", "CSS", "JavaScript", "SQL", "Django", "FastAPI","Git", "Docker", "GCP", "LLMs"].map((skill) => (
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
