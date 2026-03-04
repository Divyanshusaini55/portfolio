# GitHub Repository Setup Checklist

## Pre-Deployment Configuration

Before pushing your portfolio to production, complete these configuration steps on GitHub:

---

## ✅ Repository Basic Settings

- [ ] **Repository Name:** Check if it's `portfolio` or your main repository
  - If it's your main repo (username.github.io): Uses default GitHub Pages URL
  - If it's named something else: Uses `/repository-name` path

- [ ] **Visibility:** Set to Public (required for GitHub Pages free tier)
  - Go to Settings → Visibility
  - Select "Public"

- [ ] **Default Branch:** Set to `main` or `master`
  - Go to Settings → Branches
  - Set default branch (matches your workflow trigger)

---

## ✅ GitHub Pages Configuration

### Location: Settings → Pages

- [ ] **Build and deployment**
  - Source: **GitHub Actions** (NOT Branch)
  - This ensures our workflow deploys the site

- [ ] **Branch Protection (Optional but Recommended)**
  - Go to Settings → Rules → Add rule
  - Branch name pattern: `main` or `master`
  - Require pull request reviews before merging
  - Require status checks to pass before merging

---

## ✅ Environment Variables & Secrets

### Location: Settings → Secrets and variables → Actions

#### For GitHub Pages Default URL

Skip this if using `divyanshu-portfolio.pages.github.io` (default)

#### For Custom Domain

Create these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `NEXT_PUBLIC_DOMAIN` | Your full domain URL | `https://yourdomain.com` |

**Steps:**
1. Click "New repository secret"
2. Name: `NEXT_PUBLIC_DOMAIN`
3. Value: `https://yourdomain.com`
4. Click "Add secret"

---

## ✅ Workflow Configuration

### File Location: `.github/workflows/deploy.yml`

- [ ] **File exists** at `.github/workflows/deploy.yml`
  - Should show in repository root
  - Workflow file is committed and pushed

- [ ] **Workflow permissions** (Settings → Actions → General)
  - Actions permissions: "Allow all actions and reusable workflows"
  - Workflow permissions: "Read and write permissions"
  - "Allow GitHub Actions to create and approve pull requests"

- [ ] **Enable workflows**
  - Actions tab should show "Deploy to GitHub Pages"
  - Status should be "Active" (not disabled)

---

## ✅ Repository Files

### Essential Files Present

- [ ] `.github/workflows/deploy.yml` - GitHub Actions workflow
- [ ] `next.config.js` - Has `output: 'export'`
- [ ] `package.json` - Has `build` script
- [ ] `public/` - Contains assets
- [ ] `public/CNAME` - For custom domain (optional)
- [ ] `app/` - Next.js app directory
- [ ] `components/` - React components

### Configuration Files

- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `tailwind.config.js` - Tailwind configuration
- [ ] `postcss.config.js` - PostCSS configuration

---

## ✅ Domain Configuration (If Using Custom Domain)

### Your Domain Registrar

- [ ] **DNS Records Updated**
  
  **Option A: CNAME (Recommended)**
  ```
  Type: CNAME
  Name: www
  Value: yourusername.github.io
  TTL: 3600 (or default)
  ```

  **Option B: A Records (for root domain)**
  ```
  Type: A
  Name: @ (or blank)
  Value: 185.199.108.153
  (Also add: 185.199.109.153, 185.199.110.153, 185.199.111.153)
  TTL: 3600 (or default)
  ```

  **Option C: AAAA Records (IPv6)**
  ```
  Type: AAAA
  Name: @ (or blank)
  Value: 2606:50c0:8000::153
  (Also add the other three AAAA records from GitHub docs)
  ```

### GitHub Repository

- [ ] **Custom Domain Configured** (Settings → Pages)
  - Custom domain field: Enter `yourdomain.com`
  - Click "Save"
  - Wait for "DNS check successful" message

