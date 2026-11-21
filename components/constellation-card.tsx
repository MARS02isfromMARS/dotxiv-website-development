import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Constellation } from '@/lib/constellations'
import { ConstellationImage } from '@/components/constellation-image'

type ConstellationCardProps = {
  constellation: Constellation
  index: number
}

export function ConstellationCard({ constellation, index }: ConstellationCardProps) {
  const chart = constellation.charts[0]
  const alphaStar = constellation.alphaStar
  const featuredDesignations = constellation.bayerDesignations.slice(0, 5)
  const remainingDesignations = constellation.bayerDesignations.length - featuredDesignations.length

  return (
    <article className="constellation-card">
      <Link
        className="constellation-card__image-link"
        href={`/constellations/${constellation.id}`}
        aria-label={`Explore ${constellation.name}`}
      >
        <div className="constellation-card__visual">
          <ConstellationImage
            chart={chart}
            constellationName={constellation.name}
            mode="card"
            showCredit={false}
          />
          <span className="constellation-card__abbreviation">{constellation.abbreviation}</span>
        </div>
      </Link>

      <div className="constellation-card__content">
        <div className="constellation-card__overline">
          <span>IAU CONSTELLATION</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h2 className="constellation-card__title">
          <Link href={`/constellations/${constellation.id}`}>{constellation.name}</Link>
        </h2>
        <p className="constellation-card__latin">{constellation.genitive}</p>

        <div className="constellation-card__field">
          <span className="constellation-card__field-label">Bayer designations</span>
          <div className="constellation-card__chips" aria-label={`${constellation.bayerDesignations.length} Bayer designations`}>
            {featuredDesignations.map((designation) => (
              <span className="constellation-card__chip" key={designation.code} title={designation.fullDesignation}>
                {designation.designation}
              </span>
            ))}
            {remainingDesignations > 0 && (
              <span className="constellation-card__more">+{remainingDesignations}</span>
            )}
          </div>
        </div>

        <div className="constellation-card__alpha">
          <span className="constellation-card__field-label">Alpha star</span>
          {alphaStar ? (
            <>
              <strong>{alphaStar.properName ?? alphaStar.systemDesignation}</strong>
              <span>{alphaStar.designation} · {alphaStar.fullDesignation}</span>
            </>
          ) : (
            <>
              <strong>No α designation</strong>
              <span>Not listed for this constellation in HYG 4.2</span>
            </>
          )}
        </div>

        <div className="constellation-card__footer">
          <a href={chart.sourceUrl} target="_blank" rel="noopener noreferrer">
            IAU chart source
          </a>
          <Link href={`/constellations/${constellation.id}`} aria-label={`Explore ${constellation.name}`}>
            Explore <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
