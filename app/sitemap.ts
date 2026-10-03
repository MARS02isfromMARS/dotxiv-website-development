import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dotxiv.vercel.app'
  const slugs = ['celestial-mechanics', 'observational-astronomy', 'stellar-astronomy', 'galactic-astronomy', 'cosmology']

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/notes`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/library`, changeFrequency: 'monthly', priority: 0.8 },
    ...slugs.map((slug) => ({ url: `${baseUrl}/notes/${slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
