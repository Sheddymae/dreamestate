'use client'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="font-display text-[120px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-white/5 mb-6">
            404
          </p>
          <h1 className="font-display text-3xl font-bold text-white mb-4">Page not found</h1>
          <p className="font-body text-white/50 leading-relaxed mb-10">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary gap-2"><Home size={16} /> Go home</Link>
            <Link href="/properties" className="btn-secondary gap-2"><Search size={16} /> Browse properties</Link>
            <button onClick={() => history.back()} className="btn-ghost gap-2"><ArrowLeft size={16} /> Go back</button>
          </div>
        </div>
      </div>
    </main>
  )
}
