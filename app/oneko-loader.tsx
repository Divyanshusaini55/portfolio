'use client'

import { useEffect } from 'react'

export function OnekoLoader() {
  useEffect(() => {
    // Load oneko.js after the DOM is fully ready
    const script = document.createElement('script')
    script.src = '/oneko.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
