import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Home, Camera, CheckCircle, DollarSign } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Property',
  description: 'List your property on DreamEstate and reach thousands of verified buyers and tenants.',
}

const LISTING_STEPS = [
  { icon: Home,        title: 'Property details',    desc: 'Add address, type, size, and features' },
  { icon: Camera,      title: 'Photos & 3D tour',    desc: 'Upload images and a virtual walkthrough' },
  { icon: DollarSign,  title: 'Set your price',       desc: 'Add asking price and listing type' },
  { icon: CheckCircle, title: 'Submit for review',    desc: 'Our team verifies and publishes within 24hrs' },
]

export default function ListPropertyPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <div className="pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-14">
            <h1 className="section-title mb-4">
              List Your <span className="text-gradient">Property</span>
            </h1>
            <p className="section-subtitle">
              Reach thousands of verified buyers and tenants. Free to list —
              we only earn when you close a deal.
            </p>
          </div>

          {/* Steps preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {LISTING_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="card-glass rounded-xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-coral/15 flex items-center
                                  justify-center mx-auto mb-3">
                    <Icon size={18} className="text-brand-coral" />
                  </div>
                  <p className="font-body text-xs font-semibold text-white mb-1">{step.title}</p>
                  <p className="font-body text-xs text-white/40 leading-snug">{step.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Placeholder form */}
          <div className="card-glass rounded-3xl p-8 space-y-5">
            <h2 className="font-display text-2xl font-bold text-white">Property details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="input" type="text" placeholder="Property title" />
              <select className="input appearance-none">
                <option value="">Property type</option>
                <option>Villa</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Room</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
              <select className="input appearance-none">
                <option value="">Listing type</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <input className="input" type="number" placeholder="Price (KES)" />
              <input className="input" type="text" placeholder="City / Location" />
              <input className="input" type="text" placeholder="Neighbourhood" />
              <input className="input" type="number" placeholder="Bedrooms" />
              <input className="input" type="number" placeholder="Bathrooms" />
              <input className="input" type="number" placeholder="Size (m²)" />
              <input className="input" type="number" placeholder="Year built" />
            </div>

            <textarea
              className="input h-32 resize-none"
              placeholder="Property description — highlight what makes this property special..."
            />

            <button className="btn-primary w-full justify-center py-4 text-base gap-2">
              Continue to Photos & Media
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
