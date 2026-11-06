export type AstronomySubject = {
  title: string
  slug: string
  number: string
  description: string
  coverage: string
  principles: string
  books: string[]
  tools: string
}

export const astronomySubjects: AstronomySubject[] = [
  {
    title: 'Stellar Astronomy',
    slug: 'stellar-astronomy',
    number: '01',
    description: 'How stars form, shine, evolve, interact, and end as white dwarfs, neutron stars, or black holes.',
    coverage: 'Connect observation to stellar physics: radiation, spectra, stellar structure, energy generation, stellar populations, binary systems, and evolution. Learn how mass shapes a star’s temperature and lifetime, and how observations reveal interiors we cannot see.',
    principles: 'Build from blackbody radiation and stellar magnitudes to hydrostatic equilibrium, nuclear reaction chains, radiative transfer, convection, degeneracy pressure, the H–R diagram, and the mass–luminosity relation.',
    books: [
      'Fundamental Astronomy by Karttunen et al.: photometry, stellar spectra, binary stars, stellar structure, and stellar evolution.',
      'An Introduction to Modern Astrophysics by Carroll & Ostlie: radiation and matter, stellar atmospheres, interiors, evolution, and compact stars.',
      'For Olympiad practice, pair Bengali foundations in Jyotirbigyaner Jotokichu with regional stellar-physics problem sets.'
    ],
    tools: 'Use the UNL H–R Diagram Simulator to explore stellar tracks, Stellarium to identify stars and spectra, and Gaia Sky to examine nearby stellar populations.'
  },
  {
    title: 'Cosmology',
    slug: 'cosmology',
    number: '02',
    description: 'The origin, expansion, contents, geometry, history, and ultimate fate of the universe.',
    coverage: 'Study the universe as a physical system: its expansion history, thermal origin, large-scale structure, dark matter, dark energy, and observational limits. Connect redshift, the cosmic microwave background, and galaxy growth to the universe’s past and future.',
    principles: 'Master comoving and proper distance, scale factor, redshift, Hubble–Lemaître law, critical density, Friedmann dynamics, curvature, recombination, the CMB, primordial nucleosynthesis, and the growth of structure.',
    books: [
      'Fundamental Astronomy by Karttunen et al.: galaxies and cosmology.',
      'An Introduction to Modern Astrophysics by Carroll & Ostlie: cosmology, the early universe, and structure formation.',
      'Build foundations with Jyotirbigyaner Jotokichu, then practise redshift and Hubble-law problems from regional Olympiad texts.'
    ],
    tools: 'Explore expansion and gravity with Universe Sandbox, the cosmic distance scale with Mitaka, and the Milky Way’s local context with Gaia Sky.'
  },
  {
    title: 'Celestial Mechanics',
    slug: 'celestial-mechanics',
    number: '03',
    description: 'The mathematics and physics of orbits, trajectories, perturbations, tides, and dynamical systems.',
    coverage: 'Follow gravitational motion from two-body orbits to rotating frames, resonances, spacecraft transfers, tides, and many-body systems. Understand how energy and angular momentum constrain an orbit and how small perturbations accumulate.',
    principles: 'Work through Newtonian gravity, conservation laws, Keplerian elements, conic sections, vis-viva, orbital period, escape speed, perturbation theory, Lagrange points, tides, and resonance. Check limiting cases and dimensions as you solve.',
    books: [
      'Fundamental Astronomy by Karttunen et al.: celestial mechanics and Solar System dynamics.',
      'An Introduction to Modern Astrophysics by Carroll & Ostlie: Newtonian mechanics and Solar System applications.',
      'Use Jyotirbigyaner Jotokichu for foundations, then add regional Olympiad exercises on Kepler’s laws and orbital calculations.'
    ],
    tools: 'Model N-body gravity in Universe Sandbox, inspect real mission trajectories with NASA Eyes, and follow apparent planetary motion in Stellarium.'
  },
  {
    title: 'Galactic Astronomy',
    slug: 'galactic-astronomy',
    number: '04',
    description: 'The Milky Way and galaxies as evolving systems of stars, gas, dust, dark matter, and black holes.',
    coverage: 'Examine galaxy structure, stellar populations, the interstellar medium, star formation, active nuclei, mergers, and dark-matter haloes. Ask how the Milky Way is organised, how galaxies recycle gas, and how environment shapes their evolution.',
    principles: 'Learn rotation curves, velocity dispersion, virial reasoning, surface-brightness profiles, metallicity, extinction, star-formation tracers, the Tully–Fisher relation, black-hole scaling relations, and gravitational lensing.',
    books: [
      'Fundamental Astronomy by Karttunen et al.: the interstellar medium, star clusters, the Milky Way, and galaxies.',
      'An Introduction to Modern Astrophysics by Carroll & Ostlie: the Milky Way, normal galaxies, and active galaxies.',
      'Supplement with Bengali foundations in Jyotirbigyaner Jotokichu and regional deep-sky or Olympiad materials.'
    ],
    tools: 'Explore Milky Way structure in Gaia Sky, multi-wavelength surveys in Aladin Sky Atlas, and guided galaxy views in WorldWide Telescope.'
  },
  {
    title: 'Observational Astronomy',
    slug: 'observational-astronomy',
    number: '05',
    description: 'Turning photons into measurements: sky navigation, instruments, coordinates, photometry, spectroscopy, and uncertainty.',
    coverage: 'Build the practical language of astronomy: the celestial sphere, time systems, coordinates, telescope optics, detectors, seeing, calibration, photometry, spectroscopy, astrometry, and scientific inference. Learn how to extract reliable information from finite, noisy measurements.',
    principles: 'Practise altitude–azimuth and equatorial coordinates, right ascension and declination, sidereal time, airmass, angular resolution, signal-to-noise, magnitude systems, extinction, aperture photometry, spectral resolution, Doppler shift, and error propagation.',
    books: [
      'Fundamental Astronomy by Karttunen et al.: spherical astronomy, observations, instruments, photometry, and magnitudes.',
      'An Introduction to Modern Astrophysics by Carroll & Ostlie: the tools of astronomy, radiation, and observational methods.',
      'Use Star Maps 101 / Star Charts 101, Jyotirbigyaner Jotokichu, and Ganitik Jotirbiggyan for coordinate systems and sky navigation.'
    ],
    tools: 'Plan observations and test coordinates in Stellarium, build observing lists in SkySafari, and compare survey images in Aladin Sky Atlas.'
  }
]
