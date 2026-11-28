import type { ReactNode } from 'react'
import katex from 'katex'

export function ConceptBreakdown({
  title = 'Read the diagram in three moves',
  steps,
}: {
  title?: string
  steps: { title: string; body: string }[]
}) {
  return (
    <section className="concept-breakdown" aria-label={title}>
      <div className="concept-breakdown__heading"><span className="chapter-kicker">Start with the picture</span><h3>{title}</h3><p>First identify what is being shown. Then follow what changes, what stays fixed, and what the labels measure.</p></div>
      <ol className="concept-breakdown__steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="concept-breakdown__number">0{index + 1}</span>
            <div><h4>{step.title}</h4><p>{step.body}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function EquationExplainer({
  title,
  latex,
  variables,
  note,
}: {
  title: string
  latex: string
  variables: { symbol: string; meaning: string }[]
  note?: string
}) {
  return (
    <section className="equation-explainer" aria-label={title}>
      <div className="equation-explainer__top"><span className="chapter-kicker">The relationship</span><span className="equation-explainer__label">KEY EQUATION</span></div>
      <h3>{title}</h3>
      <div className="equation-explainer__formula" role="math" aria-label={title} dangerouslySetInnerHTML={{ __html: katex.renderToString(latex, { displayMode: true, output: 'htmlAndMathml', throwOnError: false }) }} />
      <dl className="equation-explainer__variables">
        {variables.map((variable) => <div key={`${variable.symbol}-${variable.meaning}`}><dt>{variable.symbol}</dt><dd>{variable.meaning}</dd></div>)}
      </dl>
      {note && <p className="equation-explainer__note">{note}</p>}
    </section>
  )
}

export function CompareVisual({
  title,
  left,
  right,
}: {
  title: string
  left: { label: string; title: string; body: string; accent?: 'violet' | 'blue' | 'amber' }
  right: { label: string; title: string; body: string; accent?: 'violet' | 'blue' | 'amber' }
}) {
  return (
    <section className="compare-visual" aria-label={title}>
      <h3>{title}</h3>
      <div className="compare-visual__grid">
        {[left, right].map((item) => (
          <article className={`compare-visual__item compare-visual__item--${item.accent ?? 'violet'}`} key={item.label}>
            <span>{item.label}</span><h4>{item.title}</h4><p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function QuickInsight({ children }: { children: ReactNode }) {
  return <aside className="quick-insight"><span className="chapter-kicker">Olympiad insight</span><p>{children}</p></aside>
}

export function CommonMistake({ children }: { children: ReactNode }) {
  return <aside className="common-mistake"><span className="chapter-kicker">Common misconception</span><p>{children}</p></aside>
}
