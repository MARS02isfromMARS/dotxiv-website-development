import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { noteChapters } from '@/data/note-chapters'
import { noteCollections, noteSections } from '@/data/notes'
import { NotesChapterReader } from '@/components/notes-chapter-reader'
import { SiteHeader } from '@/components/site-header'

type NotePageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return noteSections.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const chapter = noteChapters[slug]
  return chapter
    ? { title: chapter.title, description: chapter.description, alternates: { canonical: `/notes/${slug}` } }
    : { title: 'Astronomy notes' }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const chapter = noteChapters[slug]
  const collection = noteCollections[slug]

  if (!chapter || !collection) notFound()

  return (
    <>
      <SiteHeader />
      <NotesChapterReader chapter={chapter} resources={collection.resources} />
    </>
  )
}
