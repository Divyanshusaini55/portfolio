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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    const title = data.title || data.Title || 'Article';
    const description = data.description || data.Description || 'Read this article by Divyanshu Saini';
    const image = data.image || data.Image || '/images/hope.png';
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://divyanshusaini.me';

    return {
      title: `${title} | Divyanshu Saini`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${domain}/notes/${slug}`,
        images: [
          {
            url: `${domain}${image}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [`${domain}${image}`],
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
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
  const title = data.title || data.Title || 'Article';
  const author = data.author || data.Author || 'divyanshu saini'; 
  const authorLink = data.authorLink || data.AuthorLink || 'https://x.com/dvyanshux';

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
