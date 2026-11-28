import type { DiagramKind } from '@/components/notes-illustrations'

export type InteractiveKind = 'orbit' | 'spectrum' | 'coordinates' | null

export type ChapterFigure = {
  kind: DiagramKind
  title: string
  caption: string
}

export type NoteChapter = {
  slug: string
  number: string
  title: string
  subtitle: string
  description: string
  readingTime: string
  references: { author: string; title: string; edition: string }[]
  heroFigure: ChapterFigure
  objectives: string[]
  layers: { name: string; description: string }[]
  steps: { title: string; body: string }[]
  sections: {
    id: string
    label: string
    title: string
    paragraphs: string[]
    figure: ChapterFigure
    takeaway: string
  }[]
  equations: { title: string; latex: string; variables: { symbol: string; meaning: string }[]; note?: string }[]
  comparison: {
    title: string
    left: { label: string; title: string; body: string; accent?: 'violet' | 'blue' | 'amber' }
    right: { label: string; title: string; body: string; accent?: 'violet' | 'blue' | 'amber' }
  }
  interactive: InteractiveKind
  interactiveTitle: string
  interactiveDescription: string
  example: { title: string; body: string; result: string }
  insight: string
  misconception: string
  summary: string[]
}

export const noteChapters: Record<string, NoteChapter> = {
  'celestial-mechanics': {
    slug: 'celestial-mechanics',
    number: '03',
    title: 'Celestial Mechanics',
    subtitle: 'Gravity writes the paths of worlds.',
    description: 'Learn why an orbit has its shape, why a planet speeds up near its star, and how energy helps predict whether an object will return or escape. Each idea builds from a labeled picture to the equation that describes it.',
    readingTime: '28 minute chapter',
    references: [
      { author: 'J. M. A. Danby', title: 'Fundamentals of Celestial Mechanics', edition: '2nd edition, 1988' },
      { author: 'R. R. Bate, D. D. Mueller & J. E. White', title: 'Fundamentals of Astrodynamics', edition: '1971' },
      { author: 'C. D. Murray & S. F. Dermott', title: 'Solar System Dynamics', edition: '1999' },
    ],
    heroFigure: {
      kind: 'orbit',
      title: 'An ellipse is a complete physical description',
      caption: 'The central body occupies one focus. The nearest and farthest orbital distances are set by the semi-major axis and eccentricity.',
    },
    objectives: [
      'Identify the focus, semi-major axis, eccentricity, periapsis, and apoapsis of an orbit.',
      'Connect Kepler’s laws to conservation of angular momentum and orbital energy.',
      'Use vis-viva and the period law to compare real orbital systems.',
      'Distinguish ideal two-body conics from practical transfer-orbit approximations.',
    ],
    layers: [
      { name: 'Foundation', description: 'Recognize conic orbits and the quantities that define them.' },
      { name: 'Understanding', description: 'Use equal areas, energy, and the two-body period relation.' },
      { name: 'Olympiad insight', description: 'Choose a conserved quantity before reaching for a long calculation.' },
    ],
    steps: [
      { title: 'Find the focus and centre', body: 'The central star sits at a focus, not at the ellipse’s centre. The semi-major axis a is measured from the centre to an end of the long axis; it is not the star-to-planet distance.' },
      { title: 'Separate size from shape', body: 'The semi-major axis sets the orbit’s overall size. Eccentricity e describes how stretched it is: e = 0 is a circle, while 0 < e < 1 is an ellipse.' },
      { title: 'Compare near and far', body: 'At the closest and farthest points, the planet briefly has no motion toward or away from the star. It is still moving sideways—and it moves fastest at the closest point.' },
    ],
    sections: [
      {
        id: 'kepler-laws', label: '01 / Kepler’s laws', title: 'Equal areas reveal changing speed',
        paragraphs: [
          'Kepler’s first law says that an ideal planet follows an ellipse with the Sun at one focus. His second law tells us how quickly the planet moves along that ellipse: imagine drawing a line from the Sun to the planet. In equal time intervals, that line sweeps out equal areas.',
          'Think of each shaded wedge as a short time slice. Near perihelion the planet is close to the Sun, so it must travel through a wider angle to sweep the same area. Near aphelion it is farther away, so it moves through a smaller angle and travels more slowly. This is angular momentum conservation shown as geometry.',
        ],
        figure: { kind: 'kepler-area', title: 'Same time, same swept area', caption: 'The near-periapsis wedge is narrow in radius but wide in angle; the far wedge is long and thin. Their areas represent equal time intervals.' },
        takeaway: 'If the force is central, torque about the focus is zero and angular momentum is conserved.',
      },
      {
        id: 'kepler-periods', label: '02 / Kepler’s third law', title: 'Orbit size sets the period',
        paragraphs: [
          'The semi-major axis is the orbit’s size, and the period P is the time for one complete revolution. Kepler’s third law says P² grows with a³ when the system’s total mass stays the same. A planet twice as far out in semi-major-axis terms therefore takes about 2.8 times as long to orbit—not merely twice as long.',
          'For objects orbiting the Sun, years and astronomical units make the calculation especially simple: to a good approximation, P² = a³ when P is in years and a is in AU. This shortcut assumes the Sun dominates the system’s mass; the general two-body equation includes both masses.',
        ],
        figure: { kind: 'kepler-period', title: 'A wider orbit takes much longer', caption: 'For circular orbits around the same central mass, doubling the radius multiplies the period by 2√2, not by two.' },
        takeaway: 'The period depends on a³ and total mass; eccentricity does not change it when those quantities are fixed.',
      },
      {
        id: 'orbital-energy', label: '03 / Energy', title: 'Energy decides whether an orbit is bound',
        paragraphs: [
          'In an isolated two-body model, orbital energy stays the same throughout the journey. Its sign tells you the broad outcome: negative energy means a bound ellipse that returns; zero is the exact escape boundary, a parabola; positive energy means the object arrives with excess energy and follows a hyperbola.',
          'The vis-viva equation is a speed calculator for a known orbit: give it the object’s current distance r and the orbit’s semi-major axis a. As the object falls inward, gravity converts some potential energy into kinetic energy, so its speed rises. The energy levels in the figure are constant values, not a curve of energy changing with distance.',
        ],
        figure: { kind: 'orbital-energy', title: 'Three energy regimes', caption: 'The diagram classifies an ideal two-body orbit by its constant specific energy: negative for an ellipse, zero for a parabola, and positive for a hyperbola. Levels are qualitative, not to scale.' },
        takeaway: 'A larger speed at the same distance means larger orbital energy; reaching escape requires the specific energy to reach zero.',
      },
      {
        id: 'two-body-systems', label: '04 / Two-body systems', title: 'Both bodies move around a barycentre',
        paragraphs: [
          'Two gravitating bodies do not have one fixed body and one moving body: both orbit their shared centre of mass, called the barycentre. The heavier body stays closer to it, while the lighter body travels on a larger orbit. For a circular binary, those paths are circles; for an elliptical binary, the barycentre is a focus of each path.',
          'If one mass is tiny compared with the other, the barycentre lies very close to the heavier body, which is why the planet-around-the-Sun picture works so well. In a binary star, both masses matter. Measure their orbital period and separation, and Kepler’s law gives the total mass; the separate motions give each star’s share.',
        ],
        figure: { kind: 'binary-stars', title: 'A binary is one gravitational system', caption: 'Both stars orbit the barycentre. Spectroscopic line shifts reveal the line-of-sight part of their motion.' },
        takeaway: 'Use the total mass in Kepler’s third law for the relative orbit; do not silently treat both bodies as massless test particles.',
      },
      {
        id: 'conic-orbits', label: '05 / Orbit families', title: 'The sign of orbital energy separates return from escape',
        paragraphs: [
          'With only two bodies and an inverse-square gravitational force, the relative path is one of three conic sections: an ellipse when ε < 0, a parabola when ε = 0, or a hyperbola when ε > 0. Here ε = v²/2 − μ/r is energy per unit reduced mass, and μ = G(M₁ + M₂). The diagram groups paths by this energy sign; it does not show the path’s distance or shape.',
          'Eccentricity gives the shape more precisely: circles and ellipses have 0 ≤ e < 1, a parabola has e = 1, and a hyperbola has e > 1. Real planets are also pulled by other bodies. An “osculating orbit” is the ideal conic that best matches a planet’s position and velocity at one moment; it slowly changes as those extra pulls act.',
        ],
        figure: { kind: 'orbital-energy', title: 'Energy classifies an ideal two-body trajectory', caption: 'Specific energy stays constant along each ideal orbit. Real planetary perturbations slowly change an object’s osculating orbital elements.' },
        takeaway: 'Begin with the two-body conic, then add perturbations only when the accuracy or timescale requires them.',
      },
      {
        id: 'hohmann-transfer', label: '06 / Transfer orbits', title: 'A Hohmann transfer trades time for fuel',
        paragraphs: [
          'To move from one circular orbit to a higher one, an ideal Hohmann transfer uses half of an ellipse that just touches both circles. At the lower orbit, a short forward burn places the spacecraft on the transfer ellipse. It then coasts for half an ellipse; a second burn at the far end matches the higher circular orbit.',
          'The two burns change velocity; the coast between them uses no continuous thrust in this ideal model. For coplanar circular start and finish orbits, the Hohmann path minimizes the total velocity change among two-impulse transfers. Real missions must also account for launch timing, inclination, finite engine burns, and other planets’ gravity.',
        ],
        figure: { kind: 'transfer-orbit', title: 'Two tangential impulses connect circular orbits', caption: 'The central body lies at one focus of the transfer ellipse. Orbit sizes and burn vectors are schematic; the circles are coplanar and circular.' },
        takeaway: 'Use vis-viva to find transfer speed at each apsis, then subtract the local circular speed to get each impulse.',
      },
    ],
    equations: [
      {
        title: 'Vis-viva equation', latex: 'v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)',
        variables: [
          { symbol: 'v', meaning: 'orbital speed at distance r' },
          { symbol: 'G', meaning: 'Newtonian gravitational constant' },
          { symbol: 'M', meaning: 'central mass when the orbiting body is much lighter' },
          { symbol: 'r', meaning: 'instantaneous distance from the focus' },
          { symbol: 'a', meaning: 'semi-major axis of the ellipse' },
        ],
        note: 'For two comparable masses, use their total mass in the relative-orbit form.',
      },
      {
        title: 'Kepler’s third law for two masses', latex: 'P^2 = \\frac{4\\pi^2 a^3}{G(M_1+M_2)}',
        variables: [
          { symbol: 'P', meaning: 'orbital period' },
          { symbol: 'a', meaning: 'semi-major axis of the relative orbit' },
          { symbol: 'M₁, M₂', meaning: 'the two orbiting masses' },
          { symbol: 'G', meaning: 'Newtonian gravitational constant' },
        ],
        note: 'For Solar-System bodies around the Sun, the planet mass is often negligible compared with the Sun’s.',
      },
      {
        title: 'Specific orbital energy', latex: '\\varepsilon = \\frac{v^2}{2} - \\frac{\\mu}{r}',
        variables: [
          { symbol: 'ε', meaning: 'orbital energy per unit reduced mass in the relative two-body problem' },
          { symbol: 'v', meaning: 'relative speed of the two bodies' },
          { symbol: 'μ', meaning: 'G(M₁ + M₂), the gravitational parameter' },
          { symbol: 'r', meaning: 'separation between the two bodies' },
        ],
        note: 'Its sign labels an ellipse, parabola, or hyperbola only for an ideal isolated two-body system.',
      },
      {
        title: 'Hohmann transfer between circular orbits', latex: '\\begin{aligned}a_t &= \\frac{r_1+r_2}{2} \\\\ \\Delta v_1 &= \\sqrt{\\mu\\left(\\frac{2}{r_1}-\\frac{1}{a_t}\\right)}-\\sqrt{\\frac{\\mu}{r_1}} \\\\ \\Delta v_2 &= \\sqrt{\\frac{\\mu}{r_2}}-\\sqrt{\\mu\\left(\\frac{2}{r_2}-\\frac{1}{a_t}\\right)} \\\\ t_H &= \\pi\\sqrt{\\frac{a_t^3}{\\mu}} \\end{aligned}',
        variables: [
          { symbol: 'r₁, r₂', meaning: 'initial and final circular-orbit radii, with r₂ > r₁' },
          { symbol: 'aₜ', meaning: 'semi-major axis of the transfer ellipse' },
          { symbol: 'Δv₁, Δv₂', meaning: 'ideal tangential velocity changes at departure and arrival' },
          { symbol: 'μ', meaning: 'gravitational parameter of the central body' },
          { symbol: 'tH', meaning: 'half-period coast time along the transfer ellipse' },
        ],
        note: 'Assumes coplanar circular endpoints, impulsive burns, and a two-body central field.',
      },
      {
        title: 'Escape speed from radius r', latex: 'v_{\\mathrm{esc}} = \\sqrt{\\frac{2GM}{r}}',
        variables: [
          { symbol: 'vesc', meaning: 'minimum launch speed for zero total energy, neglecting atmosphere and later propulsion' },
          { symbol: 'G', meaning: 'Newtonian gravitational constant' },
          { symbol: 'M', meaning: 'mass of the attracting body' },
          { symbol: 'r', meaning: 'distance from the body’s centre' },
        ],
        note: 'Escape speed is a local threshold; it is not the speed required to reach a particular orbit or destination.',
      },
    ],
    comparison: {
      title: 'Choose the conserved quantity that fits the question',
      left: { label: 'Angular momentum', title: 'Where is the body moving fastest?', body: 'Use equal areas or h = r × v. It compares speed at different points without solving the full orbit.', accent: 'blue' },
      right: { label: 'Orbital energy', title: 'Is the body bound or escaping?', body: 'Use total specific energy. Its sign identifies an ellipse, parabolic escape, or hyperbolic flyby.', accent: 'amber' },
    },
    interactive: 'orbit',
    interactiveTitle: 'Change the orbit, watch the motion change',
    interactiveDescription: 'Adjust eccentricity and viewing inclination. The drawing is a projected Kepler ellipse; the speed ratio is calculated from angular-momentum conservation.',
    example: { title: 'Earth around the Sun', body: 'Earth’s orbit is nearly circular: a ≈ 1 AU and e ≈ 0.017. At perihelion and aphelion, angular momentum gives rₚvₚ = rₐvₐ. Using rₚ = a(1 − e) and rₐ = a(1 + e), the speed ratio is vₚ/vₐ = (1 + e)/(1 − e).', result: 'For Earth, vₚ/vₐ ≈ 1.035: Earth moves about 3.5% faster at perihelion than at aphelion.' },
    insight: 'In a two-body problem, the semi-major axis determines the period; eccentricity changes the shape and speed distribution, not the period when a and total mass are fixed.',
    misconception: 'A planet does not move fastest because it is “pulled forward” at perihelion. It is fastest there because conserved angular momentum requires a larger transverse speed at smaller radius.',
    summary: [
      'The semi-major axis measures an orbit’s size from its geometric centre; eccentricity measures how stretched it is. In the Sun-centred diagram, the Sun sits at a focus.',
      'A planet moves faster when it is closer to the Sun. Equal areas swept in equal times are the picture-version of angular-momentum conservation.',
      'For an ideal two-body orbit, negative, zero, and positive orbital energy correspond to an ellipse, a parabolic escape path, and a hyperbolic flyby. State the model assumptions before using these results.',
    ],
  },
  'stellar-astronomy': {
    slug: 'stellar-astronomy',
    number: '01',
    title: 'Stellar Astronomy',
    subtitle: 'A star is a spectrum with a life story.',
    description: 'Learn how astronomers turn a star’s light into clues about its temperature, size, and life story. Start with the spectrum, place the star on the H–R diagram, then connect its mass to how it lives and dies.',
    readingTime: '30 minute chapter',
    references: [
      { author: 'B. W. Carroll & D. A. Ostlie', title: 'An Introduction to Modern Astrophysics', edition: '2nd edition, 2017' },
      { author: 'R. Kippenhahn, A. Weigert & A. Weiss', title: 'Stellar Structure and Evolution', edition: '2nd edition, 2012' },
    ],
    heroFigure: { kind: 'hr-diagram', title: 'The H–R diagram is a map of stellar physics', caption: 'Temperature decreases to the right; luminosity rises upward. Stars gather in regions because their structure and energy transport are constrained by physics.' },
    objectives: [
      'Interpret temperature, luminosity, radius, and spectral class together.',
      'Connect a star’s spectrum to blackbody radiation and line diagnostics.',
      'Explain how initial mass controls stellar evolution and compact remnants.',
      'Read spectral classes and luminosity classes as related but distinct evidence.',
      'Describe hydrostatic support and the transport of energy through a star.',
    ],
    layers: [
      { name: 'Foundation', description: 'Read the axes and recognize the main sequence, giants, and white dwarfs.' },
      { name: 'Understanding', description: 'Combine luminosity, radius, temperature, and spectra.' },
      { name: 'Olympiad insight', description: 'Use mass as the main control parameter—but state the regime of each scaling law.' },
    ],
    steps: [
      { title: 'Read the light', body: 'A spectrum spreads starlight by wavelength. Its smooth overall shape gives a temperature clue; narrow dark or bright lines reveal atoms and ions in the star’s atmosphere.' },
      { title: 'Separate what we see from what the star is', body: 'A telescope measures flux: how much light reaches us. If we also know the distance, we can infer luminosity: the star’s total power. Temperature and luminosity then let us estimate its radius.' },
      { title: 'Use the H–R diagram as a map', body: 'Plot luminosity upward and temperature decreasing to the right. The star’s region hints at its physical state and stage of life; the diagram is not a photograph of its interior.' },
    ],
    sections: [
      {
        id: 'stellar-radiation', label: '01 / Starlight', title: 'A spectrum carries temperature and composition',
        paragraphs: [
          'The smooth part of a star’s spectrum is often close to a blackbody curve: a useful model for how a warm object glows. A real star’s atmosphere adds dark absorption lines, because atoms and ions remove particular wavelengths. The curve’s peak gives a temperature estimate; the line pattern tells us which atoms are present and how strongly they are ionized.',
          'For the Sun, an effective temperature near 5,800 K puts the peak around 500 nm, in the visible range. A hotter star peaks at a shorter wavelength, but colour alone cannot tell us how powerful the star is. A small hot star can be less luminous than a much larger, cooler star.',
        ],
        figure: { kind: 'blackbody', title: 'Hotter blackbodies peak at shorter wavelengths', caption: 'These normalized Planck curves compare peak position. The curves are scaled independently, so their heights do not compare absolute stellar output.' },
        takeaway: 'Temperature shifts the spectrum; radius and temperature together set bolometric luminosity.',
      },
      {
        id: 'stellar-evolution', label: '02 / Evolution', title: 'Mass chooses the evolutionary route',
        paragraphs: [
          'A star begins when gravity pulls a cloud of gas inward. The forming object heats up; when its core can sustain hydrogen fusion, it settles onto the main sequence. Most stars spend most of their lives there. Later, changes in the core make the outer layers expand, so the star moves to a different region of the H–R diagram.',
          'A Sun-like star eventually releases its outer gas and leaves a compact white dwarf. A much more massive star can build an iron-rich core that collapses, producing a supernova and leaving a neutron star or black hole. These are broad paths, not a one-number rule: mass loss, composition, rotation, and a companion star can change the outcome.',
        ],
        figure: { kind: 'stellar-life-cycle', title: 'Two broad paths after the main sequence', caption: 'Both paths begin on the main sequence. The later outcome depends strongly on initial mass, mass loss, composition, rotation, and binary interaction; boundaries are not sharp.' },
        takeaway: 'Mass is the first-order control, while composition, rotation, and companions refine the outcome.',
      },
      {
        id: 'mass-luminosity', label: '03 / Mass and lifetime', title: 'A small mass difference can mean a large luminosity difference',
        paragraphs: [
          'For many ordinary main-sequence stars, more mass means a much brighter star. A heavier star’s core is hotter, so fusion uses fuel much faster. Across a limited range, astronomers summarize this trend with the rough rule L ∝ M³·⁵.',
          'A brighter star does not necessarily live longer, because it burns through its larger fuel supply even faster. Combining “fuel roughly follows mass” with “luminosity roughly follows mass to the 3.5 power” gives a rough lifetime t ∝ M⁻²·⁵. For example, doubling the mass gives an estimated lifetime around one-sixth as long. Treat this as an order-of-magnitude shortcut, not a rule for every star.',
        ],
        figure: { kind: 'mass-luminosity', title: 'Luminosity rises steeply along the main sequence', caption: 'Log–log sketch of the rough L ∝ M³·⁵ trend across a limited mass interval; detailed models bend away from a single power law.' },
        takeaway: 'State the stellar class and mass regime before applying a power-law shortcut.',
      },
      {
        id: 'binary-stars', label: '04 / Stellar masses', title: 'Binary motion gives a star its mass',
        paragraphs: [
          'In a binary, two stars orbit their shared centre of mass. If we can watch their positions change, measure their Doppler shifts, or see them eclipse one another, we can reconstruct parts of that orbit. The orbital period and separation give the total mass; how far each star moves from the centre of mass gives the individual masses.',
          'This is how astronomers test theories of stars: the motion gives a mass without relying on brightness. The mass–luminosity relation is a useful comparison for ordinary main-sequence stars, but it does not apply unchanged to giants, white dwarfs, or every mass range.',
        ],
        figure: { kind: 'binary-stars', title: 'Both stars orbit their barycentre', caption: 'This circular example uses a 2:1 mass ratio, so the more massive star follows the smaller orbit. Symbol sizes are illustrative, not to scale.' },
        takeaway: 'Dynamical masses from binaries calibrate stellar structure models and the mass–luminosity relation.',
      },
      {
        id: 'spectral-classification', label: '05 / Classification', title: 'A spectral type is a temperature sequence, not a ranking',
        paragraphs: [
          'The letters O–B–A–F–G–K–M are a temperature sequence, from hottest to coolest. Astronomers assign a spectral type by comparing many absorption lines, not by matching a star to one colour swatch. Different temperatures leave different atoms and ions in the right state to make visible lines.',
          'A second label describes luminosity class, which is related to a star’s size and surface gravity: class V means main sequence, while classes I–III include supergiants and giants. So “G2V” tells us more than “yellow”: it gives a temperature class and a luminosity class. Neither label alone gives the star’s distance or age.',
        ],
        figure: { kind: 'spectral-lines', title: 'Line patterns change with the conditions in a photosphere', caption: 'Illustrative line positions show how spectra are read; real classification uses calibrated standards and many blended features.' },
        takeaway: 'Read temperature and luminosity class together; neither one label gives mass, age, or distance by itself.',
      },
      {
        id: 'stellar-interiors', label: '06 / Stellar interiors', title: 'Pressure balances gravity while energy moves outward',
        paragraphs: [
          'A star does not collapse under its own weight because pressure inside pushes outward. In a stable star, the pressure changes with depth just enough to balance the inward pull of gravity; this balance is called hydrostatic equilibrium. Pressure, temperature, and density vary smoothly through the star rather than changing at hard shell boundaries.',
          'In today’s Sun, fusion releases energy in the core. That energy moves outward first mainly as radiation, then mainly through large-scale motion of hot gas near the surface. The diagram shows broad zones, not sharp walls. Other stars can have different transport zones because their masses and life stages differ.',
        ],
        figure: { kind: 'stellar-interior', title: 'A solar-type interior, drawn as nested working zones', caption: 'Approximate radial zones for the present Sun. Boundaries are gradual; massive stars can have convective cores and different envelope structures.' },
        takeaway: 'Interior models solve coupled structure equations; a single surface spectrum constrains them but does not reveal the interior directly.',
      },
    ],
    equations: [
      {
        title: 'Stefan–Boltzmann luminosity', latex: 'L = 4\\pi R^2 \\sigma T_{\\mathrm{eff}}^4',
        variables: [
          { symbol: 'L', meaning: 'total radiant power emitted by the star' },
          { symbol: 'R', meaning: 'stellar radius' },
          { symbol: 'σ', meaning: 'Stefan–Boltzmann constant' },
          { symbol: 'Tₑff', meaning: 'effective surface temperature' },
        ],
        note: 'At fixed temperature, doubling the radius multiplies luminosity by four.',
      },
      {
        title: 'Wien displacement law', latex: '\\lambda_{\\max} T = 2.898 \\times 10^6 \\; \\mathrm{nm\\,K}',
        variables: [
          { symbol: 'λmax', meaning: 'wavelength of the blackbody peak' },
          { symbol: 'T', meaning: 'blackbody temperature in kelvin' },
        ],
        note: 'Use a consistent wavelength unit; 2.898 × 10⁶ nm K is the same constant as 2.898 × 10⁻³ m K.',
      },
      {
        title: 'Approximate main-sequence scaling', latex: 'L \\propto M^{3.5}',
        variables: [
          { symbol: 'L', meaning: 'main-sequence luminosity' },
          { symbol: 'M', meaning: 'stellar mass' },
        ],
        note: 'This rough power law is useful for order-of-magnitude Olympiad estimates across a limited mass interval.',
      },
      {
        title: 'Main-sequence lifetime estimate', latex: 't_{\\mathrm{MS}} \\propto \\frac{M}{L} \\propto M^{-2.5}',
        variables: [
          { symbol: 'tMS', meaning: 'approximate time spent fusing hydrogen on the main sequence' },
          { symbol: 'M', meaning: 'stellar mass and rough fuel reservoir' },
          { symbol: 'L', meaning: 'luminosity, or rate of energy use' },
        ],
        note: 'The exponent follows from the approximate L ∝ M³·⁵ relation and is not valid for every stellar mass or evolutionary state.',
      },
      {
        title: 'Hydrostatic equilibrium', latex: '\\frac{dP}{dr} = -\\frac{G M_r \\rho}{r^2}',
        variables: [
          { symbol: 'P', meaning: 'pressure at radius r' },
          { symbol: 'Mᵣ', meaning: 'mass enclosed within radius r' },
          { symbol: 'ρ', meaning: 'local density' },
          { symbol: 'G', meaning: 'Newtonian gravitational constant' },
        ],
        note: 'One of the stellar-structure equations; a full model also needs mass conservation, energy generation, transport, and an equation of state.',
      },
      {
        title: 'Distance modulus', latex: 'm-M = 5\\log_{10}\\left(\\frac{d}{10\\,\\mathrm{pc}}\\right)',
        variables: [
          { symbol: 'm', meaning: 'apparent magnitude measured at Earth' },
          { symbol: 'M', meaning: 'absolute magnitude at 10 parsecs' },
          { symbol: 'd', meaning: 'distance in parsecs' },
        ],
        note: 'This form assumes extinction has been corrected; dust absorption makes a source appear fainter.',
      },
    ],
    comparison: {
      title: 'Two branches of the H–R diagram, two different physical states',
      left: { label: 'Main sequence', title: 'Core hydrogen fusion', body: 'Hydrostatic equilibrium is maintained while hydrogen fusion supplies energy. Mass strongly influences luminosity and lifetime.', accent: 'blue' },
      right: { label: 'White dwarf', title: 'Supported by electron degeneracy', body: 'A compact stellar remnant radiates stored heat. It is hot but faint because its emitting surface area is small.', accent: 'violet' },
    },
    interactive: 'spectrum',
    interactiveTitle: 'Slide the temperature; watch the peak move',
    interactiveDescription: 'A normalized Planck curve updates with temperature. The peak wavelength follows Wien’s displacement law; the visualization isolates shape rather than absolute luminosity.',
    example: { title: 'The Sun as a calibration point', body: 'The Sun has an effective temperature near 5,780 K. Wien’s law says the peak wavelength is 2.898 × 10⁶ nm K ÷ T, so the peak is about 500 nm. Its luminosity and temperature together imply a radius close to one solar radius.', result: 'The peak is in the green part of the spectrum, but sunlight contains every visible colour; the peak wavelength is not the only colour the Sun emits.' },
    insight: 'A star’s location on the H–R diagram is not a unique age label. Evolutionary tracks can cross, and population, composition, and binary history matter.',
    misconception: 'A blue star is not necessarily more luminous than every red star. Blue indicates a hotter surface; luminosity also depends on radius and distance affects observed brightness.',
    summary: [
      'A spectrum gives clues about temperature and composition, but observed brightness also depends on distance. Luminosity is the star’s actual total output.',
      'On an H–R diagram, temperature decreases to the right and luminosity increases upward. A star’s location suggests its state; it is not a direct picture of the star or a unique age label.',
      'Mass strongly shapes a star’s brightness, lifetime, and final state. Use scaling laws as approximations, and remember that binaries let astronomers measure stellar masses from motion.',
    ],
  },
  cosmology: {
    slug: 'cosmology',
    number: '02',
    title: 'Cosmology',
    subtitle: 'Measure the universe by how it changes.',
    description: 'Follow three kinds of evidence—the stretching of light, the afterglow of the early universe, and distance measurements—to understand how the universe changes. We separate what astronomers measure from what a model helps them infer.',
    readingTime: '29 minute chapter',
    references: [
      { author: 'Barbara Ryden', title: 'Introduction to Cosmology', edition: '2nd edition, 2017' },
      { author: 'Scott Dodelson', title: 'Modern Cosmology', edition: '2003' },
    ],
    heroFigure: { kind: 'cosmic-expansion', title: 'Expansion changes separations, not the coordinate labels', caption: 'Comoving markers stay fixed in the expanding coordinate grid while their proper separations scale with a(t). The grid has no preferred centre.' },
    objectives: [
      'Distinguish redshift, scale factor, proper distance, and comoving distance.',
      'Explain how the CMB and distance ladder constrain cosmic history.',
      'Use the low-redshift Hubble–Lemaître law with its assumptions stated.',
      'Explain why the expansion rate changes as radiation, matter, and dark energy dominate.',
      'Distinguish lookback time from comoving, luminosity, and angular-diameter distance.',
    ],
    layers: [
      { name: 'Foundation', description: 'Read redshift as a comparison between emitted and observed wavelength.' },
      { name: 'Understanding', description: 'Connect expansion, cosmic time, and the evidence from the CMB.' },
      { name: 'Olympiad insight', description: 'Check whether a formula is local, model-dependent, or valid at high redshift.' },
    ],
    steps: [
      { title: 'Compare one known line', body: 'Atoms make spectral lines at known wavelengths. Compare the wavelength measured in a distant galaxy with the same line measured in a laboratory; the shift is the redshift z.' },
      { title: 'Read what the shift means', body: 'For light stretched by cosmic expansion, 1 + z equals the scale factor today divided by the scale factor when the light was emitted. A larger z means the universe has expanded more since then.' },
      { title: 'Add a distance method', body: 'A redshift alone is not a distance. Astronomers calibrate objects of known brightness or size, then combine those distances with redshifts to trace how expansion has changed.' },
    ],
    sections: [
      {
        id: 'cosmological-redshift', label: '01 / Redshift', title: 'Wavelength stretches with cosmic expansion',
        paragraphs: [
          'Redshift measures how much a spectral feature has shifted: z = (observed wavelength − emitted wavelength) ÷ emitted wavelength. If a line emitted at 500 nm reaches us at 1,000 nm, then z = 1: the wavelength doubled. In the standard expanding-universe model, this also means the scale factor doubled while that light was travelling.',
          'For nearby galaxies, the small-redshift approximation connects redshift to recession speed. Farther away, “cz” is not an exact speed through space. To infer distance or the time the light has travelled, astronomers use a model of the universe’s expansion history.',
        ],
        figure: { kind: 'redshift', title: 'A spectral ruler shifts to longer wavelength', caption: 'The line pattern remains recognizable while its wavelengths stretch. Redshift is dimensionless and does not by itself give a unique distance.' },
        takeaway: 'Redshift is an observable; converting it to distance requires a model and cosmological parameters.',
      },
      {
        id: 'cosmic-history', label: '02 / Cosmic history', title: 'The CMB is an early-universe afterglow',
        paragraphs: [
          'The cosmic microwave background (CMB) is light left over from the hot early universe. For a long time, free electrons scattered light so often that the universe was opaque. When it cooled enough for electrons to join atomic nuclei, light could travel freely. We observe that ancient light today as microwaves, cooled to about 2.725 K.',
          'The CMB is not a photograph of the instant the universe began; it shows the universe when it first became transparent, about 380,000 years later. Tiny temperature differences in the map are clues to the early density variations that later grew into galaxies. Comparing the pattern with a cosmological model helps estimate the universe’s geometry and contents.'
        ],
        figure: { kind: 'cosmic-timeline', title: 'From a hot plasma to the first galaxies', caption: 'Recombination and CMB release occurred roughly 380,000 years after the Big Bang. Time intervals in the diagram are not drawn to scale.' },
        takeaway: 'Evidence for the hot Big Bang includes cosmic expansion, the CMB spectrum, and primordial light-element abundances.',
      },
      {
        id: 'distance-ladder', label: '03 / Distance ladder', title: 'No single ruler spans every cosmic scale',
        paragraphs: [
          'No single technique works at every distance. Parallax uses geometry for nearby stars. Cepheid stars brighten and fade in a predictable way, so their measured pulsation helps estimate their true brightness and distance. Type Ia supernovae extend the comparison to farther galaxies; redshift helps map the expansion on the largest scales.',
          'Each method is calibrated against measurements that work closer in, and every step brings uncertainty. Astronomers cross-check overlapping methods because a small calibration error near the bottom can affect every distance farther up. The “ladder” is really a network of checks, not a chain of perfect rulers.',
        ],
        figure: { kind: 'distance-ladder', title: 'A calibrated route from nearby stars to cosmic expansion', caption: 'The Hubble flow converts redshift to distance only after calibration. Methods overlap; this sketch is not a set of strict distance boundaries.' },
        takeaway: 'When a distance scale changes, ask which calibration or systematic uncertainty changed—not only the final number.',
      },
      {
        id: 'expansion-history', label: '04 / Expansion history', title: 'The expansion rate remembers what the universe contains',
        paragraphs: [
          'The Hubble parameter H(t) = ȧ/a tells us how quickly the scale factor is growing compared with its current size. It is an expansion rate, not one speed shared by every galaxy. As the universe expands, radiation thins faster than matter; a cosmological-constant contribution stays constant in the simplest standard model.',
          'Because the contents change in importance over time, the expansion rate also changes. A matter-only universe is a useful simplified exercise, but calculating accurate ages or great distances requires the full expansion history and measured cosmological parameters.',
        ],
        figure: { kind: 'cosmic-expansion', title: 'The same comoving grid expands at different rates', caption: 'Marker separations grow with scale factor; panel spacing is illustrative and does not encode the measured expansion history.' },
        takeaway: 'The Hubble constant H₀ is the present-day value of H(t), not a timeless constant of nature.',
      },
      {
        id: 'cosmic-distances', label: '05 / Cosmic distances', title: 'Light travel time is not the distance to a galaxy today',
        paragraphs: [
          'When we see a distant galaxy, we see light that left it in the past. The universe kept expanding while the light travelled, so the distance the light covered is not usually the same as the galaxy’s distance from us today. “How far?” can mean different things in cosmology.',
          'Lookback time asks how long the light has travelled. Comoving distance factors out cosmic expansion; proper distance asks how far apart two places are at a chosen cosmic time. Luminosity distance describes how faint an object looks, while angular-diameter distance connects its size to its apparent angle. These measures are close to one another only for nearby objects.',
        ],
        figure: { kind: 'cosmic-timeline', title: 'Light lets us look back in time', caption: 'This timeline marks when light was emitted, not the galaxy’s distance today. Turning redshift into time or distance requires an expansion model.' },
        takeaway: 'When someone quotes a cosmic distance, ask which distance definition and expansion model they mean.',
      },
    ],
    equations: [
      {
        title: 'Cosmological redshift', latex: '1+z = \\frac{\\lambda_{\\mathrm{obs}}}{\\lambda_{\\mathrm{emit}}} = \\frac{a_0}{a_{\\mathrm{emit}}}',
        variables: [
          { symbol: 'z', meaning: 'dimensionless redshift' },
          { symbol: 'λobs, λemit', meaning: 'observed and emitted wavelengths' },
          { symbol: 'a₀, aemit', meaning: 'scale factor at observation and emission' },
        ],
        note: 'The scale-factor relation assumes the standard homogeneous expanding-universe description.',
      },
      {
        title: 'Low-redshift Hubble–Lemaître law', latex: 'v \\approx H_0 d',
        variables: [
          { symbol: 'v', meaning: 'recession speed in the low-redshift approximation' },
          { symbol: 'H₀', meaning: 'present expansion rate (Hubble constant)' },
          { symbol: 'd', meaning: 'distance in the nearby, approximately linear regime' },
        ],
        note: 'Do not extrapolate this linear approximation unchanged to high redshift.',
      },
      {
        title: 'Expansion history in a matter–radiation–Λ model', latex: '\\frac{H^2(a)}{H_0^2} = \\Omega_r a^{-4} + \\Omega_m a^{-3} + \\Omega_k a^{-2} + \\Omega_\\Lambda',
        variables: [
          { symbol: 'H(a)', meaning: 'expansion rate when the scale factor is a' },
          { symbol: 'Ωr, Ωm', meaning: 'present radiation and matter density parameters' },
          { symbol: 'Ωk', meaning: 'curvature contribution in the Friedmann equation' },
          { symbol: 'ΩΛ', meaning: 'cosmological-constant density parameter' },
        ],
        note: 'Standard FLRW form with a₀ = 1 and the usual radiation, matter, curvature, and cosmological-constant components.',
      },
      {
        title: 'Comoving distance and lookback time', latex: '\\chi(z)=c\\int_0^z\\frac{dz\\prime}{H(z\\prime)}, \\qquad t_L(z)=\\int_0^z\\frac{dz\\prime}{(1+z\\prime)H(z\\prime)}',
        variables: [
          { symbol: 'χ(z)', meaning: 'radial comoving distance in a homogeneous model' },
          { symbol: 'tL(z)', meaning: 'elapsed cosmic time since the light was emitted' },
          { symbol: 'H(z)', meaning: 'expansion history, which must be specified' },
          { symbol: 'c', meaning: 'speed of light in vacuum' },
        ],
        note: 'These are different integrals of the same model history; curvature affects transverse distances derived from χ.',
      },
    ],
    comparison: {
      title: 'Two distance words, two different questions',
      left: { label: 'Comoving distance', title: 'Where is the object on the expanding grid?', body: 'It factors out the overall expansion. For ideal comoving objects it remains constant while the universe expands.', accent: 'blue' },
      right: { label: 'Proper distance', title: 'How far apart are they now?', body: 'At a chosen cosmic time, proper distance scales with the scale factor: Dproper = a(t) χ.', accent: 'amber' },
    },
    interactive: null,
    interactiveTitle: 'Track the evidence across cosmic time',
    interactiveDescription: 'Use the chapter figures to compare spectral shifts, the CMB epoch, and the calibration ladder. Each diagram states the assumptions needed to interpret it.',
    example: { title: 'A redshift you can calculate', body: 'Suppose a known spectral line was emitted at 500 nm and is observed at 1,000 nm. Then z = (1,000 − 500) / 500 = 1. In the standard expansion picture, 1 + z = a₀/aₑ, so the scale factor has doubled since the light was emitted.', result: 'This tells us how much the universe expanded, not a unique distance by itself. Distance and lookback time also depend on the expansion history.' },
    insight: 'A cosmological redshift is not a speedometer reading for a distant galaxy. At sufficiently large distances, recession in the expanding metric is not ordinary motion through static space.',
    misconception: 'The Big Bang was not an explosion from one point into pre-existing empty space. In the standard model, the early hot dense state was everywhere in the observable region.',
    summary: [
      'Redshift is a measured wavelength change. For distant galaxies, use a cosmological model—not a simple velocity conversion—to infer distance and lookback time.',
      'The CMB is ancient light from when the universe became transparent, about 380,000 years after the hot early beginning. Its small temperature patterns help test models of cosmic history.',
      'Cosmological distances are not all the same: name the measure, the redshift, and the model whenever you interpret a faraway object.',
    ],
  },
  'galactic-astronomy': {
    slug: 'galactic-astronomy',
    number: '04',
    title: 'Galactic Astronomy',
    subtitle: 'Galaxies are ecosystems of matter and light.',
    description: 'See a galaxy as a changing system of stars, gas, dust, and dark matter. Learn how astronomers use motion and bent light to infer mass that cannot be seen directly.',
    readingTime: '26 minute chapter',
    references: [
      { author: 'J. Binney & M. Merrifield', title: 'Galactic Astronomy', edition: '1998' },
      { author: 'L. S. Sparke & J. S. Gallagher III', title: 'Galaxies in the Universe: An Introduction', edition: '2nd edition, 2007' },
    ],
    heroFigure: { kind: 'galaxy-structure', title: 'A galaxy is more than its bright disk', caption: 'The Milky Way combines a stellar disk, central bulge, gas, and an extended halo. The halo boundary is a model-dependent concept, not a sharp luminous edge.' },
    objectives: [
      'Identify the major structural components of a spiral galaxy.',
      'Read a rotation curve as a measurement of enclosed gravitational mass.',
      'Explain how lensing and multi-wavelength observations reveal otherwise hidden structure.',
      'Relate stellar populations, gas, and dust to a galaxy’s formation history.',
      'Describe how star formation and stellar feedback recycle galactic material.',
    ],
    layers: [
      { name: 'Foundation', description: 'Recognize disks, bulges, spiral arms, and halos.' },
      { name: 'Understanding', description: 'Connect orbital speed to mass distribution and light tracers.' },
      { name: 'Olympiad insight', description: 'Distinguish what a curve measures from the model used to infer mass.' },
    ],
    steps: [
      { title: 'Notice what shines', body: 'A galaxy image shows light from stars and gas, shaped by dust and the wavelength of the camera. Brightness is useful evidence, but it is not a direct map of all the mass.' },
      { title: 'Measure how things move', body: 'Changes in spectral lines reveal motion toward or away from us; repeated images can reveal motion across the sky. These speeds show how strong the galaxy’s gravity must be.' },
      { title: 'Check with a second method', body: 'Rotation curves, gravitational lensing, and the motions of stars and satellite galaxies test different parts of the mass picture. Agreement between independent methods makes the inference stronger.' },
    ],
    sections: [
      {
        id: 'galaxy-structure', label: '01 / Structure', title: 'Read a galaxy in three dimensions',
        paragraphs: [
          'A spiral galaxy is not just its bright spiral arms. It can include a flattened disk of stars and gas, a central bulge or bar, and a much larger halo. Our Sun sits in the Milky Way’s disk, about 8 kiloparsecs (roughly 26,000 light-years) from the centre. The drawing is face-on and simplified; we see our own galaxy from inside its disk.',
          'Different kinds of light reveal different ingredients. Dust blocks some visible light but lets more infrared through; radio waves can trace cold gas; X-rays reveal very hot gas and energetic events. No single image shows everything in a galaxy.',
        ],
        figure: { kind: 'electromagnetic-spectrum', title: 'Different wavelengths reveal different components', caption: 'Radio, infrared, visible, ultraviolet, X-ray, and gamma-ray observations trace different physical processes and environments.' },
        takeaway: 'A galaxy image is a wavelength-dependent measurement, not a complete inventory of its matter.',
      },
      {
        id: 'rotation-curves', label: '02 / Rotation curves', title: 'The outer galaxy keeps moving quickly',
        paragraphs: [
          'Gas and stars orbit because gravity pulls inward while their sideways motion keeps them from falling straight in. In a simple spherical model, the speed at radius r depends on the mass inside that radius. If nearly all the mass sat near the centre, the outer speed would fall as distance increases—like planets moving farther from the Sun.',
          'Instead, many spiral galaxies keep nearly the same orbital speed far beyond their bright disks. In the simple model, a flat speed means the enclosed mass keeps increasing with radius. A large halo of dark matter is the leading explanation, but astronomers also measure gas and stars carefully and compare alternative models. The data are the speeds; the mass distribution is inferred from them.',
        ],
        figure: { kind: 'rotation-curve', title: 'Visible light alone predicts a falling curve', caption: 'The flat observed trend is the key evidence. Both curves are schematic and the inferred mass profile depends on geometry and assumptions.' },
        takeaway: 'The data are velocities; “dark matter” is an interpretation supported by multiple independent observations.',
      },
      {
        id: 'gravitational-lensing', label: '03 / Lensing', title: 'Gravity bends light as well as matter',
        paragraphs: [
          'Gravity affects light as well as stars. A massive foreground galaxy bends light from a more distant source. Depending on the alignment, we may see the background object stretched into an arc, made brighter, or split into several apparent images.',
          'Strong lensing produces obvious arcs or multiple images. Weak lensing is subtler: astronomers measure the tiny, shared distortions of many background galaxies. Both methods respond to the gravity of all the mass along the line of sight, including matter that emits little or no light.',
        ],
        figure: { kind: 'gravitational-lensing', title: 'One source, multiple apparent paths', caption: 'Two light paths bend around a foreground lens and reach the observer from different directions. The diagram is a simplified strong-lensing geometry.' },
        takeaway: 'Lensing provides a mass probe with systematics different from those of rotation curves.',
      },
      {
        id: 'stellar-populations', label: '04 / Stellar populations', title: 'A galaxy’s stars preserve different formation histories',
        paragraphs: [
          'Stars in a galaxy’s disk, bulge, and halo are not all alike. They differ in age, chemical makeup, and the paths they follow around the galaxy. Astronomers combine colour, spectra, and motion to sort these overlapping populations; no single measurement cleanly separates every group.',
          'The notation [Fe/H] compares a star’s iron abundance with the Sun’s on a logarithmic scale. Ratios such as [α/Fe] compare groups of elements and can hint at how quickly the star-forming gas was enriched. Dust and sample-selection effects complicate the story, so colour alone is not a reliable age measurement.',
        ],
        figure: { kind: 'hr-diagram', title: 'A colour–magnitude sequence is a population clue', caption: 'The H–R diagram is an idealized single-star reference; real galactic samples mix distances, extinction, binaries, and multiple ages.' },
        takeaway: 'Galactic archaeology is statistical: chemistry and kinematics together are stronger than either alone.',
      },
      {
        id: 'gas-and-feedback', label: '05 / Gas cycle', title: 'Stars return energy and elements to the interstellar medium',
        paragraphs: [
          'Stars form inside cold clouds of molecular gas. Their light and winds heat the surrounding gas; when some stars die, supernova explosions can push gas outward and spread newly made elements. Other gas cools and mixes back into clouds that may form another generation of stars.',
          'This exchange is called the gas cycle, but a galaxy is not a sealed tank: gas can flow in from its surroundings or leave in powerful outflows. Dividing the gas supply by the current star-formation rate gives a rough depletion time, not a countdown, because both the supply and the rate can change.',
        ],
        figure: { kind: 'galactic-cycle', title: 'A working cycle of gas, stars, and feedback', caption: 'A schematic of the baryonic cycle. The relative amounts and timescales vary widely between galaxies and across cosmic time.' },
        takeaway: 'Galaxies evolve through exchange between stars, gas, and their surroundings—not by passive stellar aging alone.',
      },
    ],
    equations: [
      {
        title: 'Circular speed in a spherical mass model', latex: 'v_c^2(r) = \\frac{G M(<r)}{r}',
        variables: [
          { symbol: 'vᶜ(r)', meaning: 'circular orbital speed at radius r' },
          { symbol: 'G', meaning: 'Newtonian gravitational constant' },
          { symbol: 'M(<r)', meaning: 'mass enclosed within radius r' },
          { symbol: 'r', meaning: 'distance from the system centre' },
        ],
        note: 'This compact form assumes spherical symmetry. A flattened galactic disk needs a more careful gravitational-potential calculation.',
      },
      {
        title: 'Mass estimate from an orbit', latex: 'M(<r) \\approx \\frac{v_c^2 r}{G}',
        variables: [
          { symbol: 'M(<r)', meaning: 'enclosed mass under the spherical approximation' },
          { symbol: 'vᶜ', meaning: 'measured circular speed' },
          { symbol: 'r', meaning: 'galactocentric radius' },
        ],
        note: 'A flat rotation curve implies M(<r) grows approximately in proportion to r in this simplified model.',
      },
      {
        title: 'Gas-depletion time', latex: 't_{\\mathrm{dep}} = \\frac{M_{\\mathrm{gas}}}{\\mathrm{SFR}}',
        variables: [
          { symbol: 'tdep', meaning: 'time to consume the measured gas reservoir at the current rate' },
          { symbol: 'Mgas', meaning: 'gas mass included in the chosen measurement' },
          { symbol: 'SFR', meaning: 'star-formation rate' },
        ],
        note: 'An instantaneous bookkeeping timescale; gas inflow, outflow, recycling, and changing star formation are omitted.',
      },
    ],
    comparison: {
      title: 'Three probes; different geometries and assumptions',
      left: { label: 'Rotation curves', title: 'Motion in a galaxy', body: 'Use gas and stellar velocities to infer the gravitational potential within the rotating system.', accent: 'blue' },
      right: { label: 'Gravitational lensing', title: 'Deflection of background light', body: 'Use distorted or magnified images to constrain projected mass along the line of sight.', accent: 'amber' },
    },
    interactive: null,
    interactiveTitle: 'Follow the evidence, not just the picture',
    interactiveDescription: 'Compare the galaxy’s luminous structure with the distinct signals from dynamics and lensing. The curves and ray paths are conceptual; measured analyses use survey data and uncertainty models.',
    example: { title: 'The Milky Way’s Solar neighbourhood', body: 'The Sun is about 8 kpc from the Galactic centre and orbits at roughly 220 km/s. In a spherical approximation, M(<r) ≈ v²r/G. Substituting those values gives about 9 × 10¹⁰ solar masses inside the Sun’s orbit.', result: 'This is an order-of-magnitude estimate, not the Milky Way’s total mass. It assumes a circular orbit and spherical mass distribution; a real galaxy has a flattened disk and needs a fuller model.' },
    insight: 'A flat rotation curve does not mean the galaxy’s density is constant. In the spherical approximation it suggests M(<r) ∝ r, which corresponds to a declining density profile.',
    misconception: 'Dark matter is not inferred only because it is invisible. The case combines galaxy dynamics, gravitational lensing, galaxy clusters, and cosmological evidence.',
    summary: [
      'A galaxy’s light shows stars, gas, and dust, but not every source of gravity. Observations at different wavelengths reveal different parts of the system.',
      'A rotation curve records how fast material orbits. In a simple spherical model, a flat outer curve means enclosed mass keeps growing with radius.',
      'Lensing and orbital motion are independent ways to test a galaxy’s total mass. Use their assumptions and uncertainties before deciding what the evidence implies.',
    ],
  },
  'observational-astronomy': {
    slug: 'observational-astronomy',
    number: '05',
    title: 'Observational Astronomy',
    subtitle: 'Every measurement begins with a direction.',
    description: 'Start by locating an object in the sky, then follow its light into a telescope and detector. See how careful measurements reveal distance, motion, and physical properties—and where uncertainty enters.',
    readingTime: '30 minute chapter',
    references: [
      { author: 'H. Karttunen et al.', title: 'Fundamental Astronomy', edition: '6th edition, 2017' },
      { author: 'Steve B. Howell', title: 'Handbook of CCD Astronomy', edition: '2nd edition, 2006' },
      { author: 'P. Léna, F. Lebrun & F. Mignard', title: 'Observational Astrophysics', edition: '3rd edition, 2012' },
    ],
    heroFigure: { kind: 'celestial-sphere', title: 'The celestial sphere turns directions into coordinates', caption: 'Right ascension and declination describe a direction in an equatorial frame; the local horizon frame changes with observer and time.' },
    objectives: [
      'Translate between equatorial and local horizon coordinates.',
      'Estimate a telescope’s light-gathering power and diffraction limit.',
      'Explain how parallax, photometry, and spectra yield physical measurements.',
      'Describe why bias, dark, and flat-field calibration are applied to detector images.',
      'Estimate when photon noise, sky background, or read noise limits a measurement.',
    ],
    layers: [
      { name: 'Foundation', description: 'Locate a target using a named coordinate frame and epoch.' },
      { name: 'Understanding', description: 'Connect sky geometry and instrument response to measured data.' },
      { name: 'Olympiad insight', description: 'State conventions, units, and uncertainty before transforming coordinates.' },
    ],
    steps: [
      { title: 'Choose a sky address', body: 'Right ascension and declination give a star’s catalogue address on the celestial sphere. Altitude and azimuth tell an observer where to point from one particular place on Earth.' },
      { title: 'Account for time and place', body: 'The local horizon changes as Earth turns. Hour angle is the difference between local sidereal time and a star’s right ascension; together with latitude and declination, it determines altitude.' },
      { title: 'Ask what the instrument can measure', body: 'Aperture and wavelength limit the detail a telescope can resolve. The atmosphere, detector noise, and calibration affect how trustworthy the final measurement is.' },
    ],
    sections: [
      {
        id: 'horizon-coordinates', label: '01 / Coordinates', title: 'The same star has two useful addresses',
        paragraphs: [
          'Right ascension (RA) is the east–west coordinate measured along the celestial equator from the vernal equinox; it is usually written in hours. Declination is the north–south angle from the equator. Together they give a catalogue position that does not depend on where you are standing.',
          'Altitude is how many degrees above your horizon an object appears. Azimuth is its direction around the horizon, measured from a chosen reference such as north. These local coordinates change as Earth turns. Hour angle = local sidereal time − right ascension, so it tells you how far the object is from crossing your local meridian.',
        ],
        figure: { kind: 'horizon-sky', title: 'Altitude and azimuth belong to the observer', caption: 'The side view shows altitude above the horizon; the top view shows azimuth around it. Here, azimuth is measured clockwise from north.' },
        takeaway: 'Always name the coordinate frame, reference direction, epoch, and azimuth convention.',
      },
      {
        id: 'telescope-optics', label: '02 / Telescopes', title: 'An aperture collects light and limits detail',
        paragraphs: [
          'A refractor bends light through an objective lens. A Newtonian reflector gathers light with a large primary mirror, then uses a small diagonal mirror to send it to the eyepiece. In either design, the main aperture is the opening that gathers light.',
          'Doubling the aperture diameter gives roughly four times the collecting area, so faint objects become easier to detect. It also makes the ideal diffraction blur smaller. But atmospheric turbulence, imperfect optics, focus, and detector sampling can hide that extra detail; adding magnification cannot recover detail the telescope never resolved.',
        ],
        figure: { kind: 'telescope-optics', title: 'Two optical paths, one job: form an image', caption: 'Idealized parallel rays show focal geometry. Secondary obstructions, lens aberrations, coatings, and atmosphere are not drawn.' },
        takeaway: 'Light-gathering area scales with D²; the Rayleigh angular scale scales roughly as λ/D.',
      },
      {
        id: 'parallax-distance', label: '03 / Parallax', title: 'A six-month baseline turns angle into distance',
        paragraphs: [
          'Take two pictures of a nearby star six months apart, when Earth is on opposite sides of its orbit. Against the much more distant background, the nearby star appears to shift back and forth. The full shift is 2p; the parallax angle p is half of it, measured using a 1-AU baseline.',
          'A parsec is the distance at which that 1-AU baseline subtends an angle of one arcsecond. This definition gives the handy relation d (parsecs) = 1 ÷ p (arcseconds). Very small or uncertain parallax angles make the inferred distance much less certain.',
        ],
        figure: { kind: 'parallax', title: 'A small angle carries a large distance', caption: 'The full Earth-to-Earth baseline is 2 AU; p is the half-angle from the 1 AU baseline. The geometry is greatly exaggerated.' },
        takeaway: 'For parallax in arcseconds and distance in parsecs, d = 1/p is the defining relation.',
      },
      {
        id: 'spectroscopy', label: '04 / Spectra', title: 'Spectral lines are fingerprints and motion tracers',
        paragraphs: [
          'Atoms and ions absorb or emit light at particular wavelengths, leaving a pattern of lines in a spectrum. Matching those lines to laboratory measurements reveals which elements are present. If familiar lines shift together, their wavelength change can show whether the source is moving toward or away from us.',
          'A spectrograph’s resolving power R = λ/Δλ tells us how close two wavelengths can be while still appearing separate. Higher resolution can reveal finer line detail, but it spreads the light out; enough photons, careful calibration, and a stable instrument are still essential.',
        ],
        figure: { kind: 'spectral-lines', title: 'The same transitions appear in absorption or emission', caption: 'Line positions identify transitions; their widths, depths, and shifts add information about temperature, pressure, composition, and motion.' },
        takeaway: 'A spectrum is a measurement with finite resolution, calibration, and signal-to-noise—not a perfect barcode.',
      },
      {
        id: 'image-calibration', label: '05 / Calibration', title: 'A science image is calibrated, not merely saved',
        paragraphs: [
          'A raw detector image is not just a picture of the sky. It also contains an electronic offset (bias), signal from heat inside the detector (dark current), and pixels that respond with slightly different sensitivity. Astronomers take separate calibration images to measure these patterns.',
          'Subtract a matching bias and dark signal, then divide by a normalized flat field to correct pixel-to-pixel response and uneven illumination. The correction only works when calibration frames match the observing setup. It cannot repair saturated pixels or remove every cosmic ray, so keep the raw data and record how each correction was made.',
        ],
        figure: { kind: 'detector-workflow', title: 'From detector counts to calibrated flux', caption: 'A simplified reduction sequence. Real pipelines also track masks, uncertainty arrays, non-linearity, cosmic rays, and astrometric solutions.' },
        takeaway: 'Keep the raw exposure and its calibration metadata; every correction carries assumptions and uncertainty.',
      },
      {
        id: 'signal-to-noise', label: '06 / Noise', title: 'More exposure helps, but not without limit',
        paragraphs: [
          'Light arrives as individual photons, so even a steady source gives slightly different counts from one exposure to the next. Sky glow, detector heat, and read noise add more uncertainty. When sky background dominates, taking four times as long gives about twice the signal-to-noise—not four times as much.',
          'Several shorter exposures can make it easier to reject cosmic-ray hits and avoid saturation. The trade-off is that reading the detector each time adds read noise. The best plan depends on the target, sky brightness, detector, and the measurement you need.',
        ],
        figure: { kind: 'signal-to-noise', title: 'The square-root return of longer exposure', caption: 'Illustrative sky-limited scaling with fixed source and background. Read noise, saturation, changing sky, and systematics are omitted.' },
        takeaway: 'State which noise term dominates before using a simple exposure-time scaling.',
      },
    ],
    equations: [
      {
        title: 'Altitude from equatorial coordinates', latex: '\\sin h = \\sin \\phi \\sin \\delta + \\cos \\phi \\cos \\delta \\cos H',
        variables: [
          { symbol: 'h', meaning: 'target altitude above the horizon' },
          { symbol: 'φ', meaning: 'observer latitude' },
          { symbol: 'δ', meaning: 'target declination' },
          { symbol: 'H', meaning: 'hour angle, LST − right ascension' },
        ],
        note: 'Use consistent angular units. The formula gives altitude; azimuth requires a second relation and a stated convention.',
      },
      {
        title: 'Rayleigh diffraction limit', latex: '\\theta_R \\approx 1.22 \\frac{\\lambda}{D}',
        variables: [
          { symbol: 'θR', meaning: 'angular separation at the Rayleigh criterion, in radians' },
          { symbol: 'λ', meaning: 'observing wavelength' },
          { symbol: 'D', meaning: 'diameter of a circular aperture' },
        ],
        note: 'This is an ideal diffraction limit. Atmospheric seeing and instrument effects often dominate ground-based images.',
      },
      {
        title: 'Trigonometric parallax', latex: 'd\\; (\\mathrm{pc}) = \\frac{1}{p\\; (\\mathrm{arcsec})}',
        variables: [
          { symbol: 'd', meaning: 'distance in parsecs' },
          { symbol: 'p', meaning: 'annual parallax angle in arcseconds' },
        ],
        note: 'This inverse relation follows from the parsec definition; uncertainty becomes strongly non-linear for very small parallaxes.',
      },
      {
        title: 'Bias, dark, and flat-field correction', latex: 'I_{\\mathrm{cal}} = \\frac{I_{\\mathrm{raw}} - B - tD}{F}',
        variables: [
          { symbol: 'Iraw', meaning: 'raw detector value at each pixel' },
          { symbol: 'B', meaning: 'measured electronic bias map' },
          { symbol: 'D', meaning: 'dark-current rate, in detector counts per pixel per unit time' },
          { symbol: 'F', meaning: 'normalized flat-field response map' },
          { symbol: 't', meaning: 'science exposure time' },
        ],
        note: 'Assumes a linear detector and a dark-current rate measured with bias removed; practical pipelines propagate uncertainty and masks too.',
      },
      {
        title: 'Photon-counting signal-to-noise', latex: '\\mathrm{SNR} = \\frac{S}{\\sqrt{S + N_{\\mathrm{sky}} + n_{\\mathrm{pix}}(Dt + \\sigma_R^2)}}',
        variables: [
          { symbol: 'S', meaning: 'source electrons summed over the photometric aperture' },
          { symbol: 'Nsky', meaning: 'sky-background electrons summed over that aperture' },
          { symbol: 'npix', meaning: 'number of pixels in the aperture' },
          { symbol: 'D t', meaning: 'dark-current electrons per pixel during the exposure' },
          { symbol: 'σR', meaning: 'read noise per pixel, in electrons RMS' },
        ],
        note: 'Independent Poisson and read-noise terms are combined in quadrature; calibration and systematic errors are not included.',
      },
      {
        title: 'Magnitude difference', latex: 'm_1-m_2=-2.5\\log_{10}\\left(\\frac{F_1}{F_2}\\right)',
        variables: [
          { symbol: 'm₁, m₂', meaning: 'magnitudes in the same photometric band and system' },
          { symbol: 'F₁, F₂', meaning: 'measured fluxes after consistent calibration' },
        ],
        note: 'The logarithmic magnitude scale runs backward: a brighter source has a smaller magnitude.',
      },
    ],
    comparison: {
      title: 'Two coordinate frames answer different observing questions',
      left: { label: 'Equatorial', title: 'Where is it in the sky catalogue?', body: 'Right ascension and declination are global celestial coordinates, with epoch and precession conventions supplied.', accent: 'blue' },
      right: { label: 'Horizontal', title: 'Where is it above my horizon now?', body: 'Altitude and azimuth depend on observer location and time. They are ideal for pointing but change continuously.', accent: 'amber' },
    },
    interactive: 'coordinates',
    interactiveTitle: 'Move the observer and the hour angle',
    interactiveDescription: 'Adjust latitude, target declination, and hour angle. The explorer evaluates the spherical-trigonometry formula and plots the target in a local, equidistant sky-dome projection.',
    example: { title: 'Finding a star’s altitude', body: 'At latitude φ = 40° N, a target at δ = +20° on the meridian has H = 0. Substituting gives h = 90° − |φ − δ| = 70°.', result: 'The star culminates 70° above the southern horizon (for this northern observer and declination). Polaris is a useful near-pole check: its altitude is approximately the observer’s latitude.' },
    insight: 'A sidereal day is about 23 h 56 min of mean solar time because Earth advances along its orbit while rotating. That is why stars cross the meridian roughly four minutes earlier each solar day.',
    misconception: 'A telescope’s magnification is not its resolving power. A larger aperture improves light collection and the diffraction limit; seeing and contrast determine how much of that theoretical detail is usable.',
    summary: [
      'Equatorial coordinates give a catalogue position. Altitude and azimuth give an object’s changing position above a particular observer’s horizon.',
      'A larger telescope aperture gathers more light and can resolve finer detail, but atmosphere, optics, and detector noise can limit the result.',
      'Parallax, spectra, and calibrated images turn light into measurements. Every result depends on the instrument, the observing conditions, and the uncertainty.',
    ],
  },
}
