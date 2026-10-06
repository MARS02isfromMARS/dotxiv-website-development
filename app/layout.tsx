import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dotxiv.vercel.app'),
  title: { default: 'DotXiv — Astrophysics & Cosmology Notes', template: '%s | DotXiv' },
  description: 'DotXiv is an astronomy olympiad guide with structured notes, study roadmaps, celestial mechanics, stellar astronomy, cosmology, galactic astronomy, and observational astronomy resources for BDOAA and IOAA preparation.',
  keywords: ['DotXiv', 'DotXiv Astronomy Olympiad guide', 'astronomy olympiad', 'BDOAA', 'IOAA', 'celestial mechanics', 'stellar astronomy', 'cosmology', 'galactic astronomy', 'observational astronomy'],
  authors: [{ name: 'DotXiv' }],
  creator: 'DotXiv',
  publisher: 'DotXiv',
  verification: { google: 'QdX4ONxEMz8YUWY8roQaQTlRx2EYmtPWMlvoMaDzHl' },
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: { title: 'DotXiv — Understand the universe from first principles', description: 'Rigorous astrophysics and cosmology notes for curious minds.', url: 'https://dotxiv.vercel.app', siteName: 'DotXiv', type: 'website', images: [{ url: '/dotxiv-logo.png', width: 1600, height: 1200, alt: 'DotXiv orbital logo' }] },
  twitter: { card: 'summary_large_image', title: 'DotXiv — Astrophysics & Cosmology Notes', description: 'Rigorous notes and problem sets for curious minds.', images: ['/dotxiv-logo.png'] },
  icons: {
    icon: [{ url: '/dotxiv-logo.png', type: 'image/png' }],
    apple: [{ url: '/dotxiv-logo.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
