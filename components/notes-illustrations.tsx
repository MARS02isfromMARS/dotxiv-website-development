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
  | 'transfer-orbit'
  | 'stellar-interior'
  | 'galactic-cycle'
  | 'detector-workflow'
  | 'signal-to-noise'

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
  return <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} fontFamily="Georgia, 'Times New Roman', serif">{children}</text>
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
  return <SvgFrame label="Specific orbital energy classifies an ideal two-body orbit: negative energy is a bound ellipse, zero is a parabolic escape path, and positive energy is an unbound hyperbola.">
    <line x1="140" y1="310" x2="140" y2="68" stroke={colors.paper} strokeWidth="1.5" />
    <path d="M 134 78 L 140 66 L 146 78 Z" fill={colors.paper} />
    <Label x={158} y={79} color={colors.paper}>energy increases</Label>
    <line x1="170" y1="184" x2="625" y2="184" stroke={colors.amber} strokeWidth="1.5" strokeDasharray="7 6" />
    <Label x={188} y={173} color={colors.amber}>ε = 0 • parabolic escape boundary</Label>
    <line x1="190" y1="116" x2="585" y2="116" stroke={colors.rose} strokeWidth="2" />
    <Label x={190} y={103} color={colors.rose}>ε &gt; 0 • hyperbolic, unbound</Label>
    <line x1="190" y1="252" x2="585" y2="252" stroke={colors.green} strokeWidth="2" />
    <Label x={190} y={242} color={colors.green}>ε &lt; 0 • elliptical, bound</Label>
    <Label x={360} y={341} anchor="middle">specific orbital energy, ε</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Energy is constant along an ideal two-body orbit; levels are qualitative, not to scale.</Label>
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
  const node = (x: number, y: number, text: string, accent: string, width = 124, size = 11) => <g><rect x={x} y={y} width={width} height="34" rx="2" fill="#17151b" stroke={accent} /><text x={x + width / 2} y={y + 22} fill={colors.paper} fontSize={size} textAnchor="middle" fontFamily="Arial">{text}</text></g>
  const arrow = (x: number, y: number) => <path d={`M ${x - 4} ${y - 5} L ${x} ${y + 2} L ${x + 4} ${y - 5}`} fill="none" stroke={colors.violet} strokeWidth="1.5" />
  return <SvgFrame label="Two broad stellar life paths after the main sequence: lower- and intermediate-mass stars can become white dwarfs, while high-mass stars can undergo core collapse and leave neutron stars or black holes.">
    <Label x={360} y={34} anchor="middle" color={colors.amber}>A star&apos;s initial mass strongly influences its later path.</Label>
    {node(282, 53, 'main-sequence star', colors.green, 156, 12)}
    <path d="M 360 87 V 115 H 192 V 137 M 360 115 H 528 V 137" fill="none" stroke={colors.dim} strokeWidth="1.5" />
    <path d="M 187 131 L 192 141 L 197 131 M 523 131 L 528 141 L 533 131" fill="none" stroke={colors.violet} strokeWidth="1.5" />
    <rect x="32" y="145" width="320" height="206" fill="none" stroke={colors.grid} />
    <rect x="368" y="145" width="320" height="206" fill="none" stroke={colors.grid} />
    <Label x={192} y={166} anchor="middle" color={colors.amber}>LOWER / INTERMEDIATE INITIAL MASS</Label>
    <Label x={528} y={166} anchor="middle" color={colors.rose}>HIGH INITIAL MASS</Label>
    {node(130, 180, 'red giant', colors.amber)}{node(130, 235, 'planetary nebula', colors.amber)}{node(130, 290, 'white dwarf', colors.violet)}
    {arrow(192, 227)}{arrow(192, 282)}
    {node(443, 180, 'red supergiant', colors.rose, 170)}{node(443, 235, 'core-collapse supernova', colors.rose, 170, 10)}{node(443, 290, 'neutron star or black hole', colors.rose, 170, 10)}
    {arrow(528, 227)}{arrow(528, 282)}
    <Label x={360} y={378} anchor="middle" size={10}>Broad paths only: mass loss, composition, rotation, and binary companions affect the outcome.</Label>
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
  return <SvgFrame label="A circular binary-star example with both stars orbiting their barycentre: the more massive star follows the smaller circle, and their radial velocities vary in opposite directions.">
    <circle cx="360" cy="156" r="116" fill="none" stroke={colors.blue} strokeDasharray="6 5" />
    <circle cx="360" cy="156" r="58" fill="none" stroke={colors.violet} strokeDasharray="6 5" />
    <circle cx="360" cy="156" r="4" fill={colors.paper} />
    <circle cx="302" cy="156" r="12" fill={colors.amber} /><circle cx="476" cy="156" r="8" fill={colors.blue} />
    <Label x={360} y={144} anchor="middle" color={colors.paper}>barycentre</Label>
    <Label x={292} y={124} color={colors.amber} anchor="middle">A · more massive</Label><Label x={476} y={124} color={colors.blue} anchor="middle">B · lighter</Label>
    <Label x={360} y={290} anchor="middle">circular example • mA : mB = 2 : 1 • rA : rB = 1 : 2</Label>
    <Label x={48} y={319} color={colors.muted}>radial velocity</Label>
    <line x1="128" y1="330" x2="620" y2="330" stroke={colors.dim} />
    <path d="M 128 330 C 190 312 230 312 292 330 S 394 348 456 330 S 558 312 620 330" fill="none" stroke={colors.amber} strokeWidth="2" />
    <path d="M 128 330 C 190 366 230 366 292 330 S 394 294 456 330 S 558 366 620 330" fill="none" stroke={colors.blue} strokeWidth="2" />
    <Label x={360} y={378} anchor="middle" size={11}>Opposite Doppler shifts reveal that the two stars move in opposite directions.</Label>
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
    { x: 534, n: '04', title: 'Hubble flow', sub: 'cosmic expansion', color: colors.rose }
  ]
  return <SvgFrame label="Cosmic distance ladder connecting geometric parallax, Cepheid variable stars, Type Ia supernovae, and the calibrated Hubble flow.">
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
  return <SvgFrame label="Two distinct light paths from a distant source bend around a foreground gravitational lens and arrive at the same observer, producing separate apparent images.">
    <Grid />
    <circle cx="360" cy="190" r="35" fill={colors.amber} fillOpacity=".2" stroke={colors.amber} strokeWidth="2" />
    <circle cx="360" cy="190" r="8" fill={colors.amber} />
    <circle cx="95" cy="190" r="10" fill={colors.blue} /><circle cx="632" cy="190" r="8" fill={colors.paper} />
    <path d="M 95 190 C 220 130 275 130 360 130 C 445 130 510 190 632 190" fill="none" stroke={colors.violet} strokeWidth="2.5" />
    <path d="M 95 190 C 220 250 275 250 360 250 C 445 250 510 190 632 190" fill="none" stroke={colors.rose} strokeWidth="2.5" />
    <Label x={95} y={160} color={colors.blue} anchor="middle">distant source</Label>
    <Label x={360} y={140} color={colors.amber} anchor="middle">foreground lens</Label>
    <Label x={632} y={167} color={colors.paper} anchor="end">same observer</Label>
    <Label x={500} y={128} color={colors.violet} anchor="middle">path 1</Label><Label x={500} y={259} color={colors.rose} anchor="middle">path 2</Label>
    <Label x={360} y={370} anchor="middle" size={11}>Different arrival directions make separate apparent images; geometry is not to scale.</Label>
  </SvgFrame>
}

