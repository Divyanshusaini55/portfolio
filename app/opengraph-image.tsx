import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'divyanshu saini | software engineer & ml enthusiast'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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

    const egyptianPath = path.join(process.cwd(), 'public', 'fonts', 'NotoEgyptian.ttf')
    if (fs.existsSync(egyptianPath)) {
      const egyptianFile = fs.readFileSync(egyptianPath)
      fonts.push({
        name: 'NotoEgyptian',
        data: egyptianFile.buffer.slice(egyptianFile.byteOffset, egyptianFile.byteOffset + egyptianFile.byteLength),
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
          fontFamily: 'SpaceGrotesk, sans-serif',
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
            {/* 4-Point Star / Emblem SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#c5a880">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <span style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: 600, color: '#94a3b8', letterSpacing: '-0.5px' }}>
              divyanshusaini.me
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
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <span style={{ fontSize: '15px', fontFamily: 'monospace', color: '#94a3b8' }}>
              open to opportunities
            </span>
          </div>
        </div>

        {/* Center Main Identity & Bio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', margin: '20px 0' }}>
          {imageBuffer ? (
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '75px',
                overflow: 'hidden',
                border: '2px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                // @ts-ignore
                src={imageBuffer}
                width="150"
                height="150"
                style={{
                  width: '150px',
                  height: '150px',
                }}
                alt="divyanshu saini"
              />
            </div>
          ) : (
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '75px',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                fontWeight: 'bold',
                flexShrink: 0,
              }}
            >
              ds
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1
                style={{
                  fontSize: '56px',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                  color: '#f8fafc',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                divyanshu saini
              </h1>
              <span
                style={{
                  fontSize: '48px',
                  fontFamily: 'NotoEgyptian, sans-serif',
                  color: '#94a3b8',
                  lineHeight: 1,
                }}
              >
                𓀛
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px', fontWeight: 500, color: '#60a5fa' }}>
                software engineer · machine learning enthusiast
              </span>
            </div>

            <p
              style={{
                fontSize: '20px',
                lineHeight: 1.45,
                color: '#94a3b8',
                margin: 0,
                maxWidth: '820px',
              }}
            >
              here&apos;s my digital coordinates. building intelligent software, scalable backends, and ai systems.
            </p>
          </div>
        </div>

        {/* Bottom Tech Pills & Portfolio Link */}
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {['Python', 'PyTorch', 'Scikit-learn', 'React', 'SQL', 'Django', 'Docker', 'GCP', 'LLMs'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  padding: '6px 14px',
                  backgroundColor: '#131722',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  border: '1px solid #23293a',
                }}
              >
                [{tech}]
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#c5a880',
              fontWeight: 600,
            }}
          >
            [explore portfolio →]
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
