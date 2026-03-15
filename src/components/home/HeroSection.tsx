'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Play, MapPin, TrendingUp } from 'lucide-react'
import BuildingSceneLoader from '@/components/3d/BuildingSceneLoader'

const HERO_LINES = ['Dream Villa', 'Perfect Home', 'Ideal Apartment', 'Luxury Estate']

const FLOATING_CARDS = [
  { icon: MapPin,     label: 'Runda Estate',  sub: 'KES 85,000,000',  color: 'brand-coral',  delay: 'animation-delay-200' },
  { icon: TrendingUp, label: '12,400+ Listings', sub: 'Verified today', color: 'brand-teal', delay: 'animation-delay-400' },
]

export default function HeroSection() {
  const [lineIdx, setLineIdx] = useState(0)
  const [visible, setVisible]   = useState(true)

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setLineIdx((i) => (i + 1) % HERO_LINES.length); setVisible(true) }, 400)
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-coral/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-teal/8 rounded-full blur-3xl pointer-events-none" />

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full
                      grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-24 pb-12">

        {/* Left — text */}
        <div className="order-2 lg:order-1">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8
                          bg-white/5 border border-white/10 rounded-full
                          text-sm text-white/70 font-body backdrop-blur-sm animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            Kenya's leading property platform
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight mb-4
                         animate-fade-up animate-delay-100">
            Find Your{' '}
            <br className="hidden sm:block" />
            <span
              className="text-gradient"
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-8px)',
                display: 'inline-block',
              }}>
              {HERO_LINES[lineIdx]}
            </span>
          </h1>

          <p className="font-body text-lg text-white/60 max-w-lg mb-8 leading-relaxed
                         animate-fade-up animate-delay-200">
            Stop searching door to door. Explore thousands of verified villas, houses,
            apartments and rooms — for rent or sale — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10 animate-fade-up animate-delay-300">
            <Link href="/properties" className="btn-primary text-base px-8 py-4 gap-3">
              <Search size={18} /> Browse Properties
            </Link>
            <Link href="/list-property" className="btn-secondary text-base px-8 py-4 gap-3">
              List Your Property <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/35 font-body
                          animate-fade-up animate-delay-400">
            {['Verified listings', 'Secure payments', '3D virtual tours', 'No agent fees'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="text-brand-teal">✓</span> {t}
              </div>
            ))}
          </div>

          {/* Floating info cards */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {FLOATING_CARDS.map(({ icon: Icon, label, sub, color, delay }) => (
              <div key={label}
                className={`card-glass rounded-xl px-4 py-3 flex items-center gap-3
                            animate-fade-up ${delay} hover:border-white/20 transition-all`}>
                <div className={`w-8 h-8 rounded-lg bg-${color}/15 flex items-center justify-center`}>
                  <Icon size={14} className={`text-${color}`} />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-white">{label}</p>
                  <p className="font-body text-xs text-white/40">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D scene */}
        <div className="order-1 lg:order-2 relative h-[420px] sm:h-[520px] lg:h-[600px]">
          {/* Glow under the 3D model */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-16
                          bg-brand-coral/20 blur-2xl rounded-full pointer-events-none" />

          <BuildingSceneLoader />

          {/* Property badge overlays */}
          <div className="absolute top-12 right-4 card-glass rounded-xl px-3 py-2 text-xs font-body
                          border border-brand-coral/30 animate-float">
            <p className="text-brand-coral font-semibold">For Sale</p>
            <p className="text-white font-bold">KES 85M</p>
            <p className="text-white/40">Runda Villa</p>
          </div>

          <div className="absolute bottom-24 left-4 card-glass rounded-xl px-3 py-2 text-xs font-body
                          border border-brand-teal/30 animate-float animate-delay-300">
            <p className="text-brand-teal font-semibold">For Rent</p>
            <p className="text-white font-bold">KES 120K/mo</p>
            <p className="text-white/40">Westlands Apt</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                      gap-2 text-white/25 text-xs font-body animate-bounce">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  )
}
