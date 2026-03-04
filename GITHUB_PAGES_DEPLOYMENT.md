# GitHub Pages Deployment Guide

## Overview
Your Next.js portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions. This guide covers setup, troubleshooting, and custom domain configuration.

---

## ✅ Current Configuration Status

### Static Export Setup
- ✅ `next.config.js` configured with `output: 'export'`
- ✅ Images unoptimized for static hosting
- ✅ Build generates `/out` directory for deployment
- ✅ Node.js 20+ for optimal Next.js 16 compatibility

### GitHub Actions Workflow
- ✅ `.github/workflows/deploy.yml` configured
- ✅ Auto-deploys on push to `main` or `master` branch
- ✅ Manual deployment via `workflow_dispatch` available
- ✅ Proper permissions set for pages deployment

### Dynamic Domain Configuration
- ✅ Environment variable support: `NEXT_PUBLIC_DOMAIN`
- ✅ Fallback to GitHub Pages default URL
- ✅ Open Graph and Twitter meta tags use dynamic domain

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

```bash
# Ensure you're on the main/master branch
git status

# Verify all changes are committed
git add .
git commit -m "Deploy Next.js portfolio to GitHub Pages"
git push origin main  # or master
```

### Step 2: Configure GitHub Repository Settings

1. **Go to repository Settings → Pages**
2. **Build and deployment section:**
   - Source: `GitHub Actions` (should be auto-selected)
   - Do NOT select branch deployment (we're using Actions)

3. **Verify the workflow file exists:**
   - Path: `.github/workflows/deploy.yml`
   - Status: Should show as active

### Step 3: Trigger Deployment

The workflow runs automatically on:
- **Push to main/master branch** - Triggered automatically
- **Manual trigger** - Go to Actions tab → Deploy to GitHub Pages → Run workflow

### Step 4: Monitor Deployment

1. **Go to Actions tab** in your GitHub repository
2. **Look for "Deploy to GitHub Pages" workflow**
3. **Status indicators:**
   - 🟡 Yellow = Running
   - 🟢 Green = Success
   - 🔴 Red = Failed

4. **Check the build logs:**
   - Click on the workflow run
   - Expand "Build" section to see Next.js build output
   - Check "Deploy" section for deployment status

### Step 5: Verify Live Site

After successful deployment (usually 30-60 seconds):

- **Default GitHub Pages URL:** `https://username.github.io/portfolio`
- **Check deployment environment:** 
  - Go to Settings → Deployments
  - View the latest deployment URL

---

## 🔧 Environment Variables

### Default Behavior
If no custom domain is set, the site uses:
```
https://divyanshu-portfolio.pages.github.io
```

### Setting Custom Domain (GitHub Secret)

1. **Go to Settings → Secrets and variables → Actions**
2. **Create new repository secret:**
   - Name: `NEXT_PUBLIC_DOMAIN`
   - Value: `https://yourdomain.com` (or `https://yourusername.github.io/portfolio`)

3. **Workflow will use this when building**

---

## 🌐 Custom Domain Setup

### Option 1: Custom Domain (yoursite.com)

#### Step 1: Update Domain Provider DNS Records
Add these DNS records to your domain registrar:

**For CNAME (recommended):**
```
CNAME: www.yourdomain.com → username.github.io
```

**For A records (no www):**
```
A: yourdomain.com → 185.199.108.153
A: yourdomain.com → 185.199.109.153
A: yourdomain.com → 185.199.110.153
A: yourdomain.com → 185.199.111.153
```

**For AAAA records (IPv6):**
```
AAAA: yourdomain.com → 2606:50c0:8000::153
AAAA: yourdomain.com → 2606:50c0:8001::153
AAAA: yourdomain.com → 2606:50c0:8002::153
AAAA: yourdomain.com → 2606:50c0:8003::153
```

#### Step 2: Configure in GitHub

1. **Go to Settings → Pages**
2. **Custom domain field:**
   - Enter: `yourdomain.com`
   - Click "Save"

3. **Update CNAME file:**
   - The file `public/CNAME` has been created for you
   - It should contain just your domain: `yourdomain.com`
   - Workflow will preserve this during deployment

4. **Enable HTTPS:**
   - Check "Enforce HTTPS" (recommended)
   - Wait for certificate (5-30 minutes)

#### Step 3: Update Environment Variables

1. **Create secret `NEXT_PUBLIC_DOMAIN`:**
   - Value: `https://yourdomain.com`

2. **Update `public/robots.txt`:**
   ```
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

3. **Rebuild and deploy:**
   ```bash
   git add . && git commit -m "Update domain" && git push origin main
   ```

---

### Option 2: GitHub Pages URL (username.github.io/portfolio)

If your repository is named `portfolio`:

1. **Update next.config.js (if needed):**
   ```javascript
   const nextConfig = {
     basePath: '/portfolio',  // Add this
     output: 'export',
     images: { unoptimized: true },
   }
   ```

2. **Set environment variable:**
   - `NEXT_PUBLIC_DOMAIN`: `https://username.github.io/portfolio`

3. **Update CNAME file:**
   - Delete or leave empty (GitHub will ignore it)

---

## 🐛 Troubleshooting

### Workflow Failed to Build

**Check logs:**
1. Go to Actions → Deploy to GitHub Pages
2. Click on failed run
3. Expand "Build" step

**Common issues:**

| Issue | Solution |
|-------|----------|
| `npm ci failed` | Clear cache: Settings → Actions → Clear cache → Retry |
| `TypeScript errors` | Fix errors locally: `npm run build` |
| `Out of memory` | Update Node.js version in workflow to 20+ |
| `Port already in use` | Not related to GitHub, happens locally only |

### Site Not Deploying

**Verify:**
1. ✅ Workflow file exists: `.github/workflows/deploy.yml`
2. ✅ Repository has "Pages" enabled (Settings → Pages)
3. ✅ Build and deployment source: "GitHub Actions"
4. ✅ Push to `main` or `master` branch
5. ✅ No `.nojekyll` file conflicts (we don't need it)

**Manual trigger:**
```
GitHub → Actions → Deploy to GitHub Pages → Run workflow
```

### Site Shows 404 or Old Content

**Clear cache and rebuild:**
```bash
# Local
rm -rf .next out node_modules
npm install
npm run build

# On GitHub
1. Go to Actions → Deploy to GitHub Pages
2. Click "Run workflow" → main → Run workflow
```

**Browser cache:**
```bash
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# Clear browser cache completely
```

### Custom Domain Not Working

**Check DNS propagation:**
- Tool: https://dnschecker.org/
- Enter: yourdomain.com
- Should resolve to: `username.github.io`

**Typical delays:**
- DNS update: 5-48 hours
- Certificate generation: 5-30 minutes
- GitHub processing: 1-2 minutes

**Verify in GitHub:**
1. Settings → Pages
2. Should show: ✅ Domain verified
3. Should show: ✅ Certificate issued

---

## 📊 Monitoring Deployment

### GitHub Actions
- **Dashboard:** Actions tab in repository
- **Latest run:** Shows status and timing
- **Artifacts:** Build artifacts stored for 1 day

### Pages Settings
- **Deployments:** View all deployments
- **Current status:** Shows current live URL
- **History:** Last 10 deployments

---

## 🔄 Post-Deployment Checklist

After successful deployment:

- [ ] Visit live URL in browser
- [ ] Verify all pages load correctly
- [ ] Test all internal links work
- [ ] Test download resume button (sound plays)
- [ ] Test mobile responsiveness
- [ ] Check Open Graph tags (Facebook/Twitter share)
- [ ] Run Lighthouse audit for performance
- [ ] Verify robots.txt and sitemap.xml exist

**Lighthouse audit:**
```bash
# Install globally (optional)
npm install -g lighthouse

# Run audit (wait for site to be live first)
lighthouse https://yourdomain.com
```

---

## 🚨 Important Notes

### Preserving Custom Domain During Updates

The `public/CNAME` file ensures your custom domain is preserved during deployments:

```bash
# CNAME file in public/ directory
yourdomain.com
```

**This file is automatically included during each build!**

### Static Export Limitations

Your site uses static export, which means:
- ✅ No server-side rendering needed
- ✅ Perfect for GitHub Pages
- ✅ Best for performance
- ❌ No backend API routes (not needed for portfolio)
- ❌ No dynamic data fetching at runtime (not needed)

### Environment Variables

**Only accessible in build time:**
```javascript
// ✅ Works - Used at build time
const domain = process.env.NEXT_PUBLIC_DOMAIN

// ❌ Won't work - No server runtime
export async function handler(req) {
  return Response.json({ ... })
}
```

---

## 📝 Workflow Configuration Explained

**File:** `.github/workflows/deploy.yml`

| Component | Purpose |
|-----------|---------|
| `on: [push, workflow_dispatch]` | Trigger on push or manual run |
| `node-version: 20` | Latest stable Node.js |
| `--legacy-peer-deps` | Handle optional dependencies |
| `NEXT_PUBLIC_DOMAIN` | Dynamic domain at build time |
| `upload-pages-artifact` | Store build output for deployment |
| `deploy-pages` | Official GitHub deployment action |

---

## 🔐 Security Considerations

### HTTPS
- ✅ Automatically enforced on custom domains
- ✅ Free SSL certificate provided by GitHub
- ✅ Enable in Settings → Pages

### Secrets Management
- ✅ `NEXT_PUBLIC_DOMAIN` stored as repository secret
- ✅ Not exposed in public commits
- ✅ Only accessible during workflow runs

### Content Security
- ✅ Static site (no server exploits)
- ✅ Dependencies regularly updated
- ✅ GitHub scans for vulnerabilities

---

## 📱 Testing Before Deployment

### Local Verification
```bash
# Build locally
npm run build

# Start production server
npm run start

# Open http://localhost:3000
# Test all features before pushing
```

### Common Issues to Test
- [ ] All links work (internal & external)
- [ ] Images load correctly
- [ ] Audio plays on button click
- [ ] Cat animation appears
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] All text readable and properly styled

---

## 💡 Tips & Tricks

### Faster Rebuilds
```bash
# Only rebuild changed files
git push origin feature-branch
# Merge to main only when tested

# Avoid full rebuilds
git push --force  # ❌ Don't do this
```

### Debugging Build Failures

1. **Check workflow logs:**
   ```
   Actions → Failed run → Build step → See full output
   ```

2. **Reproduce locally:**
   ```bash
   rm -rf .next out
   npm ci --legacy-peer-deps
   npm run build
   ```

3. **Common Node issues:**
   ```bash
   node --version  # Should be 18+
   npm cache clean --force
   npm install
   ```

### Force Redeployment
```bash
# Create an empty commit
git commit --allow-empty -m "Rebuild"
git push origin main
```

---

## 📞 Getting Help

### GitHub Pages Documentation
- https://docs.github.com/en/pages

### Next.js Static Export
- https://nextjs.org/docs/app/building-your-application/deploying/static-exports

### GitHub Actions
- https://docs.github.com/en/actions

### Custom Domain Troubleshooting
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 🎉 Success Indicators

Your deployment is successful when:

1. ✅ GitHub Actions shows green checkmark
2. ✅ Site is accessible at your configured URL
3. ✅ All pages load without 404 errors
4. ✅ Static assets (CSS, JS, images) load correctly
5. ✅ Interactive features work (buttons, links, animations)
6. ✅ Mobile version displays properly
7. ✅ No browser console errors
8. ✅ Lighthouse score > 85

---

**Last Updated:** March 4, 2026
**Next.js Version:** 16.0.10
**GitHub Actions:** Ubuntu Latest
**Node.js:** 20+
