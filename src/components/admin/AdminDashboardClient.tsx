'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Eye, Users, Home, Clock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/constants'

interface PendingProperty {
  id: string
  title: string
  type: string
  listingType: string
  price: number
  city: string
  neighbourhood?: string
  images: string[]
  createdAt: string
  owner: { fullName: string; email: string }
}

interface Stats {
  active: number
  total: number
  users: number
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const [pending, setPending] = useState<PendingProperty[]>([])
  const [stats, setStats]     = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [acting, setActing]   = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/properties')
      if (res.status === 403) { router.push('/dashboard'); return }
      const data = await res.json()
      setPending(data.pending ?? [])
      setStats(data.stats ?? null)
    } catch {
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleAction = async (propertyId: string, action: 'approve' | 'reject') => {
    setActing(propertyId)
    try {
      const res = await fetch('/api/admin/properties', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, action }),
      })
      if (!res.ok) throw new Error()
      toast.success(action === 'approve' ? 'Listing approved and published!' : 'Listing rejected.')
      setPending((prev) => prev.filter((p) => p.id !== propertyId))
    } catch {
      toast.error('Action failed. Please try again.')
    } finally {
      setActing(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-brand-coral" />
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending review', value: pending.length, icon: Clock,     color: 'brand-gold' },
            { label: 'Active listings', value: stats.active,  icon: Home,      color: 'brand-teal' },
            { label: 'Total listings',  value: stats.total,   icon: Eye,       color: 'brand-coral' },
            { label: 'Registered users',value: stats.users,   icon: Users,     color: 'brand-coral' },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="card-glass rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center mb-4`}>
                  <Icon size={20} className={`text-${s.color}`} />
                </div>
                <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                <p className="font-body text-sm text-white/40 mt-1">{s.label}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Pending listings */}
      <div>
        <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Clock size={18} className="text-brand-gold" />
          Pending Review
          {pending.length > 0 && (
            <span className="badge badge-gold ml-1">{pending.length}</span>
          )}
        </h2>

        {pending.length === 0 ? (
          <div className="card-glass rounded-2xl p-12 text-center">
            <CheckCircle size={40} className="text-brand-teal mx-auto mb-4" />
            <p className="font-display text-lg text-white">All caught up!</p>
            <p className="font-body text-white/40 text-sm mt-1">No listings pending review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((property) => (
              <div key={property.id} className="card rounded-2xl p-5 flex gap-5">

                {/* Thumbnail */}
                <div className="w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-brand-navy">
                  {property.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🏠</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-semibold text-white leading-snug line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="font-body text-sm text-white/40 mt-0.5">
                        {property.neighbourhood ? `${property.neighbourhood}, ` : ''}{property.city}
                        <span className="mx-2">·</span>
                        {property.type}
                        <span className="mx-2">·</span>
                        For {property.listingType === 'SALE' ? 'Sale' : 'Rent'}
                      </p>
                    </div>
                    <p className="price-tag text-lg shrink-0">
                      {formatPrice(property.price)}
                      {property.listingType === 'RENT' && <span className="text-xs text-white/40">/mo</span>}
                    </p>
                  </div>

                  <p className="font-body text-xs text-white/30 mt-2">
                    Listed by {property.owner.fullName} · {property.owner.email}
                    <span className="mx-2">·</span>
                    {new Date(property.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleAction(property.id, 'approve')}
                      disabled={acting === property.id}
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium',
                        'bg-brand-teal/15 border border-brand-teal/30 text-brand-teal',
                        'hover:bg-brand-teal/25 transition-all disabled:opacity-50'
                      )}
                    >
                      {acting === property.id
                        ? <Loader2 size={14} className="animate-spin" />
                        : <CheckCircle size={14} />}
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(property.id, 'reject')}
                      disabled={acting === property.id}
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium',
                        'bg-red-500/10 border border-red-500/20 text-red-400',
                        'hover:bg-red-500/20 transition-all disabled:opacity-50'
                      )}
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
