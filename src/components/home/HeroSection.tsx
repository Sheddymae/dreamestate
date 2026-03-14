'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Play } from 'lucide-react'

const HERO_LINES = [
  'Dream Villa',
  'Perfect Home',
  'Ideal Apartment',
  'Luxury Estate',
]

export default function HeroSection() {
  const [lineIdx, setLineIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setLineIdx((i) => (i + 1) % HERO_LINES.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-coral/10 rounded-full
                      blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-teal/10 rounded-full
                      blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] bg-brand-gold/5 rounded-full
                      blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8
                        bg-white/5 border border-white/10 rounded-full
                        text-sm text-white/70 font-body backdrop-blur-sm
                        animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          Kenya's leading property platform
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold
                       text-white leading-tight mb-4 animate-fade-up animate-delay-100">
          Find Your{' '}
          <span
            className={`text-gradient transition-all duration-400 inline-block
                        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
          >
            {HERO_LINES[lineIdx]}
          </span>
        </h1>

        <p className="font-body text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed
                      animate-fade-up animate-delay-200">
          Stop searching door to door. Explore thousands of verified properties —
          villas, houses, apartments and rooms — for rent or sale, all in one place.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16
                        animate-fade-up animate-delay-300">
          <Link href="/properties" className="btn-primary text-base px-8 py-4 gap-3">
            <Search size={18} />
            Browse Properties
          </Link>
          <Link href="/list-property" className="btn-secondary text-base px-8 py-4 gap-3">
            List Your Property
            <ArrowRight size={18} />
          </Link>
          <button className="btn-ghost text-base px-6 py-4 gap-2 text-white/60">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Play size={12} className="ml-0.5 text-white" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40
                        animate-fade-up animate-delay-400">
          <div className="flex items-center gap-2">
            <span className="text-brand-teal text-lg">✓</span>
            <span>Verified listings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-teal text-lg">✓</span>
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-teal text-lg">✓</span>
            <span>3D virtual tours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-teal text-lg">✓</span>
            <span>No agent fees</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center
                      gap-2 text-white/30 text-xs font-body animate-bounce">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
