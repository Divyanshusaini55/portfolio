import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Cormorant_Garamond, Crimson_Pro } from 'next/font/google';
import { Metadata } from 'next';
import styles from './notes-index.module.css';

export const metadata: Metadata = {
  title: 'divyanshu saini | notes',
  description: 'Notes on machine learning, deep learning, neural networks, ai and their underlying mathematics.',
  openGraph: {
    title: 'divyanshu saini | notes',
    description: 'Notes on machine learning, deep learning, neural networks, ai and their underlying mathematics.',
    url: 'https://divyanshusaini.me/notes',
    images: [
      {
        url: 'https://divyanshusaini.me/images/notes.png',
        width: 1200,
        height: 630,
        alt: 'divyanshu saini | notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'divyanshu saini | notes',
    description: 'Notes on machine learning, deep learning, neural networks, ai and their underlying mathematics.',
    images: ['https://divyanshusaini.me/images/notes.png'],
  },
};

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
});

async function getBlogs() {
  const contentDir = path.join(process.cwd(), 'content');
  let files = [];
  try {
    files = fs.readdirSync(contentDir);
  } catch (error) {
    return [];
  }

  const blogs = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        order: data.order !== undefined ? data.order : 999, 
      };
    })
    .filter(blog => blog.order !== 999) 
    .sort((a, b) => a.order - b.order);

  return blogs;
}

export default async function NotesIndex() {
  const blogs = await getBlogs();
  const implementations = ["Coming Soon!"]
  // const implementations = [
  //   'Transformer', 'Multi-Head Attention', 'RoPE',
  //   'ALiBi', 'Transformer-XL', 'RETRO',
  //   'Compressive Transformer', 'miniGPT', 'SwiGLU',
  //   'kNN-LM', 'GLU', 'Feedback Transformer'
  // ];

  return (
    <div className={`${styles.pageContainer} ${cormorant.variable}`}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <Link 
            href="/" 
            className={styles.homeLink}
          >
            ← portfolio
          </Link>
          <h1 className={`${styles.title} ${crimsonPro.className}`}>divyanshu saini</h1>
          <p className={styles.bio}>
            I study machine learning, deep learning, neural networks, ai <br/>
            and their underlying mathematics.
          </p>
        </header>

        <div className={styles.sectionDivider}>Blogs</div>

        <div className={styles.blogsList}>
          {blogs.map(blog => (
            <Link key={blog.slug} href={`/notes/${blog.slug}`} className={styles.blogItem}>
              <div className={styles.blogInfo}>
                <h3 className={`${styles.blogTitle} ${cormorant.className}`}>{blog.title}</h3>
                <p className={styles.blogDesc}>{blog.description}</p>
              </div>
              {/* <div className={styles.blogStats}> ... omitted as requested ... </div> */}
            </Link>
          ))}
        </div>

        <div className={styles.sectionDivider}>PYTORCH IMPLEMENTATIONS</div>

        <div className={styles.implementationsGrid}>
          {implementations.map((impl, index) => (
            <Link key={index} href="#" className={`${styles.implButton} ${cormorant.className}`}>
              {impl}
            </Link>
          ))}
        </div>

        <div className={styles.sectionDivider}>NOTES</div>

        <div className={styles.notesImageContainer}>
          <img 
            src="/images/notes.png" 
            alt="Handwritten math notes" 
            className={styles.notesImage} 
            style={{ maxWidth: '250px' }}
          />
        </div>
      </div>
    </div>
  );
}
