import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/algolia-sync — re-indexes all active properties into Algolia
// Call this from your dashboard or after approving a listing
export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const appId    = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
    const adminKey = process.env.ALGOLIA_ADMIN_KEY
    const index    = process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? 'properties'

    if (!appId || !adminKey) {
      return NextResponse.json({ error: 'Algolia not configured' }, { status: 400 })
    }

    const properties = await prisma.property.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true, title: true, description: true,
        city: true, neighbourhood: true, address: true,
        type: true, listingType: true, price: true,
        bedrooms: true, bathrooms: true, sqMeters: true,
        furnished: true, amenities: true, images: true,
        lat: true, lng: true, views: true,
      },
    })

    const objects = properties.map((p) => ({
      objectID:     p.id,
      title:        p.title,
      description:  p.description,
      city:         p.city,
      neighbourhood: p.neighbourhood,
      address:      p.address,
      type:         p.type,
      listingType:  p.listingType,
      price:        Number(p.price),
      bedrooms:     p.bedrooms,
      bathrooms:    p.bathrooms,
      sqMeters:     Number(p.sqMeters),
      furnished:    p.furnished,
      amenities:    p.amenities,
      images:       p.images,
      _geoloc:      { lat: p.lat, lng: p.lng },
      views:        p.views,
    }))

    const res = await fetch(
      `https://${appId}.algolia.net/1/indexes/${index}/batch`,
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': appId,
          'X-Algolia-API-Key': adminKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: objects.map((obj) => ({ action: 'updateObject', body: obj })),
        }),
      }
    )

    if (!res.ok) throw new Error(`Algolia error: ${res.status}`)

    return NextResponse.json({
      success: true,
      indexed: objects.length,
      message: `${objects.length} properties indexed to Algolia`,
    })
  } catch (err) {
    console.error('[ALGOLIA_SYNC]', err)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
