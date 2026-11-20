import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { ConstellationDetail } from '@/components/constellation-detail'
import { constellations, getConstellationById } from '@/lib/constellations'

type ConstellationPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return constellations.map((constellation) => ({ slug: constellation.id }))
}

export async function generateMetadata({ params }: ConstellationPageProps): Promise<Metadata> {
  const { slug } = await params
  const constellation = getConstellationById(slug)
  if (!constellation) return { title: 'Constellation not found' }

  return {
    title: `${constellation.name} constellation`,
    description: `Explore the official IAU chart for ${constellation.name}, its ${constellation.bayerDesignations.length} Bayer star designations, and Alpha star information.`,
    alternates: { canonical: `/constellations/${constellation.id}` },
  }
}

export default async function ConstellationDetailPage({ params }: ConstellationPageProps) {
  const { slug } = await params
  const constellation = getConstellationById(slug)
  if (!constellation) notFound()

  return (
    <>
      <SiteHeader />
      <main className="constellation-page constellation-page--detail">
        <ConstellationDetail constellation={constellation} />
      </main>
    </>
  )
}
