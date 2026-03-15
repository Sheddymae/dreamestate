import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="font-body text-white/40 text-sm mb-10">Last updated: March 1, 2026</p>
          <div className="space-y-8 font-body text-white/60 leading-relaxed text-sm">
            {[
              { title: '1. Information we collect', body: 'We collect information you provide directly to us when you create an account, list a property, or contact us. This includes your name, email address, phone number, and property details. We also collect usage data including pages visited, search queries, and interaction with listings.' },
              { title: '2. How we use your information', body: 'We use the information we collect to provide, maintain, and improve our services; to process transactions; to send you notifications about listings and enquiries; to communicate with you about products, services, and promotions; and to comply with legal obligations.' },
              { title: '3. Information sharing', body: 'We do not sell your personal information. We may share information with service providers who assist in our operations (such as cloud hosting, email delivery, and payment processing), with other users when you interact with them through our platform (such as when a buyer sends an enquiry to a seller), and when required by law.' },
              { title: '4. Data security', body: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS and at rest.' },
              { title: '5. Your rights', body: 'You have the right to access, correct, or delete your personal data. You can do this through your account settings or by contacting us at privacy@dreamestate.co.ke. You may also object to or restrict certain processing of your data.' },
              { title: '6. Cookies', body: 'We use cookies and similar tracking technologies to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our Cookie Policy for more details.' },
              { title: '7. Contact us', body: 'If you have questions about this Privacy Policy, please contact us at privacy@dreamestate.co.ke or write to: DreamEstate, Westlands Business Centre, Westlands, Nairobi, Kenya.' },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-lg font-bold text-white mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
