import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react'
import { noteCollections } from '@/data/notes'

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = noteCollections[slug]
  const title = collection?.title ?? 'DotXiv notes'
  const resources = collection?.resources ?? []

  return (
    <main className="notes-page note-detail page-pad">
      <Link href="/notes" className="back-link"><ArrowLeft size={15} /> All notes</Link>
      <div className="note-detail-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />Notes collection</p>
        <h1>{title}</h1>
        <p>{resources.length > 0 ? 'Open the available PDFs for this subject.' : 'This is the home for future notes, reading guides, and problem sets in this subject.'}</p>
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
