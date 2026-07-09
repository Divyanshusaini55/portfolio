import { Metadata } from 'next'
import { Header } from '@/components/portfolio/header'
import { About } from '@/components/portfolio/about'
import { Education } from '@/components/portfolio/education'
import { Experience } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { Interests } from '@/components/portfolio/interests'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export const metadata: Metadata = {
  title: {
    absolute: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
  },
  description: 'Divyanshu Saini is a Full Stack Software Engineer and Machine Learning Engineer from Noida, India. IIT Madras BS Data Science student. Building AI-powered applications with Django, Next.js, React, and Python.',
  openGraph: {
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Divyanshu Saini is a Full Stack Software Engineer and Machine Learning Engineer. Explore projects, experience, and skills.',
    url: '/',
  },
  twitter: {
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Divyanshu Saini is a Full Stack Software Engineer and Machine Learning Engineer from Noida, India.',
  },
}

export default function Home() {
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
