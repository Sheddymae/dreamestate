import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pricing' }

const PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    desc: 'Perfect for individual sellers with one property.',
    color: 'brand-teal',
    features: [
      '1 active listing',
      'Up to 5 photos',
      'Enquiry inbox',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get started free',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'Pro',
    price: 'KES 2,500',
    period: '/month',
    desc: 'For serious sellers and landlords with multiple properties.',
    color: 'brand-coral',
    features: [
      'Up to 10 active listings',
      'Up to 20 photos per listing',
      '3D virtual tour support',
      'Priority listing placement',
      'Advanced analytics dashboard',
      'WhatsApp enquiry alerts',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/sign-up?plan=pro',
    featured: true,
  },
  {
    name: 'Agency',
    price: 'KES 8,000',
    period: '/month',
    desc: 'For real estate agencies managing large portfolios.',
    color: 'brand-gold',
    features: [
      'Unlimited listings',
      'Unlimited photos & videos',
      'Team accounts (up to 10 agents)',
      'Featured homepage placement',
      'API access',
      'Dedicated account manager',
      'Custom branding',
    ],
    cta: 'Contact sales',
    href: '/contact',
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="section-title mb-4">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h1>
          <p className="section-subtitle">
            Start free. Upgrade when you need more. No hidden fees, no long-term contracts.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`card rounded-2xl p-8 relative
                ${plan.featured ? 'border-brand-coral ring-1 ring-brand-coral/30' : ''}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-coral px-4 py-1 text-xs">Most popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <span className={`badge bg-${plan.color}/15 text-${plan.color} mb-3 inline-block`}>
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                    <span className="font-body text-white/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="font-body text-sm text-white/50 mt-2">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-body text-white/70">
                      <CheckCircle size={15} className={`text-${plan.color} shrink-0 mt-0.5`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}
                  className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
                  {plan.cta} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-white/25 text-sm font-body mt-10">
            All plans include SSL security, mobile-optimised listings, and 99.9% uptime guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
