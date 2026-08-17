import { ImageResponse } from 'next/og'
import fs from 'fs'
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
  let description = 'Machine Learning, Deep Learning, AI & Mathematical Intuition'
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

  let profileBase64 = ''
  try {
    const profilePath = path.join(process.cwd(), 'public', 'profile.png')
    const buffer = fs.readFileSync(profilePath)
    profileBase64 = `data:image/png;base64,${buffer.toString('base64')}`
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
          padding: '50px 60px',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Main Card Frame */}
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#12141a',
            border: '1px solid #232733',
            borderRadius: '24px',
            padding: '48px 56px',
            position: 'relative',
          }}
        >
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {profileBase64 ? (
                <img
                  src={profileBase64}
                  alt="Divyanshu Saini"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    border: '1px solid #3b4252',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: '#1e2330',
                    border: '1px solid #3b4252',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: '#c5a880',
                  }}
                >
                  𖤊
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px' }}>
                  Divyanshu Saini
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>
                  ✦ Technical Notes & Mathematical Foundations
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#64748b',
                backgroundColor: '#181b24',
                padding: '6px 14px',
                borderRadius: '10px',
                border: '1px solid #272c3b',
              }}
            >
              <span>divyanshusaini.me/notes</span>
            </div>
          </div>

          {/* Center Article Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    padding: '4px 10px',
                    backgroundColor: '#1c2230',
                    color: '#60a5fa',
                    borderRadius: '6px',
                    border: '1px solid #2e384d',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1
              style={{
                fontSize: '46px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-1px',
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '20px',
                lineHeight: 1.5,
                color: '#94a3b8',
                margin: 0,
                maxWidth: '920px',
              }}
            >
              {description.length > 140 ? description.slice(0, 140) + '...' : description}
            </p>
          </div>

          {/* Bottom Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #232733',
              paddingTop: '20px',
            }}
          >
            <span style={{ fontSize: '14px', color: '#64748b', fontFamily: 'monospace' }}>
              IIT Madras BS Data Science · Divyanshu Saini
            </span>

            <span
              style={{
                fontSize: '15px',
                fontFamily: 'monospace',
                color: '#c5a880',
                fontWeight: 600,
              }}
            >
              [Read Note →]
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
