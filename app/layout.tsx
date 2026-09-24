import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dotxiv.vercel.app'),
  title: { default: 'DotXiv — Astrophysics & Cosmology Notes', template: '%s | DotXiv' },
  description: 'Astrophysics olympiad notes, cosmology lecture notes, and rigorous problem sets for USAAAO and IOAA preparation.',
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: { title: 'DotXiv — Understand the universe from first principles', description: 'Rigorous astrophysics and cosmology notes for curious minds.', url: 'https://dotxiv.vercel.app', siteName: 'DotXiv', type: 'website', images: [{ url: '/dotxiv-logo.png', width: 1600, height: 1200, alt: 'DotXiv orbital logo' }] },
  twitter: { card: 'summary_large_image', title: 'DotXiv — Astrophysics & Cosmology Notes', description: 'Rigorous notes and problem sets for curious minds.', images: ['/dotxiv-logo.png'] },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
export const metadata = {
  verification: {
    google: 'QdX4ONxEMz8YUWY8roQaQTlRx2EYmtPWMlvoMaDzHlY',
  },
};
