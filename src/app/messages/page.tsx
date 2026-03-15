import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Messages' }

export default async function MessagesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-brand-teal/15 flex items-center justify-center">
              <MessageSquare size={20} className="text-brand-teal" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Messages</h1>
              <p className="text-white/40 text-sm font-body mt-0.5">Your conversations with sellers and buyers</p>
            </div>
          </div>

          {/* Empty state — real-time chat coming in Phase 3 */}
          <div className="text-center py-24 card-glass rounded-3xl">
            <MessageSquare size={48} className="text-white/10 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-white mb-3">No messages yet</h2>
            <p className="font-body text-white/40 mb-2 max-w-sm mx-auto">
              When you enquire about a property or receive an enquiry, your conversations will appear here.
            </p>
            <p className="font-body text-white/25 text-xs mb-8">
              Real-time messaging is coming in Phase 3 — powered by Socket.io
            </p>
            <Link href="/properties" className="btn-primary gap-2">
              <Search size={16} /> Browse properties
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
