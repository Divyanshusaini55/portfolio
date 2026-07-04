import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { spaceGrotesk, crimsonPro, jetbrainsMono } from './fonts'
import { OnekoLoader } from './oneko-loader'
import { ThemeProvider } from '@/components/theme-provider'
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
const getDomain = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  return domain || 'https://divyanshu-portfolio.pages.github.io'
}

export const metadata: Metadata = {
  metadataBase: new URL(getDomain()),
  title: {
    default: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    template: '%s | Divyanshu Saini',
  },
  description: 'Personal portfolio of Divyanshu Saini - Full Stack Software Engineer, Machine Learning Student at IIT Madras. Specializing in AI, LLMs, and Data Science.',
  keywords: [
    'Divyanshu Saini',
    'Developer',
    'Machine Learning',
    'Full Stack',
    'React',
    'Next.js',
    'TypeScript',
    'AI',
    'Data Science',
    'Software Engineer',
    'Portfolio',
    'IIT Madras'
  ],
  authors: [{ name: 'Divyanshu Saini', url: getDomain() }],
  creator: 'Divyanshu Saini',
  publisher: 'Divyanshu Saini',
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/profile.png',
    apple: '/profile.png',
    shortcut: '/profile.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Divyanshu Saini Portfolio',
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Personal portfolio showcasing projects in Full Stack Development, Machine Learning, and AI',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Divyanshu Saini',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dvyanshux',
    creator: '@dvyanshux',
    title: 'Divyanshu Saini | Full Stack Developer & ML Engineer',
    description: 'Personal portfolio of a full stack developer and ML engineer',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
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
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Divyanshu Saini",
              "url": "https://divyanshusaini.me",
              "jobTitle": "Full Stack Software Engineer & ML Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Capri Global Capital Limited"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "IIT Madras"
              },
              "sameAs": [
                "https://github.com/Divyanshusaini55",
                "https://linkedin.com/in/divyanshu47"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <OnekoLoader />
        </ThemeProvider>
      </body>
    </html>
  )
}
