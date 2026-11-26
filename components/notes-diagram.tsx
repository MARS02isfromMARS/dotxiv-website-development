import { DiagramIllustration, type DiagramKind } from '@/components/notes-illustrations'

export function ScientificDiagram({
  kind,
  title,
  caption,
  index,
  size = 'standard',
}: {
  kind: DiagramKind
  title: string
  caption: string
  index?: string
  size?: 'standard' | 'hero'
}) {
  const label = `${title}. ${caption}`

  return (
    <figure className={`scientific-diagram scientific-diagram--${size}`}>
      <div className="scientific-diagram__meta">
        <span>{index ?? 'FIGURE'}</span>
        <span>Field plate · scale and model in caption</span>
      </div>
      <DiagramIllustration kind={kind} label={label} />
      <span className="scientific-diagram__hint" aria-hidden="true">Swipe or focus to inspect the full figure</span>
      <figcaption className="scientific-diagram__caption">
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
