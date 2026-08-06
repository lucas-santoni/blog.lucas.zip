import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { API_EXCLUDE_SLUGS } from '../config'

// `slug` is the bare slug and is what the 404 page fuzzy-matches against;
// `path` is the actual URL. They differ for journal entries, which live under
// /journal/. Matching on `path` would penalise every journal entry by the
// length of the prefix and effectively hide them from "did you mean".
type Row = { title: string; slug: string; path: string; type: string }

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts')
  const pages = await getCollection('pages')
  const journal = await getCollection('journal')

  const rows: Row[] = [
    ...posts.map((entry) => ({ entry, type: 'post', prefix: '' })),
    ...pages.map((entry) => ({ entry, type: 'page', prefix: '' })),
    ...journal.map((entry) => ({ entry, type: 'journal', prefix: 'journal/' })),
  ]
    .filter(({ entry }) => !API_EXCLUDE_SLUGS.has(entry.data.slug))
    .map(({ entry, type, prefix }) => ({
      title: entry.data.title,
      slug: entry.data.slug,
      path: `/${prefix}${entry.data.slug}`,
      type,
    }))

  return new Response(JSON.stringify(rows), {
    headers: { 'Content-Type': 'application/json' },
  })
}
