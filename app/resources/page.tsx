import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { ResourceDirectory } from '@/components/resource-directory'

export const metadata: Metadata = {
  title: 'More resources',
  description: 'A curated guide to astronomy Olympiad notes, problem banks, and resources beyond DotXiv.',
}

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="resources-page page-pad">
        <header className="resources-heading">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Beyond the DotXiv library</p>
          <h1>More resources<br /><em>for curious minds.</em></h1>
          <p>Explore astronomy Olympiad notes, problem banks, and directories from the wider learning community. Each link opens its original site.</p>
        </header>
        <ResourceDirectory />
      </main>
    </>
  )
}
