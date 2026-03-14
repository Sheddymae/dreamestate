// ─────────────────────────────────────────────────────────────
// DreamEstate — Core TypeScript Types
// ─────────────────────────────────────────────────────────────

// ── User ───────────────────────────────────────────────────
export type UserRole = 'buyer' | 'tenant' | 'seller' | 'landlord' | 'admin'

export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  phone?: string
  role: UserRole
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// ── Property ────────────────────────────────────────────────
export type PropertyType = 'villa' | 'house' | 'apartment' | 'room' | 'commercial' | 'land'
export type ListingType  = 'sale' | 'rent'
export type PropertyStatus = 'draft' | 'pending_review' | 'active' | 'sold' | 'rented' | 'archived'

export interface PropertyLocation {
  address: string
  city: string
  country: string
  zipCode?: string
  lat: number
  lng: number
  neighbourhood?: string
}

export interface PropertyFeatures {
  bedrooms:   number
  bathrooms:  number
  floors?:    number
  garages?:   number
  sqMeters:   number
  yearBuilt?: number
  furnished:  boolean
  petFriendly: boolean
  amenities:  string[]   // e.g. ['pool', 'gym', 'security', 'garden']
}

export interface PropertyMedia {
  images:      string[]   // Cloudinary URLs
  videos?:     string[]
  tourUrl?:    string     // Matterport / 3D tour URL
  floorPlan?:  string
}

export interface Property {
  id:          string
  title:       string
  description: string
  type:        PropertyType
  listingType: ListingType
  status:      PropertyStatus
  price:       number
  currency:    string        // default 'KES' (Kenya Shilling)
  location:    PropertyLocation
  features:    PropertyFeatures
  media:       PropertyMedia
  ownerId:     string
  owner?:      User
  views:       number
  favourites:  number
  createdAt:   Date
  updatedAt:   Date
}

// ── Search & Filters ────────────────────────────────────────
export interface SearchFilters {
  query?:        string
  listingType?:  ListingType
  propertyType?: PropertyType
  city?:         string
  minPrice?:     number
  maxPrice?:     number
  minBeds?:      number
  minBaths?:     number
  minSqm?:       number
  maxSqm?:       number
  amenities?:    string[]
  furnished?:    boolean
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'nearest'

// ── Enquiry / Message ───────────────────────────────────────
export type EnquiryStatus = 'open' | 'replied' | 'closed'

export interface Enquiry {
  id:         string
  propertyId: string
  property?:  Property
  senderId:   string
  sender?:    User
  message:    string
  status:     EnquiryStatus
  createdAt:  Date
}

export interface Message {
  id:           string
  conversationId: string
  senderId:     string
  sender?:      User
  content:      string
  readAt?:      Date
  createdAt:    Date
}

// ── Viewing / Booking ───────────────────────────────────────
export type ViewingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled'

export interface ViewingBooking {
  id:          string
  propertyId:  string
  property?:   Property
  requesterId: string
  requester?:  User
  ownerId:     string
  scheduledAt: Date
  status:      ViewingStatus
  notes?:      string
  createdAt:   Date
}

// ── Transaction ─────────────────────────────────────────────
export type TransactionType   = 'deposit' | 'rent_payment' | 'purchase' | 'platform_fee'
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Transaction {
  id:          string
  propertyId:  string
  property?:   Property
  payerId:     string
  payer?:      User
  receiverId:  string
  receiver?:   User
  amount:      number
  currency:    string
  type:        TransactionType
  status:      TransactionStatus
  stripeRef?:  string
  createdAt:   Date
}

// ── UI Helpers ──────────────────────────────────────────────
export interface NavItem {
  label: string
  href:  string
  icon?: string
}

export interface Stat {
  label: string
  value: string
  icon?: string
}
