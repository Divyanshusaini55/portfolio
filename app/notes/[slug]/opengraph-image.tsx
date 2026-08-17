import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const alt = 'Notes | divyanshu saini'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const contentDir = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDir, `${slug}.md`)
  
  let title = 'Technical Notes'
  let description = 'Machine Learning, Artificial Intelligence & Mathematical Foundations'
  let tags: string[] = ['Machine Learning', 'AI']
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    title = data.title || data.Title || slug
    description = data.description || data.Description || description
    if (data.tags) {
      tags = Array.isArray(data.tags) ? data.tags : [data.tags]
    }
  } catch {}

  let imageBuffer: ArrayBuffer | null = null
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'profile.png'),
      path.resolve('./public/profile.png'),
    ]
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        const file = fs.readFileSync(p)
        imageBuffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)
        break
      }
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
          backgroundColor: '#f8fafc',
          padding: '44px 64px',
          color: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Navbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          {/* Left Nav Vector Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', color: '#475569' }}>
            {/* Home Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {/* Book Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            {/* FileText Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>

          {/* Right Nav Address */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '14px', fontFamily: 'monospace', color: '#64748b' }}>
            <span>divyanshusaini.me/notes</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', margin: '10px 0' }}>
          {imageBuffer ? (
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '42px',
                overflow: 'hidden',
                border: '2px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                // @ts-ignore
                src={imageBuffer}
                alt="divyanshu saini"
                width="84"
                height="84"
                style={{
                  width: '84px',
                  height: '84px',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '42px',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '34px',
              }}
            >
              D
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '30px',
                fontWeight: 800,
                letterSpacing: '-0.6px',
                color: '#0f172a',
              }}
            >
              divyanshu saini
            </span>

            <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
              Technical Notes & Research Essays · IIT Madras
            </span>
          </div>
        </div>

        {/* Center Article Content Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px 30px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  padding: '4px 10px',
                  backgroundColor: '#f1f5f9',
                  color: '#2563eb',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.8px',
              color: '#0f172a',
              margin: 0,
              maxWidth: '980px',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: '#475569',
              margin: 0,
              maxWidth: '950px',
            }}
          >
            {description.length > 130 ? description.slice(0, 130) + '...' : description}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '14px',
            fontSize: '13px',
            fontFamily: 'monospace',
            color: '#64748b',
          }}
        >
          <span>faith -&gt; [consciousness]</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>divyanshusaini.me/notes</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
