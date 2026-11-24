// Add PDFs under public/note-pdfs/<subject>/ and link them from this catalog.
export type NoteLanguage = 'en' | 'bn'

export type NoteResourceVersion = {
  label: string
  language: NoteLanguage
  href: string
}

export type NoteResource = {
  title: string
  description: string
  versions: NoteResourceVersion[]
}

export type NoteCollection = {
  title: string
  resources: NoteResource[]
}

export const noteSections = [
  { title: 'Celestial Mechanics', slug: 'celestial-mechanics' },
  { title: 'Observational Astronomy', slug: 'observational-astronomy' },
  { title: 'Stellar Astronomy', slug: 'stellar-astronomy' },
  { title: 'Galactic Astronomy', slug: 'galactic-astronomy' },
  { title: 'Cosmology', slug: 'cosmology' },
]

export const noteCollections: Record<string, NoteCollection> = {
  'celestial-mechanics': {
    title: 'Celestial mechanics',
    resources: [],
  },
  cosmology: {
    title: 'Cosmology notes',
    resources: [],
  },
  'observational-astronomy': {
    title: 'Observational astronomy',
    resources: [
      {
        title: 'Celestial Coordinate Systems',
        description: 'A working guide for Astronomy Olympiads (IOAA / BdOAA).',
        versions: [
          {
            label: 'English PDF',
            language: 'en',
            href: '/note-pdfs/observational-astronomy/celestial-coordinate-systems-english.pdf',
          },
          {
            label: 'Bangla PDF',
            language: 'bn',
            href: '/note-pdfs/observational-astronomy/celestial-coordinate-systems-bangla.pdf',
          },
        ],
      },
      {
        title: 'Instrumentation - 2',
        description: 'A practical handout on telescope mounts and observational tools for Astronomy Olympiads.',
        versions: [
          {
            label: 'English PDF',
            language: 'en',
            href: '/note-pdfs/observational-astronomy/observation-instrumentation-2-english.pdf',
          },
          {
            label: 'Bangla PDF',
            language: 'bn',
            href: '/note-pdfs/observational-astronomy/observation-instrumentation-2-bangla.pdf',
          },
        ],
      },
    ],
  },
  'stellar-astronomy': {
    title: 'Stellar astronomy',
    resources: [
      {
        title: 'Binary Stars',
        description: 'A guide to visual, spectroscopic, and eclipsing binary systems, orbital dynamics, and stellar mass measurements.',
        versions: [
          {
            label: 'English PDF',
            language: 'en',
            href: '/note-pdfs/stellar-astronomy/binary-stars-english.pdf',
          },
          {
            label: 'Bangla PDF',
            language: 'bn',
            href: '/note-pdfs/stellar-astronomy/binary-stars-bangla.pdf',
          },
        ],
      },
    ],
  },
  'galactic-astronomy': {
    title: 'Galactic astronomy',
    resources: [],
  },
}
