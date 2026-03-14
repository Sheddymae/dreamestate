import { Search, CheckCircle, MessageSquare, Key } from 'lucide-react'

const STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Search & Discover',
    description:
      'Use smart filters to find exactly what you need — location, price, type, and amenities. Browse stunning 3D virtual tours from your phone.',
    color: 'brand-coral',
  },
  {
    icon: CheckCircle,
    step: '02',
    title: 'Verify & Shortlist',
    description:
      'Every listing is admin-verified. Save your favourites and compare properties side by side before making any decisions.',
    color: 'brand-teal',
  },
  {
    icon: MessageSquare,
    step: '03',
    title: 'Connect & Negotiate',
    description:
      'Chat directly with sellers or landlords in real time. Book viewings through our calendar system — no middlemen, no delays.',
    color: 'brand-gold',
  },
  {
    icon: Key,
    step: '04',
    title: 'Sign & Move In',
    description:
      'Complete contracts digitally, pay deposits securely through Stripe, and collect your keys. The whole deal — done online.',
    color: 'brand-coral',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-brand-navy-mid border-y border-white/10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-body text-brand-teal text-sm font-semibold tracking-widest uppercase mb-3">
            Simple process
          </p>
          <h2 className="section-title">
            How <span className="text-gradient">DreamEstate</span> Works
          </h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            From first search to final handover — the entire property journey lives here.
            No door-to-door. No frustration.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px
                          bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className="card-glass rounded-2xl p-6 flex flex-col items-center text-center
                           hover:border-white/20 transition-all duration-300 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Step number */}
                <span className="font-display text-6xl font-bold text-white/5 mb-2 leading-none
                                 group-hover:text-white/10 transition-colors">
                  {step.step}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-${step.color}/15 border border-${step.color}/20
                                flex items-center justify-center mb-5 -mt-8
                                group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={`text-${step.color}`} />
                </div>

                <h3 className="font-display text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
