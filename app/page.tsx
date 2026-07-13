import { Metadata } from 'next'
import { Header } from '@/components/portfolio/header'
import { About } from '@/components/portfolio/about'
import { Education } from '@/components/portfolio/education'
import { Experience } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { Interests } from '@/components/portfolio/interests'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'
import { FadeIn } from '@/components/fade-in'

export const metadata: Metadata = {
  title: {
    absolute: 'Divyanshu Saini',
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
        <FadeIn delay={0.1}>
          <Header />
        </FadeIn>
        <FadeIn delay={0.2}>
          <About />
        </FadeIn>
        <FadeIn delay={0.3}>
          <Education />
        </FadeIn>
        <FadeIn delay={0.4}>
          <Experience />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Projects />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Interests />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Contact />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Footer />
        </FadeIn>
      </div>
    </main>
  )
}
