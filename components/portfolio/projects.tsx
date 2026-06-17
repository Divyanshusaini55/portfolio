import { ExternalLink } from "lucide-react"
import DiagramModal from "../DiagramModal"
import fs from "fs"
import path from "path"

export type DiagramData = { title?: string, chart: string, type: 'mermaid' | 'markmap' };

const getDiagrams = (filename: string): DiagramData[] => {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'content', 'diagrams', filename), 'utf-8')
    
    // Match all instances of an optional markdown header followed by a mermaid or markmap block
    const regex = /(?:#+\s+(.*?)\n[\s\S]*?)?```(mermaid|markmap)\n([\s\S]*?)```/g;
    const matches = [...content.matchAll(regex)];
    
    if (matches.length > 0) {
      return matches.map((m) => ({
        title: m[1] ? m[1].trim() : undefined,
        type: m[2] as 'mermaid' | 'markmap',
        chart: m[3].trim()
      }));
    }
    
    if (content.trim()) {
      return [{ chart: content.trim(), type: 'mermaid' }];
    }
    return []
  } catch (e) {
    return []
  }
}

const projects = [
  {
    title: "ExamIntel - AI-Augmented Assessment Engine",
    description: "Designed and implemented a full-stack educational assessment platform using a decoupled Django REST Framework (DRF) backend and a Next.js App Router frontend, featuring structured LLM-driven document ingestion, real-time student telemetry tracking, and a signal-driven gamification system.",
    details: [
      "Architected a decoupled full-stack platform with a high-concurrency Django REST Framework (DRF) API and a Next.js 14 App Router frontend, implementing token-based authentication and secure session-state management.",
      "Engineered an asynchronous LLM ingestion pipeline using PyPDF2 and Google's Gemini Pro SDK to chunk raw curriculum PDFs into 8KB payloads, utilizing custom retry/backoff wrappers to enforce deterministic JSON output schemas for MCQ and short-answer questions",
      "Orchestrated Stateful AI Agents via LangGraph: Built self-correcting multi-agent state graphs using LangGraph for exam summarization and syllabus parsing; integrated a validation-correction loop that feeds quality feedback back into prompt generators to fix missing sections or schema violations.",
      "Decoupled Heavy Compute via Celery: Offloaded slow Gemini API inference (2s–30s latency) to an asynchronous Celery task worker pool, configuring soft/hard task time limits, custom retry queues, and worker concurrency controls.",
      "Implemented Redis Distributed Locking & Caching: Engineered a custom locking layer in Redis to guarantee task mutual exclusion (avoiding duplicate roadmap/summary generation), while using Redis for fast-read cache invalidation on dynamic resources.",
      "Established Observability with Flower: Configured Flower monitoring dashboards to track worker workloads, queue latencies, active task states, and retry behaviors to audit performance bottlenecks under production loads.",
      "Real-Time Telemetry Pipeline: Built a 5-stage telemetry-processing system (Ingest, Batch Inference, Aggregation, Reporting, and Transaction-Isolated Database Write) that evaluates user attempt vectors to identify performance weaknesses, map concept graphs, and generate syllabus roadmaps.",
      "Developed a concurrency-safe gamification engine using Django ORM signals (post save hooks), mapping user XP, dynamic streak multipliers, and global leaderboard rankings via optimized relational databases.",
      "Orchestrated local environment virtualization using Docker Compose to link Next.js (Node.js), Django (Gunicorn/Python), PostgreSQL 15, and Redis 7, ensuring feature parity across development and production environments.",
    ],
    diagrams: getDiagrams('examintel.md'),
    link: "https://examintel.in",
  },
  {
    title: "Data Analysis Agent",
    description: "Engineered an intelligent agent that automates end-to-end data analysis, from loading datasets to generating insights and visualizations.",
    details: [
      "Automated data loading and preprocessing pipeline",
      "Generated intelligent insights using AI models",
      "Created dynamic visualization components",
    ],
    diagrams: getDiagrams('data-analysis.md'),
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
    diagrams: getDiagrams('whatsapp-chat.md'),
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
    diagrams: getDiagrams('llm-agent.md'),
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
          <div
            key={project.title}
            className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-all duration-300 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-border/50 block"
          >
            <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-[1.5] group-hover:shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all duration-300 flex-shrink-0" />
            <div className="flex-1">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-sm text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                [{project.title}]
                <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="font-serif text-base leading-relaxed text-muted-foreground mt-2">
                {project.description}
              </p>
              {project.details && (
                <ul className="mt-4 space-y-1.5">
                  {project.details.map((detail, index) => (
                    <li key={index} className="font-serif text-[15px] leading-relaxed text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-[7px]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {project.diagrams && project.diagrams.length > 0 && (
                <DiagramModal diagrams={project.diagrams} projectTitle={project.title} />
              )}
            </div>
          </div>
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
