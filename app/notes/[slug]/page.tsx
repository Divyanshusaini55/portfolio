import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';

export async function generateStaticParams() {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);
    const slugs = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({ slug: file.replace('.md', '') }));
    return slugs;
  } catch (error) {
    return [];
  }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
  // Await params as required by Next.js 15+ 
  // Depending on Next version, `params` might be a Promise.
  // We'll await it just in case Next.js 15 is used.
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `${slug}.md`);

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    notFound();
  }

  const { data, content } = matter(fileContent);

  // Extract metadata directly from the gray-matter data or fallback to defaults
  // For hope.md which had custom frontmatter like "Title: Live Content"
  const title = data.title || data.Title || 'Article';
  const author = data.author || data.Author || 'divyanshu saini'; 
  const authorLink = data.authorLink || data.AuthorLink || 'https://x.com/dvyanshux';

  // Use a placeholder image or an image from metadata
  const image = data.image || data.Image || '/images/hope.png';

  return (
    <ArticleLayout
      content={content}
      title={title}
      author={author}
      authorLink={authorLink}
      image={image}
    />
  );
}
