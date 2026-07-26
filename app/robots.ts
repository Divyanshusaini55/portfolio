import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://divyanshusaini.me'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/space'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
