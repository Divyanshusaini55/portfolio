'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Crimson_Pro, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import styles from './article.module.css';
import 'katex/dist/katex.min.css';
import Mermaid from './Mermaid';
import { Tiro_Devanagari_Hindi } from 'next/font/google';
import { ArrowLeft, Clock, Check, Copy, Share2, List, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
});

const tiroHindi = Tiro_Devanagari_Hindi({
  weight: '400',
  subsets: ['devanagari'],
  variable: '--font-tiro-hindi',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['300', '400'],
  variable: '--font-jetbrains',
});

interface ArticleLayoutProps {
  content: string;
  title?: string;
  author?: string;
  authorLink?: string;
  image?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function PreBlockWithCopy({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const getText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join('');
    if (node?.props?.children) return getText(node.props.children);
    return '';
  };

  const handleCopy = () => {
    const text = getText(children).replace(/\n$/, '');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-[#e8dfd1] bg-[#f7f2e7] shadow-xs">
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-[#eee7d8]/90 text-[#7a6a58] hover:text-[#2d241c] hover:bg-[#e4dcce] opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 border border-[#dfd6c6] flex items-center gap-1 text-[11px] font-mono cursor-pointer shadow-xs"
        title="Copy code"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
      <pre className="!m-0 !p-4 !bg-[#f7f2e7] overflow-x-auto text-[14px] leading-relaxed text-[#2c2825]" {...props}>
        {children}
      </pre>
    </div>
  );
}

export default function ArticleLayout({ 
  content, 
  title = "Untitled", 
  author = "Author", 
  authorLink = "#",
  image
}: ArticleLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate reading stats
  const wordCount = useMemo(() => content.trim().split(/\s+/).length, [content]);
  const readTimeMinutes = useMemo(() => Math.max(1, Math.ceil(wordCount / 200)), [wordCount]);

  // Extract headings for Table of Contents
  const headings = useMemo(() => {
    const lines = content.split('\n');
    const items: { text: string; level: number; id: string }[] = [];
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/[*_`]/g, '');
        items.push({ text, level, id: slugify(text) });
      }
    }
    return items;
  }, [content]);

  // Native Web Share or clipboard fallback
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this note: "${title}" by Divyanshu Saini`,
          url: url,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.articleContainer} ${crimsonPro.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable} ${tiroHindi.variable}`}>
      
      {/* Hairline Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-0.75 bg-[#8b7355] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className={styles.bookContainer}>
        
        {/* Back to Notes Navigation Link */}
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#888]">
          <Link 
            href="/notes" 
            className="inline-flex items-center gap-1.5 hover:text-[#8b7355] transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>notes</span>
          </Link>
          <div className="flex items-center gap-3 text-[11px] text-[#888]/80">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#8b7355]" />
              {readTimeMinutes} min read
            </span>
            <span>·</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>

        {image && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src={image} alt="Chapter opener" style={{ maxWidth: '150px', display: 'block', margin: '0 auto' }} />
          </div>
        )}
        
        <header className={styles.header}>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif' }}>{title}</h1>
          <div>
            <a href={authorLink} target="_blank" rel="noopener noreferrer">{author}</a>
          </div>
        </header>

        {/* Dynamic Table of Contents (TOC) */}
        {headings.length >= 2 && (
          <div className="my-8 p-4 rounded-xl border border-[#e6e2d3]/20 bg-[#f7f5ee]/40 dark:bg-[#1a1c23]/40 font-mono text-xs transition-all">
            <button
              onClick={() => setTocOpen(prev => !prev)}
              className="w-full flex items-center justify-between font-semibold text-[#8b7355] cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <List className="w-4 h-4" />
                <span>On This Page</span>
                <span className="text-[10px] text-muted-foreground font-normal">({headings.length} sections)</span>
              </span>
              {tocOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {tocOpen && (
              <ul className="mt-3 space-y-1.5 pt-2 border-t border-[#e6e2d3]/20">
                {headings.map((h, index) => (
                  <li 
                    key={index}
                    style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}
                  >
                    <a
                      href={`#${h.id}`}
                      className="text-[#666] hover:text-[#8b7355] dark:text-[#aaa] dark:hover:text-[#e6e2d3] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#8b7355]/70 text-[10px]">#</span>
                      <span className="truncate">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <main>
          <article className={styles.content}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[[rehypeKatex, {
                macros: {
                  "\\m": "\\mathbf",
                  "\\R": "\\mathbb{R}",
                  "\\N": "\\mathbb{N}",
                  "\\Z": "\\mathbb{Z}",
                  "\\E": "\\mathbb{E}",
                  "\\P": "\\mathbb{P}",
                  "\\argmin": "\\operatorname{arg\\,min}",
                  "\\argmax": "\\operatorname{arg\\,max}",
                  "\\softmax": "\\operatorname{softmax}",
                  "\\sign": "\\operatorname{sign}",
                  "\\Tr": "\\operatorname{Tr}",
                  "\\rank": "\\operatorname{rank}",
                  "\\diag": "\\operatorname{diag}",
                  "\\grad": "\\nabla"
                }
              }], rehypeHighlight]}
              components={{
                h1: ({node, children, ...props}) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <h1 id={id} style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props}>{children}</h1>;
                },
                h2: ({node, children, ...props}) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <h2 id={id} style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props}>{children}</h2>;
                },
                h3: ({node, children, ...props}) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <h3 id={id} style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props}>{children}</h3>;
                },
                h4: ({node, ...props}) => <h4 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
                h5: ({node, ...props}) => <h5 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
                h6: ({node, ...props}) => <h6 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
                li: ({node, children, ...props}) => {
                  let isSignature = false;
                  const firstChild = Array.isArray(children) ? children[0] : children;
                  if (typeof firstChild === 'string') {
                    const text = firstChild.trim();
                    if (text.startsWith('- ') || text.startsWith('--') || text.startsWith('—')) {
                      isSignature = true;
                    }
                  }
                  
                  if (isSignature) {
                    return <li {...props} style={{ textAlign: 'right', fontStyle: 'italic', paddingRight: '1rem', marginTop: '1rem', listStyle: 'none' }}>{children}</li>;
                  }
                  
                  return <li {...props}>{children}</li>;
                },
                pre: PreBlockWithCopy,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match && match[1] === 'mermaid') {
                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                  }
                  return <code className={`${className || ''} ${jetbrainsMono.className}`} {...props}>{children}</code>;
                },
                p: ({node, children, ...props}) => {
                  let isSignature = false;
                  const firstChild = Array.isArray(children) ? children[0] : children;
                  if (typeof firstChild === 'string') {
                    const text = firstChild.trim();
                    if (text.startsWith('- ') || text.startsWith('--') || text.startsWith('—')) {
                      isSignature = true;
                    }
                  }
                  
                  if (isSignature) {
                    return <p {...props} style={{ textAlign: 'right', fontStyle: 'italic', paddingRight: '1rem', marginTop: '1rem' }}>{children}</p>;
                  }
                  
                  return <p {...props}>{children}</p>;
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </main>

        {/* Social Share & Interaction Footer Bar */}
        <div className="mt-12 pt-6 border-t border-[#e6e2d3]/30 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e6e2d3]/40 bg-[#f7f5ee]/50 dark:bg-[#1a1c23]/50 text-[#8b7355] hover:border-[#8b7355] transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </>
              )}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}" by @dvyanshux`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[#e6e2d3]/40 text-muted-foreground hover:text-[#8b7355] transition-all"
            >
              Post on 𝕏
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[#e6e2d3]/40 text-muted-foreground hover:text-[#8b7355] transition-all"
            >
              LinkedIn
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-[#8b7355] transition-colors py-1 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerOrnament}>✦</div>
        </footer>
      </div>
    </div>
  );
}
