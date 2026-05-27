import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Crimson_Pro, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import styles from './article.module.css';

// Import CSS for math and syntax highlighting
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css'; // You can change this to prism-tomorrow equivalent if desired

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
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
    <div className={`${styles.articleContainer} ${crimsonPro.className} ${cormorantGaramond.variable} ${jetbrainsMono.variable}`}>
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
              remarkPlugins={[remarkMath]}
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
                code: ({node, className, children, ...props}) => {
                  return <code className={`${className || ''} ${jetbrainsMono.className}`} {...props}>{children}</code>;
                },
                p: ({node, children, ...props}) => {
                  // To fix drop caps font family, we can just render normal p tag
                  // and the CSS handles the ::first-letter styling, but we might need 
                  // to globally target it if we want the specific font. In CSS module we can't easily 
                  // inject font families for pseudo-elements using CSS variables without global access
                  // However, adding a class or just letting the CSS module handle it with standard serif fallback works
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