function CelestialSphereArt() {
  return <SvgFrame label="Equatorial coordinates on a projected celestial sphere: right ascension is measured eastward along the celestial equator from the vernal equinox, and declination is measured north or south from the equator.">
    <ellipse cx="353" cy="192" rx="204" ry="140" fill="none" stroke={colors.blue} strokeWidth="2" />
    <ellipse cx="353" cy="192" rx="204" ry="60" fill="none" stroke={colors.green} strokeWidth="2" />
    <ellipse cx="353" cy="192" rx="92" ry="140" fill="none" stroke={colors.dim} strokeDasharray="6 5" />
    <line x1="353" y1="52" x2="353" y2="332" stroke={colors.paper} strokeDasharray="5 5" />
    <path d="M 149 192 A 204 60 0 0 1 474 144" fill="none" stroke={colors.rose} strokeWidth="3" />
    <line x1="474" y1="144" x2="474" y2="96" stroke={colors.amber} strokeWidth="2" />
    <circle cx="474" cy="144" r="4" fill={colors.green} />
    <circle cx="474" cy="96" r="7" fill={colors.violet} />
    <circle cx="149" cy="192" r="5" fill={colors.rose} />
    <circle cx="353" cy="52" r="6" fill={colors.paper} />
    <Label x={366} y={67}>north celestial pole</Label>
    <Label x={490} y={91} color={colors.violet}>celestial object</Label>
    <Label x={520} y={211} color={colors.green}>celestial equator</Label>
    <Label x={114} y={181} color={colors.rose}>vernal equinox γ</Label>
    <Label x={307} y={123} color={colors.rose}>right ascension α</Label>
    <Label x={483} y={125} color={colors.amber}>declination δ</Label>
    <Label x={360} y={371} anchor="middle" size={11}>Right ascension follows the equator; declination is measured north or south of it.</Label>
  </SvgFrame>
}

