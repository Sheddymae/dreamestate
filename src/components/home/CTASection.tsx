import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-brand-navy-mid border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-brand-coral/15 border border-brand-coral/20
                        flex items-center justify-center mx-auto mb-8">
          <Home size={28} className="text-brand-coral" />
        </div>

        <h2 className="section-title mb-6">
          Ready to find your{' '}
          <span className="text-gradient">dream property?</span>
        </h2>

        <p className="section-subtitle max-w-2xl mx-auto mb-10">
          Join over 8,900 Kenyans who have already found their perfect home through DreamEstate.
          It takes less than 2 minutes to get started.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/properties" className="btn-primary text-base px-10 py-4 gap-3">
            Browse Properties
            <ArrowRight size={18} />
          </Link>
          <Link href="/sign-up" className="btn-secondary text-base px-10 py-4">
            Create Free Account
          </Link>
        </div>

        <p className="mt-8 text-white/25 text-sm font-body">
          No credit card required · Free to search · Cancel anytime
        </p>
      </div>
    </section>
  )
}
