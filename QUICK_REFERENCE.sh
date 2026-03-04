#!/bin/bash
# Quick Reference Commands for Portfolio Project

echo "📚 Portfolio Project - Quick Reference"
echo "======================================"

# Development
echo ""
echo "🚀 Development & Testing"
echo "npm run dev              # Start development server"
echo "npm run build            # Build for production"
echo "npm run start            # Start production server"
echo "npm run lint             # Run ESLint"

# Build & Export
echo ""
echo "📦 Build & Export"
echo "npm run build            # Creates optimized production build"
echo "ls out/                  # View static export files"

# Testing & Quality
echo ""
echo "🧪 Testing & Quality"
echo "npx tsc --noEmit         # TypeScript type checking"
echo "npx lighthouse https://localhost:3000  # Performance audit"

# Deployment
echo ""
echo "🌐 Deployment"
echo "# GitHub Pages (auto-deployed via Actions)"
echo "git push origin main"
echo ""
echo "# Vercel"
echo "npm install -g vercel"
echo "vercel"

# File Structure
echo ""
echo "📁 Important Files"
echo "app/layout.tsx           # Root layout with metadata"
echo "app/page.tsx             # Home page"
echo "app/fonts.ts             # Font configurations"
echo "types/index.ts           # TypeScript definitions"
echo "components/portfolio/    # All page sections"
echo "public/robots.txt        # SEO configuration"

# Environment
echo ""
echo "⚙️  Environment Setup"
echo "cp .env.example .env.local  # Create local environment file"

# Pre-deployment Checklist
echo ""
echo "✅ Pre-deployment Checklist"
echo "[ ] Update domain in metadata (app/layout.tsx)"
echo "[ ] Update Twitter handle (app/layout.tsx)"
echo "[ ] Test production build: npm run build"
echo "[ ] Test all external links"
echo "[ ] Test on mobile devices"
echo "[ ] Test keyboard navigation"
echo "[ ] Verify sound playback"
echo "[ ] Run Lighthouse audit"

# URLs to Update
echo ""
echo "📍 URLs to Customize"
echo "1. Open Graph URLs: app/layout.tsx (line ~32)"
echo "2. Canonical URL: app/layout.tsx (line ~48)"
echo "3. Social links: components/portfolio/header.tsx"
echo "4. Contact info: components/portfolio/contact.tsx"
echo "5. Email: components/portfolio/contact.tsx"

# Documentation
echo ""
echo "📖 Documentation"
echo "ANALYSIS_AND_IMPROVEMENTS.md - Complete analysis"
echo "PRODUCTION_READY.md          - Deployment guide"
echo "PRODUCTION_NOTES.md          - Issues fixed"
echo ".env.example                 - Environment variables"

echo ""
echo "✨ Ready for production! 🚀"
