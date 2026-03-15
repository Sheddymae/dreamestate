import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service' }

const SECTIONS = [
  { title: '1. Acceptance of terms', body: 'By accessing or using DreamEstate, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.' },
  { title: '2. User accounts', body: 'You must create an account to list properties or send enquiries. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account.' },
  { title: '3. Property listings', body: 'Sellers and landlords may list properties subject to our listing guidelines. All listings must be accurate, complete, and not misleading. DreamEstate reserves the right to review, edit, or remove any listing that violates our guidelines or applicable law. Properties must be genuinely available at the time of listing.' },
  { title: '4. Prohibited conduct', body: 'You may not use DreamEstate to post false or misleading listings, harass other users, violate any applicable law or regulation, attempt to gain unauthorised access to our systems, or use automated tools to scrape or collect data from our platform without permission.' },
  { title: '5. Fees and payments', body: 'Basic listings are free. Premium features are subject to fees as outlined in our Pricing page. All fees are in Kenyan Shillings (KES) unless otherwise stated. Payments are processed securely through Stripe. Refunds are handled on a case-by-case basis.' },
  { title: '6. Intellectual property', body: 'DreamEstate and its original content, features, and functionality are owned by DreamEstate and are protected by intellectual property laws. You retain ownership of content you upload, but grant DreamEstate a licence to use, display, and distribute that content in connection with our services.' },
  { title: '7. Limitation of liability', body: 'DreamEstate is a platform connecting buyers, tenants, sellers, and landlords. We are not a party to any transaction between users. We do not verify property titles, ownership, or condition. You are responsible for conducting your own due diligence before entering any property transaction.' },
  { title: '8. Changes to terms', body: 'We may update these terms from time to time. We will notify you of significant changes by email or through the platform. Continued use of DreamEstate after changes constitutes acceptance of the updated terms.' },
  { title: '9. Governing law', body: 'These terms are governed by the laws of Kenya. Any disputes arising from these terms or your use of DreamEstate will be subject to the exclusive jurisdiction of the courts of Kenya.' },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="font-body text-white/40 text-sm mb-10">Last updated: March 1, 2026</p>
          <div className="space-y-8 font-body text-white/60 leading-relaxed text-sm">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-bold text-white mb-3">{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
