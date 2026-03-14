'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home } from 'lucide-react'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-200">
              <Home size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              Dream<span className="text-brand-coral">Estate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="btn-ghost text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in" className="btn-ghost text-sm">
              Sign in
            </Link>
            <Link href="/list-property" className="btn-primary text-sm py-2 px-5">
              List Property
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-navy-mid border-t border-white/10 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg
                         font-body text-sm transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/sign-in" className="btn-secondary text-sm justify-center">
              Sign in
            </Link>
            <Link href="/list-property" className="btn-primary text-sm justify-center">
              List Property
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
