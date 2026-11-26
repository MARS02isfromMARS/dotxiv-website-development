import type { ReactNode } from 'react'

export type DiagramKind =
  | 'orbit'
  | 'kepler-area'
  | 'kepler-period'
  | 'orbital-energy'
  | 'mass-luminosity'
  | 'solar-sidereal'
  | 'seasons'
  | 'moon-phases'
  | 'eclipses'
  | 'hr-diagram'
  | 'stellar-life-cycle'
  | 'blackbody'
  | 'binary-stars'
  | 'cosmic-expansion'
  | 'redshift'
  | 'cosmic-timeline'
  | 'distance-ladder'
  | 'galaxy-structure'
  | 'rotation-curve'
  | 'gravitational-lensing'
  | 'celestial-sphere'
  | 'horizon-sky'
  | 'telescope-optics'
  | 'parallax'
  | 'electromagnetic-spectrum'
  | 'spectral-lines'

const colors = {
  paper: '#f3f0ea',
  muted: '#a8a3ae',
  dim: '#706b78',
  grid: '#302c36',
  violet: '#9c7cff',
  blue: '#78a9c8',
  amber: '#d4b37b',
  green: '#80bca0',
  rose: '#d88c9c',
}

function SvgFrame({ label: _label, children }: { label: string; children: ReactNode }) {
  return <svg className="science-svg" viewBox="0 0 720 390" aria-hidden="true">{children}</svg>
}

function Grid({ x = 56, y = 42, width = 608, height = 300 }: { x?: number; y?: number; width?: number; height?: number }) {
  return <g stroke={colors.grid} strokeWidth="1">{Array.from({ length: 7 }, (_, i) => <line key={`v${i}`} x1={x + (width / 6) * i} y1={y} x2={x + (width / 6) * i} y2={y + height} />)}{Array.from({ length: 5 }, (_, i) => <line key={`h${i}`} x1={x} y1={y + (height / 4) * i} x2={x + width} y2={y + (height / 4) * i} />)}</g>
}

function Label({ x, y, children, color = colors.muted, anchor = 'start', size = 13 }: { x: number; y: number; children: ReactNode; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} fontFamily="Arial, Helvetica, sans-serif">{children}</text>
}

function OrbitArt() {
  return <SvgFrame label="Elliptical orbit with the Sun at one focus, showing the semi-major axis, perihelion, and aphelion.">
    <Grid />
    <ellipse cx="360" cy="195" rx="250" ry="136" fill="none" stroke={colors.blue} strokeWidth="2" />
    <line x1="110" y1="195" x2="610" y2="195" stroke={colors.dim} strokeDasharray="5 6" />
    <line x1="360" y1="195" x2="610" y2="195" stroke={colors.amber} strokeWidth="2" />
    <circle cx="235" cy="195" r="12" fill={colors.amber} />
    <circle cx="110" cy="195" r="7" fill={colors.violet} />
    <circle cx="610" cy="195" r="6" fill={colors.violet} />
    <line x1="235" y1="195" x2="110" y2="195" stroke={colors.green} strokeDasharray="4 4" />
    <line x1="235" y1="195" x2="610" y2="195" stroke={colors.rose} strokeDasharray="4 4" />
    <line x1="354" y1="186" x2="366" y2="204" stroke={colors.paper} /><line x1="354" y1="204" x2="366" y2="186" stroke={colors.paper} />
    <Label x={235} y={168} color={colors.amber} anchor="middle">Sun • focus</Label>
    <Label x={110} y={230} color={colors.green}>perihelion q = a(1 − e)</Label>
    <Label x={610} y={230} color={colors.rose} anchor="end">aphelion Q = a(1 + e)</Label>
    <Label x={486} y={184} color={colors.amber} anchor="middle">semi-major axis a</Label>
    <Label x={360} y={224} anchor="middle">geometric centre</Label>
    <Label x={360} y={372} anchor="middle" size={11}>One focus is occupied by the central mass; the orbit is conceptual, not to scale.</Label>
  </SvgFrame>
}

function KeplerAreaArt() {
  const a = 180
  const e = 0.52
  const b = a * Math.sqrt(1 - e * e)
  const focusX = 300
  const solveE = (mean: number) => {
    let eccentric = mean
    for (let n = 0; n < 8; n += 1) eccentric -= (eccentric - e * Math.sin(eccentric) - mean) / (1 - e * Math.cos(eccentric))
    return eccentric
  }
  const point = (mean: number) => {
    const eccentric = solveE(mean)
    return { x: focusX + a * (Math.cos(eccentric) - e), y: 190 - b * Math.sin(eccentric) }
  }
  const sector = (center: number) => {
    const points = Array.from({ length: 17 }, (_, index) => point(center - 0.36 + (0.72 * index) / 16))
    return `M ${focusX} 190 L ${points.map(({ x, y }) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')} Z`
  }
  return <SvgFrame label="Equal areas swept out in equal time intervals near perihelion and aphelion of an elliptical orbit.">
    <Grid />
    <ellipse cx={focusX - a * e} cy="190" rx={a} ry={b} fill="none" stroke={colors.blue} strokeWidth="2" />
    <path d={sector(0)} fill={colors.amber} fillOpacity=".18" stroke={colors.amber} strokeWidth="1.5" />
    <path d={sector(Math.PI)} fill={colors.violet} fillOpacity=".18" stroke={colors.violet} strokeWidth="1.5" />
    <circle cx={focusX} cy="190" r="10" fill={colors.amber} />
    <Label x={focusX} y={160} color={colors.amber} anchor="middle">central mass</Label>
    <Label x={190} y={105} color={colors.amber}>Δt</Label>
    <Label x={486} y={116} color={colors.violet}>same Δt</Label>
    <Label x={162} y={318}>perihelion: larger angular sweep</Label>
    <Label x={443} y={318}>aphelion: smaller angular sweep</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Kepler&apos;s second law: equal areas are swept in equal time intervals.</Label>
  </SvgFrame>
}

