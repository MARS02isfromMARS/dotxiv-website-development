import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Compass, FlaskConical, Telescope } from 'lucide-react'
import { noteSections, type NoteResource } from '@/data/notes'
import type { NoteChapter } from '@/data/note-chapters'
import { ScientificDiagram } from '@/components/notes-diagram'
import { CompareVisual, CommonMistake, ConceptBreakdown, EquationExplainer, QuickInsight } from '@/components/notes-learning'
import { KnowledgeCheck } from '@/components/notes-knowledge-check'
import { CoordinateVisualizer, OrbitVisualizer, SpectrumVisualizer } from '@/components/notes-visualizers'

const chapterTrail = ['stellar-astronomy', 'cosmology', 'celestial-mechanics', 'galactic-astronomy', 'observational-astronomy']

function InteractiveLab({ chapter }: { chapter: NoteChapter }) {
  if (!chapter.interactive) return null
  const Visualizer = chapter.interactive === 'orbit' ? OrbitVisualizer : chapter.interactive === 'spectrum' ? SpectrumVisualizer : CoordinateVisualizer
  const icon = chapter.interactive === 'orbit' ? <Compass size={17} aria-hidden="true" /> : chapter.interactive === 'spectrum' ? <FlaskConical size={17} aria-hidden="true" /> : <Telescope size={17} aria-hidden="true" />

  return (
    <section className="chapter-section chapter-lab" id="interactive-lab">
      <div className="chapter-section__head"><span className="chapter-kicker">A small scientific instrument</span><h2>{chapter.interactiveTitle}</h2><p>{chapter.interactiveDescription}</p></div>
      <div className="chapter-lab__panel"><div className="chapter-lab__label">{icon}<span>Interactive explorer</span><span className="chapter-lab__live">LIVE MODEL</span></div><Visualizer /></div>
    </section>
  )
}