- [ ] **HTTPS Enabled**
  - Go to Settings → Pages
  - Check "Enforce HTTPS"
  - Wait for SSL certificate (5-30 minutes)

- [ ] **CNAME File**
  - File: `public/CNAME`
  - Contains: `yourdomain.com`
  - Will be auto-deployed with each push

### Verify DNS Configuration

- [ ] **DNS Propagation** (Wait 5-48 hours)
  - Tool: https://dnschecker.org/
  - Check: `yourdomain.com` resolves to GitHub Pages IP

- [ ] **Certificate Issued**
  - Settings → Pages
  - Should show: "Certificate is being issued"
  - Then: "Your site is live at https://yourdomain.com"

---

## ✅ Content Verification

Before deploying, verify in source code:

- [ ] **Remove placeholder URLs:**
  - Search for `yourdomain.com` in code
  - Check: `app/layout.tsx`
  - Check: `public/robots.txt`
  - Update to actual domain or use `NEXT_PUBLIC_DOMAIN`

- [ ] **Verify social links:**
  - GitHub URL correct
  - LinkedIn URL correct
  - Email address correct
  - Phone number correct

- [ ] **Check asset paths:**
  - All images in `public/` folder
  - No references to `/assets/` (use `/public/`)
  - Resume file accessible at `/resume.pdf`

- [ ] **Metadata is dynamic:**
  - `app/layout.tsx` uses `getDomain()` function
  - Open Graph URLs use dynamic domain
  - Twitter URLs use dynamic domain

---

## ✅ Local Testing Before Push

```bash
# 1. Build locally (matches GitHub build)
npm run build

# 2. Start production server
npm run start

# 3. Test in browser
# - Open http://localhost:3000
# - Test all pages and features
# - Test mobile view (DevTools)
# - Test all links
# - Test interactive features

# 4. Check for errors
# - Open browser DevTools (F12)
# - Check Console tab for errors
# - Check Network tab for failed requests
# - Check Performance tab for slow resources
```

---

## ✅ Pre-Push Checklist

Before final push to GitHub:

- [ ] **Git status clean:**
  ```bash
  git status
  # Should show: "working tree clean"
  ```

- [ ] **All changes staged and committed:**
  ```bash
  git add .
  git commit -m "Deploy portfolio to GitHub Pages"
  ```

- [ ] **Branch is up to date:**
  ```bash
  git pull origin main
  # If conflicts, resolve them first
  ```

- [ ] **Ready to push:**
  ```bash
  git push origin main
  ```

---

## ✅ Post-Push Deployment Verification

### Immediately After Push

1. **Go to Actions tab** in GitHub repository
2. **Look for workflow run** (should start automatically)
3. **Monitor the progress:**
   - Yellow circle = Running
   - Green checkmark = Success
   - Red X = Failed

### After Successful Deployment (1-5 minutes)

1. **Visit your site:**
   - Default: `https://username.github.io/portfolio`
   - Custom: `https://yourdomain.com`
   - Should load without errors

2. **Verify content:**
   - [ ] Header displays correctly
   - [ ] Profile image visible
   - [ ] All sections load
   - [ ] Navigation works
   - [ ] Links are functional
   - [ ] Styling is applied (not broken)

3. **Test interactive features:**
   - [ ] Download button works
   - [ ] Audio plays (if no sound, check browser settings)
   - [ ] Cat animation appears
   - [ ] Smooth scrolling works
   - [ ] Mobile menu works (if applicable)

4. **Check browser console:**
   - Press F12 or Cmd+Option+I
   - Go to Console tab
   - Should have NO red error messages
   - May have yellow warnings (OK)

5. **Test on mobile:**
   - Open on phone or use DevTools
   - Verify responsive layout
   - Test touch interactions
   - Verify all content readable

---

## 🔧 Troubleshooting Deployment

### Workflow Not Starting

**Solution:**
1. Check if `.github/workflows/deploy.yml` exists
2. Push should trigger automatically (check Actions tab)
3. If not showing: Re-push after 30 seconds
4. Or manually trigger: Actions → Deploy to GitHub Pages → Run workflow

