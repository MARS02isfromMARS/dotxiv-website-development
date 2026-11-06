import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react'
import { astronomySubjects } from '@/lib/astronomy-syllabus'

export const metadata: Metadata = {
  title: 'Astronomy Subject Library',
  description: 'Explore DotXiv’s five astronomy study paths and a curated reading room of foundational astrophysics textbooks.',
}

const textbooks = [
  { title: 'Fundamental Astronomy', authors: 'H. Karttunen, P. Kröger, H. Oja, M. Poutanen & K. J. Donner', cover: '/textbook-covers/karttunen.jpg', pdf: 'https://drive.google.com/file/d/1jAAtkF0YCrT3Fm9B4I2kxez393olF_iy/view?usp=drivesdk' },
  { title: 'Fundamentals of Astronomy: A Guide for Olympiads', authors: 'Flavio Salvati', cover: '/textbook-covers/salvati-olympiads.jpg', pdf: 'https://drive.google.com/file/d/15bDhuOIYbaz2CmQemkBOSsJuuQPXRJdL/view?usp=drivesdk' },
  { title: "A Student's Guide to the Mathematics of Astronomy", authors: 'Daniel Fleisch & Julia Kregenow', cover: '/textbook-covers/fleisch-kregenow.jpg', pdf: 'https://drive.google.com/file/d/1stxvjdeDodxtcAIGUbKBZDJEnxftPZKs/view?usp=drivesdk' },
  { title: 'An Introduction to Modern Astrophysics', authors: 'Bradley W. Carroll & Dale A. Ostlie', cover: '/textbook-covers/carroll-ostlie.jpg', pdf: 'https://drive.google.com/file/d/1V12rbls_OdmsxS4HSG2sudghqPZ54Wfz/view?usp=drivesdk' },
  { title: 'IOAA Problem Book: Problems and Official Solutions (2007–2025)', authors: 'Ioana A. Zelko', cover: '/textbook-covers/Screenshot_2026-10-21-10-22-55-17_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg', pdf: 'https://drive.google.com/file/d/1yTgE2auhzpKfjFVQaCCHU-6vooBQHxRv/view?usp=drivesdk' },
  { title: 'Foundations of Astrophysics', authors: 'Barbara Ryden & Bradley M. Peterson', cover: '/textbook-covers/ryden-peterson.jpg', pdf: 'https://drive.google.com/file/d/1b9CeCRhjxnMlDF_tboXlKxn0tvOUspux/view?usp=drivesdk'},
  { title: 'Astronomy: Principles and Practice', authors: 'A. E. Roy & D. Clarke', cover: '/textbook-covers/roy-clarke.jpg', pdf: 'https://drive.google.com/file/d/1LBJJhPa87_UqNKCdONRnhYcKN_B12iz5/view?usp=drivesdk' },
  { title: 'A Problem Book in Astronomy and Astrophysics', authors: 'Aniket Sule', cover: '/textbook-covers/sule-problem-book.webp', pdf: 'https://drive.google.com/file/d/1gFn2rYAE5QMrge7B0cz1x4K12mr2Ca1s/view?usp=drivesdk' },
  { title: 'Introduction to Cosmology', authors: 'Barbara Ryden', cover: '/textbook-covers/ryden-cosmology-art.png', pdf:'https://drive.google.com/file/d/1EU9BMWuDMEkYaPJGurBBH4JUUrz4RIOD/view?usp=drivesdk' },
  { title: 'Astronomy: A Physical Perspective', authors: 'Marc L. Kutner', cover: '/textbook-covers/kutner-astronomy-art.png', pdf:'https://drive.google.com/file/d/1syG_f03CiVO-YZK9A4sltQJYQ7A9MKm4/view?usp=drivesdk' },
  { title: 'The Physical Universe: An Introduction to Astronomy', authors: 'Frank H. Shu', cover: '/textbook-covers/shu-universe-art.png', pdf: 'https://drive.google.com/file/d/1zdN3pwRzSjEIq2ox3ZKyEjppTa9GsNrV/view?usp=drivesdk' },
]

const areas = astronomySubjects

export default function LibraryPage() {
  return (
    <main className="notes-page page-pad">
      <Link className="back-link" href="/"><ArrowLeft size={14} /> Back home</Link>
      <header className="notes-page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />The DotXiv library</p>
        <h1>Five fields.<br /><em>One universe.</em></h1>
        <p>Five connected study paths, from the motions of nearby worlds to the history of the universe. Choose a field to explore its concepts, reading path, and visual tools.</p>
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
                  <img src={book.cover} alt={`${book.title} cover artwork`} className="book-cover" loading="lazy" />
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
