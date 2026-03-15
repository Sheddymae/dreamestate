import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/admin/properties — all pending listings
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [pending, active, total] = await Promise.all([
      prisma.property.findMany({
        where: { status: 'PENDING_REVIEW' },
        include: { owner: { select: { fullName: true, email: true } } },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.property.count({ where: { status: 'ACTIVE' } }),
      prisma.property.count(),
    ])

    const users = await prisma.user.count()

    return NextResponse.json({ pending, stats: { active, total, users } })
  } catch (error) {
    console.error('[ADMIN_GET]', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH /api/admin/properties — approve or reject
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (admin?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { propertyId, action } = await req.json()
    if (!propertyId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const property = await prisma.property.update({
      where: { id: propertyId },
      data: { status: action === 'approve' ? 'ACTIVE' : 'ARCHIVED' },
    })

    return NextResponse.json({ property })
  } catch (error) {
    console.error('[ADMIN_PATCH]', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
