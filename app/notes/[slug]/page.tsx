import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SubjectDetailView, { type NoteResource } from '@/components/subject-detail-view'
import { astronomySubjects } from '@/lib/astronomy-syllabus'

const noteResourcesBySlug: Record<string, NoteResource[]> = {
  'observational-astronomy': [
    {
      title: 'Celestial Coordinate Systems',
      description: 'A working guide for Astronomy Olympiads (IOAA / BdOAA).',
      versions: [
        { label: 'English PDF', language: 'en', href: '/celestial-coordinate-systems-english.pdf' },
        { label: 'Bangla PDF', language: 'bn', href: '/celestial-coordinate-systems-bangla.pdf' },
      ],
    },
    {
      title: 'Instrumentation - 2',
      description: 'A practical handout on telescope mounts and observational tools for Astronomy Olympiads.',
      versions: [
        { label: 'English PDF', language: 'en', href: '/observation-instrumentation-2-english.pdf' },
        { label: 'Bangla PDF', language: 'bn', href: '/observation-instrumentation-2-bangla.pdf' },
      ],
    },
  ],
}

type NotePageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return astronomySubjects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const subject = astronomySubjects.find((item) => item.slug === slug)

  if (!subject) return { title: 'Study path not found' }

  return {
    title: `${subject.title} study path`,
    description: subject.description,
    alternates: { canonical: `/notes/${subject.slug}` },
    openGraph: {
      title: `${subject.title} | DotXiv`,
      description: subject.description,
      url: `https://dotxiv.vercel.app/notes/${subject.slug}`,
      siteName: 'DotXiv',
      type: 'article',
    },
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const subject = astronomySubjects.find((item) => item.slug === slug)

  if (!subject) notFound()

  return <SubjectDetailView subject={subject} resources={noteResourcesBySlug[slug] ?? []} />
}
