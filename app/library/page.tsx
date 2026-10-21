import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, Library } from 'lucide-react'

const textbooks = [
  { title: 'Fundamental Astronomy', authors: 'H. Karttunen, P. Kröger, H. Oja, M. Poutanen & K. J. Donner', cover: '/textbook-covers/karttunen.jpg', pdf: 'https://drive.google.com/file/d/1jAAtkF0YCrT3Fm9B4I2kxez393olF_iy/view?usp=drivesdk' },
  { title: 'Fundamentals of Astronomy: A Guide for Olympiads', authors: 'Flavio Salvati', cover: '/textbook-covers/salvati-olympiads.jpg', pdf: 'https://drive.google.com/file/d/15bDhuOIYbaz2CmQemkBOSsJuuQPXRJdL/view?usp=drivesdk' },
  { title: "A Student's Guide to the Mathematics of Astronomy", authors: 'Daniel Fleisch & Julia Kregenow', cover: '/textbook-covers/fleisch-kregenow.jpg', pdf: 'https://drive.google.com/file/d/1stxvjdeDodxtcAIGUbKBZDJEnxftPZKs/view?usp=drivesdk' },
  { title: 'An Introduction to Modern Astrophysics', authors: 'Bradley W. Carroll & Dale A. Ostlie', cover: '/textbook-covers/carroll-ostlie.jpg', pdf: 'https://drive.google.com/file/d/1V12rbls_OdmsxS4HSG2sudghqPZ54Wfz/view?usp=drivesdk' },
  { title: 'IOAA Problem Book: Problems and Official Solutions (2007–2025)', authors: 'Ioana A. Zelko', cover: '/Screenshot_2026-10-21-10-22-55-17.JPG', pdf: 'https://drive.google.com/file/d/1yTgE2auhzpKfjFVQaCCHU-6vooBQHxRv/view?usp=drivesdk' },
  { title: 'Foundations of Astrophysics', authors: 'Barbara Ryden & Bradley M. Peterson', cover: '/textbook-covers/ryden-peterson.jpg' },
  { title: 'Astronomy: Principles and Practice', authors: 'A. E. Roy & D. Clarke', cover: '/textbook-covers/roy-clarke.jpg', pdf: 'https://drive.google.com/file/d/1LBJJhPa87_UqNKCdONRnhYcKN_B12iz5/view?usp=drivesdk' },
  { title: 'A Problem Book in Astronomy and Astrophysics', authors: 'Aniket Sule', cover: '/textbook-covers/sule-problem-book.webp', pdf: 'https://drive.google.com/file/d/1gFn2rYAE5QMrge7B0cz1x4K12mr2Ca1s/view?usp=drivesdk' },
  { title: 'Introduction to Cosmology', authors: 'Barbara Ryden', cover: '/textbook-covers/ryden-cosmology.jpg', pdf:'https://drive.google.com/file/d/1EU9BMWuDMEkYaPJGurBBH4JUUrz4RIOD/view?usp=drivesdk' },
  { title: 'Astronomy: A Physical Perspective', authors: 'Marc L. Kutner', cover: '/textbook-covers/kutner.jpg' },
  { title: 'The Physical Universe: An Introduction to Astronomy', authors: 'Frank H. Shu', cover: '/textbook-covers/shu-physical-universe.jpg', pdf: 'https://drive.google.com/file/d/1zdN3pwRzSjEIq2ox3ZKyEjppTa9GsNrV/view?usp=drivesdk' },
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
              <a href={book.pdf ?? 'PASTE_PDF_LINK_HERE'} target="_blank" rel="noopener noreferrer">
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
