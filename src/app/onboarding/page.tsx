'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Home, Key, FileText, Building2, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const ROLES = [
  {
    id: 'BUYER',
    icon: Home,
    title: 'Buyer',
    description: 'I want to purchase a property',
    color: 'brand-coral',
  },
  {
    id: 'TENANT',
    icon: Key,
    title: 'Tenant',
    description: 'I am looking to rent a property',
    color: 'brand-teal',
  },
  {
    id: 'SELLER',
    icon: FileText,
    title: 'Seller',
    description: 'I want to sell my property',
    color: 'brand-gold',
  },
  {
    id: 'LANDLORD',
    icon: Building2,
    title: 'Landlord',
    description: 'I want to list properties for rent',
    color: 'brand-coral',
  },
]

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (!selected || !user) return
    setLoading(true)
    try {
      // Save role to Clerk public metadata
      await user.update({ unsafeMetadata: { role: selected } })

      // Sync user to database
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selected }),
      })

      if (!res.ok) throw new Error('Failed to save role')

      toast.success(`Welcome to DreamEstate! You're registered as a ${selected.toLowerCase()}.`)
      router.push('/dashboard')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-brand-coral/15 border border-brand-coral/20 rounded-2xl
                          flex items-center justify-center mx-auto mb-6">
            <Home size={24} className="text-brand-coral" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            Welcome, {user?.firstName || 'there'}!
          </h1>
          <p className="font-body text-white/50 text-lg">
            How will you be using DreamEstate? Pick your role to get started.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {ROLES.map((role) => {
            const Icon = role.icon
            const isSelected = selected === role.id
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={cn(
                  'card-glass rounded-2xl p-6 text-left transition-all duration-200 group',
                  'border hover:border-white/20',
                  isSelected
                    ? `border-${role.color} bg-${role.color}/10 shadow-glow`
                    : 'border-white/10'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform',
                  `bg-${role.color}/15 border border-${role.color}/20`,
                  'group-hover:scale-110'
                )}>
                  <Icon size={22} className={`text-${role.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">{role.title}</h3>
                <p className="font-body text-sm text-white/50">{role.description}</p>

                {/* Selected tick */}
                {isSelected && (
                  <div className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-${role.color}`}>
                    <div className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    Selected
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className={cn(
            'w-full btn-primary justify-center py-4 text-base gap-3 transition-all',
            (!selected || loading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Setting up your account...</>
          ) : (
            <>Continue to Dashboard <ArrowRight size={18} /></>
          )}
        </button>

        <p className="text-center text-white/25 text-xs font-body mt-4">
          You can change your role later in Settings
        </p>
      </div>
    </main>
  )
}
