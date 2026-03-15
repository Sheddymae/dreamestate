import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const CreatePropertySchema = z.object({
  title:         z.string().min(10, 'Title must be at least 10 characters'),
  description:   z.string().min(30, 'Description must be at least 30 characters'),
  type:          z.enum(['VILLA', 'HOUSE', 'APARTMENT', 'ROOM', 'COMMERCIAL', 'LAND']),
  listingType:   z.enum(['SALE', 'RENT']),
  price:         z.number().positive('Price must be positive'),
  address:       z.string().min(5),
  city:          z.string().min(2),
  neighbourhood: z.string().optional(),
  lat:           z.number().default(-1.2921),
  lng:           z.number().default(36.8219),
  bedrooms:      z.number().int().min(0),
  bathrooms:     z.number().int().min(0),
  sqMeters:      z.number().positive('Size must be positive'),
  yearBuilt:     z.number().int().optional(),
  furnished:     z.boolean().default(false),
  petFriendly:   z.boolean().default(false),
  amenities:     z.array(z.string()).default([]),
  images:        z.array(z.string()).min(1, 'At least one image is required'),
})

// GET — list properties with filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = { status: 'ACTIVE' }

    const listing = searchParams.get('listing')
    const type    = searchParams.get('type')
    const city    = searchParams.get('city')

    if (listing) where.listingType = listing.toUpperCase()
    if (type)    where.type = type.toUpperCase()
    if (city)    where.city = { contains: city, mode: 'insensitive' }

    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const sort = searchParams.get('sort') ?? 'newest'
    const orderBy =
      sort === 'price_asc'  ? { price: 'asc'  as const } :
      sort === 'price_desc' ? { price: 'desc' as const } :
      sort === 'popular'    ? { views: 'desc' as const } :
                              { createdAt: 'desc' as const }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        take: parseInt(searchParams.get('limit') ?? '24'),
        skip: parseInt(searchParams.get('skip')  ?? '0'),
        include: {
          owner: { select: { fullName: true, avatarUrl: true, phone: true } },
        },
      }),
      prisma.property.count({ where }),
    ])

    return NextResponse.json({ properties, total })
  } catch (error) {
    console.error('[PROPERTIES_GET]', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

// POST — create listing
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Not signed in. Please sign in first.' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!dbUser) {
      return NextResponse.json(
        { error: 'Account not set up. Please complete onboarding first.' },
        { status: 404 }
      )
    }

    if (!['SELLER', 'LANDLORD', 'ADMIN'].includes(dbUser.role)) {
      return NextResponse.json(
        { error: 'Only sellers and landlords can list properties. Update your role in Settings.' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validated = CreatePropertySchema.safeParse(body)

    if (!validated.success) {
      const firstError = Object.values(validated.error.flatten().fieldErrors)[0]?.[0]
      return NextResponse.json(
        { error: firstError ?? 'Please check all required fields.' },
        { status: 400 }
      )
    }

    const property = await prisma.property.create({
      data: {
        ...validated.data,
        ownerId: dbUser.id,
        status:  'PENDING_REVIEW',
      },
    })

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error('[PROPERTIES_POST]', error)
    return NextResponse.json({ error: 'Failed to create listing. Please try again.' }, { status: 500 })
  }
}
