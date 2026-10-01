import Link from 'next/link'
import { 
  ArrowUpRight, 
  ChevronDown, 
  Menu, 
  Search, 
  Users,
  // Relevant astronomy & physics symbols
  Orbit, 
  Telescope, 
  Sun, 
  Sparkles, 
  Globe2 
} from 'lucide-react'

const categories = [
  {
    label: '01',
    title: 'Orbital mechanics',
    text: 'From Keplerian motion to perturbation theory.',
    tone: 'violet',
    icon: Orbit,
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: '02',
    title: 'Observational astronomy',
    text: 'Read the sky through photons, spectra, and surveys.',
    tone: 'blue',
    icon: Telescope,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: '03',
    title: 'Stellar astronomy',
    text: 'The physics of stars, from birth to remnants.',
    tone: 'amber',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: '04',
    title: 'Galactic astronomy',
    text: 'Structure, dynamics, and the cosmic web.',
    tone: 'pink',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: '05',
    title: 'Cosmology',
    text: 'The origin, evolution, and ultimate fate of the universe.',
    tone: 'emerald',
    icon: Globe2,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
  },
];
  


function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>
}

export default function Page() {
  return (
    <main>
      <div className="announcement">
        <span>New release</span>
        <span>The Dot — Cosmology, now available in English & Bangla</span>
        <Link href="#notes">Explore <ArrowUpRight size={13} /></Link>
      </div>
      
      <header className="site-header">
        <Link href="/" className="brand" aria-label="DotXiv home">
          <span className="brand-logo-wrap">
            <img 
              className="brand-logo" 
              src="https://vercel-storage.com" 
              alt="DotXiv orbital xiv logo" 
              width={52} 
              height={52} 
            />
          </span>
          <span>DotXiv</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="#notes">Notes <ChevronDown size={13} /></Link>
          <Link href="#about">About</Link>
          <Link href="#community">Community</Link>
          <Link href="#contact">Contact</Link>
          <Link href="#resources">More resources</Link>
          <button aria-label="Search"><Search size={18} /></button>
        </nav>
        <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
      </header>

      <section className="hero page-pad">
        <div className="hero-copy">
          <SectionLabel>Astrophysics · Cosmology · Olympiad</SectionLabel>
          <h1>Understand the universe.<br /><em>From first principles.</em></h1>
          <p className="hero-lede">Rigorous, beautifully explained notes and problem sets for curious minds — from your first orbit to the edge of the observable universe.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#notes">Browse notes <ArrowUpRight size={16} /></Link>
            <Link className="button button-quiet" href="#notes">Explore the library <ArrowUpRight size={16} /></Link>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><span>M</span><span>R</span><span>A</span><span>+</span></div>
            <span>Written by olympiad alumni<br /><strong>Built for deep understanding</strong></span>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core"><span>∴</span><small>knowledge<br />in orbit</small></div>
          <div className="orbit-star star-one" />
          <div className="orbit-star star-two" />
          <div className="orbit-star star-three" />
        </div>
      </section>

      <section className="stats-strip page-pad">
        <div><strong>500<span>+</span></strong><p>pages of rigorous<br />notes & problems</p></div>
        <div><strong>02</strong><p>languages.<br />One shared sky.</p></div>
        <div><strong>∞</strong><p>questions worth<br />asking next</p></div>
        <div className="stats-note">Every derivation has a reason.<br /><span>Every problem has a path.</span></div>
      </section>

      <section id="notes" className="notes-section page-pad">
        <div className="section-heading">
          <div>
            <SectionLabel>Explore the library</SectionLabel>
            <h2>Start anywhere.<br /><em>Go everywhere.</em></h2>
          </div>
          <Link href="#notes" className="text-link">View all notes <ArrowUpRight size={15} /></Link>
        </div>
        
                    <div className="category-grid">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link href="#notes" key={category.label} className="category-card">
              <div className="category-bg-image" style={{ backgroundImage: `url(${category.image})` }} />
              <div className="category-bg-overlay" />

              <div className="category-icon">
                <IconComponent size={17} />
              </div>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
              <span className="category-link">Click to explore ↗</span>
            </Link>
          );
        })}
      </div>
        </section>

      <section id="about" className="why-section page-pad">
        <div className="why-header">
          <SectionLabel>Why DotXiv</SectionLabel>
          <h2>Less memorising.<br /><em>More seeing.</em></h2>
        </div>
        <div className="why-grid">
          <div><span>01</span><h3>Bilingual by design</h3><p>Learn in English or Bangla without losing the nuance of the idea.</p></div>
          <div><span>02</span><h3>Derivations, not declarations</h3><p>We show the path between the question and the equation.</p></div>
          <div><span>03</span><h3>Olympiad tested</h3><p>Problems that reward intuition, persistence, and a little beautiful stubbornness.</p></div>
          <div><span>04</span><h3>Free & open access</h3><p>Knowledge should move freely. So should a curious mind.</p></div>
        </div>
      </section>

      <section id="community" className="community-section page-pad">
        <div className="community-card">
          <div className="community-spark">✦</div>
          <div>
            <SectionLabel>A place to ask better questions</SectionLabel>
            <h2>The best discoveries<br />are <em>shared.</em></h2>
            <p>Join students, educators, and fellow sky-watchers in the DotXiv community.</p>
            <Link href="https://discord.gg/ycjNnkcHn" target="_blank" rel="noopener noreferrer" className="button button-primary">
            Join the community ↗
            </Link>
            
          </div>
          <div className="community-orbit" aria-hidden="true" />
        </div>
      </section>

      <footer id="contact" className="footer page-pad">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand footer-brand">
              <span className="brand-logo-wrap">
                <img 
                  className="brand-logo" 
                  src="https://vercel-storage.com" 
                  alt="DotXiv orbital xiv logo" 
                  width={45} 
                  height={45} 
                />
              </span>
              <span>DotXiv</span>
            </Link>
            <p className="footer-blurb">A home for first-principles astrophysics<br />and the people who love it.</p>
          </div>
          <div className="footer-links">
            <div>
              <span>Explore</span>
              <Link href="#notes">Notes</Link>
              <Link href="#notes">Notes</Link>
              <Link href="#about">About us</Link>
            </div>
            <div>
              <span>Elsewhere</span>
              <Link href="#community">Community</Link>
              <Link href="#resources">Resources</Link>
              <Link href="#contact">Contact</Link>
              
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DotXiv</span>
          <span>Written and maintained by <Link href="https://thedotastro.netlify.app" className="hover:underline"><strong>The Dot</strong></Link></span>
    
          <span className="social">
  <Link 
    href="https://discord.gg/ycjNnkcHn" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#B9BBBE' }}
  >
    {/* Official Discord SVG Logo */}
    <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.72-10.93,68.6,68.6,0,0,1-10.64-5.12c.91-.67,1.81-1.37,2.67-2.1a75.22,75.22,0,0,0,72.78,0c.86.73,1.76,1.43,2.67,2.1a68.86,68.86,0,0,1-10.64,5.12,74.74,74.74,0,0,0,6.72,10.93,105.73,105.73,0,0,0,31.05-18.83C129.66,48.22,123.39,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
    </svg>
    <span>Discord</span>
  </Link>
</span>
            
          
  )
    }
