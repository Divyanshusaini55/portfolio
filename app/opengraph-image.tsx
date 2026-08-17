import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'Divyanshu Saini | Full Stack Developer & ML Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  let profileBase64 = ''
  try {
    const filePath = path.join(process.cwd(), 'public', 'profile.png')
    const buffer = fs.readFileSync(filePath)
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {profileBase64 ? (
                <img
                  src={profileBase64}
                  alt="Divyanshu Saini"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    border: '1px solid #3b4252',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: '#1e2330',
                    border: '1px solid #3b4252',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    color: '#c5a880',
                  }}
                >
                  𖤊
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    Divyanshu Saini
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      padding: '3px 10px',
                      backgroundColor: '#1c2230',
                      color: '#60a5fa',
                      borderRadius: '8px',
                      border: '1px solid #2e384d',
                    }}
                  >
                    IIT Madras
                  </span>
                </div>
                <span style={{ fontSize: '15px', color: '#94a3b8', fontFamily: 'monospace' }}>
                  * software engineer & ml student *
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'monospace',
                fontSize: '15px',
                color: '#64748b',
                backgroundColor: '#181b24',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid #272c3b',
              }}
            >
              <span style={{ color: '#10b981' }}>●</span>
              <span>divyanshusaini.me</span>
            </div>
          </div>

          {/* Center Main Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '24px 0' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-1.5px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Building intelligent software, scalable backends & AI systems.
            </h1>
            <p
              style={{
                fontSize: '20px',
                lineHeight: 1.5,
                color: '#94a3b8',
                margin: 0,
                maxWidth: '900px',
              }}
            >
              IIT Madras BS in Data Science & B.Tech in AI/ML. Explore projects, interactive system architectures, and mathematical notes.
            </p>
          </div>

          {/* Bottom Tech Pills & Highlights */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #232733',
              paddingTop: '24px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {['Next.js', 'Python', 'Django', 'PyTorch', 'TypeScript', 'Redis'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    padding: '5px 12px',
                    backgroundColor: '#181b24',
                    color: '#e2e8f0',
                    borderRadius: '8px',
                    border: '1px solid #282e3d',
                  }}
                >
                  [{tech}]
                </span>
              ))}
            </div>

            <span
              style={{
                fontSize: '15px',
                fontFamily: 'monospace',
                color: '#c5a880',
                fontWeight: 600,
              }}
            >
              [Explore Portfolio →]
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
