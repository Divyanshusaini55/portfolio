import { ImageResponse } from 'next/og'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const alt = 'Notes | Divyanshu Saini'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const contentDir = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDir, `${slug}.md`)
  
  let title = 'Technical Notes'
  let description = 'Machine Learning, Artificial Intelligence & Mathematics'
  let tags: string[] = ['Machine Learning', 'Engineering']
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data } = matter(fileContent)
    title = data.title || data.Title || slug
    description = data.description || data.Description || description
    if (data.tags) {
      tags = Array.isArray(data.tags) ? data.tags : [data.tags]
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#090a0f',
          padding: '60px 70px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          border: '1px solid #1e293b',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              D
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              Divyanshu Saini
            </span>
          </div>
          <span style={{ fontSize: '18px', color: '#94a3b8', fontFamily: 'monospace' }}>
            divyanshusaini.me/notes
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '15px',
                  fontFamily: 'monospace',
                  padding: '6px 14px',
                  backgroundColor: '#1e293b',
                  color: '#60a5fa',
                  borderRadius: '20px',
                  border: '1px solid #334155',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
              maxWidth: '1000px',
              margin: 0,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.4,
              color: '#94a3b8',
              maxWidth: '950px',
              margin: 0,
            }}
          >
            {description.length > 140 ? description.slice(0, 140) + '...' : description}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b', fontFamily: 'monospace' }}>
            IIT Madras · Full Stack & ML Engineer
          </span>
          <span style={{ fontSize: '18px', color: '#3b82f6', fontWeight: 600 }}>
            Read Article →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
