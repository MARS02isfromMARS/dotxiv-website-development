'use client'

import { useEffect, useRef, useState } from 'react'
import type { ConstellationChart, ConstellationQuizPhoto } from '@/lib/constellations'

type ConstellationImageProps = {
  chart?: ConstellationChart
  imageSources?: ConstellationQuizPhoto[]
  constellationName: string
  mode?: 'card' | 'detail' | 'quiz' | 'review'
  showCredit?: boolean
}

export function ConstellationImage({
  chart,
  imageSources,
  constellationName,
  mode = 'card',
  showCredit = true,
}: ConstellationImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageStatus, setImageStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const displaySources = imageSources?.length ? imageSources : chart?.verified ? [chart] : []
  const firstImageUrl = displaySources[0]?.imageUrl
  const hasPairedImages = displaySources.length > 1

  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete) return
    setImageStatus(image.naturalWidth > 0 ? 'ready' : 'error')
  }, [firstImageUrl])

  if (!displaySources.length) {
    return (
      <figure className={`constellation-image constellation-image--${mode}`}>
        <div className="constellation-image__pending" role="img" aria-label={`Official IAU image pending for ${constellationName}`}>
          <span>Official IAU image pending</span>
        </div>
      </figure>
    )
  }

  return (
    <figure className={`constellation-image constellation-image--${mode}`}>
      <div className={`constellation-image__frame${hasPairedImages ? ' is-paired' : ''}`}>
        {imageStatus === 'loading' && (
          <div className="constellation-image__loading" role="status">
            <span>{imageSources?.length ? 'Loading unannotated constellation photo' : 'Loading official IAU chart'}</span>
          </div>
        )}
        {imageStatus === 'error' ? (
          <div className="constellation-image__unavailable" role="status">
            <span>{imageSources?.length ? 'Constellation photo unavailable' : 'Official IAU chart unavailable'}</span>
          </div>
        ) : (
          <div className={`constellation-image__image-set${hasPairedImages ? ' constellation-image__image-set--paired' : ''}`}>
            {displaySources.map((source, index) => (
              <img
                key={source.imageUrl}
                ref={index === 0 ? imageRef : undefined}
                className={`constellation-image__img${imageStatus === 'ready' ? ' is-ready' : ''}`}
                src={source.imageUrl}
                alt={index > 0
                  ? ''
                  : mode === 'quiz'
                    ? 'Unannotated night-sky photograph for constellation identification practice'
                    : imageSources?.length
                      ? `Unannotated night-sky photograph of ${constellationName}`
                      : `Official IAU constellation chart for ${constellationName}`}
                aria-hidden={index > 0 ? true : undefined}
                loading={mode === 'card' || mode === 'review' ? 'lazy' : 'eager'}
                decoding="async"
                fetchPriority={mode === 'quiz' && index === 0 ? 'high' : 'auto'}
                onLoad={index === 0 ? () => setImageStatus('ready') : undefined}
                onError={index === 0 ? () => setImageStatus('error') : undefined}
              />
            ))}
          </div>
        )}
      </div>
      {showCredit && imageSources?.length ? (
        <figcaption className="constellation-image__credit">
          <span>{imageSources[0].attribution} · {imageSources[0].license}</span>
          <span className="constellation-image__credit-links">
            {imageSources.map((source, index) => (
              <a key={source.sourceUrl} href={source.sourceUrl} target="_blank" rel="noopener noreferrer">
                {imageSources.length > 1 ? `NOIRLab image ${index + 1}` : 'NOIRLab source'}
              </a>
            ))}
            <a href={imageSources[0].licenseUrl} target="_blank" rel="noopener noreferrer">CC BY 4.0 licence</a>
          </span>
        </figcaption>
      ) : showCredit && chart?.verified ? (
        <figcaption className="constellation-image__credit">
          <span>{chart.attribution} · {chart.license}</span>
          <span className="constellation-image__credit-links">
            <a href={chart.sourceUrl} target="_blank" rel="noopener noreferrer">IAU source</a>
            <a href={chart.sourceFilePage} target="_blank" rel="noopener noreferrer">Image credit &amp; licence</a>
          </span>
        </figcaption>
      ) : null}
    </figure>
  )
}
