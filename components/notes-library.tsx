import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronDown, Layers3, Telescope } from 'lucide-react'
import { noteChapters } from '@/data/note-chapters'
import { ScientificDiagram } from '@/components/notes-diagram'

type SyllabusArea = {
  title: string
  slug: string
  number: string
  description: string
  coverage: string
  principles: string
  books: string[]
  tools: string
}

export function NotesLibrary({ syllabus }: { syllabus: SyllabusArea[] }) {
  return (
    <main className="notes-page notes-library page-pad">
      <Link href="/" className="back-link"><ArrowLeft size={14} aria-hidden="true" /> DotXiv home</Link>
      <header className="notes-library__hero">
        <div className="notes-library__intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> The DotXiv field guide</p>
          <h1>Learn the sky.<br /><em>See the physics.</em></h1>
          <p>Five visual chapters for Astronomy Olympiad preparation. Each one starts with a clear picture, explains the idea in plain language, and then connects it to equations and real observations.</p>
          <div className="notes-library__stats"><span><strong>05</strong> subject chapters</span><span><strong>03</strong> interactive labs</span><span><strong>∞</strong> ways to connect the ideas</span></div>
        </div>
        <div className="notes-library__plate">
          <ScientificDiagram kind="orbit" title="One orbit, several conserved quantities" caption="The same ellipse can be read through shape, speed, energy, and angular momentum." index="FIELD PLATE 01" size="hero" />
        </div>
      </header>

      <section className="notes-library__curriculum" aria-labelledby="notes-curriculum-title">
        <div className="notes-library__section-heading">
          <div><span className="chapter-kicker">A connected curriculum</span><h2 id="notes-curriculum-title">Choose a chapter</h2></div>
          <p>Read the figure first, follow the explanation, then see how the idea appears in the real sky. Each chapter ends with a short summary; original DotXiv reading lists and handouts remain available too.</p>
        </div>
        <div className="notes-library__grid">
          {syllabus.map((area) => {
            const chapter = noteChapters[area.slug]
            return (
              <article className="notes-path-card" id={area.slug} key={area.slug}>
                <div className="notes-path-card__top"><span>{chapter?.number ?? area.number}</span><span><Layers3 size={14} aria-hidden="true" /> Visual chapter</span></div>
                <h3><Link href={`/notes/${area.slug}`}>{area.title}<ArrowUpRight size={17} aria-hidden="true" /></Link></h3>
                <p className="notes-path-card__lede">{chapter?.subtitle ?? area.description}</p>
                <p className="notes-path-card__description">{area.description}</p>
                <div className="notes-path-card__layers"><span>Foundation</span><span>Visual models</span><span>Olympiad insight</span></div>
                <Link href={`/notes/${area.slug}`} className="notes-path-card__open">Open chapter <span>{chapter?.sections.length ?? 0} visual studies</span><ArrowUpRight size={15} aria-hidden="true" /></Link>
                <details className="notes-path-card__details">
                  <summary><BookOpen size={14} aria-hidden="true" /> Full syllabus, books & tools <ChevronDown size={14} aria-hidden="true" /></summary>
                  <div className="notes-path-card__detail-body">
                    <section><h4>Scope</h4><p>{area.coverage}</p><p>{area.principles}</p></section>
                    <section><h4>Textbooks & specific chapters</h4><ul>{area.books.map((book) => <li key={book}>{book}</li>)}</ul></section>
                    <section><h4>Interactive visualisation</h4><p>{area.tools}</p></section>
                  </div>
                </details>
              </article>
            )
          })}
        </div>
      </section>

      <section className="notes-library__method" aria-label="How to use the field guide">
        <div><Telescope size={18} aria-hidden="true" /><span>Observe</span><p>Start with the diagram and name the physical quantities.</p></div>
        <div><BookOpen size={18} aria-hidden="true" /><span>Explain</span><p>Connect the picture to a relationship, its units, and its assumptions.</p></div>
        <div><Layers3 size={18} aria-hidden="true" /><span>Apply</span><p>Test the model with a real system and a short Olympiad-style question.</p></div>
      </section>
    </main>
  )
}
