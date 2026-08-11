import localFont from 'next/font/local'
import { 
  Space_Grotesk, 
  Crimson_Pro, 
  JetBrains_Mono 
} from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const heorot = localFont({
  src: '../public/fonts/Heorot-4rLK.ttf',
  variable: '--font-heorot',
  display: 'swap',
})

export const heorotExpanded = localFont({
  src: '../public/fonts/HeorotExpanded-0RLz.ttf',
  variable: '--font-heorot-expanded',
  display: 'swap',
})
