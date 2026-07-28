import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import '../styles/globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DreamEstate — Find Your Dream Property',
    template: '%s | DreamEstate',
  },
  description: 'Discover villas, houses, and rooms for sale or rent across Kenya.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dreamestate.com',
    siteName: 'DreamEstate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfairDisplay.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#0D1B2A" />
        </head>
        <body className="bg-brand-navy text-white font-body antialiased">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A2E44',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
