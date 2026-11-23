'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { noteSections } from '@/data/notes'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a
        href="/"
        className="brand"
        aria-label="DotXiv home"
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          window.location.assign('/')
        }}
      >
        <span className="brand-logo-wrap" aria-hidden="true">
          <span className="brand-logo" />
        </span>
        <span>DotXiv</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        <details className="nav-dropdown">
          <summary>Notes <ChevronDown size={13} aria-hidden="true" /></summary>
          <div className="nav-dropdown-panel">
            <Link className="nav-dropdown-overview" href="/notes">All study paths</Link>
            {noteSections.map((section) => (
              <Link href={`/notes/${section.slug}`} key={section.slug}>{section.title}</Link>
            ))}
          </div>
        </details>
        <Link href="/constellations">Constellations</Link>
        <Link href="/messier">Messier objects</Link>
        <Link href="/#about">About</Link>
        <Link href="/#community">Community</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/resources">More resources</Link>
        <Link className="nav-search" href="/notes" aria-label="Search notes"><Search size={18} /></Link>
      </nav>

      <button
        type="button"
        className="mobile-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/notes" onClick={closeMenu}>All notes</Link>
          <Link href="/constellations" onClick={closeMenu}>Learn constellations</Link>
          <Link href="/messier" onClick={closeMenu}>Learn Messier objects</Link>
          <div className="mobile-nav-group">
            <span className="mobile-nav-label">Study sections</span>
            {noteSections.map((section) => (
              <Link className="mobile-nav-subject" href={`/notes/${section.slug}`} key={section.slug} onClick={closeMenu}>
                {section.title}
              </Link>
            ))}
          </div>
          <Link href="/#about" onClick={closeMenu}>About</Link>
          <Link href="/#community" onClick={closeMenu}>Community</Link>
          <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          <Link href="/resources" onClick={closeMenu}>More resources</Link>
        </nav>
      )}
    </header>
  )
}
