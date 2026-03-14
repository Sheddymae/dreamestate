# 🏠 DreamEstate

**Kenya's premium real estate platform** — find, list, and manage properties for sale and rent.
Villas · Houses · Apartments · Rooms · Commercial

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom design tokens |
| 3D / Animation | Three.js · React Three Fiber · Framer Motion |
| Maps | Mapbox GL JS |
| Database | PostgreSQL + PostGIS |
| Auth | Clerk |
| Media | Cloudinary |
| Search | Algolia |
| Payments | Stripe |
| Contracts | DocuSign API |
| Realtime | Socket.io |
| Deploy | Vercel (frontend) + Railway (backend) |

---

## 📁 Project Structure

```
dreamestate/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout (fonts, metadata)
│   │   ├── properties/       # /properties listing + /properties/[id]
│   │   ├── dashboard/        # User dashboard
│   │   └── marketing/        # list-property, about, etc.
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── home/             # HeroSection, SearchBar, FeaturedProperties, etc.
│   │   ├── property/         # PropertyCard, PropertyDetail
│   │   ├── 3d/               # Three.js components
│   │   ├── forms/            # ListPropertyForm, EnquiryForm
│   │   └── ui/               # Button, Badge, Input, Modal (reusable)
│   ├── lib/
│   │   ├── utils.ts          # cn() helper
│   │   └── mock-data.ts      # Dev placeholder data
│   ├── hooks/
│   │   ├── useTilt.ts        # 3D card tilt effect
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── index.ts          # All TypeScript interfaces
│   ├── constants/
│   │   └── index.ts          # Nav, cities, property types, formatPrice
│   └── styles/
│       └── globals.css       # Tailwind + custom classes + CSS variables
├── schema.sql                # Full PostgreSQL database schema
├── .env.example              # Environment variable template
├── tailwind.config.ts        # DreamEstate design tokens
├── next.config.js
└── tsconfig.json
```

---

## ⚡ Quick Start

### 1. Clone your repo and install dependencies

```bash
git clone https://github.com/YOUR_USERNAME/dreamestate.git
cd dreamestate
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your API keys — see .env.example for all required vars
```

### 3. Set up the database

```bash
# Create the database
createdb dreamestate

# Run the schema
psql -U postgres -d dreamestate -f schema.sql
```

### 4. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🗺️ Pages Built (Day 1)

| Route | Component | Status |
|---|---|---|
| `/` | Homepage (Hero, Search, Listings, How It Works, CTA) | ✅ Done |
| `/properties` | All listings grid | ✅ Done |
| `/properties/[id]` | Single property detail + enquiry form | ✅ Done |
| `/list-property` | Property listing form (step 1) | ✅ Done |
| `/dashboard` | User dashboard (stats + activity) | ✅ Done |

---

## 🏗️ Development Roadmap

- [ ] **Phase 2** — Auth (Clerk), full listing CRUD, Cloudinary uploads, admin panel
- [ ] **Phase 3** — Three.js 3D hero, Mapbox property map, Algolia search, Socket.io chat
- [ ] **Phase 4** — Stripe deposits, DocuSign contracts, viewing scheduler, email notifications
- [ ] **Phase 5** — QA, performance, SEO, security audit
- [ ] **Phase 6** — Production launch 🚀

---

## 🎨 Design System

All design tokens are in `tailwind.config.ts` and `src/styles/globals.css`.

| Token | Value |
|---|---|
| Primary (Coral) | `#C0392B` |
| Secondary (Teal) | `#148F77` |
| Background (Navy) | `#0D1B2A` |
| Accent (Gold) | `#D4AC0D` |
| Display font | Playfair Display |
| Body font | Inter |

CSS utility classes: `.btn-primary`, `.btn-secondary`, `.card`, `.card-glass`, `.input`, `.badge`, `.section-title`, `.text-gradient`, `.glass`

---

## 📄 License

Private — DreamEstate project. All rights reserved.
