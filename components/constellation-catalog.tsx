'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { ConstellationCard } from '@/components/constellation-card'
import { ConstellationQuiz } from '@/components/constellation-quiz'
import { constellations, matchesConstellationSearch } from '@/lib/constellations'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const availableLetters = new Set(constellations.map((constellation) => constellation.name[0].toLocaleUpperCase('en')))
const bayerDesignationCount = constellations.reduce((total, constellation) => total + constellation.bayerDesignations.length, 0)

export function ConstellationCatalog() {
  const [query, setQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState('All')
  const [quizOpen, setQuizOpen] = useState(false)

  const filteredConstellations = useMemo(() => {
    return constellations
      .filter((constellation) => matchesConstellationSearch(query, constellation))
      .filter((constellation) => activeLetter === 'All' || constellation.name[0].toLocaleUpperCase('en') === activeLetter)
      .sort((first, second) => first.name.localeCompare(second.name, 'en'))
  }, [activeLetter, query])

  return (
    <>
      <div className="constellation-shell">
        <section className="constellation-hero" aria-labelledby="constellation-page-title">
          <div className="constellation-hero__grid">
            <div className="constellation-hero__copy">
              <p className="constellation-eyebrow"><span aria-hidden="true" /> DOTXIV · OBSERVING SKILLS</p>
              <h1 id="constellation-page-title">Learn the<br /><em>constellations.</em></h1>
              <p className="constellation-hero__lede">
                Browse verified IAU charts, explore Bayer star designations, then test how quickly you can recognize the night sky.
              </p>
              <div className="constellation-hero__stats" aria-label="Constellation guide statistics">
                <div><strong>{constellations.length}</strong><span>IAU constellations</span></div>
                <div><strong>{bayerDesignationCount.toLocaleString('en')}</strong><span>Bayer designations</span></div>
                <div><strong>20 sec</strong><span>per quick-test question</span></div>
              </div>
            </div>

            <aside className="constellation-quick-test" aria-label="Timed constellation quiz">
              <span className="constellation-quick-test__index">FIELD EXERCISE · 01</span>
              <div className="constellation-quick-test__mark" aria-hidden="true"><span /><span /><span /></div>
              <h2>Read the sky<br />under pressure.</h2>
              <p>Ten official charts. Twenty seconds each. No multiple-choice shortcuts.</p>
              <button
                className="constellation-quick-test__button"
                type="button"
                onClick={() => setQuizOpen(true)}
                aria-label="Start a ten-question constellation quick test with twenty seconds per question"
              >
                QUICK TEST <ArrowRight aria-hidden="true" />
              </button>
            </aside>
          </div>
        </section>

        <section className="constellation-browser" aria-labelledby="constellation-browser-title">
          <div className="constellation-browser__heading">
            <div>
              <p className="constellation-eyebrow">THE CELESTIAL ATLAS</p>
              <h2 id="constellation-browser-title">Browse the 88.</h2>
              <p>Search constellation names, proper star names, or Bayer labels such as α Ori.</p>
            </div>
            <p className="constellation-browser__count" aria-live="polite">
              <strong>{filteredConstellations.length.toString().padStart(2, '0')}</strong> / {constellations.length}
            </p>
          </div>

          <div className="constellation-browser__tools">
            <div className="constellation-search">
              <label htmlFor="constellation-search-input">Search the atlas</label>
              <span className="constellation-search__control">
                <Search aria-hidden="true" />
                <input
                  id="constellation-search-input"
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setActiveLetter('All')
                  }}
                  placeholder="Orion, Alpha Orionis, α Ori…"
                  autoComplete="off"
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                    <X aria-hidden="true" />
                  </button>
                )}
              </span>
            </div>
            <p className="constellation-browser__hint">Search by official name or Bayer designation</p>
          </div>

          <nav className="constellation-alphabet" aria-label="Browse constellations alphabetically">
            <button
              className={activeLetter === 'All' ? 'is-active' : ''}
              type="button"
              aria-pressed={activeLetter === 'All'}
              onClick={() => setActiveLetter('All')}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                className={activeLetter === letter ? 'is-active' : ''}
                key={letter}
                type="button"
                aria-pressed={activeLetter === letter}
                disabled={!availableLetters.has(letter)}
                onClick={() => setActiveLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </nav>

          {filteredConstellations.length > 0 ? (
            <div className="constellation-grid">
              {filteredConstellations.map((constellation, index) => (
                <ConstellationCard key={constellation.id} constellation={constellation} index={index} />
              ))}
            </div>
          ) : (
            <div className="constellation-empty" role="status">
              <span className="constellation-empty__symbol" aria-hidden="true">α</span>
              <h3>No constellation found</h3>
              <p>Try a constellation name, an Alpha star name, or a Bayer label such as β Cyg.</p>
              <button type="button" onClick={() => { setQuery(''); setActiveLetter('All') }}>
                Clear filters
              </button>
            </div>
          )}

          <p className="constellation-browser__provenance">
            All charts are verified IAU and Sky &amp; Telescope works. Image source, attribution, and licence are available with every chart.
          </p>
        </section>
      </div>

      {quizOpen && <ConstellationQuiz onClose={() => setQuizOpen(false)} />}
    </>
  )
}
