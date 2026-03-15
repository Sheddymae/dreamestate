import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Calendar, MapPin, Search } from 'lucide-react'
import prisma from '@/lib/prisma'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Viewings' }

const STATUS_STYLES: Record<string, string> = {
  REQUESTED:  'badge-gold',
  CONFIRMED:  'badge-teal',
  COMPLETED:  'bg-white/10 text-white/50',
  CANCELLED:  'bg-red-500/20 text-red-400',
}

export default async function BookingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) redirect('/onboarding')

  const viewings = await prisma.viewingBooking.findMany({
    where: { requesterId: user.id },
    include: {
      property: true,
      owner: { select: { fullName: true, phone: true } },
    },
    orderBy: { scheduledAt: 'asc' },
  })

  const upcoming  = viewings.filter((v) => new Date(v.scheduledAt) >= new Date() && v.status !== 'CANCELLED')
  const past      = viewings.filter((v) => new Date(v.scheduledAt) < new Date() || v.status === 'CANCELLED')

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-teal/15 flex items-center justify-center">
              <Calendar size={20} className="text-brand-teal" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">My Viewings</h1>
              <p className="text-white/40 text-sm font-body mt-0.5">{upcoming.length} upcoming</p>
            </div>
          </div>

          {viewings.length === 0 ? (
            <div className="text-center py-24">
              <Calendar size={48} className="text-white/10 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">No viewings booked</h2>
              <p className="font-body text-white/40 mb-8">Browse properties and request a viewing from any listing.</p>
              <Link href="/properties" className="btn-primary gap-2">
                <Search size={16} /> Find a property
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {upcoming.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-semibold text-white mb-4">Upcoming</h2>
                  <div className="space-y-3">
                    {upcoming.map((viewing) => (
                      <div key={viewing.id} className="card rounded-2xl p-5 flex gap-4">
                        <div className="w-20 h-14 rounded-xl overflow-hidden bg-brand-navy shrink-0">
                          {viewing.property.images[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={viewing.property.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">🏠</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm font-bold text-white line-clamp-1">
                            {viewing.property.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-white/40 text-xs font-body mt-1">
                            <MapPin size={11} />
                            <span>{viewing.property.city}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-white/50 font-body">
                              <Calendar size={11} />
                              {new Date(viewing.scheduledAt).toLocaleDateString('en-GB', {
                                weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                              })}
                            </span>
                            <span className={cn('badge text-xs', STATUS_STYLES[viewing.status])}>
                              {viewing.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-semibold text-white/50 mb-4">Past viewings</h2>
                  <div className="space-y-3 opacity-60">
                    {past.map((viewing) => (
                      <div key={viewing.id} className="card rounded-xl p-4 flex gap-3 items-center">
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-white/70 line-clamp-1">{viewing.property.title}</p>
                          <p className="font-body text-xs text-white/30 mt-0.5">
                            {new Date(viewing.scheduledAt).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <span className={cn('badge text-xs', STATUS_STYLES[viewing.status])}>
                          {viewing.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
