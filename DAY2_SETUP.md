# DreamEstate — Day 2 Setup Guide

## What's new in Day 2
- Clerk authentication (sign-in, sign-up, role selection)
- Prisma ORM with full database schema
- Cloudinary image upload with drag & drop
- Multi-step property listing form with validation
- Admin panel to approve/reject listings
- Dashboard powered by real database data
- Protected routes via middleware

---

## Step-by-step setup

### 1. Copy new files into your project
Copy all files from this zip into your existing `dreamestate` folder.
When prompted to overwrite, say **Yes to All**.

### 2. Install new dependencies
```powershell
npm install
```

### 3. Set up Clerk (free)
1. Go to https://clerk.com and create a free account
2. Click "Create application"
3. Name it `DreamEstate`, enable Email + Google sign-in
4. Go to **API Keys** and copy your keys into `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Set up the database

**Option A — Supabase (free, recommended for beginners)**
1. Go to https://supabase.com → New project
2. Go to Settings → Database → Connection string (URI)
3. Copy the URI into `.env.local`:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

**Option B — Local PostgreSQL**
```powershell
# Create the database
createdb dreamestate
# Set in .env.local:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/dreamestate
```

### 5. Push schema to database
```powershell
npx prisma generate
npx prisma db push
```

### 6. Seed sample data (optional)
```powershell
npm run db:seed
```

### 7. Set up Cloudinary (free)
1. Go to https://cloudinary.com → free account
2. Dashboard shows your **Cloud name**, **API Key**, **API Secret**
3. Go to Settings → Upload → Add upload preset
   - Name: `dreamestate_unsigned`
   - Signing mode: **Unsigned**
4. Add to `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=dreamestate_unsigned
```

### 8. Run the dev server
```powershell
npm run dev
```

### 9. Make yourself an admin
After signing up on the site, run this in Prisma Studio:
```powershell
npx prisma studio
```
Find your user → change `role` from `BUYER` to `ADMIN` → Save.
Then go to http://localhost:3000/admin

---

## New pages
| URL | Description |
|-----|-------------|
| `/sign-in` | Clerk sign-in page |
| `/sign-up` | Clerk sign-up page |
| `/onboarding` | Role selection after signup |
| `/dashboard` | User dashboard (DB-powered) |
| `/list-property` | Multi-step listing form with photo upload |
| `/admin` | Admin panel — approve/reject listings |

## New API routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/sync` | POST | Sync Clerk user to database |
| `/api/properties` | GET | List properties with filters |
| `/api/properties` | POST | Create new listing |
| `/api/upload` | POST | Upload image to Cloudinary |
| `/api/admin/properties` | GET | Get pending listings + stats |
| `/api/admin/properties` | PATCH | Approve or reject a listing |
