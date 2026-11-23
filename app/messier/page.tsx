import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { MessierCatalog } from '@/components/messier-catalog'

export const metadata: Metadata = {
  title: 'Learn the Messier objects',
  description: 'Browse all 110 Messier objects by name, catalogue number, type, constellation, and magnitude, then take a randomized identification test.',
  alternates: { canonical: '/messier' },
  openGraph: {
    title: 'Learn the Messier objects | DotXiv',
    description: 'A deep-sky field guide to the 110 Messier objects with a timed identification test.',
    url: 'https://dotxiv.vercel.app/messier',
    siteName: 'DotXiv',
    type: 'website',
  },
}

export default function MessierPage() {
  return (
    <>
      <SiteHeader />
      <main className="constellation-page messier-page">
        <MessierCatalog />
      </main>
    </>
  )
}
