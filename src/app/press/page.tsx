import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Download, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Press & Media' }

const COVERAGE = [
  { outlet: 'Business Daily Africa', headline: 'DreamEstate raises seed funding to disrupt Kenya\'s property market', date: 'January 2026' },
  { outlet: 'TechCabal',            headline: 'How DreamEstate is solving Africa\'s real estate discovery problem', date: 'November 2025' },
  { outlet: 'Daily Nation',         headline: 'New platform lets Nairobians find homes without leaving the sofa',   date: 'August 2025' },
]

export default function PressPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="section-title mb-4">
            Press & <span className="text-gradient">Media</span>
          </h1>
          <p className="section-subtitle">
            Resources for journalists, bloggers, and media professionals covering DreamEstate.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Media coverage</h2>
            <div className="space-y-4">
              {COVERAGE.map((item) => (
                <div key={item.headline} className="card-glass rounded-xl p-5">
                  <p className="font-body text-xs text-brand-coral font-semibold uppercase tracking-wider mb-2">
                    {item.outlet} · {item.date}
                  </p>
                  <p className="font-display text-sm font-semibold text-white leading-snug">
                    {item.headline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white mb-4">Brand assets</h3>
              <p className="font-body text-sm text-white/50 mb-5">
                Download our official logos, brand guidelines, and product screenshots for use in editorial coverage.
              </p>
              <button className="btn-primary w-full justify-center gap-2">
                <Download size={16} /> Download press kit
              </button>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white mb-2">Press contact</h3>
              <p className="font-body text-sm text-white/50 mb-4">
                For media enquiries, interview requests, and editorial partnerships:
              </p>
              <a href="mailto:press@dreamestate.co.ke"
                className="flex items-center gap-2 text-brand-coral font-body text-sm hover:underline">
                <Mail size={15} /> press@dreamestate.co.ke
              </a>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <h3 className="font-display text-base font-bold text-white mb-3">Key stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: '12,400+', l: 'Listings' },
                  { v: '8,900+',  l: 'Clients' },
                  { v: '350+',    l: 'Agents' },
                  { v: '4 cities', l: 'Coverage' },
                ].map((s) => (
                  <div key={s.l} className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="font-display text-xl font-bold text-brand-coral">{s.v}</p>
                    <p className="font-body text-xs text-white/40 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
