'use client'

import { useEffect } from 'react'

/**
 * OnekoLoader - Loads the oneko cat animation script
 * This component is responsible for loading the oneko.js script after hydration
 * to prevent SSR/hydration mismatches
 */
export function OnekoLoader() {
  useEffect(() => {
    // Only load on client side and check if script is already loaded
    if (document.querySelector('script[src="/oneko.js"]')) {
      return // Script already loaded
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

