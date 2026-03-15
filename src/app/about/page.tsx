import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about DreamEstate — Kenya\'s leading real estate platform.',
}

const TEAM = [
  { name: 'Amina Osei',      role: 'CEO & Co-founder',      initials: 'AO' },
  { name: 'Brian Kariuki',   role: 'CTO & Co-founder',      initials: 'BK' },
  { name: 'Cynthia Muthoni', role: 'Head of Operations',    initials: 'CM' },
  { name: 'David Otieno',    role: 'Head of Growth',        initials: 'DO' },
]

const MILESTONES = [
  { year: '2023', event: 'DreamEstate founded in Nairobi' },
  { year: '2024', event: 'Reached 5,000 active listings' },
  { year: '2025', event: 'Expanded to Mombasa, Kisumu & Nakuru' },
  { year: '2026', event: '12,400+ listings · 8,900+ happy clients' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-title mb-6">
            We're on a mission to make <span className="text-gradient">property simple</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            DreamEstate was built because we experienced the frustration of property searching
            first-hand — endless door-to-door visits, unreliable listings, and zero transparency.
            We built the platform we wished existed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-brand-navy-mid border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Our story</h2>
            <p className="font-body text-white/50 leading-relaxed mb-4">
              Founded in 2023 in Nairobi, DreamEstate started with a simple idea: property searching
              in Kenya should be as easy as shopping online. We built a platform that puts buyers,
              tenants, sellers, and landlords in the same room — digitally.
            </p>
            <p className="font-body text-white/50 leading-relaxed">
              Today, DreamEstate is Kenya's fastest-growing real estate platform, with over 12,400
              verified listings and a community of 8,900+ clients who have found their perfect property
              through our platform.
            </p>
          </div>
          <div className="space-y-4">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex items-center gap-4 card-glass rounded-xl p-4">
                <span className="font-display text-brand-coral font-bold text-lg w-12 shrink-0">{m.year}</span>
                <span className="font-body text-white/70 text-sm">{m.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">Meet the team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="card-glass rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-coral/15 border border-brand-coral/20
                                flex items-center justify-center mx-auto mb-4
                                font-display text-xl font-bold text-brand-coral">
                  {member.initials}
                </div>
                <p className="font-display font-semibold text-white text-sm">{member.name}</p>
                <p className="font-body text-xs text-white/40 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-navy-mid border-t border-white/10 text-center">
        <h2 className="font-display text-3xl font-bold text-white mb-4">Join the DreamEstate community</h2>
        <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
          Whether you're buying, renting, selling, or managing — there's a place for you on DreamEstate.
        </p>
        <Link href="/sign-up" className="btn-primary px-10 py-4 text-base gap-2">
          Get started free <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
