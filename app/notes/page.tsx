import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const noteAreas = [
  { title: 'Celestial mechanics', slug: 'celestial-mechanics', description: 'Orbits, Keplerian motion, and the forces that shape trajectories.' },
  { title: 'Cosmology notes', slug: 'cosmology', description: 'The origin, evolution, and structure of the universe.' },
]

export default function NotesPage() {
  return (
    <main className="notes-page page-pad">
      <Link href="/" className="back-link"><ArrowLeft size={15} /> Back to DotXiv</Link>
      <div className="notes-page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />The DotXiv library</p>
        <h1>Notes for curious<br /><em>minds.</em></h1>
        <p>Choose a subject to begin. Notes, problems, and explanations will live here as the library grows.</p>
      </div>
      <div className="notes-page-grid">
        {noteAreas.map((area, index) => (
          <Link href={`/notes/${area.slug}`} className="notes-page-card" key={area.slug}>
            <span>0{index + 1}</span>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
            <strong>Open notes <ArrowUpRight size={15} /></strong>
          </Link>
        ))}
      </div>
    </main>
  )
}
