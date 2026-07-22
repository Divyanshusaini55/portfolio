'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Crimson_Pro, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import styles from './article.module.css';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css'; 
import Mermaid from './Mermaid';
import { Tiro_Devanagari_Hindi } from 'next/font/google';

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

export default function ArticleLayout({ 
  content, 
  title = "Untitled", 
  author = "Author", 
  authorLink = "#",
  image
}: ArticleLayoutProps) {
  return (
    <div className={`${styles.articleContainer} ${crimsonPro.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable} ${tiroHindi.variable}`}>
      <div className={styles.bookContainer}>
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
                h1: ({node, ...props}) => <h1 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontFamily: 'var(--font-cormorant), serif' }} {...props} />,
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

        <footer className={styles.footer}>
          <div className={styles.footerOrnament}>✦</div>
        </footer>
      </div>
    </div>
  );
}
