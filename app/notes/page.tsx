import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, ExternalLink, Telescope } from 'lucide-react'

const syllabus = [
  {
    title: 'Stellar Astronomy', slug: 'stellar-astronomy', number: '01',
    description: 'How stars form, shine, evolve, interact, and end as white dwarfs, neutron stars, or black holes.',
    coverage: 'Stellar astronomy connects observation to stellar physics: hydrostatic equilibrium, energy generation and transport, equations of state, radiative transfer, spectra, chemical composition, stellar populations, binaries, and stellar evolution. The central questions are how mass controls a star’s temperature and lifetime, how luminosity is produced, and how observations reveal interiors we cannot see.',
    principles: 'Build from inverse-square dilution and blackbody radiation to opacity, Kirchhoff’s laws, LTE spectra, hydrostatic equilibrium, the virial theorem, nuclear reaction chains, convection, degeneracy pressure, and the mass–luminosity relation. Practise reading H–R diagrams and using Stefan–Boltzmann, Wien, distance-modulus, and lifetime scaling relations.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 5 “Radiation Mechanisms”; Ch. 6 “Photometry and Magnitudes”; Ch. 8 “Stellar Spectra”; Ch. 9 “Binary Stars and Stellar Masses”; Ch. 10 “Stellar Structure”; Ch. 11 “Stellar Evolution”; Ch. 13 “Variable Stars”; Ch. 14 “Compact Stars”.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 5 “The Interaction of Light and Matter”; Ch. 8 “The Stellar Atmosphere”; Ch. 9 “The Interiors of Stars”; Ch. 10 “Stellar Evolution”; Ch. 11 “The End States of Stars”; Ch. 12 “The Sun”; Ch. 13 “Binary Stars”; Ch. 14 “Variable Stars”.',
      'Regional/Olympiad supplement: Jyotirbigyaner Jotokichu (জ্যোতির্বিজ্ঞানের যতকিছু), chapters on radiation, stellar properties, and introductory astrophysics; pair with relevant stellar-physics chapters in Soumen Saha, Shajib Musthavi, and Ishtiaque Hossain Chowdhury’s Olympiad materials where available.'
    ],
    tools: 'UNL H–R Diagram Simulator for temperature, luminosity, and evolutionary tracks; Stellarium for colour, magnitude, and spectral-object identification; Gaia Sky for 3D stellar positions, distances, and nearby stellar populations.'
  },
  {
    title: 'Cosmology', slug: 'cosmology', number: '02',
    description: 'The origin, expansion, contents, geometry, history, and ultimate fate of the universe.',
    coverage: 'Cosmology studies the universe as a physical system: its homogeneous large-scale description, expansion history, thermal origin, structure formation, dark matter, dark energy, and the limits of observation. Its central questions are how expansion is measured, why the cosmic microwave background exists, how galaxies and clusters grew, and what the cosmic energy budget implies for the future.',
    principles: 'Master comoving versus proper distance, scale factor, redshift, Hubble–Lemaître law, lookback time, critical density, density parameters, Friedmann dynamics, curvature, recombination, CMB anisotropies, primordial nucleosynthesis, and linear growth of perturbations. Distinguish observable evidence from model assumptions and keep units consistent.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 18 “Galaxies”; Ch. 19 “Cosmology” (use the edition’s chapter numbering if your copy places these as Ch. 17–18).',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 27 “Cosmology”; Ch. 28 “The Early Universe”; Ch. 29 “The Formation of Structure in the Universe”; Ch. 30 “The Universe in the Twenty-First Century” (verify numbering against your edition).',
      'Foundations: Jyotirbigyaner Jotokichu, chapters on the celestial sphere, galaxies, the expanding universe, and introductory astrophysics. Use regional Olympiad texts by Soumen Saha or Shajib Musthavi for redshift, Hubble law, and problem drills.'
    ],
    tools: 'Universe Sandbox for expansion, gravity, and large-scale structure intuition; Mitaka for guided views from Earth to the observable universe; Gaia Sky for mapping the Milky Way as the local context for cosmological observations.'
  },
  {
    title: 'Celestial Mechanics', slug: 'celestial-mechanics', number: '03',
    description: 'The mathematics and physics of orbits, trajectories, perturbations, tides, and dynamical systems.',
    coverage: 'Celestial mechanics explains motion under gravity from two-body orbits to resonances, rotating frames, tides, spacecraft transfers, and many-body chaos. The core questions are how an orbit is determined, how energy and angular momentum constrain it, and how small perturbations accumulate into observable changes.',
    principles: 'Work through Newton’s laws, gravitational potential, conservation of energy and angular momentum, Keplerian elements, vis-viva, conic sections, centre-of-mass motion, relative coordinates, orbital period, escape speed, perturbation theory, Lagrange points, tides, and resonance. Solve both vector and scalar forms, then check limiting cases and dimensions.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 3 “Celestial Mechanics” and the Solar System chapter for applications to planets, satellites, and small bodies.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 2 “Newtonian Mechanics”; Ch. 3 “Special Relativity”; Ch. 16 “The Solar System”; Ch. 17 “Planetary Atmospheres”; Ch. 18 “The Formation of the Solar System” (edition numbering may vary).',
      'Ganitik Jotirbiggyan, Abu Saleh Mohammad Nuruzzaman ,Reads: Geometry of Celestial sphere and Celestial Coordinates'
      'General foundations: Jyotirbigyaner Jotokichu, chapters introducing the celestial sphere, apparent motion, gravity, and the Solar System. Use regional Olympiad problem books by Soumen Saha, Shajib Musthavi, or Ishtiaque Hossain Chowdhury for Kepler-law and orbit calculations.'
      
    ],
    tools: 'Universe Sandbox for N-body gravity, collisions, and orbital perturbations; NASA Eyes for Solar System trajectories and spacecraft missions; Stellarium for apparent planetary motion, retrograde motion, and conjunctions.'
  },
  {
    title: 'Galactic Astronomy', slug: 'galactic-astronomy', number: '04',
    description: 'The Milky Way and galaxies as evolving systems of stars, gas, dust, dark matter, and black holes.',
    coverage: 'Galactic astronomy examines galaxy structure, morphology, dynamics, stellar populations, interstellar medium, star formation, active nuclei, mergers, and the relationship between galaxies and their dark-matter haloes. It asks how the Milky Way is organised, how galaxies acquire and recycle gas, and how environment changes their evolution.',
    principles: 'Learn surface-brightness profiles, rotation curves, virial reasoning, velocity dispersion, Jeans-style intuition, spiral density waves, metallicity, extinction, star-formation tracers, the Tully–Fisher relation, black-hole scaling relations, and gravitational lensing. Separate baryonic, dark-matter, and observational selection effects.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 15 “The Interstellar Medium”; Ch. 16 “Star Clusters and Associations”; Ch. 17 “The Milky Way”; Ch. 18 “Galaxies”.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 24 “The Milky Way Galaxy”; Ch. 25 “Normal Galaxies”; Ch. 26 “Active Galaxies”; Ch. 29 “The Formation of Structure in the Universe”.',
      'Foundations and regional preparation: Jyotirbigyaner Jotokichu chapters on the Milky Way, galaxies, and nebulae; supplement with relevant galaxy and deep-sky chapters in Soumen Saha or Shajib Musthavi’s astronomy/Olympiad texts.'
    ],
    tools: 'Gaia Sky for Milky Way structure and stellar motions; Aladin Sky Atlas for catalogue overlays, surveys, and multi-wavelength galaxy inspection; WorldWide Telescope for guided galaxy, cluster, and nebula exploration.'
  },
  {
    title: 'Observational Astronomy', slug: 'observational-astronomy', number: '05',
    description: 'Turning photons into measurements: sky navigation, instruments, coordinates, photometry, spectroscopy, and uncertainty.',
    coverage: 'Observational astronomy is the practical language of the sky. It covers the celestial sphere, time systems, spherical coordinates, telescope optics, detectors, seeing, calibration, photometry, spectroscopy, astrometry, survey design, and scientific inference. Its central question is how to extract reliable physical information from finite, noisy measurements.',
    principles: 'Practise altitude–azimuth and equatorial coordinates, right ascension and declination, hour angle, sidereal time, precession, airmass, angular resolution, diffraction, signal-to-noise, magnitude systems, colour indices, extinction, aperture and differential photometry, spectral resolution, Doppler shift, and error propagation.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 1 “Introduction”; Ch. 2 “Spherical Astronomy”; Ch. 4 “Observations and Instruments”; Ch. 6 “Photometry and Magnitudes”; Ch. 7 “The Solar System” for observational applications.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 1 “Introduction”; Ch. 2 “Newtonian Mechanics”; Ch. 3 “Special Relativity”; Ch. 4 “Radiation and Matter”; Ch. 5 “The Tools of Astronomy”; Ch. 6 “The Sun as a Star” (confirm titles in your edition).',
      'Star Maps 101 / Star Charts 101 by Fahim Rajit Hossain Shwadhin: assign the chapters on spherical coordinates, naked-eye constellation identification, star maps, and sky navigation. Jyotirbigyaner Jotokichu chapters on the celestial sphere and foundations provide the Bengali-language bridge. Add regional observing/problem guides by Soumen Saha, Shajib Musthavi, or Ishtiaque Hossain Chowdhury.'
    ],
    tools: 'Stellarium for coordinates, constellation identification, rise/set times, and sky planning; SkySafari for mobile observing lists, telescope control, and time simulation; Aladin Sky Atlas for survey images, catalogues, and multi-band observation.'
  },
]

