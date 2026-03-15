import Navbar from '@/components/layout/Navbar'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'
import { Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — DreamEstate' }

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/20
                            flex items-center justify-center">
              <Shield size={20} className="text-brand-gold" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
              <p className="font-body text-white/40 text-sm">Manage listings, users, and platform activity</p>
            </div>
          </div>
          <AdminDashboardClient />
        </div>
      </div>
    </main>
  )
}
