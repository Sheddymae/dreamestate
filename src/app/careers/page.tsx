import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Careers at DreamEstate' }

const JOBS = [
  { title: 'Senior Full-Stack Engineer',  dept: 'Engineering', location: 'Nairobi / Remote', type: 'Full-time' },
  { title: 'Product Designer (UI/UX)',    dept: 'Design',      location: 'Nairobi',           type: 'Full-time' },
  { title: 'Growth Marketing Manager',   dept: 'Marketing',   location: 'Nairobi',           type: 'Full-time' },
  { title: 'Customer Success Associate', dept: 'Operations',  location: 'Nairobi',           type: 'Full-time' },
  { title: 'Data Analyst',               dept: 'Engineering', location: 'Remote',            type: 'Full-time' },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="badge badge-gold mb-6 inline-block">We're hiring</span>
          <h1 className="section-title mb-4">
            Build the future of <span className="text-gradient">real estate</span>
          </h1>
          <p className="section-subtitle">
            Join a fast-growing team on a mission to transform how Kenyans find, buy, and sell property.
            Remote-friendly, equity available, great benefits.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-2xl font-bold text-white mb-8">Open positions</h2>
          {JOBS.map((job) => (
            <div key={job.title}
              className="card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center
                         justify-between gap-4 hover:border-white/20 transition-all group">
              <div>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-coral transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="badge badge-coral text-xs">{job.dept}</span>
                  <span className="flex items-center gap-1 text-xs text-white/40 font-body">
                    <MapPin size={11} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40 font-body">
                    <Clock size={11} /> {job.type}
                  </span>
                </div>
              </div>
              <Link href="/contact"
                className="btn-secondary text-sm whitespace-nowrap gap-2 self-start sm:self-auto">
                Apply now <ArrowRight size={14} />
              </Link>
            </div>
          ))}

          <div className="text-center pt-8">
            <p className="font-body text-white/40 text-sm mb-3">Don't see a role that fits?</p>
            <Link href="/contact" className="btn-ghost text-brand-coral hover:underline">
              Send us your CV anyway →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
