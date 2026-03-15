'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, MapPin, Home, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/constants'
import { cn } from '@/lib/utils'

interface SearchHit {
  objectID: string
  title: string
  city: string
  neighbourhood?: string
  type: string
  listingType: string
  price: number
  bedrooms: number
  images: string[]
}

export default function AlgoliaSearch() {
  const router = useRouter()
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState<SearchHit[]>([])
  const [loading, setLoading]   = useState(false)
  const [open, setOpen]         = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setLoading(false); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.hits ?? [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) { setResults([]); setLoading(false); return }
    setLoading(true)
    debounceRef.current = setTimeout(() => search(query), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, search])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const goToProperty = (id: string) => {
    setOpen(false)
    setQuery('')
    router.push(`/properties/${id}`)
  }

  const goToSearch = () => {
    setOpen(false)
    router.push(`/properties?q=${encodeURIComponent(query)}`)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Search input */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200',
        'bg-white/5 backdrop-blur-sm',
        open
          ? 'border-brand-coral shadow-glow'
          : 'border-white/15 hover:border-white/30'
      )}>
        {loading
          ? <Loader2 size={18} className="text-white/40 shrink-0 animate-spin" />
          : <Search size={18} className="text-white/40 shrink-0" />
        }
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search properties, cities, neighbourhoods..."
          className="flex-1 bg-transparent text-white placeholder:text-white/30
                     font-body text-sm outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}>
            <X size={16} className="text-white/30 hover:text-white transition-colors" />
          </button>
        )}
        <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-xs
                        font-body text-white/20 border border-white/10">
          <span>⌘</span>K
        </kbd>
      </div>

      {/* Dropdown results */}
      {open && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
                        bg-brand-navy-mid border border-white/10 rounded-2xl
                        shadow-card overflow-hidden">

          {loading && results.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-8 text-white/40 font-body text-sm">
              <Loader2 size={16} className="animate-spin" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-body text-white/40 text-sm">No properties found for "{query}"</p>
              <p className="font-body text-white/25 text-xs mt-1">Try a different city or property type</p>
            </div>
          ) : (
            <>
              <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                <p className="font-body text-xs text-white/30 uppercase tracking-wider">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {results.map((hit) => (
                  <button
                    key={hit.objectID}
                    onClick={() => goToProperty(hit.objectID)}
                    className="w-full flex items-center gap-3 px-4 py-3
                               hover:bg-white/5 transition-colors text-left group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-brand-navy shrink-0">
                      {hit.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={hit.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home size={16} className="text-white/20" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-white font-medium line-clamp-1
                                   group-hover:text-brand-coral transition-colors">
                        {hit.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-white/40 text-xs font-body mt-0.5">
                        <MapPin size={10} />
                        <span>{hit.neighbourhood ? `${hit.neighbourhood}, ` : ''}{hit.city}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="font-display text-sm font-bold text-brand-gold">
                        {formatPrice(hit.price)}
                      </p>
                      <span className={cn(
                        'text-xs font-body',
                        hit.listingType === 'SALE' ? 'text-brand-coral' : 'text-brand-teal'
                      )}>
                        {hit.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* View all */}
              <button
                onClick={goToSearch}
                className="w-full flex items-center justify-center gap-2 py-3
                           border-t border-white/5 text-brand-coral text-sm font-body
                           hover:bg-brand-coral/5 transition-colors"
              >
                View all results for "{query}"
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
