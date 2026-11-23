import { messierObjects } from '@/data/messier'
import type { MessierObject } from '@/data/messier'

export type MessierCategory = 'galaxies' | 'nebulae' | 'clusters' | 'other'

export function getMessierCategory(type: string): MessierCategory {
  const normalizedType = type.toLocaleLowerCase('en')
  if (normalizedType.includes('galaxy')) return 'galaxies'
  if (normalizedType.includes('nebula') || normalizedType.includes('remnant')) return 'nebulae'
  if (normalizedType.includes('cluster')) return 'clusters'
  return 'other'
}

export function matchesMessierSearch(query: string, object: MessierObject) {
  const normalizedQuery = query.toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, ' ').trim()
  if (!normalizedQuery) return true

  const searchableValues = [
    `m ${object.number}`,
    `m${object.number}`,
    `messier ${object.number}`,
    `messier${object.number}`,
    object.catalog ?? '',
    object.commonName ?? '',
    object.type,
    object.constellation,
  ].map((value) => value.toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, ' ').trim())

  return searchableValues.some((value) => value.includes(normalizedQuery))
}

export function shuffleMessier<T>(items: T[]) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

export const MESSIER_QUIZ_LENGTH = 10
export const MESSIER_QUESTION_SECONDS = 20

export function selectMessierQuizObjects(recentIds: string[], lastSession: string[] = []) {
  const knownIds = new Set(messierObjects.map((object) => object.id))
  const recent = new Set(recentIds.filter((id) => knownIds.has(id)))
  const unseen = shuffleMessier(messierObjects.filter((object) => !recent.has(object.id)))
  const previouslySeen = shuffleMessier(messierObjects.filter((object) => recent.has(object.id)))
  const pool = unseen.length >= MESSIER_QUIZ_LENGTH ? unseen : [...unseen, ...previouslySeen]
  let selection = pool.slice(0, MESSIER_QUIZ_LENGTH)

  const previousSessionIds = new Set(lastSession)
  const repeatsPreviousSet = selection.length === lastSession.length
    && selection.length === MESSIER_QUIZ_LENGTH
    && selection.every((object) => previousSessionIds.has(object.id))
    && previousSessionIds.size === selection.length

  if (repeatsPreviousSet) {
    const alternative = pool.find((object) => !previousSessionIds.has(object.id))
    if (alternative) selection[selection.length - 1] = alternative
    selection = shuffleMessier(selection)
  }

  return selection
}
