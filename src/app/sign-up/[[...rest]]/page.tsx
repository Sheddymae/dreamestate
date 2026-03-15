import { SignUp } from '@clerk/nextjs'
import { Home } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Create Account' }

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-brand-navy flex flex-col items-center justify-center px-4">

      <Link href="/" className="flex items-center gap-2 mb-10 group">
        <div className="w-9 h-9 bg-brand-coral rounded-xl flex items-center justify-center
                        group-hover:scale-110 transition-transform">
          <Home size={18} className="text-white" />
        </div>
        <span className="font-display text-2xl font-bold text-white">
          Dream<span className="text-brand-coral">Estate</span>
        </span>
      </Link>

      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-brand-navy-mid border border-white/10 shadow-card rounded-2xl',
            headerTitle: 'font-display text-white text-2xl',
            headerSubtitle: 'text-white/50 font-body',
            socialButtonsBlockButton:
              'bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-body',
            dividerLine: 'bg-white/10',
            dividerText: 'text-white/30 font-body',
            formFieldLabel: 'text-white/70 font-body text-sm',
            formFieldInput:
              'bg-white/5 border-white/15 text-white placeholder:text-white/30 font-body rounded-xl focus:border-brand-coral',
            formButtonPrimary:
              'bg-brand-coral hover:bg-red-700 font-body font-semibold rounded-xl shadow-glow',
            footerActionLink: 'text-brand-coral hover:text-red-400 font-body',
          },
        }}
      />
    </main>
  )
}
