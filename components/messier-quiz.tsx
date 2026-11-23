'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Clock3, RotateCcw, X } from 'lucide-react'
import { messierObjects } from '@/data/messier'
import {
  MESSIER_QUESTION_SECONDS,
  MESSIER_QUIZ_LENGTH,
  selectMessierQuizObjects,
  shuffleMessier,
} from '@/lib/messier'
import type { MessierObject } from '@/data/messier'

type MessierQuestion = { object: MessierObject; choices: MessierObject[] }
type QuizStatus = 'correct' | 'incorrect' | 'unanswered'
type QuizRecord = { question: MessierQuestion; status: QuizStatus; answer: number | null }
type QuizPhase = 'loading' | 'question' | 'feedback' | 'results'
type QuizHistory = { recentIds: string[]; lastSession: string[] }

let quizHistory: QuizHistory = { recentIds: [], lastSession: [] }

function createQuestions() {
  const selected = selectMessierQuizObjects(quizHistory.recentIds, quizHistory.lastSession)
  const questions = selected.map((object) => {
    const distractors = shuffleMessier(messierObjects.filter((candidate) => candidate.id !== object.id)).slice(0, 3)
    return { object, choices: shuffleMessier([object, ...distractors]) }
  })
  const recentIds = [...quizHistory.recentIds]
  for (const object of selected) {
    const previousIndex = recentIds.indexOf(object.id)
    if (previousIndex !== -1) recentIds.splice(previousIndex, 1)
    recentIds.push(object.id)
  }
  quizHistory = { recentIds: recentIds.slice(-messierObjects.length), lastSession: selected.map((object) => object.id) }
  return questions
}

