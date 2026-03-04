import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { spaceGrotesk, crimsonPro, jetbrainsMono } from './fonts'
import { OnekoLoader } from './oneko-loader'
import './global.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// Build domain dynamically based on environment
const getDomain = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  return domain || 'https://divyanshu-portfolio.pages.github.io'
}

export const metadata: Metadata = {
  title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
  description: 'Personal portfolio of Divyanshu Saini - Full Stack Software Engineer, Machine Learning Student at IIT Madras. Specializing in AI, LLMs, and Data Science.',
  keywords: ['Developer', 'Machine Learning', 'Full Stack', 'React', 'Next.js', 'TypeScript', 'AI', 'Data Science'],
  authors: [{ name: 'Divyanshu Saini' }],
  creator: 'Divyanshu Saini',
  generator: 'Next.js',
  icons: {
    icon: '/profile.png',
    apple: '/profile.png',
    shortcut: '/profile.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getDomain(),
    siteName: 'Divyanshu Saini Portfolio',
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Personal portfolio showcasing projects in Full Stack Development, Machine Learning, and AI',
    images: [
      {
        url: `${getDomain()}/profile.png`,
        width: 1200,
        height: 630,
        alt: 'Divyanshu Saini',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Personal portfolio of a full stack developer and ML engineer',
    creator: '@dvyanshux',
    images: [`${getDomain()}/profile.png`],
  },
  robots: 'index, follow',
  alternates: {
    canonical: getDomain(),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en"
      className={`${spaceGrotesk.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
        <OnekoLoader />
      </body>
    </html>
  )
}
