import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DreamEstate — Find Your Dream Property',
    template: '%s | DreamEstate',
  },
  description:
    'Discover villas, houses, and rooms for sale or rent. Connect with verified sellers and landlords. No door-to-door searching — find your dream property online.',
  keywords: [
    'real estate', 'property for sale', 'houses for rent', 'villas', 'apartments',
    'buy house', 'rent apartment', 'landlord', 'property listing', 'DreamEstate',
  ],
  authors: [{ name: 'DreamEstate' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'DreamEstate',
    title: 'DreamEstate — Find Your Dream Property',
    description: 'Discover villas, houses, and rooms for sale or rent.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamEstate',
    description: 'Find your dream property — buy, sell, rent.',
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-brand-navy text-white font-body antialiased">
        {children}
      </body>
    </html>
  )
}
