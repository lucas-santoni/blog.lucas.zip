import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

// Astro hands the schema factory an `image()` helper; naming its type lets the
// artwork sub-schema below be pulled out into its own function.
type ImageFn = SchemaContext['image']

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    cover: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    cover: z.string().optional(),
    template: z.string().optional(),
  }),
})

// Fields every journal entry has, whatever its kind.
//
// The optional fields are `nullish`, not merely `optional`: the scaffold
// writes bare keys (`year:`) for you to fill in, and YAML parses those as
// null. Requiring you to delete the key instead of leaving it blank would
// turn a half-filled draft into a failed build.
const journalBase = {
  title: z.string().trim().min(1),
  // A blank slug otherwise reaches getStaticPaths and fails route generation
  // with a bare "Missing parameter: slug", which points at Astro internals
  // rather than at the file that caused it.
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[^/\s]+$/, 'must not contain a slash or whitespace'),
  date: z.coerce.date(),
  description: z.string().nullish(),
}

// An external link, so it must carry a scheme the browser can follow safely —
// this also keeps `javascript:` out of a rendered href. Shared by the media
// kinds and by `art`, which has none of the other media fields but still
// points at an exhibition page.
const externalLink = z
  .string()
  .trim()
  .regex(/^https?:\/\//, 'must start with http:// or https://')
  .nullish()

// Fields that only make sense for a consumed work. A `thought` has none of
// these, and `strictObject` below turns "rating on a thought" into a build
// error rather than a silently dropped field.
const journalMedia = {
  creator: z.string().nullish(),
  year: z.number().int().nullish(),
  // Half stars allowed: 1, 1.5, 2 … 5. Rendered as a CSS fill rather than a
  // glyph, because no Unicode half-star renders reliably in this font stack.
  rating: z.number().min(1).max(5).multipleOf(0.5).nullish(),
  // Deliberately not nullish: a blank `status:` should fail loudly rather
  // than render as "null" next to the stars.
  status: z.enum(['finished', 'abandoned', 'ongoing']).default('finished'),
  // Required: every consumed work gets artwork. `min(1)` because the scaffold
  // writes empty strings for the other optional fields, and `cover: ""` would
  // otherwise pass and render <img src="/">. The path is still not checked
  // against the filesystem, so a forgotten download shows a broken image
  // rather than failing the build.
  // A path under public/, with no leading slash: the templates prepend one.
  // A leading slash would render src="//assets/…", which browsers read as
  // protocol-relative and fetch from a host called "assets"; an absolute URL
  // would render src="/https://…".
  cover: z
    .string()
    .trim()
    .min(1)
    .regex(/^(?!\/)(?!https?:)/, 'must be a path under public/, with no leading slash'),
  link: externalLink,
}

const mediaEntry = <K extends string>(kind: K) =>
  z.strictObject({ kind: z.literal(kind), ...journalBase, ...journalMedia })

/**
 * One artwork in an `art` entry.
 *
 * `src` goes through Astro's `image()` rather than being a bare path under
 * public/ like every other cover on this site. The mosaic lays works out from
 * their real proportions, so it needs the pixel dimensions at build time —
 * `image()` is what supplies them, and it gets responsive renditions and
 * modern formats along the way. The cost is that these files live in `src/`,
 * next to the entry, instead of `public/assets/journal/`.
 */
const artWork = (image: ImageFn) =>
  z.strictObject({
    src: image(),
    // Required: a work with no title has nothing to put in the caption and
    // nothing usable in `alt`. An untitled work is written "Sans titre",
    // which is itself information.
    title: z.string().trim().min(1),
    // Falls back to the entry's `artist`, so a monograph does not repeat the
    // same name on all twenty works.
    artist: z.string().nullish(),
    year: z.number().int().nullish(),
    medium: z.string().nullish(),
    // Where the reproduction came from — museum, archive, photographer.
    credit: z.string().nullish(),
  })

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.discriminatedUnion('kind', [
      mediaEntry('book'),
      mediaEntry('podcast'),
      mediaEntry('game'),
      mediaEntry('music'),
      mediaEntry('film'),
      z.strictObject({ kind: z.literal('thought'), ...journalBase }),
      z.strictObject({
        kind: z.literal('art'),
        ...journalBase,
        // Default artist for the works below; also the name shown when the
        // entry is about one painter rather than one exhibition.
        artist: z.string().nullish(),
        // "Petit Palais, Paris". Absent when the entry is a painter found by
        // chance rather than a show that was visited.
        venue: z.string().nullish(),
        link: externalLink,
        // No `rating`, `status` or `cover`: an art entry is a display case,
        // not a review, and its share image is derived from the first work.
        works: z.array(artWork(image)).min(1),
      }),
    ]),
})

export const collections = { posts, pages, journal }
