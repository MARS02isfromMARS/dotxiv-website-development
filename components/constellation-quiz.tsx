'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, RotateCcw, X } from 'lucide-react'
import { ConstellationImage } from '@/components/constellation-image'
import {
  constellations,
  matchesConstellationAnswer,
  QUESTION_SECONDS,
  QUIZ_LENGTH,
  selectQuizConstellations,
  shuffle,
} from '@/lib/constellations'
import type { Constellation, ConstellationChart } from '@/lib/constellations'

type QuizQuestion = {
  constellation: Constellation
  chart: ConstellationChart
}

type QuizRecord = QuizQuestion & {
  status: 'correct' | 'incorrect' | 'unanswered'
  answer: string
}

type QuizPhase = 'loading' | 'question' | 'feedback' | 'results' | 'error'

type QuizHistory = {
  recentIds: string[]
  lastSession: string[]
}

const HISTORY_KEY = 'dotxiv.constellations.quiz-history.v1'

function readQuizHistory(): QuizHistory {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return { recentIds: [], lastSession: [] }
    const parsed = JSON.parse(raw) as Partial<QuizHistory>
    return {
      recentIds: Array.isArray(parsed.recentIds) ? parsed.recentIds.filter((id): id is string => typeof id === 'string') : [],
      lastSession: Array.isArray(parsed.lastSession) ? parsed.lastSession.filter((id): id is string => typeof id === 'string') : [],
    }
  } catch {
    return { recentIds: [], lastSession: [] }
  }
}

function writeQuizHistory(history: QuizHistory) {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    return
  }
}

