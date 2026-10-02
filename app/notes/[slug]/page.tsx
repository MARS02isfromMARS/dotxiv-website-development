import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

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
      <section className="notes-empty-state" aria-label={`${title} coming soon`}>
        <FileText size={24} />
        <h2>Notes are on their way.</h2>
        <p>Content for this collection will be added here soon.</p>
      </section>
    </main>
  )
}
