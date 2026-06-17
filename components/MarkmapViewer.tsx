'use client'

import { useRef, useEffect } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import { useTheme } from 'next-themes'

const transformer = new Transformer()

export default function MarkmapViewer({ markdown }: { markdown: string }) {
  const refSvg = useRef<SVGSVGElement>(null)
  const refMarkmap = useRef<Markmap | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (refSvg.current) {
      let mm = refMarkmap.current
      if (!mm) {
        mm = Markmap.create(refSvg.current)
        refMarkmap.current = mm
      }
      
      // Parse the markdown string into Markmap data
      const { root } = transformer.transform(markdown)
      mm.setData(root)
      
      // Initial fit
      mm.fit()
      
      // The Radix dialog has a 200ms enter animation which scales the container.
      // We must refit after the animation completes so it measures the final dimensions perfectly.
      const timer = setTimeout(() => {
        mm.fit()
      }, 250)

      return () => clearTimeout(timer)
    }
  }, [markdown, resolvedTheme])

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Markmap inherits colors from the SVG text property, so we enforce our theme color */}
      <style dangerouslySetInnerHTML={{__html: `
        svg.markmap {
          --markmap-text-color: var(--foreground);
        }
        ${resolvedTheme === 'dark' ? `
          svg.markmap path.markmap-link {
            stroke: rgba(255, 255, 255, 0.3) !important;
          }
          svg.markmap text {
            fill: #e2e8f0 !important;
          }
          svg.markmap circle {
            stroke: rgba(255, 255, 255, 0.5) !important;
          }
        ` : `
          svg.markmap path.markmap-link {
            stroke: rgba(0, 0, 0, 0.3) !important;
          }
          svg.markmap text {
            fill: #0f172a !important;
          }
          svg.markmap circle {
            stroke: rgba(0, 0, 0, 0.5) !important;
          }
        `}
      `}} />
      <svg className="w-full h-full min-h-[500px] markmap" ref={refSvg} />
    </div>
  )
}
