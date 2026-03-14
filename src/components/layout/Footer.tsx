import Link from 'next/link'
import { Home, Mail, Phone, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  Properties: [
    { label: 'Buy a home', href: '/properties?listing=sale' },
    { label: 'Rent a home', href: '/properties?listing=rent' },
    { label: 'Villas', href: '/properties?type=villa' },
    { label: 'Apartments', href: '/properties?type=apartment' },
    { label: 'New listings', href: '/properties?sort=newest' },
  ],
  Landlords: [
    { label: 'List a property', href: '/list-property' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Agent login', href: '/sign-in' },
  ],
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-brand-coral rounded-lg flex items-center justify-center">
                <Home size={16} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Dream<span className="text-brand-coral">Estate</span>
              </span>
            </Link>

            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Kenya's leading real estate platform. Find, list, and manage properties —
              villas, houses, apartments, and rooms — for sale and rent.
            </p>

            <div className="space-y-2 text-sm text-white/40 font-body">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-coral shrink-0" />
                <span>Westlands Business Centre, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-coral shrink-0" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-coral shrink-0" />
                <span>hello@dreamestate.co.ke</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-body text-xs font-semibold tracking-widest uppercase
                             text-white/40 mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/55 hover:text-white
                                 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} DreamEstate. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30 font-body">
            <span>🇰🇪 Kenya</span>
            <span>·</span>
            <span>Built with Next.js 14</span>
            <span>·</span>
            <span className="text-brand-coral">v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
