import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { ConstellationCatalog } from '@/components/constellation-catalog'

export const metadata: Metadata = {
  title: 'Learn the 88 IAU constellations',
  description: 'Browse verified IAU constellation charts, explore Bayer star designations, find Alpha stars, and take a randomized 10-question identification test with 20 seconds per question.',
  alternates: { canonical: '/constellations' },
  openGraph: {
    title: 'Learn the 88 IAU constellations | DotXiv',
    description: 'An astronomy field guide to official IAU constellation charts and a timed identification test.',
    url: 'https://dotxiv.vercel.app/constellations',
    siteName: 'DotXiv',
    type: 'website',
  },
}

export default function ConstellationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="constellation-page">
        <ConstellationCatalog />
      </main>
    </>
  )
}
