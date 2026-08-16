import { ImageResponse } from 'next/og'

export const alt = 'Divyanshu Saini | Full Stack Developer & ML Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              D
            </div>
            <span style={{ fontSize: '26px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              Divyanshu Saini
            </span>
          </div>
          <span style={{ fontSize: '18px', color: '#94a3b8', fontFamily: 'monospace' }}>
            divyanshusaini.me
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span
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
              IIT Madras · BS Data Science
            </span>
            <span
              style={{
                fontSize: '15px',
                fontFamily: 'monospace',
                padding: '6px 14px',
                backgroundColor: '#1e293b',
                color: '#34d399',
                borderRadius: '20px',
                border: '1px solid #334155',
              }}
            >
              Full Stack & ML Engineer
            </span>
          </div>

          <h1
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
              maxWidth: '950px',
              margin: 0,
            }}
          >
            Building intelligent software, scalable backends & AI systems.
          </h1>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.4,
              color: '#94a3b8',
              maxWidth: '900px',
              margin: 0,
            }}
          >
            Explore featured projects, system architectures, research notes, and work experience.
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
            Next.js · TypeScript · Python · PyTorch · Django
          </span>
          <span style={{ fontSize: '18px', color: '#3b82f6', fontWeight: 600 }}>
            Visit Portfolio →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
