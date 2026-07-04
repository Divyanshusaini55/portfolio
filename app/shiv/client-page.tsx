"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const verses = [
  {
    sanskrit: "नमामीशमीशान निर्वाणरूपं, विभुं व्यापकं ब्रह्मवेदस्वरूपम् ।\nनिजं निर्गुणं निर्विकल्पं निरीहं, चिदाकाशमाकाशवासं भजेहम् ॥",
    meaning: "हे भगवान ईशान को मेरा प्रणाम। ऐसे भगवान जो कि निर्वाण रूप हैं, जो महान ॐ के दाता हैं, जो सम्पूर्ण ब्रह्मांड में व्यापत हैं, जो अपने आपको धारण किये हुए हैं, जिनके सामने गुण अवगुण का कोई महत्व नहीं, जिनका कोई विकल्प नहीं, जो निष्पक्ष हैं, जिनका आकार आकाश के समान हैं जिसे मापा नहीं जा सकता — उनकी मैं उपासना करता हूँ।"
  },
  {
    sanskrit: "निराकारमोङ्करमूलं तुरीयं, गिराज्ञानगोतीतमीशं गिरीशम् ।\nकरालं महाकालकालं कृपालं, गुणागारसंसारपारं नतोहम् ॥",
    meaning: "जिनका कोई आकार नहीं, जो ॐ के मूल हैं, जो गिरी के वासी हैं, जो सभी ज्ञान और शब्द से परे हैं, जो कैलाश के स्वामी हैं, जिनका रूप भयावह है, जो काल के स्वामी हैं, जो उदार और दयालु हैं, जो गुणों का खजाना हैं और जो संसार से परे हैं — उनके सामने मैं नतमस्तक हूँ।"
  },
  {
    sanskrit: "तुषाराद्रिसंकाशगौरं गभीरं, मनोभूतकोटिप्रभाश्री शरीरम् ।\nस्फुरन्मौलिकल्लोलिनी चारुगङ्गा, लसद्भालबालेन्दु कण्ठे भुजङ्गा ॥",
    meaning: "जो बर्फ के समान शीतल हैं, जिनका मुख सुंदर है, जो गौर वर्ण के हैं, जो गहन चिंतन में लीन हैं, जो सभी प्राणियों के मन में हैं, जिनका वैभव अपार है, जिनकी देह सुंदर है, जिनकी जटाओं में लहराती गंगा है, जिनके मस्तक पर चंद्रमा है और जिनके कंठ पर सर्प का वास है।"
  },
  {
    sanskrit: "चलत्कुण्डलं भ्रूसुनेत्रं विशालं, प्रसन्नाननं नीलकण्ठं दयालम् ।\nमृगाधीशचर्माम्बरं मुण्डमालं, प्रियं शङ्करं सर्वनाथं भजामि ॥",
    meaning: "जिनके कानों में बालियाँ हैं, जिनकी सुंदर भौंहें और बड़ी-बड़ी आँखें हैं, जिनके चेहरे पर सुख और शांति का भाव है, जिनके कंठ में विष का वास है, जो दयालु हैं, जिनके वस्त्र शेर की खाल हैं और जिनके गले में मुंडमाल है — ऐसे प्रिय शंकर, जो समस्त संसार के नाथ हैं, उनको मैं पूजता हूँ।"
  },
  {
    sanskrit: "प्रचण्डं प्रकृष्टं प्रगल्भं परेशं, अखण्डं अजं भानुकोटिप्रकाशं ।\nत्र्यःशूलनिर्मूलनं शूलपाणिं, भजेहं भवानीपतिं भावगम्यम् ॥",
    meaning: "जो भयंकर हैं, परिपक्व और साहसी हैं, जो श्रेष्ठ और अखंड हैं, जो अजन्मे हैं, जो सहस्त्र सूर्य के समान प्रकाशवान हैं, जिनके पास त्रिशूल है, जो मूल कारणों का भी नाश करने की शक्ति रखते हैं — ऐसे त्रिशूलधारी, माँ भवानी के पति, जो प्रेम से जीते जा सकते हैं, उनको मैं वंदन करता हूँ।"
  },
  {
    sanskrit: "कलातीतकल्याण कल्पान्तकारी, सदा सज्जनानन्ददाता पुरारी ।\nचिदानन्दसंदोह मोहापहारी, प्रसीद प्रसीद प्रभो मन्मथारी ॥",
    meaning: "जो काल के बंधन से मुक्त हैं, जो कल्याणकारी हैं, जो विनाशक भी हैं, जो हमेशा धर्म का साथ देते हैं और सज्जनों को आनंद देते हैं, जो अधर्मियों का नाश करते हैं, जो चित्तानंद हैं, जो मोहमुक्त करने वाले हैं — ऐसे कामदेव नाशी प्रभु, आप मुझ पर कृपा करें।"
  },
  {
    sanskrit: "न यावद् उमानाथपादारविन्दं, भजन्तीह लोके परे वा नराणाम् ।\nन तावत्सुखं शान्ति सन्तापनाशं, प्रसीद प्रभो सर्वभूताधिवासं ॥",
    meaning: "जो उमा के नाथ के चरणकमलों की भक्ति नहीं करते, वे इस लोक और परलोक में सुख, शांति और दुःखनाश नहीं पाते। हे सर्वभूतों में वास करने वाले प्रभु, आप प्रसन्न हों।"
  },
  {
    sanskrit: "न जानामि योगं जपं नैव पूजां, नतोहं सदा सर्वदा शम्भुतुभ्यम् ।\nजराजन्मदुःखौघ तातप्यमानं, प्रभो पाह्यापन्नमामीश शंभो ॥",
    meaning: "मैं कुछ नहीं जानता — न योग, न जप, न पूजा। हे प्रभु, मैं सदा आपके आगे नतमस्तक हूँ। संसारिक दुःखों और कष्टों से मेरी रक्षा करें। हे शिव शंभु, मैं आपको सदा प्रणाम करता हूँ।"
  }
]

