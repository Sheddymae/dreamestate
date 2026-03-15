import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Clock, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell or Rent Your Property',
  description: 'List your property on DreamEstate and reach thousands of verified buyers and tenants across Kenya.',
}

const BENEFITS = [
  { icon: TrendingUp, title: 'Maximum exposure',     desc: 'Your listing reaches 50,000+ monthly active buyers and tenants on DreamEstate.' },
  { icon: Shield,     title: 'Verified buyers only', desc: 'Every enquiry comes from a registered, verified user — no time wasters.' },
  { icon: Clock,      title: 'Live within 24 hours', desc: 'Submit your listing and our team reviews and publishes it within one business day.' },
  { icon: Star,       title: 'Free to list',         desc: 'No upfront fees. We only earn a small success fee when your deal closes.' },
]

const STEPS = [
  { number: '01', title: 'Create your account',   desc: 'Sign up as a Seller or Landlord — takes under 2 minutes.' },
  { number: '02', title: 'List your property',    desc: 'Fill in details, upload photos, and set your price.' },
  { number: '03', title: 'Get verified',          desc: 'Our team reviews your listing and publishes it within 24 hours.' },
  { number: '04', title: 'Close the deal',        desc: 'Respond to enquiries, schedule viewings, and sign contracts — all online.' },
]

export default function SellPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="badge badge-coral mb-6 inline-block">For Sellers & Landlords</span>
          <h1 className="section-title mb-6">
            Sell or Rent Your Property <span className="text-gradient">Faster</span>
          </h1>
          <p className="section-subtitle max-w-xl mx-auto mb-10">
            List your property on Kenya's leading real estate platform and connect with thousands
            of verified buyers and tenants — no agents, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="btn-primary px-8 py-4 text-base gap-2">
              List your property free <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn-secondary px-8 py-4 text-base">
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-brand-navy-mid border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Why sell with DreamEstate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="card-glass rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-coral/15 border border-brand-coral/20
                                  flex items-center justify-center mb-4">
                    <Icon size={22} className="text-brand-coral" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{b.title}</h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            How it works
          </h2>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="card-glass rounded-2xl p-6 flex items-start gap-6">
                <span className="font-display text-4xl font-bold text-brand-coral/20 shrink-0 leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="font-body text-sm text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/list-property" className="btn-primary px-10 py-4 text-base gap-2">
              Start listing now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
