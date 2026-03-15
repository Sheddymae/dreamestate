'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, MapPin, Home, DollarSign, Bed, Bath, Maximize, CheckCircle, AlertCircle } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { PROPERTY_TYPES, CITIES, AMENITIES } from '@/constants'
import { cn } from '@/lib/utils'

type FormState = {
  title: string
  description: string
  type: string
  listingType: 'SALE' | 'RENT'
  price: string
  address: string
  city: string
  neighbourhood: string
  lat: string
  lng: string
  bedrooms: string
  bathrooms: string
  sqMeters: string
  yearBuilt: string
  furnished: boolean
  petFriendly: boolean
  amenities: string[]
  images: string[]
}

const STEPS = ['Details', 'Location', 'Features', 'Photos']

const EMPTY: FormState = {
  title: '', description: '', type: '', listingType: 'SALE',
  price: '', address: '', city: '', neighbourhood: '',
  lat: '-1.2921', lng: '36.8219',
  bedrooms: '1', bathrooms: '1', sqMeters: '',
  yearBuilt: '', furnished: false, petFriendly: false,
  amenities: [], images: [],
}

export default function ListPropertyForm() {
  const router = useRouter()
  const [step, setStep]         = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm]         = useState<FormState>(EMPTY)
  const [errors, setErrors]     = useState<Partial<Record<keyof FormState, string>>>({})

  const set = (field: keyof FormState, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const toggleAmenity = (a: string) => {
    set('amenities', form.amenities.includes(a)
      ? form.amenities.filter((x) => x !== a)
      : [...form.amenities, a]
    )
  }

  // Validate current step before advancing
  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}

    if (step === 0) {
      if (form.title.trim().length < 10)   e.title       = 'At least 10 characters'
      if (!form.type)                       e.type        = 'Select a property type'
      if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price'
      if (form.description.trim().length < 30) e.description = 'At least 30 characters'
    }
    if (step === 1) {
      if (!form.city)                       e.city    = 'Select a city'
      if (form.address.trim().length < 5)   e.address = 'Enter the street address'
    }
    if (step === 2) {
      if (!form.sqMeters || Number(form.sqMeters) <= 0) e.sqMeters = 'Enter property size'
    }
    if (step === 3) {
      if (form.images.length === 0) e.images = 'Upload at least one photo'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setSubmitting(true)
    try {
      const payload = {
        title:         form.title.trim(),
        description:   form.description.trim(),
        type:          form.type,
        listingType:   form.listingType,
        price:         Number(form.price),
        address:       form.address.trim(),
        city:          form.city,
        neighbourhood: form.neighbourhood.trim() || undefined,
        lat:           Number(form.lat) || -1.2921,
        lng:           Number(form.lng) || 36.8219,
        bedrooms:      Number(form.bedrooms) || 0,
        bathrooms:     Number(form.bathrooms) || 0,
        sqMeters:      Number(form.sqMeters),
        yearBuilt:     form.yearBuilt ? Number(form.yearBuilt) : undefined,
        furnished:     form.furnished,
        petFriendly:   form.petFriendly,
        amenities:     form.amenities,
        images:        form.images,
      }

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? `Server error ${res.status}`)
      }

      toast.success('Listing submitted! Our team will review it within 24 hours.')
      router.push('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
      console.error('[SUBMIT]', err)
    } finally {
      setSubmitting(false)
    }
  }

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm text-white/60 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-brand-coral text-xs mt-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <button type="button" onClick={() => i < step && setStep(i)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                i < step  ? 'bg-brand-teal text-white cursor-pointer' :
                i === step ? 'bg-brand-coral text-white' :
                             'bg-white/10 text-white/30'
              )}>
              {i < step ? <CheckCircle size={14} /> : i + 1}
            </button>
            <span className={cn('text-sm font-body hidden sm:block', i === step ? 'text-white' : 'text-white/30')}>
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={cn('flex-1 h-px', i < step ? 'bg-brand-teal/50' : 'bg-white/10')} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 0: Details ── */}
      {step === 0 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Property details</h2>

          <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
            {(['SALE', 'RENT'] as const).map((t) => (
              <button key={t} type="button" onClick={() => set('listingType', t)}
                className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-all',
                  form.listingType === t ? 'bg-brand-coral text-white' : 'text-white/50 hover:text-white')}>
                For {t === 'SALE' ? 'Sale' : 'Rent'}
              </button>
            ))}
          </div>

          <Field label="Property title *" error={errors.title}>
            <input value={form.title} onChange={(e) => set('title', e.target.value)}
              className="input" placeholder="e.g. Stunning 4-Bedroom Villa with Pool — Karen" />
          </Field>

          <Field label="Property type *" error={errors.type}>
            <div className="relative">
              <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select value={form.type} onChange={(e) => set('type', e.target.value)}
                className="input pl-9 appearance-none">
                <option value="">Select type</option>
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value.toUpperCase()}>{pt.icon} {pt.label}</option>
                ))}
              </select>
            </div>
          </Field>

          <Field label={`Price (KES) *${form.listingType === 'RENT' ? ' — per month' : ''}`} error={errors.price}>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={form.price} onChange={(e) => set('price', e.target.value)}
                type="number" className="input pl-9" placeholder="e.g. 45000000" />
            </div>
          </Field>

          <Field label="Description *" error={errors.description}>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)}
              className="input h-32 resize-none"
              placeholder="Describe what makes this property special — location highlights, recent renovations, unique features..." />
          </Field>
        </div>
      )}

      {/* ── Step 1: Location ── */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Location</h2>

          <Field label="City *" error={errors.city}>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select value={form.city} onChange={(e) => set('city', e.target.value)}
                className="input pl-9 appearance-none">
                <option value="">Select city</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </Field>

          <Field label="Neighbourhood / Estate">
            <input value={form.neighbourhood} onChange={(e) => set('neighbourhood', e.target.value)}
              className="input" placeholder="e.g. Runda, Karen, Spring Valley" />
          </Field>

          <Field label="Street address *" error={errors.address}>
            <input value={form.address} onChange={(e) => set('address', e.target.value)}
              className="input" placeholder="e.g. Runda Close, off Kiambu Road" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Latitude">
              <input value={form.lat} onChange={(e) => set('lat', e.target.value)}
                type="number" step="any" className="input" />
            </Field>
            <Field label="Longitude">
              <input value={form.lng} onChange={(e) => set('lng', e.target.value)}
                type="number" step="any" className="input" />
            </Field>
          </div>
          <p className="text-white/25 text-xs font-body">Default coordinates are Nairobi CBD. Update for accurate map placement.</p>
        </div>
      )}

      {/* ── Step 2: Features ── */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Features & amenities</h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Bedrooms">
              <div className="relative">
                <Bed size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)}
                  type="number" min="0" className="input pl-9" />
              </div>
            </Field>
            <Field label="Bathrooms">
              <div className="relative">
                <Bath size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)}
                  type="number" min="0" className="input pl-9" />
              </div>
            </Field>
            <Field label="Size (m²) *" error={errors.sqMeters}>
              <div className="relative">
                <Maximize size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={form.sqMeters} onChange={(e) => set('sqMeters', e.target.value)}
                  type="number" className="input pl-9" placeholder="e.g. 180" />
              </div>
            </Field>
          </div>

          <Field label="Year built">
            <input value={form.yearBuilt} onChange={(e) => set('yearBuilt', e.target.value)}
              type="number" className="input" placeholder="e.g. 2018" />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.furnished}
                onChange={(e) => set('furnished', e.target.checked)}
                className="w-4 h-4 accent-brand-coral" />
              <span className="font-body text-sm text-white/70">Furnished</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.petFriendly}
                onChange={(e) => set('petFriendly', e.target.checked)}
                className="w-4 h-4 accent-brand-coral" />
              <span className="font-body text-sm text-white/70">Pet friendly</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-3">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    form.amenities.includes(a)
                      ? 'bg-brand-teal/20 border-brand-teal text-brand-teal'
                      : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30'
                  )}>
                  {form.amenities.includes(a) ? '✓ ' : ''}{a}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Photos ── */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Photos</h2>
            <p className="font-body text-white/50 text-sm">
              Upload high-quality photos. The first image will be the cover photo.
              Properties with 5+ photos get 3× more enquiries.
            </p>
          </div>
          <ImageUploader value={form.images} onChange={(urls) => set('images', urls)} maxFiles={10} />
          {errors.images && (
            <p className="flex items-center gap-1 text-brand-coral text-xs">
              <AlertCircle size={11} /> {errors.images}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-10 pt-6 border-t border-white/10">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary flex-1">
            Back
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={nextStep} className="btn-primary flex-1 justify-center">
            Next: {STEPS[step + 1]}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={submitting}
            className={cn('btn-primary flex-1 justify-center gap-2',
              submitting && 'opacity-70 cursor-not-allowed')}>
            {submitting
              ? <><Loader2 size={16} className="animate-spin" /> Submitting...</>
              : 'Submit for Review'}
          </button>
        )}
      </div>
    </div>
  )
}
