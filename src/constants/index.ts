import type { NavItem } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Buy",    href: "/properties?listing=sale" },
  { label: "Rent",   href: "/properties?listing=rent" },
  { label: "Sell",   href: "/sell" },
  { label: "Agents", href: "/agents" },
  { label: "Blog",   href: "/blog" },
]

export const PROPERTY_TYPES = [
  { value: "villa",      label: "Villa",      icon: "" },
  { value: "house",      label: "House",      icon: "" },
  { value: "apartment",  label: "Apartment",  icon: "" },
  { value: "room",       label: "Room",       icon: "" },
  { value: "commercial", label: "Commercial", icon: "" },
  { value: "land",       label: "Land",       icon: "" },
] as const

export const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
] as const

export const AMENITIES = [
  "Swimming Pool", "Gym", "Security", "Garden", "Parking",
  "Balcony", "Air Conditioning", "Backup Generator", "Solar Power",
  "Borehole Water", "CCTV", "Smart Home", "Laundry Room",
  "Rooftop Terrace", "Study Room", "Guest House", "Staff Quarters",
] as const

export const CITIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
  "Thika", "Ruiru", "Kiambu", "Karen", "Westlands",
  "Kilimani", "Lavington", "Runda", "Muthaiga", "Spring Valley",
] as const

export const PLATFORM_STATS = [
  { value: "12,400+", label: "Properties Listed" },
  { value: "8,900+",  label: "Happy Clients" },
  { value: "350+",    label: "Verified Agents" },
  { value: "98%",     label: "Satisfaction Rate" },
]

export const DEFAULT_CURRENCY = "KES"

export function formatPrice(amount: number, currency = DEFAULT_CURRENCY): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
