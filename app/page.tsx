import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, Check, ChevronDown, Download, FileText, Menu, Search, Sparkles, Users } from 'lucide-react'
import { ViewCounter } from '@/components/view-counter'

const categories = [
  { label: '01', title: 'Orbital mechanics', text: 'From Keplerian motion to perturbation theory.', tone: 'violet' },
  { label: '02', title: 'Observational astronomy', text: 'Read the sky through photons, spectra, and surveys.', tone: 'blue' },
  { label: '03', title: 'Stellar astronomy', text: 'The physics of stars, from birth to remnants.', tone: 'amber' },
  { label: '04', title: 'Galactic astronomy', text: 'Structure, dynamics, and the cosmic web.', tone: 'rose' },
  { label: '05', title: 'Cosmology', text: 'A first-principles map of the expanding universe.', tone: 'teal' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>
}

export default function Page() {
  return (
    <main>
      <div className="announcement"><span>New release</span><span>The Dot — Cosmology, now available in English & Bangla</span><Link href="#the-dot">Explore <ArrowUpRight size={13} /></Link></div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="DotXiv home"><Image src="/dotxiv-logo.png" alt="DotXiv orbital xiv logo" width={52} height={52} priority /><span>DotXiv</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation"><Link href="#notes">Notes <ChevronDown size={13} /></Link><Link href="#about">About</Link><Link href="#community">Community</Link><Link href="#contact">Contact</Link><Link href="#resources">More resources</Link><button aria-label="Search"><Search size={18} /></button></nav>
        <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
      </header>

      <section className="hero page-pad">
        <div className="hero-copy"><SectionLabel>Astrophysics · Cosmology · Olympiad</SectionLabel><h1>Understand the universe.<br /><em>From first principles.</em></h1><p className="hero-lede">Rigorous, beautifully explained notes and problem sets for curious minds — from your first orbit to the edge of the observable universe.</p><div className="hero-actions"><Link className="button button-primary" href="#notes">Browse notes <ArrowUpRight size={16} /></Link><Link className="button button-quiet" href="#the-dot">Start with The Dot <ArrowUpRight size={16} /></Link></div><div className="hero-proof"><div className="proof-avatars"><span>M</span><span>R</span><span>A</span><span>+</span></div><span>Written by olympiad alumni<br /><strong>Built for deep understanding</strong></span></div></div>
        <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><span>∴</span><small>knowledge<br />in orbit</small></div><div className="orbit-star star-one" /><div className="orbit-star star-two" /><div className="orbit-star star-three" /></div>
      </section>

      <section className="stats-strip page-pad"><div><strong>500<span>+</span></strong><p>pages of rigorous<br />notes & problems</p></div><div><strong>02</strong><p>languages.<br />One shared sky.</p></div><div><strong>∞</strong><p>questions worth<br />asking next</p></div><div className="stats-note">Every derivation has a reason.<br /><span>Every problem has a path.</span></div></section>

      <section id="the-dot" className="dot-section page-pad"><div className="dot-intro"><SectionLabel>Flagship collection</SectionLabel><h2>Meet <em>The Dot.</em></h2><p>A cosmology lecture-note collection that starts at the beginning and keeps going — through redshift, Hubble–Lemaître, isotropy, anisotropy, and beyond.</p><Link className="text-link" href="#downloads">See the collection <ArrowUpRight size={15} /></Link></div><div className="document-stage"><div className="doc-back doc-back-two" /><div className="doc-back doc-back-one" /><div className="document"><div className="doc-top"><span>DOTXIV / 01</span><span>COSMOLOGY</span></div><div className="doc-title">The Dot</div><div className="doc-subtitle">A gentle descent<br />into the universe</div><div className="doc-rule" /><div className="doc-equation">v = H₀d</div><div className="doc-small">the Hubble–Lemaître law<br />is a story about distance</div><div className="doc-orbit" /></div><div className="document-caption"><span>01 / 04</span><span>Cosmology, from scratch</span></div></div></section>

      <section id="downloads" className="download-section page-pad"><div className="download-heading"><SectionLabel>Choose your language</SectionLabel><h2>Download <em>The Dot.</em></h2><p>Keep a copy close. Return whenever the universe feels a little too large.</p></div><div className="download-grid"><article className="download-card"><div className="download-card-top"><span className="language-tag">EN</span><span>PDF · 18.4 MB</span></div><h3>The Dot / English</h3><p>Cosmology lecture notes, written for clarity and curiosity.</p><div className="preview-page"><div className="preview-line wide" /><div className="preview-line" /><div className="preview-equation">a(t) ∝ t<sup>2/3</sup></div><div className="preview-line short" /></div><button className="button button-light"><Download size={15} /> Download PDF</button></article><article className="download-card accent-card"><div className="download-card-top"><span className="language-tag">BN</span><span>PDF · 19.1 MB</span></div><h3>The Dot / বাংলা</h3><p>একই মহাবিশ্ব, মাতৃভাষায় — সহজ থেকে অলিম্পিয়াড স্তর পর্যন্ত।</p><div className="preview-page bn-preview"><div className="preview-line wide" /><div className="preview-line" /><div className="preview-equation">z = λₒ/λₑ − 1</div><div className="preview-line short" /></div><button className="button button-light"><Download size={15} /> Download PDF</button></article></div></section>

      <section id="notes" className="notes-section page-pad"><div className="section-heading"><div><SectionLabel>Explore the library</SectionLabel><h2>Start anywhere.<br /><em>Go everywhere.</em></h2></div><Link href="#notes" className="text-link">View all notes <ArrowUpRight size={15} /></Link></div><div className="category-grid">{categories.map((category) => <Link href="#notes" className={`category-card ${category.tone}`} key={category.label}><span className="category-number">{category.label}</span><div className="category-icon"><Sparkles size={17} /></div><h3>{category.title}</h3><p>{category.text}</p><span className="category-link">Click to explore <ArrowUpRight size={14} /></span></Link>)}</div></section>

      <section id="about" className="why-section page-pad"><div className="why-header"><SectionLabel>Why DotXiv</SectionLabel><h2>Less memorising.<br /><em>More seeing.</em></h2></div><div className="why-grid"><div><span>01</span><h3>Bilingual by design</h3><p>Learn in English or Bangla without losing the nuance of the idea.</p></div><div><span>02</span><h3>Derivations, not declarations</h3><p>We show the path between the question and the equation.</p></div><div><span>03</span><h3>Olympiad tested</h3><p>Problems that reward intuition, persistence, and a little beautiful stubbornness.</p></div><div><span>04</span><h3>Free & open access</h3><p>Knowledge should move freely. So should a curious mind.</p></div></div></section>

      <section id="community" className="community-section page-pad"><div className="community-card"><div className="community-spark">✦</div><div><SectionLabel>A place to ask better questions</SectionLabel><h2>The best discoveries<br />are <em>shared.</em></h2><p>Join students, educators, and fellow sky-watchers in the DotXiv community.</p><Link className="button button-primary" href="#contact"><Users size={16} /> Join the community <ArrowUpRight size={16} /></Link></div><div className="community-orbit" aria-hidden="true" /></div></section>

      <footer id="contact" className="footer page-pad"><div className="footer-top"><div><Link href="/" className="brand footer-brand"><Image src="/dotxiv-logo.png" alt="DotXiv orbital xiv logo" width={45} height={45} /><span>DotXiv</span></Link><p className="footer-blurb">A home for first-principles astrophysics<br />and the people who love it.</p></div><div className="footer-links"><div><span>Explore</span><Link href="#notes">Notes</Link><Link href="#the-dot">The Dot</Link><Link href="#about">About us</Link></div><div><span>Elsewhere</span><Link href="#community">Community</Link><Link href="#resources">Resources</Link><Link href="#contact">Contact</Link></div><div><span>Stay curious</span><p>Get occasional notes<br />from the observatory.</p><div className="newsletter"><input aria-label="Email address" placeholder="your@email.com" type="email" /><button aria-label="Subscribe"><ArrowUpRight size={16} /></button></div></div></div></div><div className="footer-bottom"><span>© 2026 DotXiv</span><span className="live-count"><i /> <ViewCounter scope="site" /> live readers</span><span>Written and maintained by <strong>Mohammad Marshad Bin Khaled</strong></span><span className="social"><Sparkles size={15} /> <span>Discord</span></span></div></footer>
    </main>
  )
}

