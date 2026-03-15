'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="section-title mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="section-subtitle">
              Have a question, a partnership idea, or need help with a listing? We're here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Office',  value: 'Westlands Business Centre\nWestlands, Nairobi, Kenya' },
                { icon: Phone,  label: 'Phone',   value: '+254 700 000 000' },
                { icon: Mail,   label: 'Email',   value: 'hello@dreamestate.co.ke' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card-glass rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-coral/15 border border-brand-coral/20
                                  flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand-coral" />
                  </div>
                  <div>
                    <p className="font-body text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="font-body text-white text-sm whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}

              <div className="card-glass rounded-2xl p-6">
                <p className="font-body text-white/40 text-xs uppercase tracking-wider mb-3">Office hours</p>
                <div className="space-y-1 text-sm font-body text-white/60">
                  <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                  <p>Saturday: 9:00 AM – 1:00 PM</p>
                  <p className="text-white/30">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="card-glass rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-teal/15 border border-brand-teal/20
                                  flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-brand-teal" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="font-body text-white/50 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display text-xl font-bold text-white mb-6">Send us a message</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">First name</label>
                      <input required className="input" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Last name</label>
                      <input required className="input" placeholder="Kamau" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Email</label>
                    <input required type="email" className="input" placeholder="john@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Subject</label>
                    <select className="input appearance-none">
                      <option>General enquiry</option>
                      <option>Property listing help</option>
                      <option>Technical support</option>
                      <option>Partnership</option>
                      <option>Press & media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Message</label>
                    <textarea required className="input h-28 resize-none"
                      placeholder="How can we help you?" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3 gap-2">
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Sending...</>
                      : <><Send size={16} /> Send message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