function OrbitalEnergyArt() {
  return <SvgFrame label="Energy diagram distinguishing bound elliptical orbits, escape energy, and unbound trajectories.">
    <Grid x={105} y={54} width={500} height={254} />
    <line x1="105" y1="181" x2="605" y2="181" stroke={colors.amber} strokeWidth="1.5" strokeDasharray="7 6" />
    <Label x={604} y={169} color={colors.amber} anchor="end">E = 0 • escape threshold</Label>
    <line x1="105" y1="113" x2="605" y2="113" stroke={colors.rose} strokeWidth="2" />
    <Label x={605} y={103} color={colors.rose} anchor="end">E &gt; 0 • hyperbolic, unbound</Label>
    <line x1="105" y1="253" x2="605" y2="253" stroke={colors.green} strokeWidth="2" />
    <Label x={605} y={244} color={colors.green} anchor="end">E &lt; 0 • bound ellipse</Label>
    <line x1="105" y1="308" x2="605" y2="308" stroke={colors.paper} />
    <line x1="105" y1="308" x2="105" y2="54" stroke={colors.paper} />
    <Label x={355} y={339} anchor="middle">distance from central mass, r</Label>
    <Label x={76} y={64}>total</Label><Label x={76} y={80}>energy</Label>
    <path d="M 112 292 C 195 288 239 276 290 258 C 365 230 414 208 466 194 C 520 184 566 181 604 181" fill="none" stroke={colors.blue} strokeWidth="2" />
    <Label x={354} y={372} anchor="middle" size={11}>For an ideal two-body system, total orbital energy fixes the conic-section family.</Label>
  </SvgFrame>
}

function HrArt() {
  return <SvgFrame label="Hertzsprung–Russell diagram with decreasing temperature to the right and luminosity increasing upward.">
    <Grid x={92} y={45} width={536} height={267} />
    <line x1="92" y1="312" x2="628" y2="312" stroke={colors.paper} />
    <line x1="92" y1="45" x2="92" y2="312" stroke={colors.paper} />
    <path d="M 135 68 C 205 91 270 129 331 166 C 392 203 468 243 583 286" fill="none" stroke={colors.blue} strokeWidth="12" strokeLinecap="round" opacity=".78" />
    <path d="M 340 88 C 405 57 492 59 566 79" fill="none" stroke={colors.rose} strokeWidth="22" strokeLinecap="round" opacity=".74" />
    <path d="M 124 287 C 169 269 214 264 257 275" fill="none" stroke={colors.violet} strokeWidth="15" strokeLinecap="round" opacity=".78" />
    <circle cx="383" cy="188" r="7" fill={colors.amber} />
    <Label x={486} y={123} color={colors.rose} anchor="middle">giants &amp; supergiants</Label>
    <Label x={208} y={233} color={colors.blue} anchor="middle">main sequence</Label>
    <Label x={183} y={300} color={colors.violet} anchor="middle">white dwarfs</Label>
    <Label x={397} y={177} color={colors.amber}>Sun</Label>
  {[{ x: 135, label: '30,000 K (O)' }, { x: 285, label: '10,000 K (A)' }, { x: 432, label: '6,000 K (G)' }, { x: 582, label: '3,000 K (M)' }].map((tick) => <g key={tick.label}><line x1={tick.x} y1="312" x2={tick.x} y2="319" stroke={colors.paper} /><text x={tick.x} y="336" fill={colors.muted} fontSize="10" textAnchor="middle" fontFamily="Arial">{tick.label}</text></g>)}
  <Label x={360} y={357} anchor="middle">surface temperature • decreases to the right</Label>
  <Label x={48} y={67}>10⁴ L☉</Label><Label x={48} y={191}>1 L☉</Label><Label x={48} y={298}>10⁻⁴ L☉</Label>
  <Label x={360} y={379} anchor="middle" size={10}>Luminosity is logarithmic; spectral classes run O–B–A–F–G–K–M from hot to cool.</Label>
  </SvgFrame>
}

function LifeCycleArt() {
  const node = (x: number, y: number, text: string, accent: string, width = 124) => <g><rect x={x} y={y} width={width} height="40" rx="2" fill="#17151b" stroke={accent} /><text x={x + width / 2} y={y + 25} fill={colors.paper} fontSize="12" textAnchor="middle" fontFamily="Arial">{text}</text></g>
  return <SvgFrame label="Two schematic stellar evolution pathways: a Sun-like star becomes a white dwarf, while a massive star may end as a neutron star or black hole.">
    <Label x={360} y={44} anchor="middle" color={colors.amber}>Mass determines the evolutionary route (schematic; not to scale).</Label>
    <path d="M 156 111 H 260 M 385 111 H 490 M 552 132 V 193 H 190 V 222 M 550 132 V 222" fill="none" stroke={colors.dim} strokeWidth="2" />
    <path d="M 156 263 H 260 M 385 263 H 490" fill="none" stroke={colors.dim} strokeWidth="2" />
    <path d="M 207 106 l-8 -5 v10z M 432 106 l-8 -5 v10z M 185 217 l-5 -8 -5 8z M 545 217 l-5 -8 -5 8z M 250 258 l-8 -5 v10z M 480 258 l-8 -5 v10z" fill={colors.violet} />
    {node(32, 91, 'gas cloud', colors.blue)}{node(260, 91, 'protostar', colors.blue)}{node(490, 91, 'main sequence', colors.green)}
    {node(112, 243, 'red giant', colors.amber)}{node(260, 243, 'planetary nebula', colors.amber)}{node(490, 243, 'white dwarf', colors.violet)}
    {node(112, 312, 'massive star', colors.rose)}{node(260, 312, 'supernova', colors.rose)}{node(490, 312, 'neutron star / BH', colors.rose)}
    <path d="M 552 132 V 296 H 190 V 307" fill="none" stroke={colors.rose} strokeWidth="2" />
  </SvgFrame>
}

function planckPath(temp: number) {
  const points: string[] = []
  const samples = 50
  const values = Array.from({ length: samples }, (_, i) => {
    const wavelength = 250 + (800 * i) / (samples - 1)
    const x = 70 + ((wavelength - 250) / 800) * 580
    const exponent = 1.4388e7 / (wavelength * temp)
    const intensity = 1 / (Math.pow(wavelength, 5) * (Math.exp(exponent) - 1))
    return { x, intensity }
  })
  const peak = Math.max(...values.map((value) => value.intensity))
  values.forEach((value, i) => {
    const y = 310 - (value.intensity / peak) * 220
    points.push(`${i === 0 ? 'M' : 'L'} ${value.x.toFixed(1)} ${y.toFixed(1)}`)
  })
  return points.join(' ')
}