### Build Failed (Red X)

**Steps to debug:**
1. Click on the failed run in Actions
2. Expand "Build" step
3. Scroll to see error message
4. Common errors:
   - `npm ci failed`: Clear cache in Actions settings
   - `TypeScript error`: Run `npm run build` locally to fix
   - `Port error`: Not related to GitHub deployment

### Site Shows 404

**Possible causes:**
1. Wrong base path (if repo not named username.github.io)
2. CNAME file missing for custom domain
3. GitHub Pages not set to use GitHub Actions
4. Workflow hasn't completed yet (wait 2-5 minutes)

**Check:**
1. Settings → Pages → Shows correct URL
2. Deployments → Latest shows "Active"
3. Wait 60 seconds and refresh browser
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Old Content Still Showing

**Clear caches:**
1. GitHub Pages cache:
   - Go to Actions → Deploy to GitHub Pages
   - Click "Run workflow" → main → "Run workflow"
   - This forces a fresh deployment

2. Browser cache:
   - DevTools → Application → Clear site data
   - Or use incognito/private window

3. CDN cache (if using one):
   - Flush CDN cache
   - Wait 5-15 minutes for propagation

---

## 📊 Monitoring Ongoing

### Regular Checks

After initial deployment, periodically check:

- [ ] **GitHub Actions** - Latest workflow runs green
- [ ] **Pages Deployments** - Shows recent successful deployments
- [ ] **Site Availability** - Visit site monthly to verify
- [ ] **SEO** - Check Google Search Console for crawl status
- [ ] **Analytics** - Monitor traffic and user behavior

### Automated Checks

- [ ] Enable: Settings → Pages → "Enforce HTTPS"
- [ ] Enable: Settings → Pages → "Require HTTPS for all commits"
- [ ] Enable: Settings → Code security → Dependabot alerts

---

## 🔐 Security Checklist

- [ ] **HTTPS enabled** (automatic for GitHub Pages)
- [ ] **No sensitive data in code** (no API keys, passwords)
- [ ] **Public repository** (required for free GitHub Pages)
- [ ] **Secrets properly configured** (Settings → Secrets)
- [ ] **No hardcoded domains** (use NEXT_PUBLIC_DOMAIN)

---

## 📝 Repository Metadata

Update these for better discoverability:

### Location: Settings → General

- [ ] **Repository name** - Descriptive
- [ ] **Description** - "Personal portfolio website"
- [ ] **Website** - Link to your live portfolio
- [ ] **Topics** - Add relevant tags:
  - `portfolio`
  - `next-js`
  - `typescript`
  - `tailwind-css`
  - `github-pages`

---

## 🎯 Final Verification Checklist

Before considering deployment complete:

- [ ] Workflow completes without errors
- [ ] Site loads on custom domain or GitHub Pages URL
- [ ] All pages accessible
- [ ] All interactive features work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Open Graph preview works (test on Facebook share)
- [ ] Twitter preview works (test on Twitter share)
- [ ] Lighthouse score > 85
- [ ] All links working (check with link checker)

---

## 📞 Quick Reference

| Task | Command/Location |
|------|------------------|
| View Workflow | GitHub repo → Actions → Deploy to GitHub Pages |
| Manual Deploy | Actions → Workflows → Run workflow |
| Check Deployments | Settings → Pages → Deployments |
| View Live Site | Settings → Pages → URL shown |
| Set Custom Domain | Settings → Pages → Custom domain field |
| Update Secrets | Settings → Secrets and variables → Actions |
| View Build Logs | Actions → Failed run → Build step |
| Clear Cache | Actions → Settings → Clear cache → Retry workflow |

---

**Last Updated:** March 4, 2026
**Repository Type:** Next.js + TypeScript
**Deployment Method:** GitHub Actions → GitHub Pages
**Static Export:** Enabled
