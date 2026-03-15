import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MapboxMap from '@/components/map/MapboxMap'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Property Map',
  description: 'Browse properties on an interactive map across Kenya.',
}

export default async function MapPage() {
  const properties = await prisma.property.findMany({
    where: { status: 'ACTIVE' },
    select: {
      id: true, title: true, price: true,
      listingType: true, lat: true, lng: true,
      images: true, city: true,
    },
    take: 100,
  })

  const pins = properties.map((p) => ({
    id:          p.id,
    title:       p.title,
    price:       Number(p.price),
    listingType: p.listingType,
    lat:         p.lat,
    lng:         p.lng,
    image:       p.images[0],
    city:        p.city,
  }))

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/15 border border-brand-teal/20
                              flex items-center justify-center">
                <MapPin size={20} className="text-brand-teal" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">Property Map</h1>
                <p className="font-body text-white/40 text-sm">{pins.length} properties plotted</p>
              </div>
            </div>
            <Link href="/properties" className="btn-secondary text-sm">
              List view
            </Link>
          </div>

          <MapboxMap properties={pins} height="600px" />

          <p className="font-body text-xs text-white/25 text-center mt-4">
            Click any price pin to preview the property. Drag to explore.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