export default function NotesPage() {
  return (
    <main className="notes-page page-pad">
      <Link href="/" className="back-link"><ArrowLeft size={15} /> Back to DotXiv</Link>
      <div className="notes-page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" />The DotXiv library</p>
        <h1>Five paths into<br /><em>the universe.</em></h1>
        <p>A curated astronomy roadmap. Read the description, follow the textbook sequence, practise the physics, and use the visualisation tools before opening the downloadable notes.</p>
      </div>
      <div className="syllabus-stack">
        {syllabus.map((area) => (
          <article className="syllabus-section" id={area.slug} key={area.slug}>
            <div className="syllabus-section-header"><span>{area.number}</span><Telescope size={21} /></div>
            <h2>{area.title}</h2>
            <p className="syllabus-lede">{area.description}</p>
            <div className="syllabus-grid">
              <section><h3>A. Comprehensive description</h3><p>{area.coverage}</p><p>{area.principles}</p></section>
              <section><h3>B. Textbooks & specific chapters</h3><ul>{area.books.map((book) => <li key={book}>{book}</li>)}</ul></section>
              <section className="syllabus-tools"><h3>C. Interactive visualisation</h3><p>{area.tools}</p></section>
            </div>
            <Link href={`/notes/${area.slug}`} className="syllabus-link">Open {area.title} notes <ArrowUpRight size={15} /></Link>
          </article>
        ))}
      </div>
      <div className="pdf-intro"><BookOpen size={19} /><span>Downloadable notes and PDFs will be added below as each collection grows.</span><ExternalLink size={15} /></div>
    </main>
  )
}
