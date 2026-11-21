import catalog from '@/data/constellations.json'

export type ConstellationChart = {
  imageUrl: string
  sourceUrl: string
  sourceFilePage: string
  sourceFile: string
  attribution: string
  license: string
  licenseUrl: string
  verified: boolean
}

export type BayerDesignation = {
  code: string
  greekName: string
  symbol: string
  suffix: number | null
  designation: string
  fullDesignation: string
  searchLabels: string[]
}

export type AlphaStar = {
  designation: string
  fullDesignation: string
  systemDesignation: string
  properName: string | null
  components: { designation: string; properName: string | null }[]
  source: string
}

export type Constellation = {
  id: string
  name: string
  abbreviation: string
  genitive: string
  aliases: string[]
  bayerDesignations: BayerDesignation[]
  alphaStar: AlphaStar | null
  charts: ConstellationChart[]
}

export const constellations = catalog.constellations as Constellation[]
export const constellationSources = catalog.sources

export type ConstellationQuizPhoto = {
  imageUrl: string
  sourceUrl: string
  attribution: string
  license: string
  licenseUrl: string
}

const NOIRLAB_PHOTO_IDS: Record<string, string[]> = {
  'corona-australis': ['coronaAustralis'],
  serpens: ['serpens-caput', 'serpens-cauda'],
}

export function getConstellationQuizPhotos(constellationId: string): ConstellationQuizPhoto[] {
  const photoIds = NOIRLAB_PHOTO_IDS[constellationId] ?? [constellationId]

  return photoIds.map((photoId) => ({
    imageUrl: `https://storage.noirlab.edu/media/archives/images/screen/${photoId}.jpg`,
    sourceUrl: `https://noirlab.edu/public/images/${photoId}/`,
    attribution: 'E. Slawik/NOIRLab/NSF/AURA/M. Zamani',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  }))
}

export const QUIZ_LENGTH = 10
export const QUESTION_SECONDS = 10

export function getConstellationById(id: string) {
  return constellations.find((constellation) => constellation.id === id)
}

export function normalizeAnswer(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ς/g, 'σ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9α-ω]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function matchesConstellationAnswer(answer: string, constellation: Constellation) {
  const normalizedAnswer = normalizeAnswer(answer)
  if (!normalizedAnswer) return false

  const acceptedAnswers = [
    constellation.name,
    constellation.abbreviation,
    constellation.genitive,
    ...constellation.aliases,
  ].map(normalizeAnswer)

  return acceptedAnswers.includes(normalizedAnswer)
}

export function matchesConstellationSearch(query: string, constellation: Constellation) {
  const normalizedQuery = normalizeAnswer(query)
  if (!normalizedQuery) return true

  const searchableValues = [
    constellation.name,
    constellation.abbreviation,
    constellation.genitive,
    ...constellation.aliases,
    constellation.alphaStar?.properName ?? '',
    constellation.alphaStar?.designation ?? '',
    constellation.alphaStar?.fullDesignation ?? '',
    ...constellation.bayerDesignations.flatMap((designation) => [
      ...designation.searchLabels,
      `${designation.greekName} ${constellation.abbreviation}`,
    ]),
  ]

  return searchableValues.some((value) => normalizeAnswer(value).includes(normalizedQuery))
}

export function shuffle<T>(items: T[]) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

export function selectQuizConstellations(recentIds: string[], lastSession: string[] = []) {
  const knownIds = new Set(constellations.map((constellation) => constellation.id))
  const recent = new Set(recentIds.filter((id) => knownIds.has(id)))
  const unseen = shuffle(constellations.filter((constellation) => !recent.has(constellation.id)))
  const previouslySeen = shuffle(constellations.filter((constellation) => recent.has(constellation.id)))
  const pool = unseen.length === 0
    ? shuffle(constellations)
    : unseen.length >= QUIZ_LENGTH
      ? unseen
      : [...unseen, ...previouslySeen]

  let selection = pool.slice(0, QUIZ_LENGTH)
  const selectionIds = selection.map((constellation) => constellation.id)
  const repeatsPreviousOrder = selectionIds.length === lastSession.length
    && selectionIds.every((id, index) => id === lastSession[index])

  if (repeatsPreviousOrder) {
    selection = shuffle(selection)
    if (selection.every((constellation, index) => constellation.id === lastSession[index])) {
      ;[selection[0], selection[1]] = [selection[1], selection[0]]
    }
  }

  return selection
}
