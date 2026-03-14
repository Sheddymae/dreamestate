import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'

export default function FeaturedProperties() {
  const featured = MOCK_PROPERTIES.slice(0, 6)

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-brand-coral text-sm font-semibold tracking-widest
                          uppercase mb-3">
              Handpicked for you
            </p>
            <h2 className="section-title">
              Featured <span className="text-gradient">Properties</span>
            </h2>
            <p className="section-subtitle mt-3 max-w-lg">
              Explore our curated selection of verified homes, villas, and apartments
              ready for viewing.
            </p>
          </div>
          <Link
            href="/properties"
            className="btn-secondary whitespace-nowrap self-start md:self-auto gap-2"
          >
            View all listings
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs — for sale / for rent filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-white/40 font-body text-sm mb-4">
            Showing 6 of 12,400+ listings
          </p>
          <Link href="/properties" className="btn-primary px-10 py-4 text-base gap-2">
            <span>Explore all properties</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
