'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Bed, Bath, Maximize, MapPin, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/constants'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  className?: string
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  const mainImage = property.media.images[0] ?? '/images/property-placeholder.jpg'

  return (
    <Link
      href={`/properties/${property.id}`}
      className={cn('card group block tilt-card', className)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {!imgError ? (
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-brand-navy-mid flex items-center justify-center">
            <span className="text-4xl">🏠</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-card-gradient opacity-60" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn(
            'badge text-xs',
            property.listingType === 'sale' ? 'badge-coral' : 'badge-teal'
          )}>
            For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>
          {property.features.furnished && (
            <span className="badge badge-gold">Furnished</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center',
            'bg-black/30 backdrop-blur-sm border border-white/10',
            'hover:bg-black/50 transition-all duration-200',
            liked && 'bg-brand-coral/80 border-brand-coral'
          )}
          aria-label="Add to wishlist"
        >
          <Heart
            size={15}
            className={cn(liked ? 'fill-white text-white' : 'text-white/80')}
          />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <p className="price-tag text-xl">
            {formatPrice(property.price)}
            {property.listingType === 'rent' && (
              <span className="text-sm text-white/60 font-body font-normal">/mo</span>
            )}
          </p>
        </div>

        {/* View count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1
                        text-white/50 text-xs font-body">
          <Eye size={12} />
          <span>{property.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="font-display text-base font-semibold text-white leading-snug
                         line-clamp-1 group-hover:text-brand-coral transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-white/40 text-xs font-body">
            <MapPin size={11} />
            <span className="line-clamp-1">
              {property.location.neighbourhood
                ? `${property.location.neighbourhood}, `
                : ''}{property.location.city}
            </span>
          </div>
        </div>

        {/* Property stats */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/10
                        text-white/50 text-xs font-body">
          <div className="flex items-center gap-1.5">
            <Bed size={13} />
            <span>{property.features.bedrooms} Bed{property.features.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={13} />
            <span>{property.features.bathrooms} Bath{property.features.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Maximize size={13} />
            <span>{property.features.sqMeters.toLocaleString()} m²</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
