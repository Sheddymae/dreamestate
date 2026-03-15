import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/constants'
import {
  Plus, Home, MessageSquare, Calendar,
  Heart, Eye, TrendingUp, ArrowRight
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const STATUS_COLOR: Record<string, string> = {
  ACTIVE:         'badge-teal',
  PENDING_REVIEW: 'badge-gold',
  DRAFT:          'bg-white/10 text-white/50',
  SOLD:           'bg-purple-500/20 text-purple-400',
  RENTED:         'bg-blue-500/20 text-blue-400',
  ARCHIVED:       'bg-red-500/20 text-red-400',
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // Auto-sync user if they exist in Clerk but not yet in DB
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      properties: { orderBy: { createdAt: 'desc' }, take: 5 },
      _count: {
        select: {
          properties: true,
          enquiries: true,
          viewingsAsRequester: true,
          savedProperties: true,
        },
      },
    },
  })

  // User not in DB yet — send to onboarding to pick a role
  if (!user) redirect('/onboarding')

  const isSeller   = ['SELLER', 'LANDLORD', 'ADMIN'].includes(user.role)
  const totalViews = user.properties.reduce((sum, p) => sum + p.views, 0)

  const quickStats = isSeller
    ? [
        { label: 'My Listings',    value: user._count.properties,          icon: Home,          color: 'brand-coral' },
        { label: 'Enquiries',      value: user._count.enquiries,           icon: MessageSquare, color: 'brand-teal'  },
        { label: 'Total Views',    value: totalViews,                      icon: Eye,           color: 'brand-gold'  },
        { label: 'Bookings',       value: user._count.viewingsAsRequester, icon: Calendar,      color: 'brand-coral' },
      ]
    : [
        { label: 'Saved Homes',    value: user._count.savedProperties,     icon: Heart,         color: 'brand-coral' },
        { label: 'Enquiries Sent', value: user._count.enquiries,           icon: MessageSquare, color: 'brand-teal'  },
        { label: 'Viewings',       value: user._count.viewingsAsRequester, icon: Calendar,      color: 'brand-gold'  },
        { label: 'Profile Views',  value: 0,                               icon: TrendingUp,    color: 'brand-coral' },
      ]

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="font-display text-3xl font-bold text-white">
                Welcome back, {user.fullName.split(' ')[0]} 👋
              </h1>
              <p className="font-body text-white/40 text-sm mt-1 capitalize">
                {user.role.toLowerCase()} account
                {user.isVerified && (
                  <span className="ml-2 badge badge-teal text-xs">Verified</span>
                )}
              </p>
            </div>
            {isSeller ? (
              <Link href="/list-property" className="btn-primary gap-2">
                <Plus size={16} /> Add Property
              </Link>
            ) : (
              <Link href="/properties" className="btn-primary gap-2">
                <Home size={16} /> Browse Properties
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {quickStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="card-glass rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                    <Icon size={20} className={`text-${stat.color}`} />
                  </div>
                  <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                  <p className="font-body text-sm text-white/40 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main panel */}
            <div className="lg:col-span-2 card-glass rounded-2xl p-6">
              {isSeller ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                      <Home size={18} className="text-brand-coral" /> My Listings
                    </h2>
                    <Link href="/my-listings"
                      className="text-brand-coral text-xs font-body hover:underline flex items-center gap-1">
                      View all <ArrowRight size={12} />
                    </Link>
                  </div>

                  {user.properties.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="font-body text-white/40 text-sm mb-4">No listings yet</p>
                      <Link href="/list-property" className="btn-primary gap-2">
                        <Plus size={15} /> Create your first listing
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {user.properties.map((property) => (
                        <div key={property.id}
                          className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                          <div className="w-14 h-10 rounded-lg overflow-hidden bg-brand-navy shrink-0">
                            {property.images[0] ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={property.images[0]} alt={property.title}
                                className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">🏠</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-white font-medium line-clamp-1">
                              {property.title}
                            </p>
                            <p className="font-body text-xs text-white/40">{property.city}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-display text-sm font-bold text-brand-gold">
                              {formatPrice(Number(property.price))}
                            </p>
                            <span className={`badge text-xs mt-1 ${STATUS_COLOR[property.status] ?? 'badge-coral'}`}>
                              {property.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="font-display text-lg font-semibold text-white mb-5">Quick actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Buy a home',   href: '/properties?listing=sale', icon: '🏠' },
                      { label: 'Rent a home',  href: '/properties?listing=rent', icon: '🗝️' },
                      { label: 'Saved homes',  href: '/saved',                   icon: '❤️' },
                      { label: 'My viewings',  href: '/bookings',                icon: '📅' },
                    ].map((item) => (
                      <Link key={item.label} href={item.href}
                        className="card-glass rounded-xl p-4 flex items-center gap-3
                                   hover:border-white/20 transition-all">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-body text-sm text-white/70">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Activity sidebar */}
            <div className="card-glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <TrendingUp size={18} className="text-brand-coral" /> Recent activity
              </h2>

              {user.properties.length > 0 ? (
                <div className="space-y-4">
                  {user.properties.slice(0, 4).map((p) => (
                    <div key={p.id}
                      className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                      <div>
                        <p className="font-body text-sm text-white/70 line-clamp-1">
                          {p.status === 'PENDING_REVIEW' ? 'Listing pending review' : 'Listing active'}
                        </p>
                        <p className="font-body text-xs text-white/30 mt-0.5 line-clamp-1">{p.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-body text-sm text-white/30 text-center py-6">No activity yet</p>
              )}

              {/* Profile completion */}
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="font-body text-xs text-white/30 mb-2">Profile completion</p>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-brand-coral h-1.5 rounded-full"
                    style={{ width: `${user.phone ? 100 : 60}%` }} />
                </div>
                {!user.phone && (
                  <p className="font-body text-xs text-white/25 mt-2">
                    Add your phone number to complete your profile
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
