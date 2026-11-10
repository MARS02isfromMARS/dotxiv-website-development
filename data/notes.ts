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
    resources: [],
  },
  'galactic-astronomy': {
    title: 'Galactic astronomy',
    resources: [],
  },
}