function BlackbodyArt() {
  return <SvgFrame label="Normalized blackbody curves: hotter stars peak at shorter wavelengths, shown for 4000, 5800, and 9000 kelvin.">
    <Grid x={70} y={58} width={580} height={252} />
    <line x1="70" y1="310" x2="650" y2="310" stroke={colors.paper} /><line x1="70" y1="58" x2="70" y2="310" stroke={colors.paper} />
    <path d={planckPath(4000)} fill="none" stroke={colors.rose} strokeWidth="3" />
    <path d={planckPath(5800)} fill="none" stroke={colors.amber} strokeWidth="3" />
    <path d={planckPath(9000)} fill="none" stroke={colors.blue} strokeWidth="3" />
    <Label x={475} y={94} color={colors.blue}>9,000 K</Label><Label x={548} y={144} color={colors.amber}>5,800 K</Label><Label x={586} y={225} color={colors.rose}>4,000 K</Label>
    <Label x={360} y={345} anchor="middle">wavelength λ (nm) • 250 → 1,050</Label><Label x={37} y={74}>relative</Label><Label x={37} y={91}>intensity</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Each curve is normalized independently; peak position, not absolute brightness, is compared.</Label>
  </SvgFrame>
}

function BinaryArt() {
  return <SvgFrame label="Two stars orbit their common barycentre; radial-velocity observations reveal alternating Doppler shifts.">
    <Grid />
    <ellipse cx="360" cy="180" rx="236" ry="94" fill="none" stroke={colors.blue} strokeDasharray="6 5" />
    <ellipse cx="360" cy="180" rx="118" ry="47" fill="none" stroke={colors.violet} strokeDasharray="6 5" />
    <circle cx="360" cy="180" r="4" fill={colors.paper} />
    <circle cx="242" cy="180" r="12" fill={colors.amber} /><circle cx="478" cy="180" r="8" fill={colors.blue} />
    <line x1="242" y1="265" x2="478" y2="265" stroke={colors.dim} /><line x1="242" y1="257" x2="242" y2="273" stroke={colors.paper} /><line x1="478" y1="257" x2="478" y2="273" stroke={colors.paper} />
    <Label x={360} y={289} anchor="middle">projected separation changes with orbital phase</Label>
    <Label x={360} y={148} anchor="middle" color={colors.paper}>barycentre</Label>
    <Label x={220} y={136} color={colors.amber}>star A</Label><Label x={492} y={136} color={colors.blue}>star B</Label>
    <path d="M 128 330 C 190 300 230 300 292 330 S 394 360 456 330 S 558 300 620 330" fill="none" stroke={colors.rose} strokeWidth="2" />
    <line x1="128" y1="330" x2="620" y2="330" stroke={colors.dim} />
    <Label x={360} y={370} anchor="middle" size={11}>In a spectroscopic binary, opposite line shifts trace motion toward and away from us.</Label>
  </SvgFrame>
}

function ExpansionArt() {
  const panel = (x: number, scale: number, title: string) => <g>
    <rect x={x} y="77" width="172" height="220" fill="none" stroke={colors.grid} />
    {[1, 2, 3].map((n) => <g key={n} stroke={colors.grid}><line x1={x + (172 * n) / 4} y1="77" x2={x + (172 * n) / 4} y2="297" /><line x1={x} y1={77 + (220 * n) / 4} x2={x + 172} y2={77 + (220 * n) / 4} /></g>)}
    {[[.22,.26],[.72,.31],[.49,.73]].map(([gx, gy], i) => <circle key={i} cx={x + 86 + (gx - .5) * 145 * scale} cy={187 + (gy - .5) * 185 * scale} r="5" fill={[colors.amber, colors.blue, colors.rose][i]} />)}
    <Label x={x + 86} y={326} anchor="middle" color={colors.paper}>{title}</Label>
  </g>
  return <SvgFrame label="Three expanding coordinate grids show comoving galaxies moving farther apart as the scale factor grows, without a special centre on the grid.">
    {panel(36, .42, 'earlier • smaller a(t)')}{panel(274, .68, 'later')}{panel(512, 1, 'today • a₀ = 1')}
    <path d="M 219 185 h38 l-8 -7 m8 7 -8 7 M 457 185 h38 l-8 -7 m8 7 -8 7" fill="none" stroke={colors.violet} strokeWidth="2" />
    <Label x={360} y={365} anchor="middle" size={11}>Dots represent comoving galaxies; the grid is a coordinate aid, not a material fabric.</Label>
  </SvgFrame>
}

function RedshiftArt() {
  return <SvgFrame label="Absorption lines shift to longer wavelength in the observed spectrum; redshift is the fractional wavelength change.">
    <Grid x={96} y={62} width={530} height={246} />
    <Label x={96} y={43} color={colors.paper}>same absorption pattern</Label>
    <line x1="96" y1="161" x2="626" y2="161" stroke={colors.blue} strokeWidth="2" />
    <line x1="190" y1="126" x2="190" y2="196" stroke={colors.paper} strokeWidth="3" /><line x1="300" y1="126" x2="300" y2="196" stroke={colors.paper} strokeWidth="3" /><line x1="430" y1="126" x2="430" y2="196" stroke={colors.paper} strokeWidth="3" />
    <Label x={96} y={105} color={colors.blue}>rest frame λ₀</Label>
    <line x1="96" y1="275" x2="626" y2="275" stroke={colors.rose} strokeWidth="2" />
    <line x1="238" y1="239" x2="238" y2="309" stroke={colors.paper} strokeWidth="3" /><line x1="381" y1="239" x2="381" y2="309" stroke={colors.paper} strokeWidth="3" /><line x1="550" y1="239" x2="550" y2="309" stroke={colors.paper} strokeWidth="3" />
    <Label x={96} y={220} color={colors.rose}>observed λobs • shifted right</Label>
    <Label x={96} y={344}>shorter wavelength</Label><Label x={626} y={344} anchor="end">longer wavelength →</Label>
    <Label x={360} y={373} anchor="middle" size={11}>For cosmological redshift, 1 + z = λobs / λemit = a(today) / a(then).</Label>
  </SvgFrame>
}

