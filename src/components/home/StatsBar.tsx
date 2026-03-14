'use client'
import { useEffect, useRef, useState } from 'react'
import { PLATFORM_STATS } from '@/constants'

function useCountUp(target: string, duration = 1800) {
  const [display, setDisplay] = useState('0')
  const started = useRef(false)

  const startCount = () => {
    if (started.current) return
    started.current = true
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.,]/g, '')
    const steps = 60
    const increment = numeric / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, numeric)
      const formatted = numeric >= 1000
        ? Math.round(current).toLocaleString()
        : Math.round(current).toString()
      setDisplay(formatted + suffix)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
  }

  return { display, startCount }
}

function StatItem({ value, label }: { value: string; label: string }) {
  const { display, startCount } = useCountUp(value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startCount() },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startCount])

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6">
      <span className="font-display text-4xl md:text-5xl font-bold text-gradient">
        {display}
      </span>
      <span className="font-body text-sm text-white/50 mt-1 tracking-wide uppercase">
        {label}
      </span>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-white/10 bg-brand-navy-mid">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
          {PLATFORM_STATS.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
