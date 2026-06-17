'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Maximize2, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { DiagramData } from './portfolio/projects'

const Mermaid = dynamic(() => import('./Mermaid'), { ssr: false })
const MarkmapViewer = dynamic(() => import('./MarkmapViewer'), { ssr: false })

export default function DiagramModal({ diagrams, projectTitle }: { diagrams: DiagramData[], projectTitle: string }) {
  const [open, setOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <Dialog.Root 
      open={open} 
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setSelectedIdx(0) // Reset to the first diagram when closing
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-primary/20 text-foreground hover:text-primary rounded-lg border border-border/50 hover:border-primary/50 transition-colors text-sm font-medium w-fit group/btn cursor-pointer"
        >
          <Maximize2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          View Architecture Diagram
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content 
          className="fixed left-[50%] top-[50%] z-50 w-[94vw] sm:w-[95vw] max-w-7xl translate-x-[-50%] translate-y-[-50%] gap-3 sm:gap-4 border bg-background pt-6 px-4 pb-4 sm:p-6 shadow-lg rounded-xl sm:rounded-2xl flex flex-col h-[90vh] duration-200 animate-in fade-in zoom-in-95"
        >
          <div className="flex justify-between items-center mb-2 sm:mb-2 shrink-0">
            <Dialog.Title className="text-lg sm:text-xl font-semibold text-foreground font-sans pr-2">
              {projectTitle} Architecture
            </Dialog.Title>
            <Dialog.Close asChild>
              <button 
                className="rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>

          {/* Sleek Horizontal Tab Selection for Multiple Diagrams */}
          {diagrams.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/30 w-full no-scrollbar scroll-smooth shrink-0 mb-1">
              {diagrams.map((d, idx) => {
                const title = d.title || `Diagram ${idx + 1}`
                const isActive = selectedIdx === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                        : 'bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/20'
                    }`}
                  >
                    {title}
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex-1 relative overflow-hidden flex flex-col min-h-0">
            {diagrams[selectedIdx] && (
              <div className="flex-1 w-full border border-border/50 rounded-lg sm:rounded-xl overflow-hidden bg-background/50 relative shadow-sm group flex flex-col">
                {diagrams[selectedIdx].type === 'markmap' ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <MarkmapViewer markdown={diagrams[selectedIdx].chart} />
                  </div>
                ) : (
                  <Mermaid key={selectedIdx} chart={diagrams[selectedIdx].chart} zoomable={true} />
                )}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
