import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// This route uses Algolia if configured, falls back to Prisma full-text search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ hits: [] })
  }

  const appId   = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey  = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  const index   = process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? 'properties'

  // ── Algolia path ─────────────────────────────────────────────
  if (appId && apiKey) {
    try {
      const res = await fetch(
        `https://${appId}-dsn.algolia.net/1/indexes/${index}/query`,
        {
          method: 'POST',
          headers: {
            'X-Algolia-Application-Id': appId,
            'X-Algolia-API-Key':        apiKey,
            'Content-Type':             'application/json',
          },
          body: JSON.stringify({
            query: q,
            hitsPerPage: 8,
            attributesToRetrieve: [
              'objectID', 'title', 'city', 'neighbourhood',
              'type', 'listingType', 'price', 'bedrooms', 'images',
            ],
          }),
        }
      )
      const data = await res.json()
      return NextResponse.json({ hits: data.hits ?? [], source: 'algolia' })
    } catch (err) {
      console.error('[SEARCH] Algolia error, falling back to Prisma:', err)
    }
  }

  // ── Prisma fallback (no Algolia keys needed) ──────────────────
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { title:         { contains: q, mode: 'insensitive' } },
          { description:   { contains: q, mode: 'insensitive' } },
          { city:          { contains: q, mode: 'insensitive' } },
          { neighbourhood: { contains: q, mode: 'insensitive' } },
          { address:       { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 8,
      orderBy: { views: 'desc' },
      select: {
        id: true, title: true, city: true,
        neighbourhood: true, type: true,
        listingType: true, price: true,
        bedrooms: true, images: true,
      },
    })

    const hits = properties.map((p) => ({
      objectID:     p.id,
      title:        p.title,
      city:         p.city,
      neighbourhood: p.neighbourhood,
      type:         p.type,
      listingType:  p.listingType,
      price:        Number(p.price),
      bedrooms:     p.bedrooms,
      images:       p.images,
    }))

    return NextResponse.json({ hits, source: 'prisma' })
  } catch (err) {
    console.error('[SEARCH] Prisma error:', err)
    return NextResponse.json({ hits: [], error: 'Search unavailable' }, { status: 500 })
  }
}
