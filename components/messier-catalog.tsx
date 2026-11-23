'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react'
import { MessierQuiz } from '@/components/messier-quiz'
import { messierObjects } from '@/data/messier'
import { getMessierCategory, matchesMessierSearch } from '@/lib/messier'
import type { MessierCategory } from '@/lib/messier'

const filters: { id: 'all' | MessierCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'galaxies', label: 'Galaxies' },
  { id: 'nebulae', label: 'Nebulae' },
  { id: 'clusters', label: 'Clusters' },
  { id: 'other', label: 'Other' },
]

export function MessierCatalog() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['id']>('all')
  const [quizOpen, setQuizOpen] = useState(false)

  const filteredObjects = useMemo(() => messierObjects.filter((object) => {
    const matchesFilter = activeFilter === 'all' || getMessierCategory(object.type) === activeFilter
    return matchesFilter && matchesMessierSearch(query, object)
  }), [activeFilter, query])

  const categoryCount = new Set(messierObjects.map((object) => object.type)).size

  return (
    <>
      <div className="constellation-shell">
        <section className="constellation-hero" aria-labelledby="messier-page-title">
          <div className="constellation-hero__grid">
            <div className="constellation-hero__copy">
              <p className="constellation-eyebrow"><span aria-hidden="true" /> DOTXIV · DEEP-SKY FIELD GUIDE</p>
              <h1 id="messier-page-title">Learn the<br /><em>Messier objects.</em></h1>
              <p className="constellation-hero__lede">
                Browse Charles Messier&apos;s 110 deep-sky targets by name, type, catalogue number, or constellation, then check your recall with a quick test.
              </p>
              <div className="constellation-hero__stats" aria-label="Messier catalogue statistics">
                <div><strong>{messierObjects.length}</strong><span>catalogued objects</span></div>
                <div><strong>{categoryCount}</strong><span>object classes</span></div>
                <div><strong>20 sec</strong><span>per test question</span></div>
              </div>
            </div>

            <aside className="constellation-quick-test messier-quick-test" aria-label="Timed Messier object quiz">
              <span className="constellation-quick-test__index">FIELD EXERCISE · 02</span>
              <div className="messier-quick-test__mark" aria-hidden="true"><span>M</span><i /></div>
              <h2>Know the deep sky<br />by its catalogue.</h2>
              <p>Ten clues. Twenty seconds each. One randomised tour through the Messier list.</p>
              <button
                className="constellation-quick-test__button"
                type="button"
                onClick={() => setQuizOpen(true)}
                aria-label="Start a ten-question Messier object identification test with twenty seconds per question"
              >
                QUICK TEST <ArrowRight aria-hidden="true" />
              </button>
            </aside>
          </div>
        </section>

        <section className="constellation-browser" aria-labelledby="messier-browser-title">
          <div className="constellation-browser__heading">
            <div>
              <p className="constellation-eyebrow">THE DEEP-SKY INDEX</p>
              <h2 id="messier-browser-title">Browse all 110.</h2>
              <p>Find a Messier number, common name, NGC/IC cross-reference, type, or constellation.</p>
            </div>
            <p className="constellation-browser__count" aria-live="polite">
              <strong>{filteredObjects.length.toString().padStart(3, '0')}</strong> / {messierObjects.length}
            </p>
          </div>

          <div className="constellation-browser__tools">
            <div className="constellation-search">
              <label htmlFor="messier-search-input">Search the catalogue</label>
              <span className="constellation-search__control">
                <Search aria-hidden="true" />
                <input
                  id="messier-search-input"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="M31, Andromeda, galaxy, Virgo…"
                  autoComplete="off"
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                    <X aria-hidden="true" />
                  </button>
                )}
              </span>
            </div>
            <p className="constellation-browser__hint">Search by number, common name, classification, or sky region</p>
          </div>

          <nav className="constellation-alphabet messier-filters" aria-label="Filter Messier objects by class">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter.id ? 'is-active' : ''}
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </nav>

          {filteredObjects.length > 0 ? (
            <div className="constellation-grid messier-grid">
              {filteredObjects.map((object, index) => {
                const category = getMessierCategory(object.type)
                const title = object.commonName ?? object.catalog ?? `Messier object ${object.number}`
                const imageSearchUrl = `https://images.nasa.gov/search?q=${encodeURIComponent(`Messier M${object.number}`)}`

                return (
                  <article className={`constellation-card messier-card messier-card--${category}`} key={object.id}>
                    <div className="messier-card__visual" aria-hidden="true">
                      <span className="messier-card__visual-number">M{String(object.number).padStart(2, '0')}</span>
                      <span className="messier-card__orb messier-card__orb--one" />
                      <span className="messier-card__orb messier-card__orb--two" />
                      <span className="messier-card__visual-type">{category}</span>
                    </div>
                    <div className="constellation-card__content">
                      <div className="constellation-card__overline">
                        <span>{object.type}</span>
                        <span>{String(index + 1).padStart(3, '0')}</span>
                      </div>
                      <h3 className="messier-card__title">{title}</h3>
                      <p className="messier-card__designation">M{object.number} · {object.constellation}</p>
                      <dl className="messier-card__facts">
                        <div><dt>NGC / IC</dt><dd>{object.catalog ?? '—'}</dd></div>
                        <div><dt>Magnitude</dt><dd>{object.magnitude.toFixed(1)}</dd></div>
                        <div><dt>Sky region</dt><dd>{object.constellation}</dd></div>
                      </dl>
                      <a className="messier-card__source" href={imageSearchUrl} target="_blank" rel="noopener noreferrer">
                        Explore NASA images <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="constellation-empty" role="status">
              <span className="constellation-empty__symbol" aria-hidden="true">M</span>
              <h3>No Messier object found</h3>
              <p>Try a Messier number, a common object name, a type such as galaxy, or a constellation.</p>
              <button type="button" onClick={() => { setQuery(''); setActiveFilter('all') }}>
                Clear filters
              </button>
            </div>
          )}

          <p className="constellation-browser__provenance">
            Catalogue numbers, cross-identifications, types, constellations, and apparent magnitudes are compiled from the Messier object catalogue. Images open in NASA&apos;s public image archive.
            {' '}<a href="https://en.wikipedia.org/wiki/List_of_Messier_objects" target="_blank" rel="noopener noreferrer">View catalogue source</a>.
          </p>
        </section>
      </div>

      {quizOpen && <MessierQuiz onClose={() => setQuizOpen(false)} />}
    </>
  )
}
