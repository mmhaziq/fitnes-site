# Pump & Burn — Fitness Trainer Website — Fitness Trainer Website

A full-stack personal trainer website built with **Next.js 14**, **MongoDB Atlas**, and **Tailwind CSS**. Includes a complete admin dashboard for managing all content.

**Live site:** https://fitness-site-fawn.vercel.app  
**Admin panel:** https://fitness-site-fawn.vercel.app/admin/login

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth.js (JWT strategy) |
| Styling | Tailwind CSS |
| Rich text | Tiptap editor |
| Image upload | Cloudinary (unsigned upload) |
| Hosting | Vercel |
| Repo | GitHub (private) |

---

## Project Structure

```
fitness-site/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual blog post
│   ├── packages/page.tsx         # Packages page
│   ├── admin/
│   │   ├── login/page.tsx        # Admin login
│   │   ├── dashboard/page.tsx    # Dashboard with analytics
│   │   ├── bio/page.tsx          # Edit bio / profile
│   │   ├── blogs/                # Blog management
│   │   ├── packages/page.tsx     # Package management
│   │   ├── testimonials/page.tsx # Testimonial management
│   │   ├── gallery/page.tsx      # Before/After gallery
│   │   ├── faqs/page.tsx         # FAQ management
│   │   └── contacts/page.tsx     # Contact form inbox
│   └── api/
│       ├── auth/                 # NextAuth handler
│       ├── bio/                  # Bio CRUD
│       ├── blogs/                # Blog CRUD
│       ├── packages/             # Package CRUD
│       ├── testimonials/         # Testimonial CRUD
│       ├── gallery/              # Gallery CRUD
│       ├── faqs/                 # FAQ CRUD
│       └── contact/              # Contact form submissions
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx           # Contact form (client component)
│   ├── WhatsAppButton.tsx        # Floating WhatsApp button
│   └── admin/
│       ├── AdminGuard.tsx        # Auth wrapper for admin pages
│       ├── AdminSidebar.tsx      # Admin navigation
│       ├── RichEditor.tsx        # Tiptap rich text editor
│       └── ImageUpload.tsx       # Cloudinary image uploader
├── models/
│   ├── Bio.ts
│   ├── Blog.ts
│   ├── Package.ts
│   ├── Testimonial.ts
│   ├── Gallery.ts
│   ├── Faq.ts
│   └── Contact.ts
├── lib/
│   └── mongodb.ts                # DB connection helper
├── middleware.ts                 # Auth redirect for /admin/*
└── scripts/
    └── seed.ts                   # DB seed script (creates admin user)
```

---

## Features

### Public Site
- **Homepage** — hero with stats, about section, before/after gallery, testimonials, CTA banner, FAQ accordion, contact form
- **Blog** — listing page + individual post pages with rich content
- **Packages** — pricing cards with highlighted/popular package support
- **Floating WhatsApp button** — appears on all pages, links to trainer's WhatsApp
- **SEO metadata** — per-page titles and descriptions; dynamic metadata on blog posts
- **Dark theme** throughout — `stone-950` / `stone-900` palette with lime accent (`#B4FF4F`)

### Admin Dashboard
- **Protected** — all `/admin/*` routes redirect to login if not authenticated (Next.js middleware)
- **Dashboard** — live counts: blogs, packages, testimonials, gallery entries, FAQs, unread inquiries
- **Bio / Profile** — edit name, title, tagline, about, location, contact links, certifications, stats
- **Blogs** — create/edit/delete posts with rich text editor, tags, cover image; toggle published/draft; preview before publishing
- **Packages** — add/edit/delete training packages with pricing, features list, highlight flag
- **Testimonials** — add client reviews with name, role, star rating (1–5), optional photo
- **Gallery** — before/after transformation photos with client name and duration
- **FAQs** — manage accordion questions/answers shown on homepage
- **Inquiries** — read contact form submissions; mark read/unread; delete

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/fitness-site?retryWrites=true&w=majority

# NextAuth — generate secret with: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Admin credentials (used by seed script)
ADMIN_EMAIL=admin@fitnessite.com
ADMIN_PASSWORD=Admin@123

# Cloudinary (for image uploads) — get from cloudinary.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

### Vercel Environment Variables

Set the same variables in the Vercel dashboard under **Settings → Environment Variables**, but update `NEXTAUTH_URL` to your live domain:

```
NEXTAUTH_URL=https://fitness-site-fawn.vercel.app
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with the variables above

# 3. Seed the database (creates admin user)
npm run seed

# 4. Start dev server
npm run dev
```

Site runs at **http://localhost:3000**

---

## Deployment

```bash
# Push to GitHub
git add -A && git commit -m "your message" && git push origin main

# Manual Vercel production deploy
npx vercel --prod --yes
```

Vercel auto-deploys on every push to `main` if the GitHub integration is connected.

---

## Admin Access

| Field | Value |
|-------|-------|
| URL | `/admin/login` |
| Email | `admin@fitnessite.com` |
| Password | `Admin@123` |

> Change these after first login by editing the Admin document directly in MongoDB Atlas.

---

## Image Upload Setup (Cloudinary)

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload presets**
3. Create a new preset — set signing mode to **Unsigned**
4. Copy your **Cloud Name** and **Preset Name**
5. Add to `.env.local` and to Vercel environment variables:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```
6. Redeploy — the Upload button will appear in admin image fields

Until Cloudinary is configured, you can still paste image URLs directly.

---

## Homepage Sections (data-driven)

These sections only appear when data exists in the database:

| Section | Admin page to manage |
|---------|---------------------|
| Before/After Gallery | Admin → Gallery |
| Testimonials | Admin → Testimonials |
| FAQ accordion | Admin → FAQs |

The Hero, About, CTA banner, and Contact sections are always visible and pull from **Admin → Bio / Profile**.

---

## Branding

- **Name:** Pump & Burn.
- **Accent color:** `#B4FF4F` (soft lime)
- **Theme:** Full dark — `bg-stone-950` base, `bg-stone-900` cards/sections
- **Font:** Display font via `font-display` Tailwind class
