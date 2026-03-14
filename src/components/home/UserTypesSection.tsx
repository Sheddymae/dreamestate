import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const USER_TYPES = [
  {
    emoji: '🏠',
    role: 'Buyer',
    headline: 'Find your forever home',
    description:
      "Browse thousands of properties for sale, take 3D virtual tours, and make offers — all without leaving your couch.",
    cta: 'Start searching',
    href: '/properties?listing=sale',
    accent: 'brand-coral',
    bg: 'from-brand-coral/10 to-transparent',
  },
  {
    emoji: '🗝️',
    role: 'Tenant',
    headline: 'Rent with confidence',
    description:
      "Find verified rental properties from reliable landlords. Filter by neighbourhood, price, and amenities. Move in fast.",
    cta: 'Find rentals',
    href: '/properties?listing=rent',
    accent: 'brand-teal',
    bg: 'from-brand-teal/10 to-transparent',
  },
  {
    emoji: '📋',
    role: 'Seller',
    headline: 'Sell faster, earn more',
    description:
      "List your property in minutes. Reach thousands of qualified buyers, track views, and manage offers in one dashboard.",
    cta: 'List to sell',
    href: '/list-property?intent=sale',
    accent: 'brand-gold',
    bg: 'from-brand-gold/10 to-transparent',
  },
  {
    emoji: '🏘️',
    role: 'Landlord',
    headline: 'Manage your portfolio',
    description:
      "List multiple properties, vet tenants, sign leases online, and collect rent payments — all from one place.",
    cta: 'List to rent',
    href: '/list-property?intent=rent',
    accent: 'brand-coral',
    bg: 'from-brand-coral/10 to-transparent',
  },
]

export default function UserTypesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-body text-brand-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Built for everyone
          </p>
          <h2 className="section-title">
            One Platform, <span className="text-gradient">Four Journeys</span>
          </h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            Whether you're buying, renting, selling, or managing — DreamEstate has everything
            you need in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USER_TYPES.map((ut) => (
            <div
              key={ut.role}
              className={`card group relative overflow-hidden
                          bg-gradient-to-b ${ut.bg} border border-white/10
                          hover:border-${ut.accent}/40 transition-all duration-300`}
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 bg-${ut.accent}/5 opacity-0
                              group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10 p-6 flex flex-col h-full min-h-[280px]">
                {/* Emoji */}
                <div className={`w-14 h-14 rounded-2xl bg-${ut.accent}/10 border border-${ut.accent}/20
                                flex items-center justify-center text-2xl mb-5
                                group-hover:scale-110 transition-transform duration-300`}>
                  {ut.emoji}
                </div>

                <span className={`badge bg-${ut.accent}/15 text-${ut.accent} mb-3 self-start`}>
                  {ut.role}
                </span>

                <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">
                  {ut.headline}
                </h3>

                <p className="font-body text-sm text-white/50 leading-relaxed flex-1">
                  {ut.description}
                </p>

                <Link
                  href={ut.href}
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-medium
                              text-${ut.accent} hover:gap-3 transition-all duration-200`}
                >
                  {ut.cta}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
