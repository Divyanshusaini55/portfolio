'use client'

import { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

export default function Mermaid({ chart, zoomable = false }: { chart: string, zoomable?: boolean }) {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    const renderMermaid = async () => {
      if (!chart) return;

      try {
        const mermaid = (await import('mermaid')).default
        const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'default'
        
        mermaid.initialize({
          startOnLoad: false,
          theme: currentTheme,
          securityLevel: 'loose',
          fontFamily: 'inherit',
        })
        
        // Create an off-screen container with absolute dimensions.
        // This prevents the "Failed to read the 'value' property from 'SVGLength'" error
        // when D3 tries to compute defaultExtent on an SVG with relative width/height (100%).
        const tempContainer = document.createElement('div')
        tempContainer.style.width = '1024px'
        tempContainer.style.height = '1024px'
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        tempContainer.style.visibility = 'hidden'
        document.body.appendChild(tempContainer)
        
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`
        
        try {
          const { svg: renderedSvg } = await mermaid.render(id, chart, tempContainer)
          
          if (isMounted) {
            // Remove width and height attributes from the SVG string so it scales properly inside react-zoom-pan-pinch
            const cleanSvg = renderedSvg.replace(/width="[^"]+"/, '').replace(/height="[^"]+"/, '')
            setSvg(cleanSvg)
            setError('')
          }
        } finally {
          document.body.removeChild(tempContainer)
        }
      } catch (e: any) {
        console.error('Mermaid rendering failed', e)
        if (isMounted) {
          setError(e?.message || String(e))
        }
      }
    }

    renderMermaid()

    return () => {
      isMounted = false
    }
  }, [chart, resolvedTheme])

  if (error) {
    return (
      <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-md text-red-400 font-mono text-xs my-4 overflow-x-auto">
        <strong>Mermaid Syntax Error:</strong>
        <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
        <div className="mt-2 opacity-50">Chart data:</div>
        <pre className="mt-1 whitespace-pre-wrap">{chart}</pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div ref={containerRef} className="flex-1 w-full h-full flex items-center justify-center text-muted-foreground animate-pulse text-xs my-6 text-center font-mono min-h-[300px]">
        Loading diagram...
      </div>
    )
  }

  if (zoomable) {
    return (
      <div className="w-full h-full relative group flex-1 flex flex-col min-h-0">
        <TransformWrapper
          initialScale={1}
          minScale={0.1}
          maxScale={8}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10 flex gap-2 bg-background/80 backdrop-blur-md p-1.5 rounded-lg border border-border/50 shadow-md opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => zoomIn()} 
                  className="p-1.5 hover:bg-secondary rounded-md text-foreground transition-colors cursor-pointer" 
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => zoomOut()} 
                  className="p-1.5 hover:bg-secondary rounded-md text-foreground transition-colors cursor-pointer" 
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => resetTransform()} 
                  className="p-1.5 hover:bg-secondary rounded-md text-foreground transition-colors cursor-pointer" 
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <TransformComponent 
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab" }}
              >
                <div 
                  className="mermaid-wrapper flex justify-center w-full" 
                  dangerouslySetInnerHTML={{ __html: svg }} 
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    )
  }

  return (
    <div 
      className="mermaid-wrapper flex justify-center my-6 overflow-x-auto w-full" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  )
}
