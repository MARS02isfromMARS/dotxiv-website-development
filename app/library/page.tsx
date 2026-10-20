import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, Library } from 'lucide-react'

const textbooks = [
  { title: 'Fundamental Astronomy', authors: 'H. Karttunen, P. Kröger, H. Oja, M. Poutanen & K. J. Donner', cover: 'https://covers.openlibrary.org/b/title/Fundamental%20Astronomy-L.jpg' },
  { title: 'Fundamentals of Astronomy: A Guide for Olympiads', authors: 'Flavio Salvati', cover: 'https://covers.openlibrary.org/b/title/Fundamentals%20of%20Astronomy%20A%20Guide%20for%20Olympiads-L.jpg' },
  { title: "A Student's Guide to the Mathematics of Astronomy", authors: 'Daniel Fleisch & Julia Kregenow', cover: "https://covers.openlibrary.org/b/title/A%20Student's%20Guide%20to%20the%20Mathematics%20of%20Astronomy-L.jpg" },
  { title: 'An Introduction to Modern Astrophysics', authors: 'Bradley W. Carroll & Dale A. Ostlie', cover: 'https://covers.openlibrary.org/b/title/An%20Introduction%20to%20Modern%20Astrophysics-L.jpg' },
  { title: 'Foundations of Astrophysics', authors: 'Barbara Ryden & Bradley M. Peterson', cover: 'https://covers.openlibrary.org/b/title/Foundations%20of%20Astrophysics-L.jpg' },
  { title: 'Astronomy: Principles and Practice', authors: 'A. E. Roy & D. Clarke', cover: 'https://covers.openlibrary.org/b/title/Astronomy%20Principles%20and%20Practice-L.jpg' },
  { title: 'A Problem Book in Astronomy and Astrophysics', authors: 'Aniket Sule', cover: 'https://covers.openlibrary.org/b/title/A%20Problem%20Book%20in%20Astronomy%20and%20Astrophysics-L.jpg' },
  { title: 'Introduction to Cosmology', authors: 'Barbara Ryden', cover: 'https://covers.openlibrary.org/b/title/Introduction%20to%20Cosmology-L.jpg' },
  { title: 'Astronomy: A Physical Perspective', authors: 'Marc L. Kutner', cover: 'https://covers.openlibrary.org/b/title/Astronomy%20A%20Physical%20Perspective-L.jpg' },
  { title: 'The Physical Universe: An Introduction to Astronomy', authors: 'Frank H. Shu', cover: 'https://covers.openlibrary.org/b/title/The%20Physical%20Universe-L.jpg' },
]

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

      <section className="textbook-section" aria-labelledby="textbooks-heading">
        <div className="textbook-heading">
          <p className="eyebrow"><span className="eyebrow-dot" />Reading room</p>
          <h2 id="textbooks-heading">Core <em>textbooks.</em></h2>
          <p>A focused shelf for building the mathematical and physical foundations behind the DotXiv study paths.</p>
        </div>
        <div className="textbook-grid">
          {textbooks.map((book, index) => (
            <article className="book-card" key={book.title}>
              {/* VO: Leave the PDF link empty like this for me to fill in */}
              <a href="PASTE_PDF_LINK_HERE" target="_blank" rel="noopener noreferrer">
                <div className="book-cover-frame">
                  <img src={book.cover} alt={`${book.title} cover`} className="book-cover" loading="lazy" />
                  <span className="book-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="book-copy">
                  <h3>{book.title}</h3>
                  <p>{book.authors}</p>
                  <span className="book-link">Open PDF <ArrowUpRight size={13} /></span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
