import type { NavItem } from '@/types'

// ── Navigation ──────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Buy',    href: '/properties?type=sale' },
  { label: 'Rent',   href: '/properties?type=rent' },
  { label: 'Sell',   href: '/sell' },
  { label: 'Agents', href: '/agents' },
  { label: 'Blog',   href: '/blog' },
]

// ── Property Options ─────────────────────────────────────────
export const PROPERTY_TYPES = [
  { value: 'villa',      label: 'Villa',       icon: '🏰' },
  { value: 'house',      label: 'House',       icon: '🏡' },
  { value: 'apartment',  label: 'Apartment',   icon: '🏢' },
  { value: 'room',       label: 'Room',        icon: '🛏️' },
  { value: 'commercial', label: 'Commercial',  icon: '🏪' },
  { value: 'land',       label: 'Land',        icon: '🌿' },
] as const

export const LISTING_TYPES = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
] as const

// ── Amenities ────────────────────────────────────────────────
export const AMENITIES = [
  'Swimming Pool', 'Gym', 'Security', 'Garden', 'Parking',
  'Balcony', 'Air Conditioning', 'Backup Generator', 'Solar Power',
  'Borehole Water', 'CCTV', 'Smart Home', 'Laundry Room',
  'Rooftop Terrace', 'Study Room', 'Guest House', 'Staff Quarters',
] as const

// ── Cities (Kenya focus) ─────────────────────────────────────
export const CITIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Thika', 'Ruiru', 'Kiambu', 'Karen', 'Westlands',
  'Kilimani', 'Lavington', 'Runda', 'Muthaiga', 'Spring Valley',
] as const

// ── Price Ranges ─────────────────────────────────────────────
export const PRICE_RANGES_SALE = [
  { label: 'Under 5M', min: 0, max: 5_000_000 },
  { label: '5M – 20M', min: 5_000_000, max: 20_000_000 },
  { label: '20M – 50M', min: 20_000_000, max: 50_000_000 },
  { label: '50M+', min: 50_000_000, max: undefined },
]

export const PRICE_RANGES_RENT = [
  { label: 'Under 20K', min: 0, max: 20_000 },
  { label: '20K – 60K', min: 20_000, max: 60_000 },
  { label: '60K – 150K', min: 60_000, max: 150_000 },
  { label: '150K+', min: 150_000, max: undefined },
]

// ── Platform Stats ────────────────────────────────────────────
export const PLATFORM_STATS = [
  { value: '12,400+', label: 'Properties Listed' },
  { value: '8,900+',  label: 'Happy Clients' },
  { value: '350+',    label: 'Verified Agents' },
  { value: '98%',     label: 'Satisfaction Rate' },
]

// ── Currency ──────────────────────────────────────────────────
export const DEFAULT_CURRENCY = 'KES'

export function formatPrice(amount: number, currency = DEFAULT_CURRENCY): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
