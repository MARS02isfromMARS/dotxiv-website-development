import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Constellation } from '@/lib/constellations'
import { ConstellationImage } from '@/components/constellation-image'

type ConstellationDetailProps = {
  constellation: Constellation
}

export function ConstellationDetail({ constellation }: ConstellationDetailProps) {
  const alphaStar = constellation.alphaStar

  return (
    <div className="constellation-detail">
      <Link className="constellation-detail__back" href="/constellations">
        <ArrowLeft aria-hidden="true" /> Back to all constellations
      </Link>

      <header className="constellation-detail__header">
        <p className="constellation-eyebrow">FIELD GUIDE · {constellation.abbreviation}</p>
        <h1>{constellation.name}</h1>
        <p className="constellation-detail__latin">Latin genitive: <em>{constellation.genitive}</em></p>
        <p className="constellation-detail__summary">
          Explore the official IAU chart, Bayer star designations, and the Alpha star associated with {constellation.name}.
        </p>
      </header>

      <div className="constellation-detail__layout">
        <section className="constellation-detail__chart-section" aria-labelledby="constellation-charts-title">
          <div className="constellation-detail__section-heading">
            <div>
              <span className="constellation-eyebrow">SOURCE CHARTS</span>
              <h2 id="constellation-charts-title">Official IAU chart{constellation.charts.length > 1 ? 's' : ''}</h2>
            </div>
            <span>{constellation.charts.length} verified image{constellation.charts.length > 1 ? 's' : ''}</span>
          </div>
          <div className="constellation-detail__charts">
            {constellation.charts.map((chart) => (
              <ConstellationImage
                key={chart.sourceFile}
                chart={chart}
                constellationName={constellation.name}
                mode="detail"
              />
            ))}
          </div>
        </section>

        <aside className="constellation-detail__facts" aria-label={`${constellation.name} star information`}>
          <section className="constellation-detail__fact constellation-detail__fact--alpha">
            <span className="constellation-detail__fact-label">ALPHA STAR</span>
            {alphaStar ? (
              <>
                <h2>{alphaStar.properName ?? alphaStar.systemDesignation}</h2>
                <p className="constellation-detail__designation">{alphaStar.designation} · {alphaStar.fullDesignation}</p>
                {!alphaStar.properName && <p>No proper name is listed in the HYG 4.2 catalog.</p>}
                {alphaStar.components.length > 1 && (
                  <ul className="constellation-detail__components" aria-label="Alpha star components">
                    {alphaStar.components.map((component) => (
                      <li key={component.designation}>
                        <span>{component.designation}</span>
                        <span>{component.properName ?? 'No proper name listed'}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <a href="https://www.astronexus.com/projects/hyg" target="_blank" rel="noopener noreferrer">
                  HYG star catalog <ArrowUpRight aria-hidden="true" />
                </a>
              </>
            ) : (
              <>
                <h2>Not assigned</h2>
                <p>No α Bayer designation is listed for {constellation.name} in HYG 4.2.</p>
                <a href="https://www.astronexus.com/projects/hyg" target="_blank" rel="noopener noreferrer">
                  HYG star catalog <ArrowUpRight aria-hidden="true" />
                </a>
              </>
            )}
          </section>

          <section className="constellation-detail__fact">
            <div className="constellation-detail__section-heading">
              <div>
                <span className="constellation-detail__fact-label">STAR INDEX</span>
                <h2>Bayer designations</h2>
              </div>
              <span>{constellation.bayerDesignations.length}</span>
            </div>
            <p className="constellation-detail__fact-copy">
              Greek-letter identifiers are shown with the IAU abbreviation. Select a designation to see its full catalog form.
            </p>
            <ul className="constellation-detail__designation-list">
              {constellation.bayerDesignations.map((designation) => (
                <li key={designation.code} title={designation.fullDesignation}>
                  <strong>{designation.designation}</strong>
                  <span>{designation.fullDesignation}</span>
                </li>
              ))}
            </ul>
            <p className="constellation-detail__source-note">
              Designations and proper names: <a href="https://www.astronexus.com/projects/hyg" target="_blank" rel="noopener noreferrer">HYG Database v4.2</a> · CC BY-SA 4.0.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
