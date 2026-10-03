import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react'

const celestialCoordinateSystemsPdf = 'https://blobs.vusercontent.net/blob/Celestial_Coordinate_Systems-1%20%281%29%20%281%29-uf5qMxm69mBPNtO0o0kPDjJI9imjIi.pdf'

const noteTitles: Record<string, string> = {
  'celestial-mechanics': 'Celestial mechanics',
  cosmology: 'Cosmology notes',
  'observational-astronomy': 'Observational astronomy',
  'stellar-astronomy': 'Stellar astronomy',
  'galactic-astronomy': 'Galactic astronomy',
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = noteTitles[slug] ?? 'DotXiv notes'

  return (
    <main className="notes-page note-detail page-pad">
      <Link href="/notes" className="back-link"><ArrowLeft size={15} /> All notes</Link>
      <div className="note-detail-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />Notes collection</p>
        <h1>{title}</h1>
        <p>This is the home for future notes, reading guides, and problem sets in this subject.</p>
      </div>
      {slug === 'celestial-mechanics' ? (
        <section className="notes-list" aria-label="Celestial mechanics notes">
          <a className="note-resource-card" href={celestialCoordinateSystemsPdf} target="_blank" rel="noreferrer">
            <span className="note-resource-icon"><FileText size={20} /></span>
            <span className="note-resource-copy">
              <strong>Celestial Coordinate Systems</strong>
              <small>A working guide for Astronomy Olympiads (IOAA / BdOAA)</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
      ) : (
        <section className="notes-empty-state" aria-label={`${title} coming soon`}>
          <FileText size={24} />
          <h2>Notes are on their way.</h2>
          <p>Content for this collection will be added here soon.</p>
        </section>
      )}
    </main>
  )
}
