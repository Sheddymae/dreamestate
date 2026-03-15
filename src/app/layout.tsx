import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
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
  title: { default: 'DreamEstate — Find Your Dream Property', template: '%s | DreamEstate' },
  description: 'Discover villas, houses, and rooms for sale or rent across Kenya.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
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
