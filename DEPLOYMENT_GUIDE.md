# Netlify Deployment Guide for Puracé Website

## Prerequisites
- Your website files (current folder)
- GoDaddy account with domain
- Netlify account (free - sign up at netlify.com)

---

## Part 1: Deploy to Netlify (5 minutes)

### Option A: Drag & Drop (Easiest)

1. **Go to Netlify**
   - Visit: https://app.netlify.com/drop
   - Sign up/login with GitHub, GitLab, or email

2. **Prepare Your Files**
   - Create a ZIP of your website folder OR
   - Keep the folder ready to drag

3. **Deploy**
   - Drag your `Website` folder into the Netlify drop zone
   - Wait 30 seconds for deployment
   - You'll get a URL like: `random-name-123.netlify.app`

4. **Test Your Site**
   - Click the generated URL
   - Verify all pages work
   - Test Stripe "Buy Now" buttons

### Option B: GitHub Deploy (Recommended for Updates)

1. **Create GitHub Repository**
   ```powershell
   cd "e:\Purace\Website"
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create new repo at github.com
   - Follow GitHub's push instructions

3. **Connect to Netlify**
   - In Netlify dashboard: "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings: Leave empty (static site)
   - Click "Deploy site"

---

## Part 2: Connect GoDaddy Domain (5 minutes)

### Step 1: Add Domain in Netlify

1. In Netlify dashboard, click your site
2. Go to **Domain settings** → **Add custom domain**
3. Enter your domain: `www.purace.com` or `purace.com`
4. Click "Verify" and "Add domain"

### Step 2: Configure DNS in GoDaddy

**Method 1: Using Netlify DNS (Recommended)**

1. In Netlify: **Domain settings** → **Netlify DNS**
2. Copy the 4 nameservers (e.g., `dns1.p03.nsone.net`)

3. Go to GoDaddy:
   - Login → My Products → Domain
   - Click your domain → Manage DNS
   - Scroll to "Nameservers" → Click "Change"
   - Select "Custom" and paste Netlify nameservers
   - Save (takes 24-48 hours to propagate)

**Method 2: Using GoDaddy DNS (Faster)**

1. In Netlify: Note your site URL (e.g., `random-name-123.netlify.app`)

2. Go to GoDaddy DNS Management:
   - Add/Edit **A Record**:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     TTL: 600
     ```
   
   - Add **CNAME Record** for www:
     ```
     Type: CNAME
     Name: www
     Value: random-name-123.netlify.app
     TTL: 600
     ```

3. Save changes (takes 10-60 minutes)

### Step 3: Enable HTTPS

1. In Netlify: **Domain settings** → **HTTPS**
2. Click "Verify DNS configuration"
3. Once verified, click "Provision certificate"
4. Wait 1-2 minutes for SSL setup
5. Enable "Force HTTPS" toggle

---

## Part 3: Post-Deployment Checklist

### Update SEO URLs
Replace all instances of `https://www.purace.com/` in your code with your actual domain if different.

**Files to check:**
- `index.html` - Open Graph URLs, canonical links
- `product1.html` - Meta tags
- `product2.html` - Meta tags
- `product3.html` - Meta tags
- `product4.html` - Meta tags
- `about.html` - Meta tags
- `sitemap.xml` - All URLs

### Test Everything

✅ **Homepage:** Check slideshow, products load
✅ **Navigation:** All menu links work
✅ **Product Pages:** All 4 product pages load correctly
✅ **About/Ingredients:** Content displays properly
✅ **Stripe Links:** "Buy Now" buttons redirect correctly
✅ **Mobile:** Test on phone (responsive design)
✅ **Forms:** Email links work (mailto: links)
✅ **Footer:** All footer links work
✅ **SSL:** Green padlock in browser
✅ **Speed:** Site loads quickly

### Submit to Search Engines

1. **Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add property: `purace.com`
   - Verify ownership (use HTML tag method)
   - Submit sitemap: `https://www.purace.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Go to: https://www.bing.com/webmasters
   - Add site and verify
   - Submit sitemap

---

## Part 4: Future Updates

### Making Changes

**If using Drag & Drop:**
1. Edit files locally
2. Drag entire folder to Netlify again
3. Overwrites previous deployment

**If using GitHub:**
1. Edit files locally
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Update description"
   git push
   ```
3. Netlify auto-deploys in 30 seconds

---

## Common Issues & Solutions

### Issue: Domain not working after 24 hours
**Solution:** Check nameservers in GoDaddy match Netlify exactly

### Issue: "Buy Now" buttons not working
**Solution:** Verify Stripe links are correct in HTML files

### Issue: CSS not loading
**Solution:** Check file paths are relative (no leading `/` needed)

### Issue: Images not showing
**Solution:** Verify image paths match folder structure exactly

### Issue: SSL certificate pending
**Solution:** Wait 1-2 minutes, refresh page. If persists, verify DNS setup

---

## Performance Optimization (Optional)

### Enable Netlify Features

1. **Asset Optimization**
   - Dashboard → Build & deploy → Post processing
   - Enable: Bundle CSS, Minify CSS, Minify JS
   - Enable: Pretty URLs

2. **Headers** (Create `netlify.toml` in root):
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
   
   [[headers]]
     for = "*.css"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   
   [[headers]]
     for = "*.js"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   
   [[headers]]
     for = "*.jpg"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   
   [[headers]]
     for = "*.png"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

3. **Redirects** (Add to `netlify.toml`):
   ```toml
   [[redirects]]
     from = "https://purace.com/*"
     to = "https://www.purace.com/:splat"
     status = 301
     force = true
   ```

---

## Support & Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Status:** https://www.netlifystatus.com
- **GoDaddy Support:** DNS propagation checker at https://dnschecker.org

---

## Quick Reference

**Your Site Files Location:** `e:\Purace\Website`

**Netlify Dashboard:** https://app.netlify.com

**GoDaddy DNS:** https://dcc.godaddy.com/manage/dns

**Google Search Console:** https://search.google.com/search-console

**Current Stripe Links:**
- Kiso: `https://buy.stripe.com/cNi00k01rfF0bzLerD04800`
- Tayos: `https://buy.stripe.com/6oUaEYbK98cydHTcjv04801`
- Sotara: `https://buy.stripe.com/00wcN6g0p64qdHTabn04802`
- Restorative: `YOUR_STRIPE_LINK_RESTORATIVE` (needs setup)

---

**Deployment Time:** ~15 minutes total
**Cost:** Free (Netlify free tier + existing GoDaddy domain)