function ReferenceShelf({ references }: { references: NoteChapter['references'] }) {
  return (
    <section className="chapter-reading-list" id="references" aria-labelledby="chapter-reading-list-title">
      <div className="chapter-reading-list__heading">
        <span className="chapter-kicker">Selected bibliography</span>
        <h2 id="chapter-reading-list-title">Further reading</h2>
        <p>Books behind the ideas in this guide. The chapter is a concise introduction, not a substitute for the full treatments.</p>
      </div>
      <ol>
        {references.map((reference, index) => (
          <li key={reference.title}>
            <span className="chapter-reading-list__number">{String(index + 1).padStart(2, '0')}</span>
            <div><cite>{reference.title}</cite><p>{reference.author}<span aria-hidden="true"> · </span>{reference.edition}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ResourceShelf({ resources, title }: { resources: NoteResource[]; title: string }) {
  if (!resources.length) return null
  return (
    <section className="chapter-resources" aria-label={`${title} resources`}>
      <div className="chapter-resources__heading"><span className="chapter-kicker">Keep studying</span><h2>Original handouts</h2><p>These existing DotXiv resources remain available alongside the visual chapter.</p></div>
      <div className="chapter-resources__grid">
        {resources.map((resource) => <article className="chapter-resource" key={resource.title}>
          <div className="chapter-resource__icon"><BookOpen size={17} aria-hidden="true" /></div>
          <div><h3>{resource.title}</h3><p>{resource.description}</p><div className="chapter-resource__links">{resource.versions.map((version) => <a href={version.href} key={version.language} lang={version.language} target="_blank" rel="noopener noreferrer">{version.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></div>
        </article>)}
      </div>
    </section>
  )
}

export function NotesChapterReader({ chapter, resources }: { chapter: NoteChapter; resources: NoteResource[] }) {
  const trailIndex = chapterTrail.indexOf(chapter.slug)
  const previous = trailIndex > 0 ? noteSections.find((section) => section.slug === chapterTrail[trailIndex - 1]) : undefined
  const next = trailIndex < chapterTrail.length - 1 ? noteSections.find((section) => section.slug === chapterTrail[trailIndex + 1]) : undefined
  return (
    <main className="notes-page notes-chapter page-pad">
      <Link href="/notes" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> All study paths</Link>
      <header className="chapter-hero">
        <div className="chapter-hero__copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> DotXiv field guide <span className="chapter-hero__number">CHAPTER {chapter.number}</span></p>
          <p className="chapter-hero__subtitle">{chapter.subtitle}</p>
          <h1>{chapter.title}</h1>
          <p className="chapter-hero__lede">{chapter.description}</p>
          <div className="chapter-hero__meta"><span><BookOpen size={14} aria-hidden="true" /> {chapter.readingTime}</span><span><Telescope size={14} aria-hidden="true" /> Astronomy Olympiad level</span></div>
        </div>
        <ScientificDiagram kind={chapter.heroFigure.kind} title={chapter.heroFigure.title} caption={chapter.heroFigure.caption} index={`PLATE ${chapter.number}`} size="hero" />
      </header>

      <section className="chapter-objectives" id="learning-objectives">
        <div className="chapter-objectives__heading"><span className="chapter-kicker">Learning objectives</span><h2>By the end of this chapter</h2></div>
        <ul>{chapter.objectives.map((objective) => <li key={objective}><Check size={15} aria-hidden="true" /><span>{objective}</span></li>)}</ul>
        <div className="chapter-layers">{chapter.layers.map((layer, index) => <article key={layer.name}><span>0{index + 1} / {layer.name}</span><p>{layer.description}</p></article>)}</div>
      </section>

      <div className="chapter-layout">
        <aside className="chapter-rail">
          <nav aria-label="Chapter contents"><span className="chapter-kicker">In this chapter</span>
            <a href="#learning-objectives">Learning objectives</a>
            <a href="#visual-breakdown">The visual model</a>
            {chapter.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.label}</a>)}
            <a href="#equations">Equations</a><a href="#compare-models">Compare the models</a>
            {chapter.interactive && <a href="#interactive-lab">Interactive explorer</a>}
            <a href="#real-example">Astronomical example</a><a href="#olympiad-insight">Olympiad insight</a><a href="#knowledge-check">Knowledge check</a><a href="#references">Further reading</a>
          </nav>
        </aside>

        <article className="chapter-content">
          <section className="chapter-section" id="visual-breakdown">
            <ConceptBreakdown steps={chapter.steps} />
          </section>

          {chapter.sections.map((section, index) => <section className="chapter-section chapter-lesson" id={section.id} key={section.id}>
            <div className="chapter-section__head"><span className="chapter-kicker">{section.label}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ScientificDiagram kind={section.figure.kind} title={section.figure.title} caption={section.figure.caption} index={`FIG. ${chapter.number}.${index + 1}`} />
            <p className="chapter-takeaway"><span>Keep in view</span>{section.takeaway}</p>
          </section>)}

          <section className="chapter-section" id="equations">
            <div className="chapter-section__head"><span className="chapter-kicker">Mathematical relationships</span><h2>Equations with physical meaning</h2><p>Track units and assumptions as carefully as the symbols. Each relationship below names its variables and the regime in which it applies.</p></div>
            <div className="equation-grid">{chapter.equations.map((equation) => <EquationExplainer key={equation.title} {...equation} />)}</div>
          </section>

          <section className="chapter-section" id="compare-models">
            <CompareVisual {...chapter.comparison} />
          </section>

          {chapter.interactive && <InteractiveLab chapter={chapter} />}

          <section className="chapter-section chapter-example" id="real-example">
            <div className="chapter-example__mark"><Telescope size={18} aria-hidden="true" /></div>
            <div><span className="chapter-kicker">In the real sky</span><h2>{chapter.example.title}</h2><p>{chapter.example.body}</p><strong>{chapter.example.result}</strong></div>
          </section>

          <section className="chapter-section chapter-insights" id="olympiad-insight">
            <QuickInsight>{chapter.insight}</QuickInsight>
            <CommonMistake>{chapter.misconception}</CommonMistake>
          </section>

          <section className="chapter-section" id="knowledge-check">
            <KnowledgeCheck title={`Test your understanding of ${chapter.title.toLowerCase()}.`} questions={chapter.questions} />
          </section>

          <ReferenceShelf references={chapter.references} />
          <ResourceShelf resources={resources} title={chapter.title} />
        </article>
      </div>

      <nav className="chapter-pagination" aria-label="Adjacent chapters">
        {previous ? <Link href={`/notes/${previous.slug}`} className="chapter-pagination__link"><span><ArrowLeft size={14} aria-hidden="true" /> Previous chapter</span><strong>{previous.title}</strong></Link> : <span />}
        <Link href="/notes" className="chapter-pagination__all">All study paths</Link>
        {next ? <Link href={`/notes/${next.slug}`} className="chapter-pagination__link chapter-pagination__link--next"><span>Next chapter <ArrowRight size={14} aria-hidden="true" /></span><strong>{next.title}</strong></Link> : <span />}
      </nav>
    </main>
  )
}