function HorizonArt() {
  return <SvgFrame label="Two views of local horizon coordinates: altitude is the angle above the horizon in side view, and azimuth is the compass direction around the horizon measured clockwise from north in the top view.">
    <rect x="34" y="58" width="320" height="282" fill="#15131a" stroke={colors.grid} />
    <rect x="366" y="58" width="320" height="282" fill="#15131a" stroke={colors.grid} />
    <Label x={194} y={83} anchor="middle" color={colors.blue}>SIDE VIEW · ALTITUDE</Label>
    <line x1="62" y1="244" x2="326" y2="244" stroke={colors.green} strokeWidth="2" />
    <line x1="172" y1="244" x2="273" y2="151" stroke={colors.violet} strokeWidth="2" />
    <line x1="172" y1="244" x2="292" y2="244" stroke={colors.dim} strokeDasharray="5 5" />
    <circle cx="273" cy="151" r="7" fill={colors.amber} />
    <circle cx="172" cy="244" r="4" fill={colors.paper} />
    <path d="M 208 244 A 36 36 0 0 0 198 220" fill="none" stroke={colors.amber} strokeWidth="2" />
    <Label x={172} y={277} anchor="middle" color={colors.muted}>observer</Label>
    <Label x={278} y={143} color={colors.amber}>object</Label>
    <Label x={216} y={218} color={colors.amber}>altitude h</Label>
    <Label x={62} y={264} color={colors.green}>horizon</Label>
    <Label x={526} y={83} anchor="middle" color={colors.violet}>TOP VIEW · AZIMUTH</Label>
    <circle cx="526" cy="205" r="94" fill="none" stroke={colors.green} strokeWidth="2" />
    <line x1="526" y1="205" x2="526" y2="119" stroke={colors.dim} strokeDasharray="5 5" />
    <line x1="526" y1="205" x2="594" y2="145" stroke={colors.violet} strokeWidth="2" />
    <circle cx="594" cy="145" r="7" fill={colors.amber} />
    <path d="M 526 164 A 41 41 0 0 1 556 177" fill="none" stroke={colors.rose} strokeWidth="2" />
    <circle cx="526" cy="205" r="4" fill={colors.paper} />
    <Label x={526} y={108} anchor="middle" color={colors.paper}>N</Label>
    <Label x={611} y={209} color={colors.paper}>E</Label>
    <Label x={558} y={192} color={colors.rose}>azimuth A</Label>
    <Label x={602} y={139} color={colors.amber}>target</Label>
    <Label x={360} y={374} anchor="middle" size={11}>Altitude is above the horizon; azimuth is measured clockwise from north in this example.</Label>
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

function TransferOrbitArt() {
  return <SvgFrame label="Hohmann transfer from a lower to a higher circular orbit, showing the central body at one focus of the elliptical transfer path and tangential burns at both ends.">
    <circle cx="360" cy="194" r="220" fill="none" stroke={colors.violet} strokeWidth="1.5" strokeDasharray="6 6" />
    <circle cx="360" cy="194" r="120" fill="none" stroke={colors.blue} strokeWidth="1.5" strokeDasharray="6 6" />
    <ellipse cx="410" cy="194" rx="170" ry="120" fill="none" stroke={colors.amber} strokeWidth="2.5" />
    <path d="M 273 112 C 338 65 462 65 528 112" fill="none" stroke={colors.paper} strokeWidth="1.5" strokeDasharray="3 6" />
    <path d="M 519 108 L 530 112 L 522 120" fill="none" stroke={colors.paper} strokeWidth="1.5" />
    <circle cx="360" cy="194" r="11" fill={colors.amber} />
    <circle cx="240" cy="194" r="6" fill={colors.blue} />
    <circle cx="580" cy="194" r="6" fill={colors.violet} />
    <line x1="360" y1="194" x2="240" y2="194" stroke={colors.blue} strokeDasharray="4 4" />
    <line x1="360" y1="194" x2="580" y2="194" stroke={colors.violet} strokeDasharray="4 4" />
    <path d="M 240 194 V 153 M 235 160 L 240 151 L 245 160" stroke={colors.green} strokeWidth="2" fill="none" />
    <path d="M 580 194 V 235 M 575 228 L 580 237 L 585 228" stroke={colors.rose} strokeWidth="2" fill="none" />
    <Label x={360} y={177} color={colors.amber} anchor="middle">central body</Label>
    <Label x={240} y={220} color={colors.blue} anchor="middle">r₁ · departure</Label>
    <Label x={580} y={220} color={colors.violet} anchor="middle">r₂ · arrival</Label>
    <Label x={245} y={145} color={colors.green}>Δv₁</Label>
    <Label x={585} y={253} color={colors.rose}>Δv₂</Label>
    <Label x={410} y={76} color={colors.paper} anchor="middle">half-ellipse coast</Label>
    <Label x={360} y={372} anchor="middle" size={11}>A two-impulse, coplanar transfer between ideal circular orbits.</Label>
  </SvgFrame>
}

function StellarInteriorArt() {
  return <SvgFrame label="Approximate radial structure of a Sun-like star, with a fusion core, radiative zone, and convective envelope.">
    <circle cx="190" cy="190" r="122" fill="#15131a" stroke={colors.blue} strokeWidth="2" />
    <circle cx="190" cy="190" r="86" fill={colors.violet} fillOpacity=".12" stroke={colors.violet} strokeWidth="1.5" />
    <circle cx="190" cy="190" r="30" fill={colors.amber} fillOpacity=".42" stroke={colors.amber} strokeWidth="2" />
    <path d="M 189 186 C 171 178 165 159 180 148 C 198 136 214 155 202 169 C 191 181 181 198 197 211 C 212 224 224 205 211 194" fill="none" stroke={colors.rose} strokeWidth="2" strokeDasharray="3 4" />
    <path d="M 119 143 C 102 164 103 204 121 227 M 112 220 L 121 230 L 124 216" fill="none" stroke={colors.green} strokeWidth="2" />
    <path d="M 261 228 C 278 207 277 166 259 144 M 268 151 L 259 141 L 256 155" fill="none" stroke={colors.green} strokeWidth="2" />
    <line x1="218" y1="177" x2="320" y2="115" stroke={colors.amber} strokeWidth="1" />
    <line x1="248" y1="146" x2="320" y2="190" stroke={colors.violet} strokeWidth="1" />
    <line x1="282" y1="213" x2="320" y2="267" stroke={colors.blue} strokeWidth="1" />
    <Label x={190} y={195} anchor="middle" color={colors.paper}>core</Label>
    <Label x={334} y={107} color={colors.amber}>CORE · fusion</Label>
    <Label x={334} y={186} color={colors.violet}>RADIATIVE ZONE</Label>
    <Label x={334} y={263} color={colors.blue}>CONVECTIVE ENVELOPE</Label>
    <Label x={334} y={286} size={11}>radial transport changes with depth</Label>
    <line x1="68" y1="343" x2="312" y2="343" stroke={colors.dim} />
    <line x1="68" y1="337" x2="68" y2="349" stroke={colors.dim} /><line x1="312" y1="337" x2="312" y2="349" stroke={colors.dim} />
    <Label x={68} y={365} size={10}>0</Label><Label x={312} y={365} size={10} anchor="end">1 R☉</Label>
    <Label x={478} y={366} anchor="middle" size={10}>Approximate solar radial scale</Label>
  </SvgFrame>
}

function GalacticCycleArt() {
  return <SvgFrame label="Galactic baryon cycle linking molecular clouds, new stars, stellar feedback, and gas returned to the interstellar medium.">
    <path d="M 166 162 H 256 M 341 162 H 423 M 510 162 H 584" fill="none" stroke={colors.dim} strokeWidth="1.5" />
    <path d="M 248 157 L 258 162 L 248 167 M 415 157 L 425 162 L 415 167 M 576 157 L 586 162 L 576 167" fill="none" stroke={colors.paper} strokeWidth="1.5" />
    <circle cx="120" cy="154" r="28" fill={colors.blue} fillOpacity=".18" stroke={colors.blue} />
    <circle cx="99" cy="160" r="16" fill="#17151b" stroke={colors.blue} /><circle cx="130" cy="137" r="20" fill="#17151b" stroke={colors.blue} />
    <circle cx="295" cy="158" r="25" fill={colors.amber} fillOpacity=".18" stroke={colors.amber} />
    <circle cx="295" cy="158" r="8" fill={colors.amber} />
    <circle cx="449" cy="145" r="5" fill={colors.paper} /><circle cx="473" cy="166" r="4" fill={colors.blue} /><circle cx="495" cy="143" r="5" fill={colors.paper} /><circle cx="467" cy="132" r="3" fill={colors.amber} />
    <circle cx="624" cy="157" r="27" fill={colors.rose} fillOpacity=".1" stroke={colors.rose} />
    <path d="M 624 120 L 628 146 L 650 133 L 635 154 L 661 160 L 635 165 L 650 187 L 628 171 L 624 197 L 620 171 L 598 187 L 613 165 L 587 160 L 613 154 L 598 133 L 620 146 Z" fill="none" stroke={colors.rose} strokeWidth="1.5" />
    <path d="M 621 187 C 532 300 219 309 125 196" fill="none" stroke={colors.green} strokeWidth="1.5" strokeDasharray="5 5" />
    <path d="M 130 195 L 122 186 L 119 198" fill="none" stroke={colors.green} strokeWidth="1.5" />
    <Label x={120} y={225} anchor="middle" color={colors.blue}>molecular cloud</Label>
    <Label x={295} y={225} anchor="middle" color={colors.amber}>star formation</Label>
    <Label x={472} y={225} anchor="middle" color={colors.paper}>stellar population</Label>
    <Label x={624} y={225} anchor="middle" color={colors.rose}>feedback</Label>
    <Label x={359} y={329} anchor="middle" color={colors.green}>winds and supernovae return energy and enriched gas</Label>
    <Label x={360} y={372} anchor="middle" size={11}>A cycle with inflow, outflow, and recycling—not a closed tank.</Label>
  </SvgFrame>
}

function DetectorWorkflowArt() {
  return <SvgFrame label="Observational workflow showing a raw detector exposure, matched calibration frames, a corrected image, and extracted calibrated flux.">
    <Label x={104} y={63} anchor="middle" color={colors.amber}>PHOTONS</Label>
    <circle cx="104" cy="145" r="13" fill={colors.amber} fillOpacity=".25" stroke={colors.amber} />
    <path d="M 122 145 H 159 M 132 137 L 142 145 L 132 153 M 159 137 L 149 145 L 159 153" fill="none" stroke={colors.amber} strokeWidth="1.5" />
    <Label x={243} y={63} anchor="middle" color={colors.blue}>RAW FRAME</Label>
    <rect x="207" y="105" width="72" height="72" fill="#141218" stroke={colors.blue} />
    <path d="M 231 105 V 177 M 255 105 V 177 M 207 129 H 279 M 207 153 H 279" stroke={colors.grid} />
    <circle cx="229" cy="131" r="3" fill={colors.paper} /><circle cx="260" cy="155" r="4" fill={colors.amber} /><circle cx="246" cy="120" r="2" fill={colors.blue} />
    <path d="M 289 145 H 337 M 312 137 L 322 145 L 312 153" fill="none" stroke={colors.paper} strokeWidth="1.5" />
    <Label x={390} y={63} anchor="middle" color={colors.violet}>CALIBRATION</Label>
    <rect x="354" y="109" width="35" height="29" fill="#15131a" stroke={colors.dim} /><rect x="370" y="136" width="35" height="29" fill="#15131a" stroke={colors.amber} /><rect x="386" y="163" width="35" height="29" fill="#15131a" stroke={colors.violet} />
    <Label x={370} y={128} size={9}>bias</Label><Label x={386} y={155} size={9}>dark</Label><Label x={402} y={182} size={9}>flat</Label>
    <path d="M 430 145 H 481 M 456 137 L 466 145 L 456 153" fill="none" stroke={colors.paper} strokeWidth="1.5" />
    <Label x={570} y={63} anchor="middle" color={colors.green}>MEASURED FLUX</Label>
    <line x1="500" y1="182" x2="644" y2="182" stroke={colors.dim} /><line x1="510" y1="176" x2="510" y2="101" stroke={colors.dim} />
    <path d="M 513 172 C 535 166 542 145 557 137 C 575 126 580 151 593 150 C 608 150 615 126 639 116" fill="none" stroke={colors.green} strokeWidth="2" />
    <circle cx="557" cy="137" r="3" fill={colors.paper} /><circle cx="593" cy="150" r="3" fill={colors.paper} />
    <Label x={571} y={207} anchor="middle" size={10}>standard stars set the zero point</Label>
    <Label x={360} y={372} anchor="middle" size={11}>Each stage adds a measurement model and its own uncertainty.</Label>
  </SvgFrame>
}

function SignalToNoiseArt() {
  const curve = Array.from({ length: 31 }, (_, index) => {
    const t = index / 30
    const x = 104 + t * 528
    const y = 300 - Math.sqrt(t) * 218
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
  return <SvgFrame label="Sky-limited signal-to-noise ratio rises with the square root of exposure time, so four times the exposure yields twice the signal-to-noise in the idealized regime.">
    <Grid x={104} y={62} width={528} height={238} />
    <line x1="104" y1="300" x2="632" y2="300" stroke={colors.paper} /><line x1="104" y1="62" x2="104" y2="300" stroke={colors.paper} />
    <path d={curve} fill="none" stroke={colors.green} strokeWidth="3" />
    <circle cx="236" cy="191" r="5" fill={colors.blue} /><circle cx="632" cy="82" r="5" fill={colors.amber} />
    <line x1="236" y1="191" x2="236" y2="300" stroke={colors.blue} strokeDasharray="4 5" />
    <line x1="632" y1="82" x2="632" y2="300" stroke={colors.amber} strokeDasharray="4 5" />
    <Label x={236} y={175} anchor="middle" color={colors.blue}>t, S/N = ½</Label>
    <Label x={620} y={67} anchor="end" color={colors.amber}>4t, S/N = 1</Label>
    <Label x={366} y={337} anchor="middle">exposure time (relative)</Label>
    <Label x={51} y={80}>signal /</Label><Label x={51} y={97}>noise</Label>
    <Label x={365} y={370} anchor="middle" size={11}>Sky-limited case: S/N ∝ √t; real noise budgets add other terms.</Label>
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
  'transfer-orbit': TransferOrbitArt,
  'stellar-interior': StellarInteriorArt,
  'galactic-cycle': GalacticCycleArt,
  'detector-workflow': DetectorWorkflowArt,
  'signal-to-noise': SignalToNoiseArt,
}

export function DiagramIllustration({ kind, label }: { kind: DiagramKind; label: string }) {
  const Illustration = diagrams[kind]
  return <div className="science-svg-wrap" role="region" aria-label={`Scientific diagram. ${label}`} tabIndex={0}><Illustration /></div>
}