export function ConstellationQuiz({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const draftRef = useRef('')
  const submittedRef = useRef(false)
  const preparationTimerRef = useRef<number | null>(null)
  const advanceTimerRef = useRef<number | null>(null)
  const [phase, setPhase] = useState<QuizPhase>('loading')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS)
  const [draft, setDraft] = useState('')
  const [records, setRecords] = useState<QuizRecord[]>([])
  const [currentRecord, setCurrentRecord] = useState<QuizRecord | null>(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const startSession = useCallback(() => {
    if (preparationTimerRef.current !== null) window.clearTimeout(preparationTimerRef.current)
    setPhase('loading')
    setQuestions([])
    setQuestionIndex(0)
    setRecords([])
    setCurrentRecord(null)
    setReviewOpen(false)
    setDraft('')
    draftRef.current = ''
    setErrorMessage('')

    preparationTimerRef.current = window.setTimeout(() => {
      try {
        const history = readQuizHistory()
        const selected = selectQuizConstellations(history.recentIds, history.lastSession)
        if (selected.length !== QUIZ_LENGTH) throw new Error('The quiz could not prepare ten unique questions.')

        const session = selected.map((constellation) => ({
          constellation,
          chart: shuffle(constellation.charts)[0],
        }))
        const recentIds = [...history.recentIds]
        for (const question of session) {
          const previousIndex = recentIds.indexOf(question.constellation.id)
          if (previousIndex !== -1) recentIds.splice(previousIndex, 1)
          recentIds.push(question.constellation.id)
        }

        writeQuizHistory({
          recentIds: recentIds.slice(-constellations.length),
          lastSession: session.map((question) => question.constellation.id),
        })
        setQuestions(session)
        setPhase('question')
      } catch {
        setErrorMessage('We could not prepare a new session. Try starting the test again.')
        setPhase('error')
      }
    }, 80)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog?.open) dialog.close()
      if (preparationTimerRef.current !== null) window.clearTimeout(preparationTimerRef.current)
      if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    }
  }, [])

  useEffect(() => {
    startSession()
  }, [startSession])

  const currentQuestion = questions[questionIndex]

  const submitQuestion = useCallback((timedOut = false) => {
    if (!currentQuestion || phase !== 'question' || submittedRef.current) return
    submittedRef.current = true

    const answer = timedOut ? '' : draftRef.current.trim()
    const status: QuizRecord['status'] = timedOut
      ? 'unanswered'
      : matchesConstellationAnswer(answer, currentQuestion.constellation)
        ? 'correct'
        : 'incorrect'
    const record: QuizRecord = { ...currentQuestion, status, answer }

    setCurrentRecord(record)
    setRecords((previous) => [...previous, record])
    if (timedOut) setSecondsLeft(0)
    setPhase('feedback')
  }, [currentQuestion, phase])

  useEffect(() => {
    if (phase !== 'question' || !currentQuestion) return

    submittedRef.current = false
    setSecondsLeft(QUESTION_SECONDS)
    const countdown = window.setInterval(() => {
      setSecondsLeft((remaining) => Math.max(remaining - 1, 0))
    }, 1000)
    const timeout = window.setTimeout(() => submitQuestion(true), QUESTION_SECONDS * 1000)

    return () => {
      window.clearInterval(countdown)
      window.clearTimeout(timeout)
    }
  }, [currentQuestion, phase, questionIndex, submitQuestion])

  const advanceQuestion = useCallback(() => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    if (questionIndex + 1 >= QUIZ_LENGTH) {
      setPhase('results')
      return
    }
    setQuestionIndex((index) => index + 1)
    setDraft('')
    draftRef.current = ''
    setCurrentRecord(null)
    setPhase('question')
  }, [questionIndex])

  useEffect(() => {
    if (phase !== 'feedback') return
    advanceTimerRef.current = window.setTimeout(advanceQuestion, 1100)
    return () => {
      if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current)
    }
  }, [advanceQuestion, phase])

  useEffect(() => {
    if (phase === 'question' || phase === 'results' || phase === 'error') {
      titleRef.current?.focus({ preventScroll: true })
    }
  }, [phase, questionIndex])

  const correctCount = records.filter((record) => record.status === 'correct').length
  const incorrectCount = records.filter((record) => record.status === 'incorrect').length
  const unansweredCount = records.filter((record) => record.status === 'unanswered').length
  const progress = phase === 'results' ? 100 : Math.round(((questionIndex + (phase === 'feedback' ? 1 : 0)) / QUIZ_LENGTH) * 100)

  return (
    <dialog
      className="constellation-quiz"
      ref={dialogRef}
      aria-labelledby="constellation-quiz-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="constellation-quiz__layout">
        <header className="constellation-quiz__header">
          <Link className="constellation-quiz__brand" href="/constellations" aria-label="DotXiv constellation field guide">
            DOTXIV <span>/</span> FIELD EXERCISE
          </Link>
          <div className="constellation-quiz__header-progress" aria-label={`${Math.min(questionIndex + 1, QUIZ_LENGTH)} of ${QUIZ_LENGTH} questions`}>
            <span>QUESTION</span>
            <strong>{String(Math.min(questionIndex + 1, QUIZ_LENGTH)).padStart(2, '0')} <i>/ {QUIZ_LENGTH}</i></strong>
          </div>
          <button className="constellation-quiz__close" type="button" onClick={onClose} aria-label="Close quick test">
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="constellation-quiz__progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={QUIZ_LENGTH} aria-valuenow={phase === 'results' ? QUIZ_LENGTH : questionIndex}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {phase === 'loading' && (
          <main className="constellation-quiz__loading" role="status">
            <span className="constellation-quiz__loading-mark" aria-hidden="true">α</span>
            <h1 id="constellation-quiz-title" ref={titleRef} tabIndex={-1}>Preparing your session</h1>
            <p>Shuffling ten unique charts from the 88-constellation atlas.</p>
          </main>
        )}

        {phase === 'error' && (
          <main className="constellation-quiz__loading" role="alert">
            <h1 id="constellation-quiz-title" ref={titleRef} tabIndex={-1}>Session unavailable</h1>
            <p>{errorMessage}</p>
            <button className="constellation-button constellation-button--primary" type="button" onClick={startSession}>
              <RotateCcw aria-hidden="true" /> Try again
            </button>
          </main>
        )}

        {(phase === 'question' || phase === 'feedback') && currentQuestion && (
          <main className="constellation-quiz__question-layout">
            <section className="constellation-quiz__chart-column" aria-labelledby="constellation-quiz-title">
              <div className="constellation-quiz__question-kicker">
                <span>IDENTIFY THIS CONSTELLATION</span>
                <span>{correctCount} CORRECT</span>
              </div>
              <h1 id="constellation-quiz-title" ref={titleRef} tabIndex={-1}>Read the pattern.</h1>
              <div className="constellation-quiz__chart-wrap">
                <ConstellationImage
                  key={currentQuestion.chart.imageUrl}
                  chart={currentQuestion.chart}
                  constellationName={currentQuestion.constellation.name}
                  mode="quiz"
                  concealName={phase === 'question'}
                />
              </div>
            </section>

            <section className="constellation-quiz__answer-column" aria-label="Your answer">
              {phase === 'question' ? (
                <>
                  <div className={`constellation-quiz__timer${secondsLeft <= 3 ? ' is-urgent' : ''}`} role="timer" aria-label={`${secondsLeft} seconds remaining`}>
                    <Clock3 aria-hidden="true" />
                    <strong>{String(secondsLeft).padStart(2, '0')}</strong>
                    <span>SECONDS</span>
                  </div>
                  <label className="constellation-quiz__answer-label" htmlFor="constellation-quiz-answer">Constellation name</label>
                  <input
                    ref={inputRef}
                    id="constellation-quiz-answer"
                    className="constellation-quiz__answer-input"
                    type="text"
                    autoComplete="off"
                    autoCapitalize="words"
                    spellCheck={false}
                    value={draft}
                    onChange={(event) => {
                      setDraft(event.target.value)
                      draftRef.current = event.target.value
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' || event.nativeEvent.isComposing || event.keyCode === 229) return
                      event.preventDefault()
                      submitQuestion()
                    }}
                    placeholder="Type a constellation"
                  />
                  <p className="constellation-quiz__answer-hint">Common names and extra spaces are accepted.</p>
                  <button className="constellation-button constellation-button--primary constellation-quiz__submit" type="button" onClick={() => submitQuestion()}>
                    Submit answer <ArrowRight aria-hidden="true" />
                  </button>
                  <p className="constellation-quiz__score">SCORE <strong>{correctCount} / {QUIZ_LENGTH}</strong></p>
                </>
              ) : currentRecord ? (
                <div className={`constellation-quiz__feedback constellation-quiz__feedback--${currentRecord.status}`} role="status" aria-live="polite">
                  <span className="constellation-quiz__feedback-icon" aria-hidden="true">
                    {currentRecord.status === 'correct' ? <Check /> : currentRecord.status === 'unanswered' ? <Clock3 /> : <X />}
                  </span>
                  <span className="constellation-quiz__feedback-label">
                    {currentRecord.status === 'correct' ? 'CORRECT' : currentRecord.status === 'unanswered' ? 'TIME EXPIRED' : 'NOT QUITE'}
                  </span>
                  <h2>{currentQuestion.constellation.name}</h2>
                  <p>
                    {currentRecord.status === 'correct'
                      ? 'A clear read of the star pattern.'
                      : currentRecord.status === 'unanswered'
                        ? 'No answer was submitted before the clock ran out.'
                        : `Your answer: ${currentRecord.answer || 'No answer submitted'}`}
                  </p>
                  <button className="constellation-button constellation-button--quiet" type="button" onClick={advanceQuestion}>
                    {questionIndex + 1 === QUIZ_LENGTH ? 'See results' : 'Next question'} <ArrowRight aria-hidden="true" />
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
              <h1 id="constellation-quiz-title" ref={titleRef} tabIndex={-1}>A good night&apos;s work.</h1>
              <p>Your ten-chart constellation identification test is complete.</p>
            </div>

            <div className="constellation-quiz__result-stats" aria-label="Quiz results">
              <div className="constellation-quiz__result-score"><span>SCORE</span><strong>{correctCount}<i> / {QUIZ_LENGTH}</i></strong></div>
              <div><span>ACCURACY</span><strong>{Math.round((correctCount / QUIZ_LENGTH) * 100)}%</strong></div>
              <div><span>INCORRECT</span><strong>{incorrectCount}</strong></div>
              <div><span>UNANSWERED</span><strong>{unansweredCount}</strong></div>
            </div>

            <div className="constellation-quiz__result-actions">
              <button className="constellation-button constellation-button--primary" type="button" onClick={() => setReviewOpen((open) => !open)} aria-expanded={reviewOpen}>
                {reviewOpen ? <ArrowLeft aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
                {reviewOpen ? 'Back to results' : 'Review answers'}
              </button>
              <button className="constellation-button constellation-button--quiet" type="button" onClick={startSession}>
                <RotateCcw aria-hidden="true" /> Try again
              </button>
            </div>

            {reviewOpen && (
              <section className="constellation-quiz__review" aria-labelledby="constellation-quiz-review-title">
                <div className="constellation-quiz__review-heading">
                  <div>
                    <p className="constellation-eyebrow">ANSWER KEY</p>
                    <h2 id="constellation-quiz-review-title">Review the charts.</h2>
                  </div>
                  <span>{records.length} questions</span>
                </div>
                <div className="constellation-quiz__review-list">
                  {records.map((record, index) => (
                    <article className="constellation-quiz__review-card" key={`${record.constellation.id}-${index}`}>
                      <ConstellationImage
                        key={record.chart.imageUrl}
                        chart={record.chart}
                        constellationName={record.constellation.name}
                        mode="review"
                      />
                      <div className="constellation-quiz__review-copy">
                        <span className={`constellation-quiz__review-status is-${record.status}`}>
                          QUESTION {String(index + 1).padStart(2, '0')} · {record.status === 'unanswered' ? 'UNANSWERED' : record.status.toUpperCase()}
                        </span>
                        <h3>{record.constellation.name}</h3>
                        <p><span>Your answer</span>{record.answer || 'No answer submitted'}</p>
                        <p><span>Correct answer</span>{record.constellation.name}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </main>
        )}
      </div>
    </dialog>
  )
}
