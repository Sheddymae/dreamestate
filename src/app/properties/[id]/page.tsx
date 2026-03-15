import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/constants'
import { Bed, Bath, Maximize, MapPin, Calendar, CheckCircle, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await prisma.property.findUnique({ where: { id: params.id } })
  if (!property) return { title: 'Property Not Found' }
  return { title: property.title, description: property.description }
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { owner: { select: { fullName: true, avatarUrl: true, phone: true, email: true } } },
  })

  if (!property) notFound()

  // Increment view count
  await prisma.property.update({
    where: { id: params.id },
    data:  { views: { increment: 1 } },
  }).catch(() => null)

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-24 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Back link */}
          <Link href="/properties"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-body
                       mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to listings
          </Link>

          {/* Image hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 rounded-3xl overflow-hidden h-72 md:h-96">
            <div className="md:col-span-2 bg-brand-navy-mid relative overflow-hidden">
              {property.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={property.images[0]} alt={property.title}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">🏠</div>
              )}
              <div className="absolute inset-0 bg-card-gradient opacity-40" />
              <div className="absolute bottom-4 left-4">
                <p className="price-tag text-3xl">
                  {formatPrice(Number(property.price))}
                  {property.listingType === 'RENT' && (
                    <span className="text-base font-body font-normal text-white/60">/mo</span>
                  )}
                </p>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`badge ${property.listingType === 'SALE' ? 'badge-coral' : 'badge-teal'}`}>
                  For {property.listingType === 'SALE' ? 'Sale' : 'Rent'}
                </span>
                {property.furnished && <span className="badge badge-gold">Furnished</span>}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 text-white/50 text-xs font-body
                              bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <Eye size={12} /> {property.views.toLocaleString()} views
              </div>
            </div>
            {/* Thumbnail column */}
            <div className="hidden md:flex flex-col gap-3">
              {property.images.slice(1, 3).map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt="" className="flex-1 w-full object-cover rounded-xl" />
              ))}
              {property.images.length === 1 && (
                <div className="flex-1 bg-brand-navy-mid rounded-xl flex items-center justify-center">
                  <span className="text-white/20 text-sm font-body">No more photos</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-white/50 font-body text-sm">
                  <MapPin size={15} />
                  <span>
                    {property.neighbourhood ? `${property.neighbourhood}, ` : ''}
                    {property.city}, {property.country}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Bed,      label: 'Bedrooms',  value: property.bedrooms },
                  { icon: Bath,     label: 'Bathrooms', value: property.bathrooms },
                  { icon: Maximize, label: 'Size (m²)', value: Number(property.sqMeters).toLocaleString() },
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

              {/* Details */}
              <div>
                <h2 className="font-display text-xl font-semibold text-white mb-4">Property details</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Type',       value: property.type },
                    { label: 'Listing',    value: property.listingType === 'SALE' ? 'For Sale' : 'For Rent' },
                    { label: 'Furnished',  value: property.furnished ? 'Yes' : 'No' },
                    { label: 'Pet Friendly', value: property.petFriendly ? 'Yes' : 'No' },
                    ...(property.yearBuilt ? [{ label: 'Year Built', value: String(property.yearBuilt) }] : []),
                    ...(property.garages ? [{ label: 'Garages', value: String(property.garages) }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="font-body text-sm text-white/40">{label}</span>
                      <span className="font-body text-sm text-white font-medium capitalize">
                        {value.toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-white mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <div key={a}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-teal/10
                                   border border-brand-teal/20 rounded-full text-brand-teal text-xs font-medium">
                        <CheckCircle size={11} /> {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry sidebar */}
            <div>
              <div className="card-glass rounded-2xl p-6 sticky top-28">

                {/* Agent info */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-brand-coral/15 border border-brand-coral/20
                                  flex items-center justify-center font-display text-lg font-bold text-brand-coral">
                    {property.owner.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-white">{property.owner.fullName}</p>
                    <p className="font-body text-xs text-white/40">Listed by owner</p>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-5">
                  Enquire about this property
                </h3>

                <div className="space-y-3 mb-4">
                  <input className="input" type="text"  placeholder="Your full name" />
                  <input className="input" type="email" placeholder="Email address" />
                  <input className="input" type="tel"   placeholder="Phone number" />
                  <textarea className="input resize-none h-28"
                    defaultValue={`Hi, I'm interested in "${property.title}" and would like to arrange a viewing.`} />
                </div>

                <button className="btn-primary w-full justify-center py-3 gap-2">
                  <Calendar size={16} /> Send Enquiry
                </button>

                {property.owner.phone && (
                  <a href={`tel:${property.owner.phone}`}
                    className="btn-secondary w-full justify-center py-3 mt-3 gap-2">
                    Call owner
                  </a>
                )}

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
