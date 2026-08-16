import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://divyanshusaini.me'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shiv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamically discover all markdown note posts
  const noteRoutes: MetadataRoute.Sitemap = []
  try {
    const contentDir = path.join(process.cwd(), 'content')
    if (fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir)
      for (const file of files) {
        if (file.endsWith('.md')) {
          const slug = file.replace('.md', '')
          const stats = fs.statSync(path.join(contentDir, file))
          noteRoutes.push({
            url: `${baseUrl}/notes/${slug}`,
            lastModified: stats.mtime || new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          })
        }
      }
    }
  } catch (err) {
    console.error('Error generating notes sitemap:', err)
  }

  return [...staticRoutes, ...noteRoutes]
}
