import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body: unknown = await req.json().catch(() => ({}))
    const requestedRole =
      body && typeof body === 'object' && 'role' in body
        ? (body as { role?: unknown }).role
        : undefined
    const allowedRoles = ['BUYER', 'TENANT', 'SELLER', 'LANDLORD'] as const
    const role =
      typeof requestedRole === 'string' &&
      allowedRoles.includes(requestedRole as (typeof allowedRoles)[number])
        ? requestedRole
        : 'BUYER'

    const email     = clerkUser.emailAddresses[0]?.emailAddress ?? `${userId}@dreamestate.co.ke`
    const firstName = clerkUser.firstName ?? ''
    const lastName  = clerkUser.lastName  ?? ''
    const fullName  = `${firstName} ${lastName}`.trim() || 'DreamEstate User'
    const avatarUrl = clerkUser.imageUrl ?? undefined

    const user = await prisma.user.upsert({
      where:  { clerkId: userId },
      update: { role, fullName, avatarUrl, email },
      create: { clerkId: userId, email, fullName, avatarUrl, role },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('[AUTH_SYNC]', error)
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
  }
}
