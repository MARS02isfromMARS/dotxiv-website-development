'use client'

import { useMemo, useState } from 'react'

function RangeControl({ label, value, min, max, step, output, onChange }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  output: string
  onChange: (value: number) => void
}) {
  return (
    <label className="visualizer-control">
      <span className="visualizer-control__label">{label}<output>{output}</output></span>
      <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

export function OrbitVisualizer() {
  const [eccentricity, setEccentricity] = useState(0.42)
  const [inclination, setInclination] = useState(25)
  const a = 155
  const b = a * Math.sqrt(1 - eccentricity ** 2) * Math.cos((inclination * Math.PI) / 180)
  const centerX = 230
  const centerY = 144
  const focusX = centerX - a * eccentricity
  const speedRatio = (1 + eccentricity) / (1 - eccentricity)

  return (
    <div className="orbit-visualizer">
      <div className="visualizer-controls">
        <RangeControl label="Eccentricity e" value={eccentricity} min={0} max={0.85} step={0.01} output={eccentricity.toFixed(2)} onChange={setEccentricity} />
        <RangeControl label="Inclination i" value={inclination} min={0} max={85} step={1} output={`${inclination}°`} onChange={setInclination} />
      </div>
      <div className="orbit-visualizer__stage">
        <svg viewBox="0 0 460 300" role="img" aria-label={`Projected elliptical orbit with eccentricity ${eccentricity.toFixed(2)} and inclination ${inclination} degrees`}>
          <line x1="34" y1={centerY} x2="426" y2={centerY} stroke="#302c36" strokeDasharray="4 6" />
          <ellipse cx={centerX} cy={centerY} rx={a} ry={Math.max(8, b)} fill="none" stroke="#78a9c8" strokeWidth="2" />
          <line x1={centerX} y1={centerY} x2={centerX + a} y2={centerY} stroke="#d4b37b" strokeWidth="1.5" />
          <circle cx={focusX} cy={centerY} r="9" fill="#d4b37b" />
          <circle cx={centerX - a} cy={centerY} r="5" fill="#9c7cff" />
          <circle cx={centerX + a} cy={centerY} r="5" fill="#9c7cff" />
          <line x1={focusX} y1={centerY - 20} x2={centerX - a} y2={centerY - 20} stroke="#80bca0" strokeDasharray="3 4" />
          <line x1={focusX} y1={centerY + 25} x2={centerX + a} y2={centerY + 25} stroke="#d88c9c" strokeDasharray="3 4" />
          <text x={focusX} y={centerY - 17} fill="#d4b37b" textAnchor="middle" fontSize="12">focus</text>
          <text x={centerX - a} y={centerY + 47} fill="#80bca0" textAnchor="middle" fontSize="11">periapsis</text>
          <text x={centerX + a} y={centerY + 47} fill="#d88c9c" textAnchor="middle" fontSize="11">apoapsis</text>
          <text x={centerX + 32} y={centerY - 8} fill="#d4b37b" fontSize="11">a</text>
          <text x="230" y="280" fill="#a8a3ae" textAnchor="middle" fontSize="11">Apparent minor axis shrinks as inclination approaches edge-on.</text>
        </svg>
      </div>
      <div className="visualizer-readout">
        <div><span>Periapsis distance</span><strong>q / a = {(1 - eccentricity).toFixed(2)}</strong></div>
        <div><span>Apoapsis distance</span><strong>Q / a = {(1 + eccentricity).toFixed(2)}</strong></div>
        <div><span>Speed ratio</span><strong>vₚ / vₐ = {speedRatio.toFixed(2)}</strong></div>
      </div>
      <p className="visualizer-note">The ratio follows vₚ/vₐ = (1 + e)/(1 − e). The projected ellipse is schematic; q and Q are normalized by a.</p>
    </div>
  )
}

function blackbody(lambdaNm: number, temperature: number) {
  const exponent = 1.4388e7 / (lambdaNm * temperature)
  return 1 / (Math.pow(lambdaNm, 5) * (Math.exp(exponent) - 1))
}

export function SpectrumVisualizer() {
  const [temperature, setTemperature] = useState(5800)
  const peakNm = 2.8978e6 / temperature
  const plot = useMemo(() => {
    const values = Array.from({ length: 64 }, (_, index) => {
      const wavelength = 200 + (1400 * index) / 63
      return { wavelength, intensity: blackbody(wavelength, temperature) }
    })
    const peak = Math.max(...values.map((point) => point.intensity))
    return values.map((point, index) => `${index === 0 ? 'M' : 'L'} ${(54 + ((point.wavelength - 200) / 1400) * 440).toFixed(1)} ${(202 - (point.intensity / peak) * 156).toFixed(1)}`).join(' ')
  }, [temperature])

  return (
    <div className="spectrum-visualizer">
      <div className="visualizer-controls"><RangeControl label="Effective temperature" value={temperature} min={2500} max={12000} step={100} output={`${temperature.toLocaleString()} K`} onChange={setTemperature} /></div>
      <div className="spectrum-visualizer__plot-wrap"><svg className="spectrum-visualizer__plot" viewBox="0 0 560 270" role="img" aria-label={`Normalized blackbody spectrum at ${temperature} kelvin, peaking near ${Math.round(peakNm)} nanometres`}>
        {[0, 1, 2, 3].map((line) => <line key={line} x1="54" y1={46 + line * 52} x2="494" y2={46 + line * 52} stroke="#302c36" />)}
        <line x1="54" y1="202" x2="494" y2="202" stroke="#a8a3ae" /><line x1="54" y1="46" x2="54" y2="202" stroke="#a8a3ae" />
        <path d={plot} fill="none" stroke="#d4b37b" strokeWidth="3" />
        {[300, 600, 900, 1200, 1500].map((wavelength) => <g key={wavelength}><line x1={54 + ((wavelength - 200) / 1400) * 440} y1="202" x2={54 + ((wavelength - 200) / 1400) * 440} y2="207" stroke="#a8a3ae" /><text x={54 + ((wavelength - 200) / 1400) * 440} y="225" fill="#a8a3ae" fontSize="11" textAnchor="middle">{wavelength}</text></g>)}
        <line x1={54 + ((peakNm - 200) / 1400) * 440} y1="45" x2={54 + ((peakNm - 200) / 1400) * 440} y2="202" stroke="#9c7cff" strokeDasharray="4 4" />
        <text x="280" y="251" fill="#a8a3ae" fontSize="11" textAnchor="middle">wavelength (nm) • 200–1600</text>
        <text x="54" y="31" fill="#a8a3ae" fontSize="11">relative intensity</text>
      </svg></div>
      <div className="visualizer-readout">
        <div><span>Wien peak</span><strong>λmax ≈ {Math.round(peakNm)} nm</strong></div>
        <div><span>Visible band</span><strong>≈ 400–700 nm</strong></div>
      </div>
      <p className="visualizer-note">Planck’s law is evaluated over 350–900 nm. Curves are normalized independently; height does not represent total luminosity.</p>
    </div>
  )
}

function horizontalCoordinates(latitude: number, declination: number, hourAngle: number) {
  const rad = Math.PI / 180
  const phi = latitude * rad
  const delta = declination * rad
  const hour = hourAngle * 15 * rad
  const up = Math.sin(delta) * Math.sin(phi) + Math.cos(delta) * Math.cos(phi) * Math.cos(hour)
  const north = Math.sin(delta) * Math.cos(phi) - Math.cos(delta) * Math.cos(hour) * Math.sin(phi)
  const east = -Math.cos(delta) * Math.sin(hour)
  const altitude = Math.asin(Math.max(-1, Math.min(1, up))) / rad
  const azimuth = ((Math.atan2(east, north) / rad) + 360) % 360
  return { altitude, azimuth }
}

export function CoordinateVisualizer() {
  const [latitude, setLatitude] = useState(40)
  const [declination, setDeclination] = useState(20)
  const [hourAngle, setHourAngle] = useState(0)
  const { altitude, azimuth } = horizontalCoordinates(latitude, declination, hourAngle)
  const radius = altitude >= 0 ? 93 * ((90 - altitude) / 90) : 105
  const radians = (azimuth * Math.PI) / 180
  const x = 150 + radius * Math.sin(radians)
  const y = 150 - radius * Math.cos(radians)
  const visible = altitude >= 0

  return (
    <div className="coordinate-visualizer">
      <div className="visualizer-controls">
        <RangeControl label="Observer latitude φ" value={latitude} min={-60} max={60} step={1} output={`${latitude}°`} onChange={setLatitude} />
        <RangeControl label="Target declination δ" value={declination} min={-60} max={60} step={1} output={`${declination > 0 ? '+' : ''}${declination}°`} onChange={setDeclination} />
        <RangeControl label="Hour angle H" value={hourAngle} min={-6} max={6} step={0.25} output={`${hourAngle.toFixed(2)} h`} onChange={setHourAngle} />
      </div>
      <div className="coordinate-visualizer__result">
        <svg viewBox="0 0 300 300" role="img" aria-label={`Local sky projection: altitude ${altitude.toFixed(1)} degrees and azimuth ${azimuth.toFixed(1)} degrees`}>
          <circle cx="150" cy="150" r="93" fill="#15131a" stroke="#78a9c8" strokeWidth="2" />
          <ellipse cx="150" cy="150" rx="93" ry="28" fill="none" stroke="#302c36" />
          <line x1="57" y1="150" x2="243" y2="150" stroke="#302c36" /><line x1="150" y1="57" x2="150" y2="243" stroke="#302c36" />
          <circle cx="150" cy="150" r="4" fill="#f3f0ea" />
          <line x1="150" y1="150" x2={x} y2={y} stroke="#d4b37b" strokeDasharray="4 4" />
          <circle cx={x} cy={y} r="7" fill={visible ? '#9c7cff' : '#d88c9c'} />
          <text x="150" y="40" fill="#a8a3ae" fontSize="11" textAnchor="middle">N</text><text x="254" y="154" fill="#a8a3ae" fontSize="11">E</text><text x="150" y="270" fill="#a8a3ae" fontSize="11" textAnchor="middle">S</text><text x="38" y="154" fill="#a8a3ae" fontSize="11" textAnchor="middle">W</text>
          <text x="150" y="292" fill="#a8a3ae" fontSize="10" textAnchor="middle">Local equidistant sky projection</text>
        </svg>
        <div className="coordinate-visualizer__readout">
          <span className="chapter-kicker">Computed horizontal coordinates</span>
          <strong>Altitude <b>{altitude.toFixed(1)}°</b></strong>
          <strong>Azimuth <b>{azimuth.toFixed(1)}°</b></strong>
          <span className={visible ? 'coordinate-visualizer__status is-visible' : 'coordinate-visualizer__status'}>{visible ? 'Above horizon' : 'Below horizon'}</span>
        </div>
      </div>
      <p className="visualizer-note">Azimuth is measured clockwise from north. The star is plotted with an equidistant dome projection; the equations, not the projection, provide the exact altitude and azimuth.</p>
    </div>
  )
}
