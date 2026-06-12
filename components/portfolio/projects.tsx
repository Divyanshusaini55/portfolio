import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "AI Exam Engine - Full Stack AI Platform",
    description: "Built an AI-powered exam preparation platform using Django, Next.js, and Gemini API that automatically extracts questions from PDFs and generates AI explanations for users.",
    details: [
      "Designed a scalable REST API system with authentication",
      "Implemented category-based exam flow and leaderboard functionality",
      "Integrated real-time result analytics and performance tracking",
    ],
    link: "https://ai-exam-engine.vercel.app",
  },
  {
    title: "Data Analysis Agent",
    description: "Engineered an intelligent agent that automates end-to-end data analysis, from loading datasets to generating insights and visualizations.",
    details: [
      "Automated data loading and preprocessing pipeline",
      "Generated intelligent insights using AI models",
      "Created dynamic visualization components",
    ],
    link: "https://tds-project-2-divyanshusaini.vercel.app/",
  },
  {
    title: "Whatsapp Chat Analyser",
    description: "Developed a data visualization tool to analyze exported WhatsApp chats, providing insights on user activity, message trends, and emoji frequency.",
    details: [
      "Parsed and processed chat export files",
      "Generated activity heatmaps and trend analysis",
      "Built emoji frequency and sentiment analysis features",
    ],
    link: "https://whatsapp-chat-analysis-2fkvmkwj8vfszue-duehnxn.streamlit.app/",
  },
  {
    title: "LLM Agent",
    description: "Created a browser-based agent capable of combining natural language reasoning with external tools like search engines and APIs.",
    details: [
      "Integrated natural language processing capabilities",
      "Connected external APIs and search engines",
      "Implemented multi-step reasoning workflows",
    ],
    link: "https://llm-agent-plum.vercel.app/",
  },
]

export function Projects() {
  return (
    <section className="mb-16" id="projects">
      <h2 className="text-lg font-sans font-medium mb-6 text-foreground flex items-center gap-2">
        <span className="text-primary">𖤊</span> Projects
      </h2>
      
      <div className="space-y-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-border/50 block"
          >
            <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-[1.5] group-hover:shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all duration-300 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-2">
                [{project.title}]
                <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {project.description}
              </p>
              {project.details && (
                <ul className="mt-4 space-y-1.5">
                  {project.details.map((detail, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary/60 flex-shrink-0 mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </a>
        ))}
      </div>
      
      <a 
        href="https://github.com/Divyanshusaini55"
        target="_blank"
        rel="noopener noreferrer"
        className="block group mt-8 p-5 bg-secondary/30 rounded-2xl border border-transparent transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 hover:border-border/50"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-mono">*</span> pieces {"I'm"} developing
        </p>
        <div className="inline-flex items-center gap-2 mt-2 font-mono text-sm text-foreground group-hover:text-primary transition-colors">
          [Explore GitHub]
          <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </a>
    </section>
  )
}
