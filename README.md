# Alex Malik Fitness — Full Stack Website

A clean, minimal fitness trainer website with a public-facing site and a full admin panel.

---

## Tech Stack

- **Next.js 14** (App Router) — frontend + API
- **MongoDB + Mongoose** — database
- **NextAuth.js** — admin authentication
- **Tailwind CSS** — styling
- **TipTap** — rich text blog editor

---

## Project Structure

```
fitness-site/
├── app/
│   ├── page.tsx                  → Homepage (Hero, About, Contact)
│   ├── blog/                     → Blog listing + single post
│   ├── packages/                 → Training packages page
│   └── admin/                    → Admin panel (protected)
│       ├── login/                → Admin login
│       ├── dashboard/            → Overview stats
│       ├── bio/                  → Edit trainer profile
│       ├── blogs/                → CRUD blog posts
│       └── packages/             → CRUD packages
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── admin/
│       ├── AdminGuard.tsx        → Auth protection wrapper
│       ├── AdminSidebar.tsx
│       └── RichEditor.tsx        → TipTap WYSIWYG editor
├── models/                       → Mongoose schemas
│   ├── Admin.ts
│   ├── Bio.ts
│   ├── Blog.ts
│   └── Package.ts
├── lib/
│   ├── mongodb.ts                → DB connection
│   └── auth.ts                  → NextAuth config
├── app/api/                      → REST endpoints
│   ├── auth/[...nextauth]/
│   ├── bio/
│   ├── blogs/[id]/
│   └── packages/[id]/
└── scripts/seed.js               → Create admin + default bio
```

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

> Also install the Typography plugin used by Tailwind:
```bash
npm install @tailwindcss/typography
```

### 2. Configure environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Then fill in:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/fitness-site?retryWrites=true&w=majority
NEXTAUTH_SECRET=any-random-long-string
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourStrongPassword
```

**Get MongoDB URI:** Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas) → Connect → Drivers → Copy connection string.

### 3. Seed the database

This creates the admin user and a default bio:

```bash
npm run seed
```

### 4. Run the dev server

```bash
npm run dev
```

Visit:
- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

---

## Admin Panel

| Page | URL |
|---|---|
| Login | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Edit Bio | `/admin/bio` |
| Blogs | `/admin/blogs` |
| New Blog | `/admin/blogs/new` |
| Packages | `/admin/packages` |

Default credentials (from `.env.local`):
- Email: `admin@fitnesssite.com`
- Password: `Admin@123`

---

## Deployment (Vercel + MongoDB Atlas)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all env variables from `.env.local` in Vercel dashboard
4. Change `NEXTAUTH_URL` to your production domain (e.g. `https://alexmalik.com`)
5. Deploy — Vercel handles the rest

---

## Customising Placeholder Content

All placeholder text (name "Alex Malik", bio, stats) is stored in MongoDB and editable from `/admin/bio`. Run the seed script once to populate defaults, then update via the admin panel.

---

## Adding Images

The site uses URL-based images. You can:
- Use any image hosting (Cloudinary free tier, Imgur, etc.)
- Paste the URL into the "Cover Image URL" or "Profile Image URL" fields in the admin panel

For production, [Cloudinary](https://cloudinary.com) free tier is recommended.
