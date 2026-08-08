import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITENAME } from '../../config'
import { deriveDescription } from '../../utils/journal'

export async function GET(context: APIContext) {
  const entries = (await getCollection('journal')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )

  return rss({
    title: `${SITENAME} — Journal`,
    description:
      'Des notes sur ce que je lis, joue, regarde et écoute, avec quelques pensées en vrac.',
    site: context.site!,
    customData: '<language>fr</language>',
    items: entries.map((entry) => ({
      title: entry.data.title.replace(/<[^>]+>/g, ''),
      pubDate: entry.data.date,
      description: deriveDescription(entry.data, entry.body ?? ''),
      link: `/journal/${entry.data.slug}`,
    })),
  })
}
