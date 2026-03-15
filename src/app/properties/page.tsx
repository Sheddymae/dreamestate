import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { formatPrice, PROPERTY_TYPES, CITIES } from "@/constants"

export const metadata = { title: "Browse Properties" }

const VALID_TYPES = ["VILLA","HOUSE","APARTMENT","ROOM","COMMERCIAL","LAND"]
const VALID_LISTINGS = ["SALE","RENT"]

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string,string>> }) {
  const sp = await searchParams

  const where: Record<string, unknown> = { status: "ACTIVE" }
  const listingUpper = sp.listing?.toUpperCase()
  const typeUpper    = sp.type?.toUpperCase()

  if (listingUpper && VALID_LISTINGS.includes(listingUpper)) where.listingType = listingUpper
  if (typeUpper    && VALID_TYPES.includes(typeUpper))       where.type        = typeUpper
  if (sp.city) where.city = { contains: sp.city, mode: "insensitive" }

  const sort    = sp.sort ?? "newest"
  const orderBy =
    sort === "price_asc"  ? { price: "asc"  as const } :
    sort === "price_desc" ? { price: "desc" as const } :
    sort === "popular"    ? { views: "desc" as const } :
                            { createdAt: "desc" as const }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where, orderBy, take: 24,
      include: { owner: { select: { fullName: true } } },
    }),
    prisma.property.count({ where }),
  ])

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-white">Properties</h1>
              <p className="font-body text-white/40 text-sm mt-1">{total} listings found</p>
            </div>
            <form method="GET" className="flex flex-wrap gap-2 items-center">
              <select name="listing" defaultValue={sp.listing ?? ""} className="input py-2 text-sm appearance-none w-32">
                <option value="">Buy or Rent</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <select name="type" defaultValue={sp.type ?? ""} className="input py-2 text-sm appearance-none w-36">
                <option value="">All types</option>
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
              <select name="city" defaultValue={sp.city ?? ""} className="input py-2 text-sm appearance-none w-36">
                <option value="">All cities</option>
                {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
              <select name="sort" defaultValue={sp.sort ?? "newest"} className="input py-2 text-sm appearance-none w-36">
                <option value="newest">Newest first</option>
                <option value="price_asc">Price: Low-High</option>
                <option value="price_desc">Price: High-Low</option>
                <option value="popular">Most popular</option>
              </select>
              <button type="submit" className="btn-primary py-2 px-4 gap-2 text-sm">
                <Search size={15} /> Filter
              </button>
            </form>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-24">
              <SlidersHorizontal size={48} className="text-white/10 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">No properties found</h2>
              <p className="font-body text-white/40 mb-6">Try adjusting your filters.</p>
              <Link href="/properties" className="btn-secondary">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={"/properties/" + property.id}
                  className="card group block rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-brand-navy-mid">
                    {property.images[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🏠</div>
                    )}
                    <div className="absolute inset-0 bg-card-gradient opacity-60" />
                    <div className="absolute top-3 left-3">
                      <span className={["badge text-xs", property.listingType === "SALE" ? "badge-coral" : "badge-teal"].join(" ")}>
                        For {property.listingType === "SALE" ? "Sale" : "Rent"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="price-tag text-xl">
                        {formatPrice(Number(property.price))}
                        {property.listingType === "RENT" && (
                          <span className="text-sm text-white/60 font-body font-normal">/mo</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-display text-base font-semibold text-white line-clamp-1 group-hover:text-brand-coral transition-colors">
                      {property.title}
                    </h3>
                    <p className="font-body text-xs text-white/40">
                      {property.neighbourhood ? property.neighbourhood + ", " : ""}{property.city}
                    </p>
                    <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-white/40 text-xs font-body">
                      <span>{property.bedrooms} beds</span>
                      <span>{property.bathrooms} baths</span>
                      <span className="ml-auto">{Number(property.sqMeters).toLocaleString()} m2</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
