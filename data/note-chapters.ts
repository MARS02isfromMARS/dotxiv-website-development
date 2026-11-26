import type { DiagramKind } from '@/components/notes-illustrations'

export type InteractiveKind = 'orbit' | 'spectrum' | 'coordinates' | null

export type ChapterFigure = {
  kind: DiagramKind
  title: string
  caption: string
}

export type ChapterQuestion = {
  prompt: string
  options: string[]
  answer: number
  explanation: string
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
  questions: ChapterQuestion[]
}

export const noteChapters: Record<string, NoteChapter> = {
  'celestial-mechanics': {
    slug: 'celestial-mechanics',
    number: '03',
    title: 'Celestial Mechanics',
    subtitle: 'Gravity writes the paths of worlds.',
    description: 'Read an orbit as geometry, energy, and angular momentum working together. Build from Kepler’s laws to the two-body problem, then test how eccentricity changes a body’s speed and path.',
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
      { title: 'Locate the focus', body: 'For a planet orbiting a much more massive star, place the star at one focus—not at the geometric centre of the ellipse.' },
      { title: 'Measure the shape', body: 'The semi-major axis a sets the orbit’s scale. Eccentricity e sets its shape: a circle has e = 0; a bound ellipse has 0 ≤ e < 1.' },
      { title: 'Read the turning points', body: 'At periapsis and apoapsis the radial speed is zero. Angular momentum still requires the body to move fastest at periapsis.' },
    ],
    sections: [
      {
        id: 'kepler-laws', label: '01 / Kepler’s laws', title: 'Equal areas reveal changing speed',
        paragraphs: [
          'Kepler’s first law describes the orbit; his second law describes how motion proceeds along it. A line from the central body to the orbiting body sweeps equal areas in equal times.',
          'This is the geometrical form of angular-momentum conservation. Near periapsis the radius is short, so the body must sweep a wider angle in the same interval. Near apoapsis the radius is long and its angular motion is slower.',
        ],
        figure: { kind: 'kepler-area', title: 'Same time, same swept area', caption: 'The near-periapsis wedge is narrow in radius but wide in angle; the far wedge is long and thin. Their areas represent equal time intervals.' },
        takeaway: 'If the force is central, torque about the focus is zero and angular momentum is conserved.',
      },
      {
        id: 'kepler-periods', label: '02 / Kepler’s third law', title: 'Orbit size sets the period',
        paragraphs: [
          'Kepler’s third law relates the orbital period to the semi-major axis and the total mass of the system. For the same central mass, a wider orbit takes disproportionately longer: doubling a multiplies the period by 2√2.',
          'The comparison is exact for ideal two-body motion. In the Solar System, using years and astronomical units is convenient when the orbiting body has negligible mass compared with the Sun.',
        ],
        figure: { kind: 'kepler-period', title: 'A wider orbit takes much longer', caption: 'For circular orbits around the same central mass, doubling the radius multiplies the period by 2√2, not by two.' },
        takeaway: 'The period depends on a³ and total mass; eccentricity does not change it when those quantities are fixed.',
      },
      {
        id: 'orbital-energy', label: '03 / Energy', title: 'Energy decides whether an orbit is bound',
        paragraphs: [
          'For an ideal two-body system, the total mechanical energy is constant. Negative energy gives a bound ellipse, zero energy is the parabolic escape boundary, and positive energy gives an unbound hyperbola.',
          'The vis-viva equation links speed to distance r and semi-major axis a. A body speeds up as it falls inward because gravitational potential energy is converted to kinetic energy.',
        ],
        figure: { kind: 'orbital-energy', title: 'Three energy regimes', caption: 'The zero-energy line is the escape threshold. The curve sketches the gravitational potential trend; it is not a scale plot of every orbit.' },
        takeaway: 'A larger speed at the same distance means larger orbital energy; reaching escape requires the specific energy to reach zero.',
      },
      {
        id: 'two-body-systems', label: '04 / Two-body systems', title: 'Both bodies move around a barycentre',
        paragraphs: [
          'Newton’s two-body problem is solved most simply by separating the centre-of-mass motion from the relative orbit. The two bodies trace similar ellipses about their shared barycentre, with the more massive body moving on the smaller ellipse.',
          'This is not a small correction for comparable masses. Binary stars are the clearest example: their changing positions and velocities let observers infer masses that cannot be measured by weighing the stars directly.',
        ],
        figure: { kind: 'binary-stars', title: 'A binary is one gravitational system', caption: 'Both stars orbit the barycentre. Spectroscopic line shifts reveal the line-of-sight part of their motion.' },
        takeaway: 'Use the total mass in Kepler’s third law for the relative orbit; do not silently treat both bodies as massless test particles.',
      },
      {
        id: 'conic-orbits', label: '05 / Orbit families', title: 'The sign of orbital energy separates return from escape',
        paragraphs: [
          'Under an isolated inverse-square gravitational force, the relative path is a conic section. Specific orbital energy ε = v²/2 − μ/r is negative for a bound ellipse, zero at the parabolic escape boundary, and positive for a hyperbolic flyby; μ = G(M₁ + M₂) for the relative two-body problem.',
          'Eccentricity describes where a trajectory sits within that family, while angular momentum fixes its plane and orientation. For real Solar-System objects, a quoted Kepler orbit is often an osculating orbit: the instantaneous best-fit conic before perturbations from other bodies are included.',
        ],
        figure: { kind: 'orbital-energy', title: 'Energy classifies an ideal two-body trajectory', caption: 'The energy levels are schematic, not a plotted potential curve. Planetary perturbations slowly change the osculating elements.' },
        takeaway: 'Begin with the two-body conic, then add perturbations only when the accuracy or timescale requires them.',
      },
      {
        id: 'hohmann-transfer', label: '06 / Transfer orbits', title: 'A Hohmann transfer trades time for fuel',
        paragraphs: [
          'Between two coplanar circular orbits, the ideal Hohmann transfer follows half an ellipse tangent to both circles. A prograde impulse raises the spacecraft onto the transfer ellipse; after half an orbital period, a second impulse matches the destination circular speed.',
          'The construction minimizes total Δv among two-impulse coplanar transfers for the stated idealization. Real trajectories may add inclination changes, finite thrust, launch-window timing, third-body effects, or gravity assists, so a textbook Hohmann result is a baseline rather than a mission plan.',
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
    example: { title: 'Earth around the Sun', body: 'Earth’s orbit is close to circular, with a ≈ 1 AU and e ≈ 0.017. Kepler’s third law gives a period close to one year when Solar mass dominates.', result: 'At e = 0.017, the perihelion-to-aphelion speed ratio is (1 + e)/(1 − e) ≈ 1.035.' },
    insight: 'In a two-body problem, the semi-major axis determines the period; eccentricity changes the shape and speed distribution, not the period when a and total mass are fixed.',
    misconception: 'A planet does not move fastest because it is “pulled forward” at perihelion. It is fastest there because conserved angular momentum requires a larger transverse speed at smaller radius.',
    questions: [
      { prompt: 'At which point of an elliptical orbit is a planet moving fastest?', options: ['At apoapsis, farthest from the star', 'At periapsis, closest to the star', 'At both apsides the speed is equal'], answer: 1, explanation: 'Angular momentum per unit mass h = r v⊥ is constant. At the turning points the velocity is transverse, so the smaller periapsis radius requires the larger speed.' },
      { prompt: 'For the same central mass, what happens to the period if the semi-major axis doubles?', options: ['It doubles', 'It grows by 2√2', 'It grows by a factor of 4'], answer: 1, explanation: 'Kepler’s third law gives P ∝ a^(3/2), so doubling a multiplies P by 2^(3/2) = 2√2 ≈ 2.83.' },
    ],
  },
  'stellar-astronomy': {
    slug: 'stellar-astronomy',
    number: '01',
    title: 'Stellar Astronomy',
    subtitle: 'A star is a spectrum with a life story.',
    description: 'Turn starlight into physical properties. Read the H–R diagram, infer temperature from a spectrum, and follow how mass shapes a star’s structure, lifetime, and final state.',
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
      { title: 'Measure the light', body: 'Photometry gives flux and colour; spectroscopy gives a continuum shape plus absorption or emission lines.' },
      { title: 'Infer intrinsic properties', body: 'Distance turns observed flux into luminosity. The continuum estimates effective temperature; luminosity and temperature constrain radius.' },
      { title: 'Place the star', body: 'Plot luminosity against temperature. Its location on the H–R diagram suggests its evolutionary state, not a direct photograph of its interior.' },
    ],
    sections: [
      {
        id: 'stellar-radiation', label: '01 / Starlight', title: 'A spectrum carries temperature and composition',
        paragraphs: [
          'A stellar continuum is often approximated by a blackbody, but real stellar atmospheres add absorption lines and departures from a perfect Planck curve. Wien’s law connects the peak wavelength to temperature; line patterns identify elements and ionization states.',
          'For the Sun, an effective temperature near 5,800 K places the continuum peak near visible wavelengths. A star’s colour alone is not enough to infer its luminosity: distance and measured flux matter too.',
        ],
        figure: { kind: 'blackbody', title: 'Hotter blackbodies peak at shorter wavelengths', caption: 'These normalized Planck curves compare peak position. The curves are scaled independently, so their heights do not compare absolute stellar output.' },
        takeaway: 'Temperature shifts the spectrum; radius and temperature together set bolometric luminosity.',
      },
      {
        id: 'stellar-evolution', label: '02 / Evolution', title: 'Mass chooses the evolutionary route',
        paragraphs: [
          'Stars form as self-gravitating gas clouds contract. Once a stable core can fuse hydrogen, a star spends most of its life on the main sequence. When core hydrogen is depleted, the envelope and core respond on different timescales and the star moves to a new region of the H–R diagram.',
          'A Sun-like star sheds its outer layers and leaves a white dwarf. A sufficiently massive star develops an iron-rich core and may undergo core collapse, leaving a neutron star or black hole. The exact route depends on initial mass, composition, rotation, and mass exchange.',
        ],
        figure: { kind: 'stellar-life-cycle', title: 'Two broad paths after the main sequence', caption: 'The branching diagram is schematic: transition masses and outcomes depend on stellar physics and binary interaction.' },
        takeaway: 'Mass is the first-order control, while composition, rotation, and companions refine the outcome.',
      },
      {
        id: 'mass-luminosity', label: '03 / Mass and lifetime', title: 'A small mass difference can mean a large luminosity difference',
        paragraphs: [
          'Ordinary main-sequence stars follow a steep, approximate mass–luminosity relation. A more massive star has a hotter core and a much higher fusion rate, so it radiates its available fuel far faster.',
          'That is why stellar lifetime does not simply grow with mass. If available fuel scales roughly with M while luminosity scales roughly as M³·⁵, the simple main-sequence lifetime estimate falls approximately as M⁻²·⁵. This is a teaching approximation, not a universal stellar-evolution law.',
        ],
        figure: { kind: 'mass-luminosity', title: 'Luminosity rises steeply along the main sequence', caption: 'Log–log sketch of the rough L ∝ M³·⁵ trend across a limited mass interval; detailed models bend away from a single power law.' },
        takeaway: 'State the stellar class and mass regime before applying a power-law shortcut.',
      },
      {
        id: 'binary-stars', label: '04 / Stellar masses', title: 'Binary motion gives a star its mass',
        paragraphs: [
          'A visual binary reveals changing angular separation and orientation. A spectroscopic binary reveals periodic Doppler shifts. Eclipses add orbital inclination and relative radii, turning a light curve into a powerful mass-and-size constraint.',
          'The mass–luminosity relation is steep for ordinary main-sequence stars, but it is an empirical approximation over a limited mass range—not a universal law for giants, remnants, or all stars.',
        ],
        figure: { kind: 'binary-stars', title: 'The orbit is the scale', caption: 'Combining the period with the semi-major axis gives the total system mass; the component motions separate the individual masses.' },
        takeaway: 'Dynamical masses from binaries calibrate stellar structure models and the mass–luminosity relation.',
      },
      {
        id: 'spectral-classification', label: '05 / Classification', title: 'A spectral type is a temperature sequence, not a ranking',
        paragraphs: [
          'The familiar O–B–A–F–G–K–M sequence runs from hotter to cooler photospheres. Classification uses the pattern and strength of absorption lines as well as continuum colour; ionization balance makes different lines useful at different temperatures.',
          'A luminosity class adds information about atmospheric pressure and surface gravity: class V marks main-sequence stars, while classes I–III describe supergiants and giants. Spectral type plus luminosity class is therefore more informative than colour alone, but metallicity and rotation can alter line patterns.',
        ],
        figure: { kind: 'spectral-lines', title: 'Line patterns change with the conditions in a photosphere', caption: 'Illustrative line positions show how spectra are read; real classification uses calibrated standards and many blended features.' },
        takeaway: 'Read temperature and luminosity class together; neither one label gives mass, age, or distance by itself.',
      },
      {
        id: 'stellar-interiors', label: '06 / Stellar interiors', title: 'Pressure balances gravity while energy moves outward',
        paragraphs: [
          'A stable star is close to hydrostatic equilibrium: inward gravity is balanced by an outward pressure gradient. The pressure, density, temperature, and enclosed mass change continuously with radius; the star is not a set of sharply separated shells.',
          'In a Sun-like model, energy is produced mainly by fusion in the core, transported outward by radiation through much of the interior, then carried by convection in the outer envelope. The boundary and transport pattern depend on mass, composition, and evolutionary stage.',
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
    example: { title: 'The Sun as a calibration point', body: 'The Sun is a G2V main-sequence star with Tₑff ≈ 5,780 K and luminosity 1 L☉. Those values imply a radius close to 1 R☉ through Stefan–Boltzmann.', result: 'Wien’s law predicts λmax ≈ 500 nm—near the green part of the visible spectrum, even though sunlight spans the full visible band.' },
    insight: 'A star’s location on the H–R diagram is not a unique age label. Evolutionary tracks can cross, and population, composition, and binary history matter.',
    misconception: 'A blue star is not necessarily more luminous than every red star. Blue indicates a hotter surface; luminosity also depends on radius and distance affects observed brightness.',
    questions: [
      { prompt: 'If two stars have the same luminosity, which has the larger radius?', options: ['The hotter star', 'The cooler star', 'They must have equal radii'], answer: 1, explanation: 'From L = 4πR²σT⁴, at fixed luminosity a lower temperature requires a larger emitting area and therefore a larger radius.' },
      { prompt: 'A star’s blackbody peak shifts to half the wavelength. What happens to its temperature?', options: ['It halves', 'It doubles', 'It stays the same'], answer: 1, explanation: 'Wien’s law gives λmax T = constant, so halving λmax doubles T.' },
    ],
  },
  cosmology: {
    slug: 'cosmology',
    number: '02',
    title: 'Cosmology',
    subtitle: 'Measure the universe by how it changes.',
    description: 'Build a physical picture of cosmic expansion from redshift, the cosmic microwave background, and the distance ladder. Separate what observations show from what a cosmological model infers.',
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
      { title: 'Start with a measured spectrum', body: 'Identify a known spectral feature and measure how far its observed wavelength is shifted from its rest wavelength.' },
      { title: 'Infer expansion', body: 'For cosmological redshift, the scale factor ratio links emitted and observed wavelengths: 1 + z = a₀/aₑ.' },
      { title: 'Use a calibrated distance', body: 'Standard candles and other distance indicators turn flux or angular size into distances, letting expansion be tested across cosmic time.' },
    ],
    sections: [
      {
        id: 'cosmological-redshift', label: '01 / Redshift', title: 'Wavelength stretches with cosmic expansion',
        paragraphs: [
          'Cosmological redshift is defined by z = (λobs − λemit)/λemit. In a homogeneous expanding universe it is related to the scale factor at observation and emission. It is not simply a Doppler velocity once cosmological distances and high redshifts are involved.',
          'For nearby galaxies, recessional speeds are small compared with the speed of light and a linear approximation is useful. At larger redshift, infer distance and lookback time by integrating a cosmological model rather than treating cz as an exact velocity.',
        ],
        figure: { kind: 'redshift', title: 'A spectral ruler shifts to longer wavelength', caption: 'The line pattern remains recognizable while its wavelengths stretch. Redshift is dimensionless and does not by itself give a unique distance.' },
        takeaway: 'Redshift is an observable; converting it to distance requires a model and cosmological parameters.',
      },
      {
        id: 'cosmic-history', label: '02 / Cosmic history', title: 'The CMB is an early-universe afterglow',
        paragraphs: [
          'The cosmic microwave background is relic radiation released when the early universe cooled enough for electrons and nuclei to form neutral atoms and photons to travel freely. Its near-blackbody spectrum is now observed at about 2.725 K.',
          'Tiny temperature anisotropies encode the seeds of later structure. The CMB supports a hot, dense early phase, while the detailed pattern constrains geometry, matter content, and the expansion history within a cosmological model. Density parameters compare each cosmic component with the critical density set by the expansion rate.'
        ],
        figure: { kind: 'cosmic-timeline', title: 'From a hot plasma to the first galaxies', caption: 'Recombination and CMB release occurred roughly 380,000 years after the Big Bang. Time intervals in the diagram are not drawn to scale.' },
        takeaway: 'Evidence for the hot Big Bang includes cosmic expansion, the CMB spectrum, and primordial light-element abundances.',
      },
      {
        id: 'distance-ladder', label: '03 / Distance ladder', title: 'No single ruler spans every cosmic scale',
        paragraphs: [
          'Geometric parallax calibrates nearby stars. Cepheid variables connect stellar physics to distances in nearby galaxies, and Type Ia supernovae extend the calibration to much greater distances. Redshift then maps the expansion history at the largest scales.',
          'Each rung depends on calibration, selection effects, and measurement uncertainty. Modern surveys combine many methods and cross-check them; a ladder is a network of evidence, not a chain with error-free links.',
        ],
        figure: { kind: 'distance-ladder', title: 'A calibrated route from nearby stars to cosmic expansion', caption: 'Methods overlap and cross-calibrate. The sketch shows a conceptual sequence, not strict distance boundaries.' },
        takeaway: 'When a distance scale changes, ask which calibration or systematic uncertainty changed—not only the final number.',
      },
      {
        id: 'expansion-history', label: '04 / Expansion history', title: 'The expansion rate remembers what the universe contains',
        paragraphs: [
          'The Hubble parameter H(t) = ȧ/a describes the fractional expansion rate, not a fixed speed for every galaxy. In the standard homogeneous model, radiation density thins fastest as the universe expands, matter next, while a cosmological-constant term stays constant.',
          'That changing inventory makes H vary with time. A flat matter-only approximation is useful in a limited era, but precision distances and ages require the full expansion history and fitted cosmological parameters.',
        ],
        figure: { kind: 'cosmic-expansion', title: 'The same comoving grid expands at different rates', caption: 'Marker separations grow with scale factor; panel spacing is illustrative and does not encode the measured expansion history.' },
        takeaway: 'The Hubble constant H₀ is the present-day value of H(t), not a timeless constant of nature.',
      },
      {
        id: 'cosmic-distances', label: '05 / Cosmic distances', title: 'Light travel time is not the distance to a galaxy today',
        paragraphs: [
          'A distant galaxy is observed as it was when its light set out. During that journey the universe expands, so the distance the light traveled is not generally the galaxy’s present proper distance. Cosmologists define several distance measures because different observations depend on different geometry.',
          'Comoving distance follows the expansion history along the light path; luminosity distance relates intrinsic power to observed flux, and angular-diameter distance relates physical size to apparent angle. They coincide only approximately in the nearby, low-redshift limit.',
        ],
        figure: { kind: 'cosmic-timeline', title: 'The observation is a point on the galaxy’s past light cone', caption: 'The timeline is schematic; converting redshift into elapsed time or distance requires an expansion model.' },
        takeaway: 'Always name the distance definition and cosmological model when quoting a high-redshift distance.',
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
    example: { title: 'A familiar fossil: the microwave background', body: 'Expansion stretches the CMB photons from much shorter wavelengths to the microwave band. The measured spectrum is an almost perfect blackbody with a present temperature near 2.725 K.', result: 'The CMB is observed from every direction, but its existence alone does not specify every parameter; the anisotropy pattern and other evidence do the precision work.' },
    insight: 'A cosmological redshift is not a speedometer reading for a distant galaxy. At sufficiently large distances, recession in the expanding metric is not ordinary motion through static space.',
    misconception: 'The Big Bang was not an explosion from one point into pre-existing empty space. In the standard model, the early hot dense state was everywhere in the observable region.',
    questions: [
      { prompt: 'A spectral line is observed at twice its emitted wavelength. What is its redshift?', options: ['z = 0.5', 'z = 1', 'z = 2'], answer: 1, explanation: 'z = (λobs − λemit)/λemit = (2λemit − λemit)/λemit = 1.' },
      { prompt: 'What does the CMB most directly provide?', options: ['A snapshot of the universe when it became transparent', 'A direct image of the Big Bang instant', 'A map of every galaxy’s current distance'], answer: 0, explanation: 'The CMB photons last scattered around recombination, roughly 380,000 years after the Big Bang—not at the initial instant.' },
    ],
  },
  'galactic-astronomy': {
    slug: 'galactic-astronomy',
    number: '04',
    title: 'Galactic Astronomy',
    subtitle: 'Galaxies are ecosystems of matter and light.',
    description: 'Explore the Milky Way as a dynamic system of stars, gas, dust, and dark matter. Connect visible structure to rotation curves, gravitational lensing, and the measurements that reveal hidden mass.',
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
      { title: 'Map the light', body: 'Images reveal morphology, dust lanes, star-forming regions, and stellar populations—but surface brightness is not mass by itself.' },
      { title: 'Measure motion', body: 'Spectral lines and proper motions reveal line-of-sight and transverse velocities. The rotation curve links those speeds to the gravitational potential.' },
      { title: 'Compare independent probes', body: 'Lensing, gas dynamics, stellar motions, and satellite orbits test the mass distribution on different scales.' },
    ],
    sections: [
      {
        id: 'galaxy-structure', label: '01 / Structure', title: 'Read a galaxy in three dimensions',
        paragraphs: [
          'A spiral galaxy can contain a thin stellar and gas disk, spiral structure, a central bulge or bar, and a more extended stellar and dark-matter halo. The Milky Way’s Sun is in the disk, roughly 8 kpc from the Galactic centre.',
          'Dust obscures visible light, so structure depends on wavelength and tracer. Infrared maps see through some dust; radio observations trace cold gas; X-rays reveal hot plasma and energetic environments.',
        ],
        figure: { kind: 'electromagnetic-spectrum', title: 'Different wavelengths reveal different components', caption: 'Radio, infrared, visible, ultraviolet, X-ray, and gamma-ray observations trace different physical processes and environments.' },
        takeaway: 'A galaxy image is a wavelength-dependent measurement, not a complete inventory of its matter.',
      },
      {
        id: 'rotation-curves', label: '02 / Rotation curves', title: 'The outer galaxy keeps moving quickly',
        paragraphs: [
          'For a circular orbit, orbital speed depends on the gravitational mass enclosed within the orbit. If most mass were concentrated toward the centre, a Keplerian outer curve would decline roughly as r⁻¹ᐟ².',
          'Many spiral galaxies instead show nearly flat outer rotation curves. Under standard gravitational dynamics, that implies the enclosed mass continues to grow beyond the bright disk. Dark matter is a leading explanation, tested alongside gas, stellar populations, and alternative gravity models.',
        ],
        figure: { kind: 'rotation-curve', title: 'Visible light alone predicts a falling curve', caption: 'The flat observed trend is the key evidence. Both curves are schematic and the inferred mass profile depends on geometry and assumptions.' },
        takeaway: 'The data are velocities; “dark matter” is an interpretation supported by multiple independent observations.',
      },
      {
        id: 'gravitational-lensing', label: '03 / Lensing', title: 'Gravity bends light as well as matter',
        paragraphs: [
          'In general relativity, mass-energy curves spacetime and light follows that geometry. A foreground galaxy or cluster can distort, magnify, or multiply the images of a more distant source.',
          'Strong lensing can create arcs or multiple images; weak lensing produces small coherent distortions measured statistically. Lensing responds to projected mass, including matter that emits little or no light.',
        ],
        figure: { kind: 'gravitational-lensing', title: 'One source, multiple apparent paths', caption: 'Two light paths bend around a foreground lens and reach the observer from different directions. The diagram is a simplified strong-lensing geometry.' },
        takeaway: 'Lensing provides a mass probe with systematics different from those of rotation curves.',
      },
      {
        id: 'stellar-populations', label: '04 / Stellar populations', title: 'A galaxy’s stars preserve different formation histories',
        paragraphs: [
          'A disk, bulge, and stellar halo do not contain identical populations. Their stars differ statistically in age, chemical abundance, orbit shape, and vertical height; astronomers combine spectra, colours, and motions to separate overlapping groups.',
          'The iron abundance [Fe/H] is logarithmic relative to the Sun, while element ratios such as [α/Fe] can preserve clues about how quickly a population formed. Dust, selection effects, and blended populations complicate the reconstruction, so no single colour is a reliable age label.',
        ],
        figure: { kind: 'hr-diagram', title: 'A colour–magnitude sequence is a population clue', caption: 'The H–R diagram is an idealized single-star reference; real galactic samples mix distances, extinction, binaries, and multiple ages.' },
        takeaway: 'Galactic archaeology is statistical: chemistry and kinematics together are stronger than either alone.',
      },
      {
        id: 'gas-and-feedback', label: '05 / Gas cycle', title: 'Stars return energy and elements to the interstellar medium',
        paragraphs: [
          'Cold molecular gas can collapse into stars, but star formation does not consume a galaxy’s gas in one uninterrupted pass. Winds, radiation, and supernovae heat or expel gas; stellar deaths also return material enriched with newly made elements.',
          'The cycle links gas supply, star-formation rate, and feedback. A simple gas-depletion time Mgas/SFR is a useful comparison, not a promise that the present rate continues unchanged; inflow, outflow, and recycling all matter.',
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
    example: { title: 'The Milky Way’s Solar neighbourhood', body: 'The Sun lies about 8 kpc from the Galactic centre and moves around it at roughly 220 km/s. That orbital speed constrains the mass inside its galactocentric radius.', result: 'A circular-orbit estimate gives M(<r) ≈ v²r/G; it is an order-of-magnitude estimate, not a complete Milky Way mass model.' },
    insight: 'A flat rotation curve does not mean the galaxy’s density is constant. In the spherical approximation it suggests M(<r) ∝ r, which corresponds to a declining density profile.',
    misconception: 'Dark matter is not inferred only because it is invisible. The case combines galaxy dynamics, gravitational lensing, galaxy clusters, and cosmological evidence.',
    questions: [
      { prompt: 'If a galaxy’s outer rotation curve is flat, what does the spherical model imply about enclosed mass?', options: ['It is nearly constant', 'It grows roughly in proportion to radius', 'It falls as the inverse square of radius'], answer: 1, explanation: 'With v² = GM(<r)/r and nearly constant v, the enclosed mass must grow approximately as M(<r) ∝ r.' },
      { prompt: 'Why is gravitational lensing useful for studying dark matter?', options: ['It responds to gravity, not only emitted light', 'It measures only the temperature of stars', 'It removes all distance uncertainty'], answer: 0, explanation: 'Light deflection responds to the projected gravitational field, so lensing can trace total mass whether or not it shines.' },
    ],
  },
  'observational-astronomy': {
    slug: 'observational-astronomy',
    number: '05',
    title: 'Observational Astronomy',
    subtitle: 'Every measurement begins with a direction.',
    description: 'Move from the local sky to the detector. Learn how coordinate systems locate objects, how apertures and optics shape observations, and how parallax and spectra turn photons into distance and physics.',
    readingTime: '22 minute chapter',
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
    ],
    layers: [
      { name: 'Foundation', description: 'Locate a target using a named coordinate frame and epoch.' },
      { name: 'Understanding', description: 'Connect sky geometry and instrument response to measured data.' },
      { name: 'Olympiad insight', description: 'State conventions, units, and uncertainty before transforming coordinates.' },
    ],
    steps: [
      { title: 'Choose the frame', body: 'Equatorial coordinates (right ascension and declination) are tied to Earth’s equator and celestial poles. Altitude and azimuth are tied to the observer’s horizon.' },
      { title: 'Convert with geometry', body: 'Observer latitude, target declination, and hour angle determine altitude. Hour angle is local sidereal time minus right ascension.' },
      { title: 'Measure with an instrument', body: 'Aperture, wavelength, atmosphere, detector noise, and calibration determine what can be resolved and how precisely it can be measured.' },
    ],
    sections: [
      {
        id: 'horizon-coordinates', label: '01 / Coordinates', title: 'The same star has two useful addresses',
        paragraphs: [
          'Right ascension α is measured eastward along the celestial equator from the vernal equinox; declination δ is measured north or south of that equator. Local altitude h is measured up from the horizon, while azimuth A is measured around it from a stated direction.',
          'Hour angle H = local sidereal time − right ascension. It changes as Earth rotates, so equatorial coordinates are useful for catalogues while altitude and azimuth are useful for observing at a particular place and time.',
        ],
        figure: { kind: 'horizon-sky', title: 'Altitude and azimuth belong to the observer', caption: 'The local sky dome is a projection. Azimuth conventions vary; here it is measured clockwise from north in the numerical explorer.' },
        takeaway: 'Always name the coordinate frame, reference direction, epoch, and azimuth convention.',
      },
      {
        id: 'telescope-optics', label: '02 / Telescopes', title: 'An aperture collects light and limits detail',
        paragraphs: [
          'A refractor focuses light with lenses; a Newtonian reflector uses a primary mirror and a secondary mirror to redirect the beam. For a fixed wavelength, a larger unobstructed aperture collects more light and has a smaller diffraction-limited angular scale.',
          'Real observations may be limited by atmospheric seeing, optical quality, tracking, detector sampling, and contrast. Magnification alone does not create detail that the aperture and atmosphere have not resolved.',
        ],
        figure: { kind: 'telescope-optics', title: 'Two optical paths, one job: form an image', caption: 'Idealized parallel rays show focal geometry. Secondary obstructions, lens aberrations, coatings, and atmosphere are not drawn.' },
        takeaway: 'Light-gathering area scales with D²; the Rayleigh angular scale scales roughly as λ/D.',
      },
      {
        id: 'parallax-distance', label: '03 / Parallax', title: 'A six-month baseline turns angle into distance',
        paragraphs: [
          'As Earth orbits the Sun, a nearby star appears to shift against much more distant background stars. The parallax angle p is half the full apparent displacement measured between observations six months apart.',
          'By definition, a star at one parsec has a parallax of one arcsecond when the baseline is one astronomical unit. In practice, precision, calibration, and source motion determine the distance uncertainty.',
        ],
        figure: { kind: 'parallax', title: 'A small angle carries a large distance', caption: 'The full Earth-to-Earth baseline is 2 AU; p is the half-angle from the 1 AU baseline. The geometry is greatly exaggerated.' },
        takeaway: 'For parallax in arcseconds and distance in parsecs, d = 1/p is the defining relation.',
      },
      {
        id: 'spectroscopy', label: '04 / Spectra', title: 'Spectral lines are fingerprints and motion tracers',
        paragraphs: [
          'Atoms and ions absorb or emit photons at characteristic wavelengths. A line pattern identifies composition and physical state; the shift of known lines measures radial velocity through the Doppler effect when the motion is non-relativistic.',
          'Spectral resolving power R = λ/Δλ describes the smallest wavelength separation an instrument can distinguish. Higher resolution can reveal narrower features, but photon count and calibration still matter.',
        ],
        figure: { kind: 'spectral-lines', title: 'The same transitions appear in absorption or emission', caption: 'Line positions identify transitions; their widths, depths, and shifts add information about temperature, pressure, composition, and motion.' },
        takeaway: 'A spectrum is a measurement with finite resolution, calibration, and signal-to-noise—not a perfect barcode.',
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
    questions: [
      { prompt: 'At an object’s upper meridian transit, what is its hour angle?', options: ['H = 0', 'H = 6 h', 'H = 12 h'], answer: 0, explanation: 'Hour angle is local sidereal time minus right ascension. At upper transit these are equal, so H = 0.' },
      { prompt: 'What happens to the diffraction-limited angular scale if aperture diameter doubles?', options: ['It doubles', 'It halves', 'It is unchanged'], answer: 1, explanation: 'The Rayleigh scale is proportional to λ/D. At fixed wavelength, doubling D halves the angular scale.' },
    ],
  },
}
