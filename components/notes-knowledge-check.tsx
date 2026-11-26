'use client'

import { useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'

type Question = { prompt: string; options: string[]; answer: number; explanation: string }

export function KnowledgeCheck({ title, questions }: { title: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [checked, setChecked] = useState(false)
  const score = questions.reduce((total, question, index) => total + Number(answers[index] === question.answer), 0)
  const allAnswered = Object.keys(answers).length === questions.length

  return (
    <section className="knowledge-check" aria-labelledby="knowledge-check-title">
      <div className="knowledge-check__heading">
        <span className="chapter-kicker">Retrieval practice</span>
        <h2 id="knowledge-check-title">Check your model</h2>
        <p>{title}</p>
      </div>
      <div className="knowledge-check__questions">
        {questions.map((question, questionIndex) => (
          <fieldset className="knowledge-check__question" key={question.prompt}>
            <legend><span>0{questionIndex + 1}</span>{question.prompt}</legend>
            <div className="knowledge-check__options">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[questionIndex] === optionIndex
                const isCorrect = checked && question.answer === optionIndex
                const isWrong = checked && isSelected && !isCorrect
                return (
                  <button
                    type="button"
                    key={option}
                    className={`knowledge-check__option${isSelected ? ' is-selected' : ''}${isCorrect ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      setChecked(false)
                    }}
                  >
                    <span className="knowledge-check__option-mark">{isCorrect ? <Check size={14} aria-hidden="true" /> : isWrong ? <X size={14} aria-hidden="true" /> : String.fromCharCode(65 + optionIndex)}</span>
                    <span>{option}</span>
                  </button>
                )
              })}
            </div>
            {checked && <p className="knowledge-check__explanation">{question.explanation}</p>}
          </fieldset>
        ))}
      </div>
      <div className="knowledge-check__footer">
        <button type="button" className="knowledge-check__submit" disabled={!allAnswered} onClick={() => setChecked(true)}>
          {checked ? 'Check again' : 'Check answers'}
        </button>
        {checked && <button type="button" className="knowledge-check__reset" onClick={() => { setAnswers({}); setChecked(false) }}><RotateCcw size={14} aria-hidden="true" /> Reset</button>}
        <p aria-live="polite" className="knowledge-check__result">{checked ? `${score} of ${questions.length} correct — ${score === questions.length ? 'chapter complete' : 'review the explanations and try again'}.` : allAnswered ? 'Ready when you are.' : `${Object.keys(answers).length} of ${questions.length} answered`}</p>
      </div>
    </section>
  )
}
