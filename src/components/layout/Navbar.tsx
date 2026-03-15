'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'
import AlgoliaSearch from '@/components/search/AlgoliaSearch'

export default function Navbar() {
  const { isSignedIn } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-brand-navy/95 backdrop-blur-md border-b border-white/10 py-3'
        : 'bg-transparent py-5',
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-200">
              <Home size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              Dream<span className="text-brand-coral">Estate</span>
            </span>
          </Link>

          {/* Search bar — hidden on mobile, visible on md+ */}
          <div className="hidden md:flex flex-1 max-w-md">
            <AlgoliaSearch />
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 shrink-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="btn-ghost text-sm">{item.label}</Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in" className="btn-ghost text-sm">Sign in</Link>
                <Link href="/sign-up" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </>
            ) : (
              <>
                <Link href="/list-property" className="btn-secondary text-sm py-2 px-4">
                  List Property
                </Link>
                <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9 ring-2 ring-brand-coral/30 hover:ring-brand-coral transition-all',
                    },
                  }}
                />
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-navy-mid border-t border-white/10 px-4 py-4 space-y-3">
          {/* Mobile search */}
          <AlgoliaSearch />

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5
                         rounded-lg font-body text-sm transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in" className="btn-secondary text-sm justify-center">Sign in</Link>
                <Link href="/sign-up" className="btn-primary text-sm justify-center">Get Started</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="btn-secondary text-sm justify-center">Dashboard</Link>
                <Link href="/list-property" className="btn-primary text-sm justify-center">List Property</Link>
                <div className="flex justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
