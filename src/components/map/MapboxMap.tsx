'use client'
import { useEffect, useRef, useState } from 'react'
import { Loader2, MapPin } from 'lucide-react'
import { formatPrice } from '@/constants'

interface PropertyPin {
  id: string
  title: string
  price: number
  listingType: string
  lat: number
  lng: number
  image?: string
  city: string
}

interface MapboxMapProps {
  properties: PropertyPin[]
  center?: [number, number]
  zoom?: number
  height?: string
}

export default function MapboxMap({
  properties,
  center = [36.8219, -1.2921],
  zoom = 11,
  height = '500px',
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<unknown>(null)
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState<PropertyPin | null>(null)
  const [mapboxReady, setMapboxReady] = useState(false)

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (!token || !mapContainer.current) return

    let map: unknown
    let mapboxgl: typeof import('mapbox-gl')

    const initMap = async () => {
      try {
        mapboxgl = (await import('mapbox-gl')).default as typeof import('mapbox-gl')

        ;(mapboxgl as { accessToken: string }).accessToken = token

        map = new (mapboxgl as { Map: new (opts: unknown) => unknown }).Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/dark-v11',
          center,
          zoom,
          attributionControl: false,
        })

        const mapInstance = map as {
          on: (event: string, cb: () => void) => void
          addControl: (ctrl: unknown, pos: string) => void
          remove: () => void
        }

        mapInstance.on('load', () => {
          setLoading(false)
          setMapboxReady(true)

          // Add property markers
          properties.forEach((prop) => {
            const el = document.createElement('div')
            el.className = 'mapbox-marker'
            el.innerHTML = `
              <div style="
                background: ${prop.listingType === 'SALE' ? '#C0392B' : '#148F77'};
                color: white;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                font-family: system-ui;
                white-space: nowrap;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                border: 1.5px solid rgba(255,255,255,0.2);
                transition: transform 0.15s;
              ">
                ${formatPrice(prop.price)}
              </div>
            `
            el.style.cursor = 'pointer'
            el.addEventListener('mouseenter', () => {
              const div = el.querySelector('div') as HTMLDivElement
              if (div) div.style.transform = 'scale(1.1)'
            })
            el.addEventListener('mouseleave', () => {
              const div = el.querySelector('div') as HTMLDivElement
              if (div) div.style.transform = 'scale(1)'
            })
            el.addEventListener('click', () => setSelected(prop))

            new (mapboxgl as unknown as { Marker: new (opts: unknown) => { setLngLat: (c: [number, number]) => { addTo: (m: unknown) => void } } }).Marker({ element: el })
              .setLngLat([prop.lng, prop.lat])
              .addTo(map!)
          })
        })

        mapRef.current = map
      } catch (err) {
        console.error('[MAPBOX]', err)
        setLoading(false)
      }
    }

    initMap()

    return () => {
      try { (map as { remove?: () => void })?.remove?.() } catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // No token — show placeholder
  if (!token) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-brand-navy-mid
                   border border-white/10 flex flex-col items-center justify-center gap-4"
        style={{ height }}
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-teal/15 border border-brand-teal/20
                        flex items-center justify-center">
          <MapPin size={28} className="text-brand-teal" />
        </div>
        <div className="text-center">
          <p className="font-display text-lg font-bold text-white mb-1">Interactive Map</p>
          <p className="font-body text-sm text-white/40 max-w-xs">
            Add your Mapbox token to <code className="text-brand-coral text-xs">.env.local</code> to
            enable the property map
          </p>
          <p className="font-body text-xs text-white/25 mt-1">
            NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
          </p>
        </div>
        {/* Static pin grid as placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #148F77 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 bg-brand-navy flex items-center justify-center gap-3">
          <Loader2 size={24} className="animate-spin text-brand-coral" />
          <span className="font-body text-white/50 text-sm">Loading map...</span>
        </div>
      )}

      {/* Selected property popup */}
      {selected && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10
                        bg-brand-navy-mid border border-white/15 rounded-2xl
                        p-4 shadow-card w-72 animate-fade-up">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 text-white/30 hover:text-white text-lg leading-none"
          >
            x
          </button>
          <div className="flex gap-3">
            <div className="w-16 h-14 rounded-xl overflow-hidden bg-brand-navy shrink-0">
              {selected.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selected.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🏠</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-white line-clamp-1">
                {selected.title}
              </p>
              <p className="font-body text-xs text-white/40 flex items-center gap-1 mt-0.5">
                <MapPin size={10} /> {selected.city}
              </p>
              <p className="font-display text-base font-bold text-brand-gold mt-1">
                {formatPrice(selected.price)}
                {selected.listingType === 'RENT' && (
                  <span className="text-xs text-white/40 font-body font-normal">/mo</span>
                )}
              </p>
            </div>
          </div>
          <a
            href={`/properties/${selected.id}`}
            className="mt-3 btn-primary w-full justify-center py-2 text-sm gap-1.5"
          >
            View property
          </a>
        </div>
      )}

      {/* Properties count badge */}
      {!loading && (
        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5
                        text-xs font-body text-white/70 flex items-center gap-1.5">
          <MapPin size={12} className="text-brand-coral" />
          {properties.length} properties on map
        </div>
      )}
    </div>
  )
}


