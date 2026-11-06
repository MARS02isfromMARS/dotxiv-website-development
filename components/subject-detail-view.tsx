import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, Compass, Telescope } from 'lucide-react'
import { astronomySubjects, type AstronomySubject } from '@/lib/astronomy-syllabus'

export type NoteResource = {
  title: string
  description: string
  versions: { label: string; language: 'en' | 'bn'; href: string }[]
}

type SubjectDetailViewProps = {
  subject: AstronomySubject
  resources: NoteResource[]
}

function ResourceCard({ resource }: { resource: NoteResource }) {
  return (
    <article className="note-resource-card">
      <span className="note-resource-icon" aria-hidden="true"><BookOpen size={19} /></span>
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
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </span>
      </div>
    </article>
  )
}

export default function SubjectDetailView({ subject, resources }: SubjectDetailViewProps) {
  const subjectList = astronomySubjects

  return (
    <main className="notes-page subject-page page-pad">
      <div className="subject-topline">
        <Link href="/notes" className="back-link"><ArrowLeft size={15} /> All study paths</Link>
        <span>{subject.number} <i>/</i> 05</span>
      </div>
      <header className="subject-detail-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />DotXiv study path · {subject.number}</p>
        <h1>{subject.title}</h1>
        <p>{subject.description}</p>
        <div className="subject-heading-actions">
          <Link className="button button-primary" href="/notes">Explore all subjects <ArrowUpRight size={15} /></Link>
          <Link className="button button-quiet" href="/library">Visit the reading room <BookOpen size={15} /></Link>
        </div>
      </header>

      {resources.length > 0 && (
        <section className="subject-resources" aria-labelledby="subject-resources-title">
          <div className="subject-section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" />Available handouts</p>
              <h2 id="subject-resources-title">Learn in your language.</h2>
            </div>
            <p>Open a handout in a new tab. Each file is served directly from DotXiv.</p>
          </div>
          <div className="notes-list">
            {resources.map((resource) => <ResourceCard key={resource.title} resource={resource} />)}
          </div>
        </section>
      )}

      <section className="subject-study-grid" aria-label={`${subject.title} study guide`}>
        <article className="subject-panel subject-overview">
          <span className="subject-panel-kicker"><Compass size={14} /> Field guide</span>
          <h2>What this field explores</h2>
          <p>{subject.coverage}</p>
        </article>
        <article className="subject-panel subject-principles">
          <span className="subject-panel-kicker"><span>01</span> Core ideas</span>
          <h2>Build the foundations.</h2>
          <p>{subject.principles}</p>
        </article>
        <article className="subject-panel subject-reading">
          <span className="subject-panel-kicker"><BookOpen size={14} /> Reading path</span>
          <h2>Start with the essentials.</h2>
          <ul>
            {subject.books.map((book) => <li key={book}>{book}</li>)}
          </ul>
        </article>
        <article className="subject-panel subject-tools">
          <span className="subject-panel-kicker"><Telescope size={14} /> Explore visually</span>
          <h2>See the ideas in motion.</h2>
          <p>{subject.tools}</p>
          <Link href="/notes" className="subject-inline-link">View the full study map <ArrowUpRight size={14} /></Link>
        </article>
      </section>

      <nav className="subject-switcher" aria-label="Explore astronomy subjects">
        <span>All five study paths</span>
        <div>
          {subjectList.map((item) => (
            <Link href={`/notes/${item.slug}`} key={item.slug} aria-current={item.slug === subject.slug ? 'page' : undefined}>
              {item.title}<ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </main>
  )
}

