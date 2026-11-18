import { ArrowUpRight } from 'lucide-react'

const resources = [
  {
    name: 'Notre Dame Eco and Space Club',
    type: 'Astronomy Olympiad notes',
    description: 'Founded on 28 October 1992, it is the first Bangladeshi astronomical club at the higher-secondary level.',
    href: 'https://github.com/sheikhabrar140/NDESC-Astronomy-Olympiad-Handouts-',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1794985778246-f3oz5Y7czzLTRmkAx8WYsx6Jfccu9P.jpg',
  },
  {
    name: 'Hipparchus',
    type: 'Problem bank',
    description: 'Browse astronomy and astrophysics Olympiad problems from international, regional, and national competitions.',
    href: 'https://hipparchus.eisatopon.gr/',
    logo: 'https://hipparchus.eisatopon.gr/assets/eisatopon-logo.png',
  },
  {
    name: 'Olimpicos',
    type: 'Olympiad directory',
    description: 'Explore international, national, and open astronomy Olympiads, including Bangladesh’s BDOAA.',
    href: 'https://olimpicos.net/astronomy',
    logo: 'https://olimpicos.net/assets/v/icon/favicon-192x192.8f8f02dfd1.png',
  },
  {
    name: 'aoXiv',
    type: 'Problems and solutions',
    description: 'Find astronomy Olympiad problems, solutions, and marking schemes from competitions around the world.',
    href: 'https://aoxiv.aoguide.app/olympiads',
    logo: 'https://aoxiv.aoguide.app/favicon.svg',
  },
]

export function ResourceDirectory() {
  return (
    <section className="resource-grid" aria-label="External astronomy resources">
      {resources.map((resource) => (
        <a
          className="resource-card"
          href={resource.href}
          key={resource.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="resource-logo-frame">
            <img className="resource-logo" src={resource.logo} alt="" loading="lazy" referrerPolicy="no-referrer" />
          </div>
          <div className="resource-card-copy">
            <span className="resource-card-type">{resource.type}</span>
            <h2>{resource.name}</h2>
            <p>{resource.description}</p>
            <span className="resource-card-visit">Visit resource <ArrowUpRight size={14} aria-hidden="true" /></span>
          </div>
        </a>
      ))}
    </section>
  )
}