export function MessierQuiz({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const submittedRef = useRef(false)
  const advanceTimerRef = useRef<number | null>(null)
  const [phase, setPhase] = useState<QuizPhase>('loading')
  const [questions, setQuestions] = useState<MessierQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(MESSIER_QUESTION_SECONDS)
  const [records, setRecords] = useState<QuizRecord[]>([])
  const [currentRecord, setCurrentRecord] = useState<QuizRecord | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const startSession = useCallback(() => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    setQuestions(createQuestions())
    setQuestionIndex(0)
    setSecondsLeft(MESSIER_QUESTION_SECONDS)
    setRecords([])
    setCurrentRecord(null)
    setSelectedAnswer(null)
    submittedRef.current = false
    setPhase('question')
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    startSession()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog?.open) dialog.close()
      if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    }
  }, [startSession])

  const currentQuestion = questions[questionIndex]

  const submitAnswer = useCallback((answer: number | null) => {
    if (!currentQuestion || phase !== 'question' || submittedRef.current) return
    submittedRef.current = true
    const status: QuizStatus = answer === null ? 'unanswered' : answer === currentQuestion.object.number ? 'correct' : 'incorrect'
    const record: QuizRecord = { question: currentQuestion, status, answer }
    setCurrentRecord(record)
    setRecords((previous) => [...previous, record])
    setSelectedAnswer(answer)
    if (answer === null) setSecondsLeft(0)
    setPhase('feedback')
  }, [currentQuestion, phase])

  useEffect(() => {
    if (phase !== 'question' || !currentQuestion) return
    submittedRef.current = false
    setSecondsLeft(MESSIER_QUESTION_SECONDS)
    const countdown = window.setInterval(() => setSecondsLeft((remaining) => Math.max(remaining - 1, 0)), 1000)
    const timeout = window.setTimeout(() => submitAnswer(null), MESSIER_QUESTION_SECONDS * 1000)
    return () => {
      window.clearInterval(countdown)
      window.clearTimeout(timeout)
    }
  }, [currentQuestion, phase, questionIndex, submitAnswer])

  const advanceQuestion = useCallback(() => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    if (questionIndex + 1 >= MESSIER_QUIZ_LENGTH) {
      setPhase('results')
      return
    }
    setQuestionIndex((index) => index + 1)
    setCurrentRecord(null)
    setSelectedAnswer(null)
    setPhase('question')
  }, [questionIndex])

  useEffect(() => {
    if (phase !== 'feedback') return
    advanceTimerRef.current = window.setTimeout(advanceQuestion, 1200)
    return () => {
      if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    }
  }, [advanceQuestion, phase])

  useEffect(() => {
    if (phase === 'question' || phase === 'results') titleRef.current?.focus({ preventScroll: true })
  }, [phase, questionIndex])

  const correctCount = records.filter((record) => record.status === 'correct').length
  const progress = phase === 'results' ? MESSIER_QUIZ_LENGTH : questionIndex + (phase === 'feedback' ? 1 : 0)

  return (
    <dialog
      className="constellation-quiz messier-quiz"
      ref={dialogRef}
      aria-labelledby="messier-quiz-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
    >
      <div className="constellation-quiz__layout">
        <header className="constellation-quiz__header">
          <Link className="constellation-quiz__brand" href="/messier" aria-label="DotXiv Messier field guide">
            DOTXIV <span>/</span> MESSIER FIELD TEST
          </Link>
          <div className="constellation-quiz__header-progress" aria-label={`${Math.min(questionIndex + 1, MESSIER_QUIZ_LENGTH)} of ${MESSIER_QUIZ_LENGTH} questions`}>
            <span>QUESTION</span>
            <strong>{String(Math.min(questionIndex + 1, MESSIER_QUIZ_LENGTH)).padStart(2, '0')} <i>/ {MESSIER_QUIZ_LENGTH}</i></strong>
          </div>
          <button className="constellation-quiz__close" type="button" onClick={onClose} aria-label="Close Messier test">
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="constellation-quiz__progress-track" role="progressbar" aria-label="Messier test progress" aria-valuemin={0} aria-valuemax={MESSIER_QUIZ_LENGTH} aria-valuenow={progress}>
          <span style={{ width: `${(progress / MESSIER_QUIZ_LENGTH) * 100}%` }} />
        </div>

        {phase === 'loading' && (
          <main className="constellation-quiz__loading" role="status">
            <span className="constellation-quiz__loading-mark" aria-hidden="true">M</span>
            <h1 id="messier-quiz-title" ref={titleRef} tabIndex={-1}>Preparing your session</h1>
            <p>Choosing ten distinct objects from the 110-entry Messier catalogue.</p>
          </main>
        )}

        {(phase === 'question' || phase === 'feedback') && currentQuestion && (
          <main className="messier-quiz__question-layout">
            <section className="messier-quiz__clue-column" aria-labelledby="messier-quiz-title">
              <p className="constellation-eyebrow">IDENTIFY THE CATALOGUE ENTRY</p>
              <h1 id="messier-quiz-title" ref={titleRef} tabIndex={-1}>Which Messier object fits the clues?</h1>
              <div className={`messier-quiz__clue messier-quiz__clue--${getMessierCategory(currentQuestion.object.type)}`}>
                <span className="messier-quiz__clue-index">FIELD NOTE · {String(questionIndex + 1).padStart(2, '0')}</span>
                <strong>{currentQuestion.object.type}</strong>
                <dl>
                  <div><dt>Constellation</dt><dd>{currentQuestion.object.constellation}</dd></div>
                  <div><dt>Catalogue cross-reference</dt><dd>{currentQuestion.object.catalog ?? 'No NGC / IC number'}</dd></div>
                  <div><dt>Apparent magnitude</dt><dd>{currentQuestion.object.magnitude.toFixed(1)}</dd></div>
                </dl>
              </div>
              <p className="messier-quiz__note">No image or object name is shown: match the catalogue clues from memory.</p>
            </section>

            <section className="messier-quiz__answer-column" aria-label="Choose a Messier number">
              {phase === 'question' ? (
                <>
                  <div className={`constellation-quiz__timer${secondsLeft <= 3 ? ' is-urgent' : ''}`} role="timer" aria-label={`${secondsLeft} seconds remaining`}>
                    <Clock3 aria-hidden="true" />
                    <strong>{String(secondsLeft).padStart(2, '0')}</strong>
                    <span>SECONDS</span>
                  </div>
                  <p className="messier-quiz__answer-prompt">Choose one object from the catalogue.</p>
                  <div className="messier-quiz__choices">
                    {currentQuestion.choices.map((choice, index) => (
                      <button
                        className="messier-quiz__choice"
                        type="button"
                        key={choice.id}
                        onClick={() => submitAnswer(choice.number)}
                        aria-label={`Choice ${index + 1}: Messier ${choice.number}`}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>
                        M{String(choice.number).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                  <p className="constellation-quiz__score">SCORE <strong>{correctCount} / {MESSIER_QUIZ_LENGTH}</strong></p>
                </>
              ) : currentRecord ? (
                <div className={`constellation-quiz__feedback constellation-quiz__feedback--${currentRecord.status}`} role="status" aria-live="polite">
                  <span className="constellation-quiz__feedback-icon" aria-hidden="true">
                    {currentRecord.status === 'correct' ? <Check /> : currentRecord.status === 'unanswered' ? <Clock3 /> : <X />}
                  </span>
                  <span className="constellation-quiz__feedback-label">
                    {currentRecord.status === 'correct' ? 'CORRECT' : currentRecord.status === 'unanswered' ? 'TIME EXPIRED' : 'NOT QUITE'}
                  </span>
                  <h2>M{String(currentQuestion.object.number).padStart(2, '0')} · {currentQuestion.object.commonName ?? currentQuestion.object.type}</h2>
                  <p>
                    {currentRecord.status === 'correct'
                      ? 'A precise read of the catalogue clues.'
                      : currentRecord.status === 'unanswered'
                        ? 'No answer was selected before the clock ran out.'
                        : `Your answer: M${String(selectedAnswer).padStart(2, '0')}`}
                  </p>
                  <button className="constellation-button constellation-button--quiet" type="button" onClick={advanceQuestion}>
                    {questionIndex + 1 === MESSIER_QUIZ_LENGTH ? 'See results' : 'Next question'} <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </section>
          </main>
        )}

        {phase === 'results' && (
          <main className="constellation-quiz__results">
            <div className="constellation-quiz__results-heading">
              <p className="constellation-eyebrow">SESSION COMPLETE</p>
              <h1 id="messier-quiz-title" ref={titleRef} tabIndex={-1}>Your Messier field test.</h1>
              <p>You identified {correctCount} of {MESSIER_QUIZ_LENGTH} catalogue entries.</p>
            </div>
            <div className="constellation-quiz__result-stats" aria-label="Messier test results">
              <div className="constellation-quiz__result-score"><span>SCORE</span><strong>{correctCount}<i> / {MESSIER_QUIZ_LENGTH}</i></strong></div>
              <div><span>ACCURACY</span><strong>{Math.round((correctCount / MESSIER_QUIZ_LENGTH) * 100)}%</strong></div>
              <div><span>INCORRECT</span><strong>{records.filter((record) => record.status === 'incorrect').length}</strong></div>
              <div><span>UNANSWERED</span><strong>{records.filter((record) => record.status === 'unanswered').length}</strong></div>
            </div>
            <div className="constellation-quiz__result-actions">
              <button className="constellation-button constellation-button--primary" type="button" onClick={startSession}>
                <RotateCcw aria-hidden="true" /> Try a new set
              </button>
              <button className="constellation-button constellation-button--quiet" type="button" onClick={onClose}>Back to catalogue</button>
            </div>
            <section className="messier-quiz__answer-key" aria-labelledby="messier-quiz-review-title">
              <h2 id="messier-quiz-review-title">Answer key</h2>
              <ol>
                {records.map((record, index) => (
                  <li key={`${record.question.object.id}-${index}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>M{String(record.question.object.number).padStart(2, '0')}</strong>
                    <span>{record.question.object.commonName ?? record.question.object.type}</span>
                    <span className={`messier-quiz__status is-${record.status}`}>{record.status}</span>
                  </li>
                ))}
              </ol>
            </section>
          </main>
        )}
      </div>
    </dialog>
  )
}

function getMessierCategory(type: string) {
  const normalizedType = type.toLocaleLowerCase('en')
  if (normalizedType.includes('galaxy')) return 'galaxies'
  if (normalizedType.includes('nebula') || normalizedType.includes('remnant')) return 'nebulae'
  if (normalizedType.includes('cluster')) return 'clusters'
  return 'other'
}
