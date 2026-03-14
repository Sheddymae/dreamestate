import Navbar from '@/components/layout/Navbar'
import { Home, MessageSquare, Calendar, Heart, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const QUICK_STATS = [
  { label: 'My Listings',    value: '3',   icon: Home,          color: 'brand-coral' },
  { label: 'Enquiries',      value: '12',  icon: MessageSquare, color: 'brand-teal' },
  { label: 'Viewings',       value: '5',   icon: Calendar,      color: 'brand-gold' },
  { label: 'Saved Properties', value: '8', icon: Heart,         color: 'brand-coral' },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <div className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/40 font-body text-sm mt-1">Welcome back</p>
            </div>
            <Link href="/list-property" className="btn-primary gap-2">
              <Plus size={16} />
              Add Property
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {QUICK_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="card-glass rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                    <Icon size={20} className={`text-${stat.color}`} />
                  </div>
                  <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                  <p className="font-body text-sm text-white/40 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Activity placeholder */}
          <div className="card-glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-brand-coral" />
              <h2 className="font-display text-lg font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {['New enquiry on Runda Villa', 'Viewing confirmed for Karen Home', 'Your Westlands listing went live'].map((item) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-brand-teal shrink-0" />
                  <p className="font-body text-sm text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