function CosmicTimelineArt() {
  const marks = [{ x: 83, label: 'hot early\nuniverse', color: colors.rose }, { x: 230, label: 'CMB released\n~380,000 years', color: colors.amber }, { x: 382, label: 'first stars\nand galaxies', color: colors.blue }, { x: 630, label: 'today\n~13.8 billion years', color: colors.green }]
  return <SvgFrame label="Simplified timeline of cosmic history from the hot early universe through recombination, first stars, and today; intervals are not to scale.">
    <rect x="76" y="154" width="562" height="36" fill="#19161f" stroke={colors.grid} />
    <path d="M 76 172 H 638" stroke={colors.violet} strokeWidth="3" />
    {marks.map((mark) => <g key={mark.x}><circle cx={mark.x} cy="172" r="8" fill={mark.color} /><line x1={mark.x} y1="145" x2={mark.x} y2="202" stroke={mark.color} /><text x={mark.x} y={mark.x === 630 ? 113 : 112} fill={mark.color} fontSize="12" textAnchor={mark.x === 83 ? 'start' : mark.x === 630 ? 'end' : 'middle'} fontFamily="Arial">{mark.label.split('\n').map((line, i) => <tspan key={i} x={mark.x} dy={i === 0 ? 0 : 16}>{line}</tspan>)}</text></g>)}
    <Label x={360} y={260} anchor="middle">The cosmic microwave background is a snapshot from the era when the universe became transparent.</Label>
    <Label x={360} y={369} anchor="middle" size={11}>Milestones are spaced for readability, not in proportion to cosmic time.</Label>
  </SvgFrame>
}

function DistanceLadderArt() {
  const steps = [
    { x: 72, n: '01', title: 'parallax', sub: 'nearby stars', color: colors.violet },
    { x: 226, n: '02', title: 'Cepheids', sub: 'nearby galaxies', color: colors.blue },
    { x: 380, n: '03', title: 'Type Ia SNe', sub: 'distant galaxies', color: colors.amber },
    { x: 534, n: '04', title: 'redshift', sub: 'cosmic expansion', color: colors.rose },
  ]
  return <SvgFrame label="Cosmic distance ladder connecting geometric parallax, Cepheid variable stars, Type Ia supernovae, and redshift-based expansion measurements.">
    <path d="M 88 275 L 242 226 L 396 177 L 550 128" fill="none" stroke={colors.dim} strokeWidth="3" />
    {steps.map((step) => <g key={step.n}><circle cx={step.x + 40} cy={274 - (step.x - 72) * .32} r="26" fill="#17151b" stroke={step.color} strokeWidth="2" /><text x={step.x + 40} y={278 - (step.x - 72) * .32} textAnchor="middle" fill={step.color} fontSize="12" fontFamily="Arial">{step.n}</text><text x={step.x + 40} y={324} textAnchor="middle" fill={colors.paper} fontSize="12" fontFamily="Arial">{step.title}</text><text x={step.x + 40} y={343} textAnchor="middle" fill={colors.muted} fontSize="10" fontFamily="Arial">{step.sub}</text></g>)}
    <Label x={360} y={376} anchor="middle" size={11}>Each rung is calibrated against the one below; uncertainties propagate upward.</Label>
  </SvgFrame>
}

function GalaxyArt() {
  return <SvgFrame label="Annotated Milky Way structure showing the central bulge, spiral disk, Sun's neighbourhood, and extended dark-matter halo.">
    <ellipse cx="350" cy="190" rx="272" ry="139" fill="none" stroke={colors.violet} strokeDasharray="5 7" opacity=".8" />
    <ellipse cx="350" cy="190" rx="214" ry="89" fill="#17151b" stroke={colors.grid} />
    <path d="M 350 190 C 392 143 483 150 469 197 C 456 238 374 245 360 204 C 350 174 395 160 420 181 C 437 195 421 216 399 217" fill="none" stroke={colors.blue} strokeWidth="9" strokeLinecap="round" opacity=".78" />
    <path d="M 350 190 C 313 237 220 230 232 184 C 243 143 325 135 341 176 C 353 206 308 221 283 200 C 266 185 282 164 304 162" fill="none" stroke={colors.green} strokeWidth="9" strokeLinecap="round" opacity=".78" />
    <ellipse cx="350" cy="190" rx="56" ry="39" fill={colors.amber} fillOpacity=".28" stroke={colors.amber} />
    <circle cx="350" cy="190" r="8" fill={colors.rose} />
    <circle cx="282" cy="160" r="5" fill={colors.paper} />
    <Label x={350} y={198} color={colors.paper} anchor="middle">bulge</Label>
    <Label x={470} y={117} color={colors.blue}>spiral disk</Label>
    <Label x={125} y={93} color={colors.violet}>extended halo</Label>
    <Label x={260} y={144} color={colors.paper}>Sun • ~8 kpc from centre</Label>
    <Label x={360} y={367} anchor="middle" size={11}>Face-on schematic; the halo is inferred from dynamics and other tracers.</Label>
  </SvgFrame>
}

function RotationCurveArt() {
  return <SvgFrame label="Galaxy rotation curve showing observed orbital speed remaining approximately flat at large radius, unlike the Keplerian decline expected from visible mass alone.">
    <Grid x={92} y={54} width={540} height={255} />
    <line x1="92" y1="309" x2="632" y2="309" stroke={colors.paper} /><line x1="92" y1="54" x2="92" y2="309" stroke={colors.paper} />
    <path d="M 100 293 C 150 142 205 97 280 85 C 388 76 500 76 620 76" fill="none" stroke={colors.blue} strokeWidth="3" />
    <path d="M 100 293 C 150 142 205 97 280 85 C 362 84 430 116 498 150 C 548 174 588 194 620 209" fill="none" stroke={colors.amber} strokeWidth="3" strokeDasharray="8 6" />
    <Label x={607} y={64} color={colors.blue} anchor="end">observed: roughly flat</Label>
    <Label x={607} y={229} color={colors.amber} anchor="end">visible matter only</Label>
    <Label x={360} y={346} anchor="middle">distance from galactic centre</Label><Label x={47} y={69}>orbital</Label><Label x={47} y={86}>speed</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Flat outer speeds imply more enclosed gravitating mass than the visible disk alone.</Label>
  </SvgFrame>
}

