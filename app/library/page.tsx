import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react'

const areas = [
  { title: 'Stellar Astronomy', slug: 'stellar-astronomy', description: 'Explore how stars form, shine, evolve, and end as white dwarfs, neutron stars, or black holes.' },
  { title: 'Cosmology', slug: 'cosmology', description: 'Study the origin, expansion, contents, geometry, and ultimate fate of the universe.' },
  { title: 'Celestial Mechanics', slug: 'celestial-mechanics', description: 'Build an understanding of orbits, gravity, perturbations, tides, and dynamical systems.' },
  { title: 'Galactic Astronomy', slug: 'galactic-astronomy', description: 'Learn how galaxies form, grow, rotate, interact, and organize the large-scale universe.' },
  { title: 'Observational Astronomy', slug: 'observational-astronomy', description: 'Develop practical skills in sky navigation, coordinates, photometry, spectroscopy, and observation.' },
]

export default function LibraryPage() {
  return (
    <main className="notes-page page-pad">
      <Link className="back-link" href="/"><ArrowLeft size={14} /> Back home</Link>
      <header className="notes-page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />The DotXiv library</p>
        <h1>Choose a <em>field.</em></h1>
        <p>A structured map of the subjects covered by DotXiv. Pick a domain to see its study guide, reading path, visual tools, and notes.</p>
      </header>
      <section className="notes-page-grid" aria-label="Astronomy library subjects">
        {areas.map((area, index) => (
          <Link className="notes-page-card" href={`/notes/${area.slug}`} key={area.slug}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
            <strong><BookOpen size={14} /> View study path <ArrowUpRight size={14} /></strong>
          </Link>
        ))}
      </section>
    </main>
  )
}
