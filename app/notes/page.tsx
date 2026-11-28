import type { Metadata } from 'next'
import { NotesLibrary } from '@/components/notes-library'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Visual Astronomy Notes',
  description: 'Clear, diagram-led Astronomy Olympiad notes with plain-language explanations, worked examples, and carefully labeled scientific figures.',
  alternates: { canonical: '/notes' },
}

const syllabus = [
  {
    title: 'Stellar Astronomy', slug: 'stellar-astronomy', number: '01',
    description: 'How stars form, shine, evolve, interact, and end as white dwarfs, neutron stars, or black holes.',
    coverage: 'Stellar astronomy asks what stars are made of, how they produce light, and how they change over time. We begin with the clues that reach us—brightness, colour, and spectra—then use them to reason about temperature, size, mass, and age. The chapter also follows stars from their formation to their final states.',
    principles: 'Learn to read an H–R diagram and connect a star’s spectrum to its temperature and composition. Then build a simple picture of the interior: gravity pulls inward, pressure pushes outward, and energy travels from the core to the surface. We use blackbody radiation, stellar masses, and lifetime estimates as models, while noting where each approximation stops working.',
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
    coverage: 'Cosmology studies the universe on its largest scales: how it began in a hot, dense state, how it has expanded, and how galaxies and clusters formed. We focus on evidence astronomers can measure, including shifted light, the cosmic microwave background, and distances to faraway objects.',
    principles: 'Start by comparing the emitted and observed wavelength of light. Then connect redshift to cosmic expansion, and learn why a redshift is not a distance on its own. We introduce the scale factor and different ways to define cosmic distance, keeping observations separate from the assumptions in a cosmological model.',
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
    coverage: 'Celestial mechanics explains how gravity shapes the paths of planets, moons, stars, and spacecraft. We begin with a simple two-body orbit, then look at what changes when both objects matter, when a spacecraft transfers between orbits, or when other bodies gently disturb the path.',
    principles: 'Learn the geometry of an ellipse before using the equations for speed and orbital period. Energy helps classify a path as bound or escaping; angular momentum explains why an object speeds up near the central body. We show the assumptions behind the two-body model and use units and limiting cases to check our answers.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 3 “Celestial Mechanics” and the Solar System chapter for applications to planets, satellites, and small bodies.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 2 “Newtonian Mechanics”; Ch. 3 “Special Relativity”; Ch. 16 “The Solar System”; Ch. 17 “Planetary Atmospheres”; Ch. 18 “The Formation of the Solar System” (edition numbering may vary).',
      'General foundations: Jyotirbigyaner Jotokichu, chapters introducing the celestial sphere, apparent motion, gravity, and the Solar System. Use regional Olympiad problem books by Soumen Saha, Shajib Musthavi, or Ishtiaque Hossain Chowdhury for Kepler-law and orbit calculations.'
      
    ],
    tools: 'Universe Sandbox for N-body gravity, collisions, and orbital perturbations; NASA Eyes for Solar System trajectories and spacecraft missions; Stellarium for apparent planetary motion, retrograde motion, and conjunctions.'
  },
  {
    title: 'Galactic Astronomy', slug: 'galactic-astronomy', number: '04',
    description: 'The Milky Way and galaxies as evolving systems of stars, gas, dust, dark matter, and black holes.',
    coverage: 'Galactic astronomy treats a galaxy as a living system of stars, gas, dust, and dark matter. We use the Milky Way as a nearby example, then ask how galaxies are built, how their contents move, and how gas is turned into stars and recycled.',
    principles: 'First learn what different wavelengths reveal. Then read a rotation curve: the speed of orbiting gas gives us a way to estimate the gravity—and therefore the mass—inside its path. Gravitational lensing offers another mass probe by measuring how foreground matter bends background light. Both methods have assumptions and uncertainties.',
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
    coverage: 'Observational astronomy follows the whole path from finding an object in the sky to interpreting the light a detector records. We cover sky coordinates, telescopes, parallax, spectra, image calibration, and noise—the practical steps that turn photons into evidence about the universe.',
    principles: 'Learn to translate between the catalogue address of a star and its position above your local horizon. Then see how a telescope gathers and focuses light, how spectra reveal motion and composition, and why images need calibration. We keep track of uncertainty so a measurement is not mistaken for an exact answer.',
    books: [
      'Fundamental Astronomy, Karttunen et al.: Ch. 1 “Introduction”; Ch. 2 “Spherical Astronomy”; Ch. 4 “Observations and Instruments”; Ch. 6 “Photometry and Magnitudes”; Ch. 7 “The Solar System” for observational applications.',
      'Carroll & Ostlie, An Introduction to Modern Astrophysics (Bobcat): Ch. 1 “Introduction”; Ch. 2 “Newtonian Mechanics”; Ch. 3 “Special Relativity”; Ch. 4 “Radiation and Matter”; Ch. 5 “The Tools of Astronomy”; Ch. 6 “The Sun as a Star” (confirm titles in your edition).',
      'Star Maps 101 / Star Charts 101 by Fahim Rajit Hossain Shwadhin: assign the chapters on spherical coordinates, naked-eye constellation identification, star maps, and sky navigation. Jyotirbigyaner Jotokichu chapters on the celestial sphere and foundations provide the Bengali-language bridge. Add regional observing/problem guides by Soumen Saha, Shajib Musthavi, or Ishtiaque Hossain Chowdhury.',
      'Ganitik Jotirbiggyan, Abu Saleh Mohammad Nuruzzaman: Geometry of the Celestial Sphere and Celestial Coordinates.'
    ],
    tools: 'Stellarium for coordinates, constellation identification, rise/set times, and sky planning; SkySafari for mobile observing lists, telescope control, and time simulation; Aladin Sky Atlas for survey images, catalogues, and multi-band observation.'
  },
]

export default function NotesPage() {
  return (
    <>
      <SiteHeader />
      <NotesLibrary syllabus={syllabus} />
    </>
  )
}
