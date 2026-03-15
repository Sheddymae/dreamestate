import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Heart, Search } from 'lucide-react'
import prisma from '@/lib/prisma'
import PropertyCard from '@/components/property/PropertyCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Saved Properties' }

export default async function SavedPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      savedProperties: {
        include: { property: { include: { owner: true } } },
        orderBy: { savedAt: 'desc' },
      },
    },
  })

  if (!user) redirect('/onboarding')

  const saved = user.savedProperties.map((sp) => sp.property)

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-coral/15 flex items-center justify-center">
              <Heart size={20} className="text-brand-coral" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Saved Properties</h1>
              <p className="text-white/40 text-sm font-body mt-0.5">{saved.length} saved</p>
            </div>
          </div>

          {saved.length === 0 ? (
            <div className="text-center py-24">
              <Heart size={48} className="text-white/10 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">No saved properties yet</h2>
              <p className="font-body text-white/40 mb-8">
                Tap the heart icon on any listing to save it here.
              </p>
              <Link href="/properties" className="btn-primary gap-2">
                <Search size={16} /> Browse properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saved.map((property) => (
                <PropertyCard key={property.id} property={property as Parameters<typeof PropertyCard>[0]['property']} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