function LensingArt() {
  return <SvgFrame label="Light from a distant source bends around a foreground galaxy, producing multiple apparent images for an observer.">
    <Grid />
    <circle cx="360" cy="190" r="35" fill={colors.amber} fillOpacity=".2" stroke={colors.amber} strokeWidth="2" />
    <circle cx="360" cy="190" r="8" fill={colors.amber} />
    <circle cx="95" cy="190" r="10" fill={colors.blue} /><circle cx="632" cy="190" r="8" fill={colors.paper} />
    <path d="M 95 190 C 220 105 290 105 360 190 C 430 275 510 275 632 190" fill="none" stroke={colors.violet} strokeWidth="2.5" />
    <path d="M 95 190 C 220 275 290 275 360 190 C 430 105 510 105 632 190" fill="none" stroke={colors.rose} strokeWidth="2.5" />
    <circle cx="492" cy="146" r="6" fill={colors.violet} /><circle cx="492" cy="234" r="6" fill={colors.rose} />
    <Label x={95} y={160} color={colors.blue} anchor="middle">distant source</Label>
    <Label x={360} y={140} color={colors.amber} anchor="middle">foreground lens</Label>
    <Label x={632} y={167} color={colors.paper} anchor="end">observer</Label>
    <Label x={492} y={130} color={colors.violet} anchor="middle">image A</Label><Label x={492} y={259} color={colors.rose} anchor="middle">image B</Label>
    <Label x={360} y={370} anchor="middle" size={11}>The source, lens, and observer are aligned in depth; the drawing is not to scale.</Label>
  </SvgFrame>
}

function CelestialSphereArt() {
  return <SvgFrame label="Celestial sphere with celestial equator, north celestial pole, local meridian, declination, and right ascension.">
    <ellipse cx="353" cy="192" rx="204" ry="140" fill="none" stroke={colors.blue} strokeWidth="2" />
    <ellipse cx="353" cy="192" rx="204" ry="60" fill="none" stroke={colors.green} strokeWidth="2" />
    <ellipse cx="353" cy="192" rx="92" ry="140" fill="none" stroke={colors.dim} strokeDasharray="6 5" />
    <line x1="353" y1="52" x2="353" y2="332" stroke={colors.paper} strokeDasharray="5 5" />
    <line x1="353" y1="192" x2="474" y2="146" stroke={colors.amber} strokeWidth="2" />
    <circle cx="474" cy="146" r="7" fill={colors.violet} />
    <circle cx="149" cy="192" r="5" fill={colors.rose} />
    <circle cx="353" cy="52" r="6" fill={colors.paper} />
    <circle cx="353" cy="192" r="4" fill={colors.amber} />
    <path d="M 355 192 A 85 30 0 0 1 438 172" fill="none" stroke={colors.rose} strokeWidth="2" />
    <Label x={366} y={67}>north celestial pole</Label>
    <Label x={499} y={139} color={colors.violet}>celestial object</Label>
    <Label x={520} y={211} color={colors.green}>celestial equator</Label>
    <Label x={114} y={181} color={colors.rose}>vernal equinox γ</Label>
    <Label x={387} y={181} color={colors.amber}>declination δ</Label>
    <Label x={414} y={226} color={colors.rose}>right ascension α</Label>
    <Label x={360} y={371} anchor="middle" size={11}>Equatorial coordinates are Earth-centred directions projected onto the celestial sphere.</Label>
  </SvgFrame>
}

function HorizonArt() {
  return <SvgFrame label="Local sky dome showing horizon, zenith, altitude above the horizon, and azimuth measured around the horizon from north.">
    <circle cx="360" cy="211" r="134" fill="#15131a" stroke={colors.blue} strokeWidth="2" />
    <ellipse cx="360" cy="211" rx="134" ry="36" fill="none" stroke={colors.green} strokeWidth="2" />
    <line x1="226" y1="211" x2="494" y2="211" stroke={colors.green} strokeWidth="2" />
    <line x1="360" y1="211" x2="438" y2="116" stroke={colors.violet} strokeWidth="2" />
    <circle cx="438" cy="116" r="7" fill={colors.amber} />
    <line x1="438" y1="116" x2="438" y2="211" stroke={colors.amber} strokeDasharray="5 5" />
    <path d="M 360 178 A 33 33 0 0 1 382 186" fill="none" stroke={colors.rose} strokeWidth="2" />
    <path d="M 327 211 A 33 20 0 0 0 346 228" fill="none" stroke={colors.blue} strokeWidth="2" />
    <Label x={360} y={62} anchor="middle" color={colors.paper}>zenith</Label>
    <Label x={438} y={101} color={colors.amber}>object</Label>
    <Label x={449} y={171} color={colors.amber}>altitude h</Label>
    <Label x={378} y={174} color={colors.rose}>azimuth A</Label>
    <Label x={230} y={236} color={colors.green}>local horizon</Label>
    <Label x={350} y={364} anchor="middle" size={11}>Altitude is measured up from the horizon; azimuth convention must be stated.</Label>
  </SvgFrame>
}

function TelescopeArt() {
  return <SvgFrame label="Side-by-side refracting and Newtonian reflecting telescope ray diagrams, showing objective, primary mirror, focal plane, and eyepiece.">
    <line x1="40" y1="195" x2="680" y2="195" stroke={colors.grid} strokeDasharray="5 5" />
    <Label x={178} y={53} anchor="middle" color={colors.blue}>REFRACTOR</Label>
    <Label x={537} y={53} anchor="middle" color={colors.violet}>NEWTONIAN REFLECTOR</Label>
    <path d="M 56 130 H 218 M 56 195 H 218 M 56 260 H 218" stroke={colors.blue} strokeWidth="2" />
    <path d="M 218 130 L 310 195 L 410 171 M 218 195 L 310 195 L 410 195 M 218 260 L 310 195 L 410 219" fill="none" stroke={colors.amber} strokeWidth="2" />
    <path d="M 218 119 Q 230 195 218 271" fill="none" stroke={colors.paper} strokeWidth="5" />
    <path d="M 406 174 Q 418 195 406 216" fill="none" stroke={colors.paper} strokeWidth="4" />
    <path d="M 418 171 H 448 M 418 195 H 448 M 418 219 H 448" stroke={colors.green} strokeWidth="2" />
    <line x1="310" y1="184" x2="310" y2="206" stroke={colors.rose} strokeWidth="2" />
    <Label x={218} y={296} anchor="middle">objective lens</Label><Label x={300} y={251} anchor="end">common focal plane</Label><Label x={411} y={251} anchor="middle">eyepiece</Label>
    <path d="M 456 129 H 620 L 545 190 V 116 M 456 195 H 620 L 550 195 V 116 M 456 261 H 620 L 555 200 V 116" fill="none" stroke={colors.amber} strokeWidth="2" />
    <path d="M 614 125 Q 628 195 614 265" fill="none" stroke={colors.paper} strokeWidth="5" />
    <path d="M 545 190 L 555 200" stroke={colors.rose} strokeWidth="5" />
    <path d="M 545 116 V 70 M 550 116 V 70 M 555 116 V 70" fill="none" stroke={colors.green} strokeWidth="2" />
    <path d="M 541 117 Q 550 106 559 117" fill="none" stroke={colors.paper} strokeWidth="4" />
    <Label x={614} y={292} anchor="middle">primary mirror</Label><Label x={562} y={86} anchor="start">eyepiece / image plane</Label><Label x={570} y={243} anchor="start">diagonal secondary</Label>
    <Label x={360} y={368} anchor="middle" size={11}>Incoming parallel rays focus; the eyepiece re-collimates the bundle for a relaxed eye.</Label>
  </SvgFrame>
}

