import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Plus, Home, Eye, Edit } from 'lucide-react'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/constants'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Listings' }

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:         'badge-teal',
  PENDING_REVIEW: 'badge-gold',
  DRAFT:          'bg-white/10 text-white/50',
  SOLD:           'bg-purple-500/20 text-purple-400',
  RENTED:         'bg-blue-500/20 text-blue-400',
  ARCHIVED:       'bg-red-500/20 text-red-400',
}

export default async function MyListingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) redirect('/onboarding')
  if (!['SELLER', 'LANDLORD', 'ADMIN'].includes(user.role)) redirect('/dashboard')

  const properties = await prisma.property.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-coral/15 flex items-center justify-center">
                <Home size={20} className="text-brand-coral" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">My Listings</h1>
                <p className="text-white/40 text-sm font-body mt-0.5">{properties.length} properties</p>
              </div>
            </div>
            <Link href="/list-property" className="btn-primary gap-2">
              <Plus size={16} /> Add listing
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-24">
              <Home size={48} className="text-white/10 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">No listings yet</h2>
              <p className="font-body text-white/40 mb-8">Create your first listing to reach thousands of buyers.</p>
              <Link href="/list-property" className="btn-primary gap-2">
                <Plus size={16} /> Create your first listing
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="card rounded-2xl p-5 flex gap-5 items-center">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-brand-navy shrink-0">
                    {property.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🏠</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-white line-clamp-1">{property.title}</h3>
                    <p className="font-body text-xs text-white/40 mt-0.5">{property.city}</p>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="price-tag text-base">{formatPrice(Number(property.price))}</p>
                    <span className={cn('badge text-xs mt-1', STATUS_STYLES[property.status] ?? 'badge-coral')}>
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Link href={`/properties/${property.id}`}
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center
                                 justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                      <Eye size={15} />
                    </Link>
                    <Link href={`/list-property?edit=${property.id}`}
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center
                                 justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                      <Edit size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
