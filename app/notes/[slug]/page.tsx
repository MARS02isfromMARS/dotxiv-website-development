import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react'

const celestialCoordinateSystemsPdf = '/celestial-coordinate-systems-english.pdf'

type NoteResourceVersion = { label: string; language: 'en' | 'bn'; href: string }
type NoteResource = { title: string; description: string; versions: NoteResourceVersion[] }

const noteResourcesBySlug: Record<string, NoteResource[]> = {
  'observational-astronomy': [
    {
      title: 'Celestial Coordinate Systems',
      description: 'A working guide for Astronomy Olympiads (IOAA / BdOAA).',
      versions: [
        { label: 'English PDF', language: 'en', href: celestialCoordinateSystemsPdf },
        { label: 'Bangla PDF', language: 'bn', href: '/celestial-coordinate-systems-bangla.pdf' },
      ],
    },
    {
      title: 'Instrumentation - 2',
      description: 'A practical handout on telescope mounts and observational tools for Astronomy Olympiads.',
      versions: [
        { label: 'English PDF', language: 'en', href: '/observation-instrumentation-2-english.pdf' },
        { label: 'Bangla PDF', language: 'bn', href: '/observation-instrumentation-2-bangla.pdf' },
      ],
    },
  ],
}

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
  const resources = noteResourcesBySlug[slug] ?? []

  return (
    <main className="notes-page note-detail page-pad">
      <Link href="/notes" className="back-link"><ArrowLeft size={15} /> All notes</Link>
      <div className="note-detail-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />Notes collection</p>
        <h1>{title}</h1>
        <p>{resources.length > 0 ? 'Open the handouts in English or Bangla to study celestial coordinates and practical instrumentation.' : 'This is the home for future notes, reading guides, and problem sets in this subject.'}</p>
      </div>
      {resources.length > 0 ? (
        <section className="notes-list" aria-label={`${title} handouts`}>
          {resources.map((resource) => (
            <article className="note-resource-card" key={resource.title}>
              <span className="note-resource-icon" aria-hidden="true"><FileText size={20} /></span>
              <div className="note-resource-copy">
                <strong>{resource.title}</strong>
                <small>{resource.description}</small>
                <span className="note-resource-actions" role="group" aria-label={`Language versions for ${resource.title}`}>
                  {resource.versions.map((version) => (
                    <a
                      className="note-resource-action"
                      href={version.href}
                      key={version.language}
                      lang={version.language}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${version.label} for ${resource.title}`}
                    >
                      {version.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </span>
              </div>
            </article>
          ))}
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