function ParallaxArt() {
  return <SvgFrame label="Stellar parallax geometry with Earth observed six months apart, a two astronomical-unit baseline, and angle p measured from one astronomical unit.">
    <Grid />
    <circle cx="170" cy="188" r="86" fill="none" stroke={colors.grid} strokeWidth="2" />
    <circle cx="170" cy="188" r="12" fill={colors.amber} /><Label x={170} y={220} anchor="middle" color={colors.amber}>Sun</Label>
    <circle cx="170" cy="102" r="8" fill={colors.blue} /><circle cx="170" cy="274" r="8" fill={colors.blue} />
    <Label x={186} y={107} color={colors.blue}>Earth • Jan</Label><Label x={186} y={280} color={colors.blue}>Earth • Jul</Label>
    <circle cx="633" cy="188" r="9" fill={colors.paper} />
    <line x1="170" y1="102" x2="633" y2="188" stroke={colors.violet} strokeWidth="2" />
    <line x1="170" y1="274" x2="633" y2="188" stroke={colors.rose} strokeWidth="2" />
    <line x1="170" y1="188" x2="633" y2="188" stroke={colors.dim} strokeDasharray="5 5" />
    <line x1="170" y1="102" x2="170" y2="188" stroke={colors.blue} strokeDasharray="4 4" />
    <line x1="170" y1="102" x2="170" y2="274" stroke={colors.dim} strokeWidth="1.5" />
    <path d="M 606 183 A 28 28 0 0 0 606 193" fill="none" stroke={colors.amber} strokeWidth="2" />
    <Label x={590} y={188} color={colors.amber} anchor="end">2p</Label>
    <Label x={633} y={165} anchor="end">nearby star</Label>
    <Label x={183} y={144} color={colors.blue}>1 AU</Label><Label x={183} y={244} color={colors.rose}>2 AU baseline</Label>
    <Label x={360} y={370} anchor="middle" size={11}>The two Earth views differ by 2p; p is the angle subtended by 1 AU at the star.</Label>
  </SvgFrame>
}

function SpectrumArt() {
  const bands = [
    { name: 'radio', width: 124, color: colors.blue }, { name: 'microwave', width: 85, color: colors.violet }, { name: 'infrared', width: 88, color: colors.rose }, { name: 'visible', width: 64, color: colors.green }, { name: 'ultraviolet', width: 83, color: colors.amber }, { name: 'X-ray', width: 82, color: colors.blue }, { name: 'gamma', width: 82, color: colors.rose },
  ]
  let x = 46
  const positions = bands.map((band) => { const left = x; x += band.width + 2; return { ...band, left } })
  return <SvgFrame label="Electromagnetic spectrum ordered from long wavelength and low frequency radio waves to short wavelength and high frequency gamma rays, with visible light as a narrow band.">
    {positions.map((band) => <g key={band.name}><rect x={band.left} y="148" width={band.width} height="64" fill={band.color} fillOpacity=".23" stroke={band.color} /><text x={band.left + band.width / 2} y="245" fill={colors.paper} fontSize="11" textAnchor="middle" fontFamily="Arial">{band.name}</text></g>)}
    <path d="M 48 113 H 664" stroke={colors.paper} strokeWidth="2" /><path d="M 48 113 l12 -6 v12 z M 664 113 l-12 -6 v12 z" fill={colors.paper} />
    <Label x={48} y={83}>long wavelength • low frequency</Label><Label x={664} y={83} anchor="end">short wavelength • high frequency</Label>
    <Label x={360} y={298} anchor="middle" color={colors.green}>visible light is a small window in the full spectrum</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Boundaries between bands are conventional; wavelength ranges overlap by use.</Label>
  </SvgFrame>
}

function SpectralLinesArt() {
  const positions = [160, 244, 370, 506]
  return <SvgFrame label="Continuous stellar spectrum with dark absorption lines and a comparison emission spectrum with bright lines at the same characteristic wavelengths.">
    <Label x={78} y={95} color={colors.paper}>absorption: cooler gas in front of a hot source</Label>
    <rect x="78" y="116" width="565" height="60" fill={colors.paper} fillOpacity=".75" />
    {positions.map((x, i) => <line key={`a${x}`} x1={x} y1="116" x2={x} y2="176" stroke={[colors.violet, colors.blue, colors.amber, colors.rose][i]} strokeWidth="5" />)}
    <Label x={78} y={226} color={colors.paper}>emission: hot, thin gas against a dark background</Label>
    <rect x="78" y="245" width="565" height="60" fill="#141218" stroke={colors.grid} />
    {positions.map((x, i) => <line key={`e${x}`} x1={x} y1="245" x2={x} y2="305" stroke={[colors.violet, colors.blue, colors.amber, colors.rose][i]} strokeWidth="5" />)}
    <Label x={360} y={349} anchor="middle">wavelength increases →</Label>
    <Label x={360} y={375} anchor="middle" size={11}>Line positions identify elements; line shape and strength also encode physical conditions.</Label>
  </SvgFrame>
}

