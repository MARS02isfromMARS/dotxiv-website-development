'use client'

import { useEffect, useRef, useState } from 'react'
import type { ConstellationChart } from '@/lib/constellations'

type ConstellationImageProps = {
  chart?: ConstellationChart
  constellationName: string
  mode?: 'card' | 'detail' | 'quiz' | 'review'
  showCredit?: boolean
}

export function ConstellationImage({
  chart,
  constellationName,
  mode = 'card',
  showCredit = true,
}: ConstellationImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageStatus, setImageStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete) return
    setImageStatus(image.naturalWidth > 0 ? 'ready' : 'error')
  }, [chart?.imageUrl])

  if (!chart || !chart.verified) {
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
      <div className="constellation-image__frame">
        {imageStatus === 'loading' && (
          <div className="constellation-image__loading" role="status">
            <span>Loading official IAU chart</span>
          </div>
        )}
        {imageStatus === 'error' ? (
          <div className="constellation-image__unavailable" role="status">
            <span>Official IAU chart unavailable</span>
          </div>
        ) : (
          <img
            ref={imageRef}
            className={`constellation-image__img${imageStatus === 'ready' ? ' is-ready' : ''}`}
            src={chart.imageUrl}
            alt={`Official IAU constellation chart for ${constellationName}`}
            loading={mode === 'card' ? 'lazy' : 'eager'}
            decoding="async"
            fetchPriority={mode === 'quiz' ? 'high' : 'auto'}
            onLoad={() => setImageStatus('ready')}
            onError={() => setImageStatus('error')}
          />
        )}
      </div>
      {showCredit && (
        <figcaption className="constellation-image__credit">
          <span>{chart.attribution} · {chart.license}</span>
          <span className="constellation-image__credit-links">
            <a href={chart.sourceUrl} target="_blank" rel="noopener noreferrer">IAU source</a>
            <a href={chart.sourceFilePage} target="_blank" rel="noopener noreferrer">Image credit &amp; licence</a>
          </span>
        </figcaption>
      )}
    </figure>
  )
}
