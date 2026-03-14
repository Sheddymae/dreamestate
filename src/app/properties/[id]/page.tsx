import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { Bed, Bath, Maximize, MapPin, Calendar, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/constants'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = MOCK_PROPERTIES.find((p) => p.id === params.id)
  if (!property) return { title: 'Property Not Found' }
  return {
    title: property.title,
    description: property.description,
  }
}

export default function PropertyDetailPage({ params }: Props) {
  const property = MOCK_PROPERTIES.find((p) => p.id === params.id)
  if (!property) notFound()

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <div className="pt-24 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Image hero */}
          <div className="relative h-72 md:h-[480px] rounded-3xl overflow-hidden mb-10 bg-brand-navy-mid">
            {property.media.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={property.media.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-card-gradient opacity-60" />
            <div className="absolute bottom-6 left-6">
              <p className="price-tag text-3xl">
                {formatPrice(property.price)}
                {property.listingType === 'rent' && (
                  <span className="text-base font-body font-normal text-white/60">/mo</span>
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-white/50 font-body text-sm">
                  <MapPin size={15} />
                  <span>
                    {property.location.neighbourhood && `${property.location.neighbourhood}, `}
                    {property.location.city}, {property.location.country}
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.features.bedrooms },
                  { icon: Bath, label: 'Bathrooms', value: property.features.bathrooms },
                  { icon: Maximize, label: 'Size (m²)', value: property.features.sqMeters },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card-glass rounded-xl p-4 text-center">
                    <Icon size={20} className="mx-auto mb-2 text-brand-coral" />
                    <p className="font-display text-2xl font-bold text-white">{value}</p>
                    <p className="font-body text-xs text-white/40 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold text-white mb-3">Description</h2>
                <p className="font-body text-white/60 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-xl font-semibold text-white mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-1.5 px-3 py-1.5
                                            bg-brand-teal/10 border border-brand-teal/20
                                            rounded-full text-brand-teal text-xs font-medium font-body">
                      <CheckCircle size={11} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — enquiry form */}
            <div className="space-y-4">
              <div className="card-glass rounded-2xl p-6 sticky top-28">
                <h3 className="font-display text-lg font-bold text-white mb-5">
                  Enquire about this property
                </h3>

                <div className="space-y-3 mb-4">
                  <input className="input" type="text" placeholder="Your full name" />
                  <input className="input" type="email" placeholder="Email address" />
                  <input className="input" type="tel" placeholder="Phone number" />
                  <textarea
                    className="input resize-none h-28"
                    placeholder="I'm interested in this property and would like to arrange a viewing..."
                  />
                </div>

                <button className="btn-primary w-full justify-center py-3 gap-2">
                  <Calendar size={16} />
                  Send Enquiry
                </button>

                <p className="text-center text-white/25 text-xs font-body mt-4">
                  Your details are kept private and secure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
