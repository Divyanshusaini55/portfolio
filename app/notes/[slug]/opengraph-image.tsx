import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const alt = 'notes | divyanshu saini'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const contentDir = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDir, `${slug}.md`)
  
  let title = 'technical notes'
  let description = 'machine learning, artificial intelligence & mathematical foundations.'
  let tags: string[] = ['machine-learning', 'ai']
  
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
    const p = path.join(process.cwd(), 'public', 'profile.png')
    if (fs.existsSync(p)) {
      const file = fs.readFileSync(p)
      imageBuffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)
    }
  } catch {}

  const fonts: any[] = []
  try {
    const boldPath = path.join(process.cwd(), 'public', 'fonts', 'SpaceGrotesk-Bold.ttf')
    if (fs.existsSync(boldPath)) {
      const boldFile = fs.readFileSync(boldPath)
      fonts.push({
        name: 'SpaceGrotesk',
        data: boldFile.buffer.slice(boldFile.byteOffset, boldFile.byteOffset + boldFile.byteLength),
        weight: 700,
        style: 'normal',
      })
    }

    const mediumPath = path.join(process.cwd(), 'public', 'fonts', 'SpaceGrotesk-Medium.ttf')
    if (fs.existsSync(mediumPath)) {
      const mediumFile = fs.readFileSync(mediumPath)
      fonts.push({
        name: 'SpaceGrotesk',
        data: mediumFile.buffer.slice(mediumFile.byteOffset, mediumFile.byteOffset + mediumFile.byteLength),
        weight: 500,
        style: 'normal',
      })
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
          fontFamily: fonts.length > 0 ? 'SpaceGrotesk, sans-serif' : 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: '#c5a880' }}>𖤊</span>
            <span style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: 600, color: '#94a3b8', letterSpacing: '-0.5px' }}>
              divyanshusaini.me/notes
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#131722',
              border: '1px solid #23293a',
              padding: '8px 18px',
              borderRadius: '9999px',
            }}
          >
            <span style={{ fontSize: '15px', fontFamily: 'monospace', color: '#60a5fa' }}>
              ✦ technical notes & research
            </span>
          </div>
        </div>

        {/* Center Article Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  padding: '6px 14px',
                  backgroundColor: '#131722',
                  color: '#60a5fa',
                  borderRadius: '8px',
                  border: '1px solid #23293a',
                }}
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 700,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
              margin: 0,
              lineHeight: 1.15,
              maxWidth: '1000px',
            }}
          >
            {title.toLowerCase()}
          </h1>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              color: '#94a3b8',
              margin: 0,
              maxWidth: '960px',
            }}
          >
            {description.length > 140 ? description.slice(0, 140) + '...' : description}
          </p>
        </div>

        {/* Bottom Author & Link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e2433',
            paddingTop: '28px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {imageBuffer ? (
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '23px',
                  overflow: 'hidden',
                  border: '2px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  // @ts-ignore
                  src={imageBuffer}
                  width="46"
                  height="46"
                  style={{ width: '46px', height: '46px' }}
                  alt="divyanshu saini"
                />
              </div>
            ) : null}
            <span style={{ fontSize: '16px', fontFamily: 'monospace', color: '#94a3b8' }}>
              divyanshu saini · iit madras
            </span>
          </div>

          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#c5a880',
              fontWeight: 600,
            }}
          >
            [read note →]
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  )
}
