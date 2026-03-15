import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListPropertyForm from '@/components/forms/ListPropertyForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Property',
  description: 'List your property on DreamEstate and reach thousands of buyers and tenants.',
}

export default function ListPropertyPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h1 className="section-title mb-4">
            List Your <span className="text-gradient">Property</span>
          </h1>
          <p className="section-subtitle">
            Reach thousands of verified buyers and tenants across Kenya.
            Free to list — we only earn when you close a deal.
          </p>
        </div>
        <ListPropertyForm />
      </div>
      <Footer />
    </main>
  )
}
