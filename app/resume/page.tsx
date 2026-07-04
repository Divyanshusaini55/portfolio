import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume | Divyanshu Saini',
  description: 'View my resume',
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-[794px] mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Top Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-8 sm:mb-12">
          <h1 className="text-2xl md:text-2xl font-sans font-bold tracking-tight">
            Resume
          </h1>
          <a
            href="/"
            download="divyanshu_saini_resume.pdf"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-95"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>

        {/* HYBRID MEME RESUME CONTAINER */}
        <div className="w-full max-w-[794px] mx-auto aspect-[210/297] bg-white p-4 sm:p-6 md:p-10 rounded-sm shadow-2xl flex flex-col relative overflow-hidden border border-gray-200 font-serif text-gray-900">

          {/* Resume Header */}
          <div className="text-center mb-2 sm:mb-4 border-b border-gray-300 pb-2 sm:pb-4">
            <h1 className="text-xl sm:text-3xl font-bold mb-1">Divyanshu Saini</h1>
            <p className="text-[9px] sm:text-xs text-gray-700 flex flex-wrap justify-center items-center gap-1 sm:gap-2">
              <span>Noida</span>
              <span>|</span>
              <a href="mailto:divyanshusai47@gmail.com" className="hover:underline text-blue-800">divyanshusai47@gmail.com</a>
              <span>|</span>
              <span>+91 91930 05455</span>
              <span>|</span>
              <a href="https://linkedin.com/in/divyanshu47" className="hover:underline text-blue-800">Linkedin</a>
              <span>|</span>
              <a href="https://github.com/Divyanshusaini55" className="hover:underline text-blue-800">Github</a>
              <span>|</span>
              <a href="https://divyanshusaini.me" className="hover:underline text-blue-800">Web</a>
            </p>
          </div>

          {/* Education */}
          <div className="mb-2 sm:mb-4">
            <h2 className="text-sm sm:text-lg font-bold border-b border-gray-800 uppercase mb-1 sm:mb-2">Education</h2>
            
            <div className="mb-1 sm:mb-2">
              <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                <span className="max-w-[70%]">Indian Institute of Technology, <span className="font-normal italic">B.S in Data Science and Application</span></span>
                <span className="text-right">Madras, TN</span>
              </div>
              <div className="flex justify-between items-start italic text-[8px] sm:text-xs text-gray-700">
                <span>CGPA: 7.32</span>
                <span>Sep 2022 – Dec 2026</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                <span className="max-w-[70%]">G L Bajaj Institute of Technology, <span className="font-normal italic">B.Tech in CSE(AIML)</span></span>
                <span className="text-right">Greater Noida, UP</span>
              </div>
              <div className="flex justify-between items-start italic text-[8px] sm:text-xs text-gray-700">
                <span>CGPA: 7.51</span>
                <span>Sep 2021 – Jul 2025</span>
              </div>
            </div>
          </div>

          {/* Skills (Clear Part) */}
          <div className="mb-1">
            <h2 className="text-sm sm:text-lg font-bold border-b border-gray-800 uppercase mb-1 sm:mb-2">Skills</h2>
            <ul className="text-[9px] sm:text-xs space-y-0.5 sm:space-y-1">
              <li><span className="font-bold">Languages:</span> Python, Java, C, JavaScript, SQL, PostgreSQL</li>
              <li><span className="font-bold">Libraries/Frameworks:</span> Django, FastAPI, React, Next.js, NumPy, Pandas, Matplotlib, Scikit-learn, PyTorch</li>
            </ul>
          </div>

          {/* Locked / Blurred Content Area */}
          <div className="relative flex-1 flex flex-col mt-1">

            {/* Blurred out text to look like locked content */}
            <div className="blur-[4px] sm:blur-[5px] opacity-40 select-none pointer-events-none pb-8">
              <ul className="text-[9px] sm:text-xs space-y-0.5 sm:space-y-1 mb-2 sm:mb-4">
                <li><span className="font-bold">Tools / Platforms:</span> Git, Docker, GCP, AWS</li>
                <li><span className="font-bold">Concepts:</span> GenAI, ADK, LLMs, REST APIs, DBMS, OOPS, Data Structures & Algorithms</li>
              </ul>
              
              {/* Experience */}
              <h2 className="text-sm sm:text-lg font-bold border-b border-gray-800 uppercase mb-1 sm:mb-2">Experience</h2>
              <div className="mb-2 sm:mb-4">
                <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                  <span>Capri Global Capital Limited <span className="font-normal italic">- Full Stack Developer Intern</span></span>
                  <span>Feb 2026</span>
                </div>
                <ul className="list-disc list-outside ml-3 sm:ml-4 text-[9px] sm:text-xs mt-0.5 sm:mt-1 text-gray-700 space-y-0 sm:space-y-0.5">
                  <li>Worked on a Loan Management System (LMS), a core fintech platform used for managing loan processing and business operations.</li>
                  <li>Collaborated with the development team to integrate frontend and backend services, debug issues, and optimize application performance.</li>
                </ul>
              </div>

              {/* Projects */}
              <h2 className="text-sm sm:text-lg font-bold border-b border-gray-800 uppercase mb-1 sm:mb-2">Projects</h2>
              
              <div className="mb-2 sm:mb-3">
                <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                  <span>ExamIntel- Full Stack AI Platform</span>
                </div>
                <p className="italic text-[8px] sm:text-xs text-gray-700 mb-0.5 sm:mb-1">Django, Next.js, PostgreSQL, LLM, Redis, Celery, Langgraph, Flower, Docker</p>
                <ul className="list-disc list-outside ml-3 sm:ml-4 text-[9px] sm:text-xs text-gray-700 space-y-0 sm:space-y-0.5">
                  <li>Built an AI-powered exam preparation platform using Django, Next.js, and Gemini API that automatically extracts questions from PDFs and generates AI explanations for users.</li>
                  <li>Designed a scalable REST API system with authentication, category-based exam flow, leaderboard, and real-time result analytics, improving user engagement and navigation experience.</li>
                </ul>
              </div>

              <div className="mb-2 sm:mb-3">
                <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                  <span>WhatsApp Chat Analyser</span>
                </div>
                <p className="italic text-[8px] sm:text-xs text-gray-700 mb-0.5 sm:mb-1">Python, Pandas, NLTK, Streamlit, Regex</p>
                <ul className="list-disc list-outside ml-3 sm:ml-4 text-[9px] sm:text-xs text-gray-700 space-y-0 sm:space-y-0.5">
                  <li>Developed a data visualization tool to analyze exported WhatsApp chats, providing insights on user activity, message trends, and emoji frequency.</li>
                  <li>Implemented complex Regex patterns to parse unstructured chat logs and utilized Pandas for efficient data manipulation, allowing users to visualize communication patterns instantly.</li>
                </ul>
              </div>

              <div className="mb-2 sm:mb-4">
                <div className="flex justify-between items-start font-bold text-[10px] sm:text-sm">
                  <span>LLM Agent</span>
                </div>
                <p className="italic text-[8px] sm:text-xs text-gray-700 mb-0.5 sm:mb-1">JavaScript, HTML/CSS, GenAI APIs</p>
                <ul className="list-disc list-outside ml-3 sm:ml-4 text-[9px] sm:text-xs text-gray-700 space-y-0 sm:space-y-0.5">
                  <li>Created a browser-based agent capable of combining natural language reasoning with external tools like search engines and APIs.</li>
                  <li>Designed a dynamic execution loop where the LLM can trigger JavaScript functions to solve multi-step tasks.</li>
                  <li>Demonstrated advanced prompt engineering and tool-use capabilities in a minimal web interface.</li>
                </ul>
              </div>

              {/* Certification */}
              <h2 className="text-sm sm:text-lg font-bold border-b border-gray-800 uppercase mb-1 sm:mb-2">Certification</h2>
              <ul className="list-disc list-outside ml-3 sm:ml-4 text-[9px] sm:text-xs text-gray-900 space-y-0.5 sm:space-y-1 font-bold">
                <li>Advanced Certificate in Machine Learning and Data Science, IIT Madras</li>
                <li>Deep Learning Using PyTorch, IIT Madras</li>
                <li>Advanced certificate in Programming, IIT Madras</li>
                <li>Supervised Machine Learning: Regression and Classification, Coursera</li>
              </ul>
            </div>
          </div>

          {/* The Punchline Overlay */}
          <div className="absolute inset-0 top-[35%] flex flex-col items-center justify-center z-20">
            <Eye className="w-8 h-8 mb-4 text-gray-900 opacity-80" strokeWidth={1.5} />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-900 text-center px-4">
              Hire me to unlock my full potential
            </h2>
          </div>
        </div>

        {/* 
        ORIGINAL PDF VIEWER CONTAINER (Commented out for later use)
        <div className="w-full aspect-[1/1.414] md:aspect-auto md:h-[900px] bg-white/5 p-2 md:p-4 rounded-xl ring-1 ring-white/10 shadow-2xl flex items-center justify-center mt-8">
          <iframe 
            src="/divyanshu_saini_resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
            className="w-full h-full rounded-lg bg-white"
            title="Resume"
          />
        </div> 
        */}
      </div>
    </main>
  )
}
