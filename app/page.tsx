"use client"

import { Header } from "@/components/portfolio/header"
import { About } from "@/components/portfolio/about"
import { Education } from "@/components/portfolio/education"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Interests } from "@/components/portfolio/interests"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        <Header />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Interests />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
