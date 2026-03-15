import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Phone, Mail, MapPin, Star, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find a Property Agent',
  description: 'Connect with verified real estate agents across Kenya on DreamEstate.',
}

const AGENTS = [
  { name: 'James Mwangi',    location: 'Nairobi — Runda, Karen, Muthaiga',  listings: 24, rating: 4.9, specialty: 'Luxury Villas' },
  { name: 'Grace Achieng',   location: 'Nairobi — Westlands, Kilimani',     listings: 18, rating: 4.8, specialty: 'Apartments' },
  { name: 'David Kamau',     location: 'Mombasa — Nyali, Diani, Bamburi',   listings: 31, rating: 4.9, specialty: 'Beachfront' },
  { name: 'Fatuma Hassan',   location: 'Nairobi — Karen, Lavington',        listings: 15, rating: 4.7, specialty: 'Family Homes' },
  { name: 'Peter Omondi',    location: 'Kisumu — Milimani, Riat Hills',     listings: 12, rating: 4.8, specialty: 'Residential' },
  { name: 'Mary Wanjiku',    location: 'Nakuru — Milimani, Lake View',      listings: 9,  rating: 4.6, specialty: 'Land & Plots' },
]

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="badge badge-teal mb-6 inline-block">350+ Verified Agents</span>
          <h1 className="section-title mb-4">
            Find a Trusted <span className="text-gradient">Property Agent</span>
          </h1>
          <p className="section-subtitle">
            Work with Kenya's top-rated real estate agents. All agents on DreamEstate are
            verified, licensed, and reviewed by real clients.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((agent) => (
              <div key={agent.name} className="card rounded-2xl p-6 group hover:border-white/20 transition-all">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-brand-coral/15 border border-brand-coral/20
                                flex items-center justify-center mb-4 text-xl font-display font-bold text-brand-coral">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-1">{agent.name}</h3>
                <span className="badge badge-coral text-xs mb-3 inline-block">{agent.specialty}</span>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-body">
                    <MapPin size={12} />
                    <span className="line-clamp-1">{agent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs font-body">
                    <Star size={12} className="text-brand-gold" />
                    <span>{agent.rating} rating · {agent.listings} active listings</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                                     bg-brand-teal/15 border border-brand-teal/20 text-brand-teal
                                     text-xs font-medium hover:bg-brand-teal/25 transition-all">
                    <Phone size={12} /> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                                     bg-white/5 border border-white/10 text-white/60
                                     text-xs font-medium hover:bg-white/10 transition-all">
                    <Mail size={12} /> Email
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/30 font-body text-sm mb-4">Are you a licensed agent?</p>
            <Link href="/sign-up" className="btn-primary gap-2">
              Join as an agent <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
