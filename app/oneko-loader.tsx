'use client'

import { useEffect } from 'react'
export function OnekoLoader() {
  useEffect(() => {
    if (document.querySelector('script[src="/oneko.js"]')) {
      return 
    }

    try {
      const script = document.createElement('script')
      script.src = '/oneko.js'
      script.async = true
      script.onload = () => {
        console.debug('Oneko script loaded successfully')
      }
      script.onerror = () => {
        console.warn('Failed to load oneko script')
      }
      document.body.appendChild(script)

      return () => {
        // Optional: cleanup if needed
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    } catch (error) {
      console.warn('Error loading oneko script:', error)
    }
  }, [])

  return null
}