function KeplerPeriodArt() {
  return <SvgFrame label="Two circular orbits around the same central mass illustrate Kepler's third law: doubling the semi-major axis multiplies the period by two to the three-halves.">
    <Grid />
    <circle cx="360" cy="190" r="72" fill="none" stroke={colors.blue} strokeWidth="2" />
    <circle cx="360" cy="190" r="148" fill="none" stroke={colors.violet} strokeWidth="2" />
    <circle cx="360" cy="190" r="12" fill={colors.amber} />
    <circle cx="432" cy="190" r="7" fill={colors.blue} /><circle cx="508" cy="190" r="7" fill={colors.violet} />
    <line x1="360" y1="190" x2="432" y2="190" stroke={colors.blue} strokeDasharray="4 4" /><line x1="360" y1="190" x2="508" y2="190" stroke={colors.violet} strokeDasharray="4 4" />
    <Label x={360} y={159} color={colors.amber} anchor="middle">central mass M</Label>
    <Label x={396} y={213} color={colors.blue} anchor="middle">a₁</Label><Label x={435} y={172} color={colors.violet} anchor="middle">a₂ = 2a₁</Label>
    <Label x={360} y={328} color={colors.blue} anchor="middle">P₁</Label><Label x={535} y={328} color={colors.violet} anchor="middle">P₂ = 2√2 P₁</Label>
    <Label x={360} y={371} anchor="middle" size={11}>Circular-orbit comparison; for fixed central mass, P² ∝ a³.</Label>
  </SvgFrame>
}