function TypewriterText({ text, onComplete, speed = 15 }: { text: string, onComplete?: () => void, speed?: number }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(timer)
        if (onComplete) onComplete()
      }
    }, speed)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]) 

  return <span>{displayedText}</span>
}

export default function ClientShivPage() {
  const [visibleVerses, setVisibleVerses] = useState<number>(0)
  const [typingState, setTypingState] = useState<'sanskrit' | 'meaning' | 'done'>('sanskrit')
  const endRef = useRef<HTMLDivElement>(null)

  const handleSanskritComplete = () => setTypingState('meaning')
  
  const handleMeaningComplete = () => {
    if (visibleVerses < verses.length - 1) {
      setTypingState('sanskrit')
      setVisibleVerses(prev => prev + 1)
    } else {
      setTypingState('done')
    }
  }

  useEffect(() => {
    // Scroll down automatically as text types so it's always in view
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [visibleVerses, typingState])

  const skipAnimation = () => {
    setVisibleVerses(verses.length - 1)
    setTypingState('done')
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          {typingState !== 'done' && (
            <button 
              onClick={skipAnimation}
              className="text-xs text-muted-foreground hover:text-primary transition-colors border border-border/50 rounded-md px-3 py-1.5"
            >
              Skip Animation
            </button>
          )}
        </div>
        
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6 animate-pulse">ᦠ</h1>
          <p className="text-foreground font-serif text-xl tracking-widest uppercase">वीरत्वं शिवत्वं</p>
          <div className="w-12 h-1 bg-primary/40 mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-6 w-full pb-20">
          {verses.slice(0, visibleVerses + 1).map((verse, index) => {
            const isCurrent = index === visibleVerses;
            const showMeaning = !isCurrent || typingState === 'meaning' || typingState === 'done';
            
            return (
              <div 
                key={index} 
                className="bg-secondary/20 border border-border/50 rounded-xl p-6 md:p-8 hover:bg-secondary/40 transition-colors duration-500 group animate-in fade-in slide-in-from-bottom-4"
              >
                <p className="text-center font-serif text-[17px] md:text-lg text-foreground whitespace-pre-line leading-[2.2] md:leading-[2.2] mb-6">
                  {isCurrent && typingState === 'sanskrit' ? (
                    <TypewriterText text={verse.sanskrit} onComplete={handleSanskritComplete} />
                  ) : (
                    verse.sanskrit
                  )}
                  {isCurrent && typingState === 'sanskrit' && <span className="animate-pulse inline-block w-[2px] h-[1em] bg-primary align-middle ml-1" />}
                </p>
                
                {showMeaning && (
                  <div className="bg-background/50 rounded-lg p-4 md:p-5 text-justify font-sans text-[14px] md:text-[15px] leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors animate-in fade-in">
                    {isCurrent && typingState === 'meaning' ? (
                      <TypewriterText text={verse.meaning} onComplete={handleMeaningComplete} />
                    ) : (
                      verse.meaning
                    )}
                    {isCurrent && typingState === 'meaning' && <span className="animate-pulse inline-block w-[2px] h-[1em] bg-primary align-middle ml-1" />}
                  </div>
                )}
              </div>
            )
          })}
          <div ref={endRef} />
        </div>

        {typingState === 'done' && (
          <footer className="mt-8 text-center text-xs md:text-sm text-muted-foreground font-mono animate-in fade-in">
            &copy; {new Date().getFullYear()} by divyanshu saini
          </footer>
        )}
      </div>
    </main>
  )
}
