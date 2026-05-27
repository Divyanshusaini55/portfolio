import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Cormorant_Garamond, Crimson_Pro } from 'next/font/google';
import styles from './notes-index.module.css';

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
        order: data.order !== undefined ? data.order : 999, // default to end if no order
      };
    })
    .filter(blog => blog.order !== 999) // only include those with explicit order (to hide hope.md if wanted, or just sort them)
    .sort((a, b) => a.order - b.order);

  return blogs;
}

export default async function NotesIndex() {
  const blogs = await getBlogs();

  const implementations = [
    'Transformer', 'Multi-Head Attention', 'RoPE',
    'ALiBi', 'Transformer-XL', 'RETRO',
    'Compressive Transformer', 'miniGPT', 'SwiGLU',
    'kNN-LM', 'GLU', 'Feedback Transformer'
  ];

  return (
    <div className={`${styles.pageContainer} ${cormorant.variable}`}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={`${styles.title} ${crimsonPro.className}`}>divyanshu saini</h1>
          <p className={styles.bio}>
            I study machine learning, neural networks,<br/>
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
          {/* Using a regular img tag to avoid Next.js Image component strictness about local files if they aren't fully configured */}
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