function MassLuminosityArt() {
  const points = Array.from({ length: 48 }, (_, index) => {
    const logMass = -0.3 + (1.6 * index) / 47
    const logLuminosity = 3.5 * logMass
    const x = 88 + ((logMass + 0.3) / 1.6) * 550
    const y = 305 - ((logLuminosity + 1.2) / 6) * 230
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
  return <SvgFrame label="Log-log sketch of the approximate main-sequence mass-luminosity relation, showing luminosity rising steeply with stellar mass over a limited range.">
    <Grid x={88} y={55} width={550} height={250} />
    <line x1="88" y1="305" x2="638" y2="305" stroke={colors.paper} /><line x1="88" y1="55" x2="88" y2="305" stroke={colors.paper} />
    <path d={points} fill="none" stroke={colors.amber} strokeWidth="3" />
    <circle cx="326" cy="223" r="7" fill={colors.blue} />
    <Label x={337} y={218} color={colors.blue}>Sun • 1 M☉, 1 L☉</Label>
    <Label x={150} y={282}>0.5 M☉</Label><Label x={570} y={88}>20 M☉</Label>
    <Label x={360} y={343} anchor="middle">stellar mass M (log scale)</Label>
    <Label x={37} y={72}>luminosity</Label><Label x={37} y={89}>L (log scale)</Label>
    <Label x={360} y={373} anchor="middle" size={11}>L ∝ M³·⁵ is a rough main-sequence scaling, not a law for every star.</Label>
  </SvgFrame>
}

function SolarSiderealArt() {
  return <SvgFrame label="Comparison of a sidereal day, one 360-degree rotation relative to distant stars, and a longer mean solar day, which requires about one additional degree as Earth advances in its orbit.">
    <rect x="38" y="54" width="310" height="254" fill="none" stroke={colors.grid} />
    <rect x="372" y="54" width="310" height="254" fill="none" stroke={colors.grid} />
    <Label x={193} y={82} color={colors.blue} anchor="middle">SIDEREAL DAY</Label>
    <Label x={527} y={82} color={colors.amber} anchor="middle">MEAN SOLAR DAY</Label>
    <circle cx="193" cy="180" r="62" fill="#15131a" stroke={colors.blue} strokeWidth="2" />
    <line x1="193" y1="180" x2="275" y2="180" stroke={colors.blue} strokeWidth="2" />
    <circle cx="276" cy="180" r="5" fill={colors.paper} />
    <path d="M 151 133 A 62 62 0 1 1 151 227" fill="none" stroke={colors.violet} strokeWidth="2" />
    <Label x={276} y={160} color={colors.paper} anchor="middle">distant stars</Label>
    <Label x={193} y={271} anchor="middle">360° relative to stars</Label>
    <Label x={193} y={290} anchor="middle" color={colors.blue}>23 h 56 min 4 s</Label>
    <circle cx="527" cy="180" r="62" fill="#15131a" stroke={colors.amber} strokeWidth="2" />
    <line x1="527" y1="180" x2="609" y2="180" stroke={colors.blue} strokeWidth="2" />
    <line x1="527" y1="180" x2="608" y2="171" stroke={colors.amber} strokeWidth="2" />
    <path d="M 485 133 A 62 62 0 1 1 485 227" fill="none" stroke={colors.violet} strokeWidth="2" />
    <path d="M 565 173 A 38 38 0 0 1 566 180" fill="none" stroke={colors.rose} strokeWidth="2" />
    <Label x={611} y={202} color={colors.blue} anchor="end">star</Label>
    <Label x={611} y={163} color={colors.amber} anchor="end">Sun</Label>
    <Label x={574} y={177} color={colors.rose}>~1° extra</Label>
    <Label x={527} y={271} anchor="middle">360° + ~1° to the Sun</Label>
    <Label x={527} y={290} anchor="middle" color={colors.amber}>24 h mean solar day</Label>
    <Label x={360} y={365} anchor="middle" size={11}>The angle is exaggerated. Earth advances about 1° along its orbit per day.</Label>
  </SvgFrame>
}

function SeasonsArt() {
  const earth = (cx: number, cy: number, title: string, anchor: 'start' | 'middle' | 'end', tx: number, ty: number) => <g>
    <circle cx={cx} cy={cy} r="24" fill="#17151b" stroke={colors.blue} strokeWidth="2" />
    <path d={`M ${cx - 12} ${cy + 21} L ${cx + 12} ${cy - 21}`} stroke={colors.amber} strokeWidth="2" />
    <Label x={tx} y={ty} color={colors.paper} anchor={anchor}>{title}</Label>
  </g>
  return <SvgFrame label="Earth's axial tilt remains oriented in nearly the same direction around its orbit, producing opposite seasons in the two hemispheres; the Sun-Earth distance is not the cause of seasons.">
    <ellipse cx="360" cy="196" rx="229" ry="132" fill="none" stroke={colors.grid} strokeWidth="2" />
    <circle cx="360" cy="196" r="29" fill={colors.amber} fillOpacity=".2" stroke={colors.amber} strokeWidth="2" />
    <Label x={360} y={201} color={colors.amber} anchor="middle">Sun</Label>
    {earth(360, 64, 'March equinox', 'middle', 360, 30)}
    {earth(589, 196, 'June solstice', 'start', 619, 192)}
    {earth(360, 328, 'September equinox', 'middle', 360, 376)}
    {earth(131, 196, 'December solstice', 'end', 102, 192)}
    <Label x={360} y={235} anchor="middle" color={colors.green}>Earth&apos;s axis stays nearly parallel</Label>
    <Label x={360} y={387} anchor="middle" size={9}>Northern summer occurs when the north pole tilts toward the Sun; seasons reverse in the south.</Label>
  </SvgFrame>
}

function MoonPhasesArt() {
  const moon = (cx: number, cy: number, phase: 'new' | 'first' | 'full' | 'last', label: string, lx: number, ly: number, anchor: 'start' | 'middle' | 'end' = 'middle') => <g>
    <circle cx={cx} cy={cy} r="18" fill="#27242d" stroke={colors.paper} strokeOpacity=".6" />
    {phase === 'full' && <circle cx={cx} cy={cy} r="17" fill={colors.paper} />}
    {phase === 'first' && <path d={`M ${cx} ${cy - 17} A 17 17 0 0 1 ${cx} ${cy + 17} Z`} fill={colors.paper} />}
    {phase === 'last' && <path d={`M ${cx} ${cy - 17} A 17 17 0 0 0 ${cx} ${cy + 17} Z`} fill={colors.paper} />}
    <Label x={lx} y={ly} anchor={anchor} color={colors.paper}>{label}</Label>
  </g>
  return <SvgFrame label="Moon phases from new to first quarter, full, and last quarter as the Moon orbits Earth; sunlight illuminates half of the Moon at every orbital position.">
    <circle cx="360" cy="200" r="18" fill={colors.blue} />
    <ellipse cx="360" cy="200" rx="181" ry="125" fill="none" stroke={colors.grid} strokeDasharray="5 5" />
    <circle cx="85" cy="200" r="30" fill={colors.amber} fillOpacity=".25" stroke={colors.amber} strokeWidth="2" />
    <Label x={85} y={205} anchor="middle" color={colors.amber}>Sun</Label>
    <path d="M 124 200 H 164" stroke={colors.amber} strokeWidth="2" /><path d="M 164 200 l-10 -6 v12 z" fill={colors.amber} />
    <Label x={140} y={183} color={colors.amber} anchor="middle">sunlight</Label>
    {moon(179, 200, 'new', 'New', 179, 245)}
    {moon(360, 325, 'first', 'First quarter', 360, 367)}
    {moon(541, 200, 'full', 'Full', 541, 245)}
    {moon(360, 75, 'last', 'Last quarter', 360, 43)}
    <Label x={360} y={204} anchor="middle" color={colors.paper}>Earth</Label>
    <Label x={360} y={389} anchor="middle" size={10}>The phases are viewing geometry; eclipses require alignment near an orbital node.</Label>
  </SvgFrame>
}

function EclipsesArt() {
  return <SvgFrame label="Solar and lunar eclipse alignments: Moon between Sun and Earth at new Moon, or Earth between Sun and Moon at full Moon; an eclipse also requires the Moon near an orbital node.">
    <Label x={360} y={50} color={colors.amber} anchor="middle">SOLAR ECLIPSE • NEW MOON</Label>
    <line x1="62" y1="138" x2="650" y2="138" stroke={colors.amber} strokeWidth="1.5" />
    <circle cx="106" cy="138" r="25" fill={colors.amber} /><circle cx="334" cy="138" r="13" fill="#77717e" stroke={colors.paper} />
    <circle cx="590" cy="138" r="25" fill={colors.blue} />
    <path d="M 347 127 L 565 119 L 565 157 Z" fill="#18151d" stroke={colors.violet} strokeDasharray="4 4" />
    <Label x={106} y={180} anchor="middle" color={colors.amber}>Sun</Label><Label x={334} y={180} anchor="middle">Moon</Label><Label x={590} y={180} anchor="middle" color={colors.blue}>Earth</Label>
    <Label x={458} y={137} anchor="middle" color={colors.violet}>Moon&apos;s shadow</Label>
    <Label x={360} y={230} color={colors.blue} anchor="middle">LUNAR ECLIPSE • FULL MOON</Label>
    <line x1="62" y1="302" x2="650" y2="302" stroke={colors.amber} strokeWidth="1.5" />
    <circle cx="106" cy="302" r="25" fill={colors.amber} /><circle cx="334" cy="302" r="25" fill={colors.blue} /><circle cx="590" cy="302" r="13" fill="#77717e" stroke={colors.paper} />
    <path d="M 359 292 L 566 287 L 566 317 Z" fill="#18151d" stroke={colors.violet} strokeDasharray="4 4" />
    <Label x={106} y={345} anchor="middle" color={colors.amber}>Sun</Label><Label x={334} y={345} anchor="middle" color={colors.blue}>Earth</Label><Label x={590} y={345} anchor="middle">Moon</Label>
    <Label x={460} y={300} anchor="middle" color={colors.violet}>Earth&apos;s umbra</Label>
    <Label x={360} y={380} anchor="middle" size={10}>The lunar orbit is tilted ~5° to the ecliptic; eclipses occur only near nodes.</Label>
  </SvgFrame>
}

const diagrams: Record<DiagramKind, () => ReactNode> = {
  orbit: OrbitArt,
  'kepler-area': KeplerAreaArt,
  'kepler-period': KeplerPeriodArt,
  'orbital-energy': OrbitalEnergyArt,
  'mass-luminosity': MassLuminosityArt,
  'solar-sidereal': SolarSiderealArt,
  seasons: SeasonsArt,
  'moon-phases': MoonPhasesArt,
  eclipses: EclipsesArt,
  'hr-diagram': HrArt,
  'stellar-life-cycle': LifeCycleArt,
  blackbody: BlackbodyArt,
  'binary-stars': BinaryArt,
  'cosmic-expansion': ExpansionArt,
  redshift: RedshiftArt,
  'cosmic-timeline': CosmicTimelineArt,
  'distance-ladder': DistanceLadderArt,
  'galaxy-structure': GalaxyArt,
  'rotation-curve': RotationCurveArt,
  'gravitational-lensing': LensingArt,
  'celestial-sphere': CelestialSphereArt,
  'horizon-sky': HorizonArt,
  'telescope-optics': TelescopeArt,
  parallax: ParallaxArt,
  'electromagnetic-spectrum': SpectrumArt,
  'spectral-lines': SpectralLinesArt,
}

export function DiagramIllustration({ kind, label }: { kind: DiagramKind; label: string }) {
  const Illustration = diagrams[kind]
  return <div className="science-svg-wrap" role="img" aria-label={label}><Illustration /></div>
}
