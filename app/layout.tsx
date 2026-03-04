import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, Crimson_Pro, JetBrains_Mono, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OnekoLoader } from './oneko-loader'
import './global.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const _crimsonPro = Crimson_Pro({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Divyanshu Saini | Portfolio',
  description: 'Personal portfolio of Divyanshu Saini - ML Student &  Software Developer Engineer',
  generator: 'self',
  icons: {
    icon: '/profile.png',
    apple: '/profile.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <OnekoLoader />
      </body>
    </html>
  )
}
