import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cookie Policy' }

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Cookie Policy</h1>
          <p className="font-body text-white/40 text-sm mb-10">Last updated: March 1, 2026</p>
          <div className="space-y-8 font-body text-white/60 leading-relaxed text-sm">
            {[
              { title: 'What are cookies?', body: 'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.' },
              { title: 'How we use cookies', body: 'DreamEstate uses cookies to keep you signed in, remember your search preferences, understand how you use our platform, and improve our services. We also use cookies for security purposes, to detect and prevent fraud.' },
              { title: 'Types of cookies we use', body: 'Essential cookies are required for the platform to function — these cannot be disabled. Preference cookies remember your settings and choices. Analytics cookies help us understand how visitors interact with the platform using tools like Google Analytics. Marketing cookies may be used to show you relevant property listings.' },
              { title: 'Third-party cookies', body: 'Some cookies are placed by third-party services that appear on our pages, including Clerk (authentication), Stripe (payments), and Cloudinary (media delivery). These services have their own cookie policies.' },
              { title: 'Managing cookies', body: 'Most browsers allow you to control cookies through their settings. You can choose to block all cookies, but this may affect your ability to use DreamEstate. To manage cookies, go to your browser settings and look for the privacy or cookies section.' },
              { title: 'Contact us', body: 'If you have questions about our use of cookies, please contact us at privacy@dreamestate.co.ke.' },
            ].map((s) => (
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
