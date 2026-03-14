import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PropertyCard from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Properties',
  description: 'Search thousands of verified properties for sale and rent across Kenya.',
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              All Properties
            </h1>
            <p className="font-body text-white/50">
              {MOCK_PROPERTIES.length} listings available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
