'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

interface ProfileZoomProps {
    src: string
    alt: string
}

export function ProfileZoom({ src, alt }: ProfileZoomProps) {
    const [isZoomed, setIsZoomed] = useState(false)

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsZoomed(false)
    }, [])

    useEffect(() => {
        if (isZoomed) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', handleKeyDown)
        } else {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isZoomed, handleKeyDown])

    return (
        <>
            {/* Thumbnail */}
            <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="w-20 h-20 rounded-full overflow-hidden border border-border flex-shrink-0 bg-secondary cursor-zoom-in transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Zoom profile image"
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                />
            </button>

            {/* Fullscreen Overlay Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
                    onClick={() => setIsZoomed(false)}
                >
                    <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>

                    <button
                        type="button"
                        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsZoomed(false)
                        }}
                        aria-label="Close zoom overlay"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div
                        className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-square"
                        style={{ animation: 'zoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover rounded-full border-4 border-border/50 shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
