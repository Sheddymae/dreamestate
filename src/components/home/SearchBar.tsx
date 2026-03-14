'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, DollarSign, SlidersHorizontal } from 'lucide-react'
import { CITIES, PROPERTY_TYPES } from '@/constants'
import { cn } from '@/lib/utils'

type TabType = 'sale' | 'rent'

export default function SearchBar() {
  const router = useRouter()
  const [tab, setTab] = useState<TabType>('sale')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('listing', tab)
    if (city)   params.set('city', city)
    if (type)   params.set('type', type)
    if (budget) params.set('budget', budget)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative z-20 -mt-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="card-glass rounded-3xl p-6 shadow-card">

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 w-fit">
            {(['sale', 'rent'] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'px-6 py-2 rounded-lg text-sm font-medium font-body transition-all duration-200',
                  tab === t
                    ? 'bg-brand-coral text-white shadow-glow'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {t === 'sale' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>

          {/* Search row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

            {/* Location */}
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input pl-9 appearance-none cursor-pointer"
              >
                <option value="">Any location</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Property type */}
            <div className="relative">
              <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input pl-9 appearance-none cursor-pointer"
              >
                <option value="">Property type</option>
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.icon} {pt.label}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="input pl-9 appearance-none cursor-pointer"
              >
                <option value="">Any budget</option>
                {tab === 'sale' ? (
                  <>
                    <option value="0-5000000">Under KES 5M</option>
                    <option value="5000000-20000000">KES 5M – 20M</option>
                    <option value="20000000-50000000">KES 20M – 50M</option>
                    <option value="50000000+">KES 50M+</option>
                  </>
                ) : (
                  <>
                    <option value="0-20000">Under KES 20K/mo</option>
                    <option value="20000-60000">KES 20K – 60K/mo</option>
                    <option value="60000-150000">KES 60K – 150K/mo</option>
                    <option value="150000+">KES 150K+/mo</option>
                  </>
                )}
              </select>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="btn-primary justify-center gap-2 h-[46px] rounded-xl"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Advanced filters link */}
          <div className="mt-4 flex items-center gap-2 text-white/40 text-xs font-body">
            <SlidersHorizontal size={13} />
            <button
              onClick={() => router.push('/properties')}
              className="hover:text-white/70 transition-colors underline-offset-2 hover:underline"
            >
              Advanced filters — bedrooms, amenities, size, and more
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
