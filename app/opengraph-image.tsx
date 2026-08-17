import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'divyanshu saini | Software Engineer & Machine Learning Enthusiast'
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

          {/* Right Nav Vector Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#64748b' }}>
            {/* GitHub */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            {/* LinkedIn */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            {/* Search */}
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {/* Moon */}
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', margin: '20px 0 10px 0' }}>
          {profileBase64 ? (
            <img
              src={profileBase64}
              alt="divyanshu saini"
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                border: '3px solid #e2e8f0',
                objectFit: 'cover',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              }}
            />
          ) : (
            <div
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
              }}
            >
              D
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1
              style={{
                fontSize: '42px',
                fontWeight: 800,
                letterSpacing: '-1px',
                color: '#0f172a',
                margin: 0,
              }}
            >
              divyanshu saini
            </h1>

            <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>
              Software Engineer · Machine Learning Enthusiast · IIT Madras
            </span>

            <span style={{ fontSize: '15px', color: '#94a3b8', fontFamily: 'monospace' }}>
              here&apos;s my digital coordinates.
            </span>
          </div>
        </div>

        {/* Action Buttons & Spotify */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* View Resume Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
              </svg>
              <span>view resume</span>
            </div>

            {/* View Notes Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                backgroundColor: '#e2e8f0',
                color: '#334155',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
              <span>view notes</span>
            </div>

            {/* Send Message Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                backgroundColor: '#e2e8f0',
                color: '#334155',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>send message</span>
            </div>
          </div>

          {/* Spotify Bar with Native SVG */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'monospace', fontSize: '13px', color: '#475569' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1db954">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.306c-.215.352-.676.463-1.028.248-2.817-1.721-6.362-2.111-10.538-1.157-.402.092-.803-.16-.895-.562-.092-.403.16-.804.563-.896 4.571-1.045 8.492-.595 11.65 1.339.352.215.463.676.248 1.028zm1.467-3.262c-.27.44-.847.579-1.287.31-3.225-1.982-8.14-2.557-11.954-1.399-.494.15-1.019-.133-1.169-.627-.15-.494.133-1.019.627-1.169 4.364-1.324 9.791-.682 13.473 1.581.44.27.579.847.31 1.287zm.126-3.41c-3.867-2.296-10.248-2.508-13.939-1.388-.593.18-1.22-.162-1.4-.755-.18-.593.162-1.22.755-1.4 4.246-1.289 11.297-1.042 15.753 1.604.533.316.707 1.008.391 1.541-.316.533-1.008.707-1.541.391z" />
            </svg>
            <span style={{ color: '#1db954', fontWeight: 600 }}>Spotify</span>
            <span>—</span>
            <span>Building intelligent software, scalable backends & AI systems</span>
          </div>
        </div>

        {/* Monospace Quote Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid #3b82f6',
            borderRadius: '8px',
            padding: '14px 20px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#475569',
            lineHeight: 1.5,
          }}
        >
          <span>&gt; from local, got lost in localhost</span>
          <span>&gt; turning caffeine into bugs, one bug at a time</span>
          <span>&gt; lone and peaceful.</span>
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
          <span style={{ color: '#0f172a', fontWeight: 600 }}>divyanshusaini.me</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
