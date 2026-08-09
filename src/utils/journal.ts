import type { CollectionEntry } from 'astro:content'

export type JournalEntry = CollectionEntry<'journal'>
export type JournalData = JournalEntry['data']
export type JournalKind = JournalData['kind']
// `art` is excluded alongside `thought`: it carries none of the media fields
// (no rating, no status, no single cover), so every `Record<MediaKind, …>`
// table below would otherwise demand a meaningless entry for it.
export type MediaKind = Exclude<JournalKind, 'thought' | 'art'>
export type MediaData = Extract<JournalData, { kind: MediaKind }>
export type ArtData = Extract<JournalData, { kind: 'art' }>
export type ArtWork = ArtData['works'][number]

export function isMedia(data: JournalData): data is MediaData {
  return data.kind !== 'thought' && data.kind !== 'art'
}

export function isArt(data: JournalData): data is ArtData {
  return data.kind === 'art'
}

// The journal is written in French, so everything exclusive to it reads in
// French. Shared site chrome (header, footer) stays English on purpose.

// Shown as the small label in the /journal listing.
// `art` rather than `exposition`: the kind also covers a painter stumbled on
// by chance, with no show attached. `peinture` would rule out a sculpture or a
// photograph later.
export const KIND_LABEL: Record<JournalKind, string> = {
  book: 'livre',
  podcast: 'podcast',
  game: 'jeu vidéo',
  music: 'musique',
  film: 'film',
  thought: 'pensée',
  art: 'art',
}

// The noun and the creator preposition used to build the opening sentence.
// One `creator` field in the schema; the wording carries the role.
// All five nouns are masculine, which keeps the article logic to "un".
const KIND_NOUN: Record<MediaKind, string> = {
  book: 'livre',
  podcast: 'podcast',
  game: 'jeu vidéo',
  music: 'album',
  film: 'film',
}

const CREATOR_PREPOSITION: Record<MediaKind, string> = {
  book: 'de',
  podcast: 'animé par',
  game: 'de',
  music: 'de',
  film: 'réalisé par',
}

/**
 * Cover shape per kind. Fixed stencils mean the layout no longer depends on
 * whatever proportions the source artwork happens to have: the author finds
 * something roughly right, CSS crops it to fit. `thought` has no cover at
 * all — the schema rejects the field.
 */
export const KIND_FORMAT: Record<MediaKind, 'poster' | 'square'> = {
  book: 'poster',
  film: 'poster',
  game: 'poster',
  music: 'square',
  podcast: 'square',
}

// Role of the `creator`, shown as a tooltip in the masthead. The sentence
// conveys this through its preposition; the metadata line cannot.
export const CREATOR_LABEL: Record<MediaKind, string> = {
  book: 'Auteur',
  podcast: 'Animateur',
  game: 'Développeur',
  music: 'Artiste',
  film: 'Réalisateur',
}

/**
 * Stand-ins for metadata an entry happens to lack, so every media masthead
 * has the same three trailing lines and therefore the same height. Rendered
 * in a lighter colour — present for structure, not for reading.
 */
export const PLACEHOLDER = {
  rating: 'Pas de note',
  year: 'Année inconnue',
  link: 'Pas de lien',
}

// "Auteur inconnu", "Réalisateur inconnu"… — every label is masculine, so a
// single agreement works.
export function unknownCreator(kind: MediaKind): string {
  return `${CREATOR_LABEL[kind]} inconnu`
}

// Opens the date line: "Vu le 02 août 2026".
const DATE_VERB: Record<JournalKind, string> = {
  book: 'Lu',
  podcast: 'Écouté',
  game: 'Terminé',
  music: 'Écouté',
  film: 'Vu',
  thought: 'Écrit',
  // "Visité" would be truer for an exhibition and wrong for the other half of
  // what this kind covers.
  art: 'Vu',
}

/**
 * The date line under the metadata. `status` is folded in here rather than
 * shown separately: "Abandonné le …" says more than "abandoned" on its own.
 */
export function dateLine(data: JournalData, formatted: string): string {
  if (isMedia(data)) {
    if (data.status === 'abandoned') return `Abandonné le ${formatted}`
    if (data.status === 'ongoing') return `En cours depuis le ${formatted}`
  }
  return `${DATE_VERB[data.kind]} le ${formatted}`
}

const RELEASE_VERB: Record<MediaKind, string> = {
  book: 'paru en',
  podcast: 'lancé en',
  game: 'sorti en',
  music: 'sorti en',
  film: 'sorti en',
}

const STATUS_SENTENCE: Record<Exclude<MediaData['status'], 'finished'>, string> = {
  abandoned: 'Je ne l’ai pas terminé.',
  ongoing: 'Je suis encore dessus.',
}

const VOWEL = /^[aeiouâàéèêëîïôûùü]/i

// "de Ursula" → "d’Ursula", but "réalisé par Andrei" is untouched. `h` is
// deliberately excluded: whether a name takes h muet ("d’Henri") or h aspiré
// ("de Haruki") is unknowable from the string, and the un-elided form is the
// safer default for the proper nouns this field holds.
function joinCreator(preposition: string, creator: string): string {
  if (preposition === 'de' && VOWEL.test(creator)) return `d’${creator}`
  return `${preposition} ${creator}`
}

// "ce livre" but "cet album".
function demonstrative(noun: string): string {
  return VOWEL.test(noun) ? 'cet' : 'ce'
}

// schema.org type used as `itemReviewed` in the Review JSON-LD.
export const SCHEMA_TYPE: Record<MediaKind, string> = {
  book: 'Book',
  podcast: 'PodcastSeries',
  game: 'VideoGame',
  music: 'MusicAlbum',
  film: 'Movie',
}

// schema.org property naming the creator, which differs per type. Book uses
// `author`, Movie uses `director`, and the rest fall back to `creator`.
export const SCHEMA_CREATOR_PROP: Record<MediaKind, string> = {
  book: 'author',
  podcast: 'creator',
  game: 'creator',
  music: 'byArtist',
  film: 'director',
}

// schema.org expects a Person/Organization object for the creator, not a
// bare string, and the right subtype depends on the medium.
export const SCHEMA_CREATOR_TYPE: Record<MediaKind, string> = {
  book: 'Person',
  podcast: 'Person',
  game: 'Organization',
  music: 'MusicGroup',
  film: 'Person',
}

export const MAX_RATING = 5

/** The glyph row, always five stars — the fill below decides how many read
 *  as earned. `'★'.repeat(3.5)` would silently truncate to three. */
export const STAR_TRACK = '★'.repeat(MAX_RATING)

/* A half star cut at exactly 50% is geometrically right — the glyph's ink is
   centred in its advance (measured: centre at 0.4995). It reads as *more*
   than half anyway, because the left side of a five-pointed star carries a
   whole arm plus part of the top point. Cutting slightly early corrects the
   perception rather than the geometry. */
const OPTICAL_HALF = 0.44

/** Width of the filled overlay, so 3.5 stops halfway through the fourth star. */
export function ratingPercent(rating: number): number {
  const whole = Math.floor(rating)
  const filled = rating === whole ? whole : whole + OPTICAL_HALF
  return (filled / MAX_RATING) * 100
}

/** "3,5" — French writes decimals with a comma. */
export function ratingNumber(rating: number): string {
  return String(rating).replace('.', ',')
}

/** For plain-text contexts (meta description, RSS) where a CSS fill cannot
 *  reach and a half-star glyph would not render. */
export function ratingText(rating: number): string {
  return `${ratingNumber(rating)}/${MAX_RATING}`
}

export function ratingLabel(rating: number): string {
  return `${ratingNumber(rating)} sur ${MAX_RATING}`
}

export function hostOf(link: string): string {
  try {
    const host = new URL(link).host.replace(/^www\./, '')
    // Schemes like mailto: and javascript: parse but carry no host, which
    // would render a link with no text at all.
    return host || link
  } catch {
    // A hand-typed link may not parse; showing it raw beats failing a build.
    return link
  }
}

// Titles may contain markup — everything user-facing renders the stripped
// form, and descriptions and structured data are plain text by definition.
export function plain(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}

/**
 * Describes an entry's metadata as one French sentence —
 * "Outer Wilds est un jeu vidéo de Mobius Digital, sorti en 2019." — used as
 * the OG and RSS description so a shared link previews as something useful.
 *
 * Returns null for a `thought`, which carries no metadata to describe.
 */
export function summarySentence(data: JournalData): string | null {
  if (!isMedia(data)) return null

  const noun = KIND_NOUN[data.kind]
  const parts: string[] = []

  // With no creator the year attaches directly ("un livre paru en 1998")
  // rather than hanging off a comma.
  let opening = `${plain(data.title)} est un ${noun}`
  if (data.creator) {
    opening += ` ${joinCreator(CREATOR_PREPOSITION[data.kind], plain(data.creator))}`
  }
  if (data.year) {
    const verb = RELEASE_VERB[data.kind]
    opening += data.creator ? `, ${verb} ${data.year}` : ` ${verb} ${data.year}`
  }
  parts.push(`${opening}.`)

  if (data.status !== 'finished') parts.push(STATUS_SENTENCE[data.status])
  if (data.link) parts.push(`En savoir plus sur ${hostOf(data.link)}.`)
  if (data.rating) {
    parts.push(`Je mettrais ${ratingText(data.rating)} à ${demonstrative(noun)} ${noun}.`)
  }

  return parts.join(' ')
}

/**
 * The faded half of a row in /journal, after the title.
 *
 * For an art entry that is the venue, not the artist: the title is usually the
 * painter's name already, and "Károly Ferenczy · Károly Ferenczy" is absurd. A
 * chance find with no venue simply has nothing here, which the listing already
 * handles.
 */
export function listingSubtitle(data: JournalData): string | null {
  if (isMedia(data)) return data.creator ?? null
  if (isArt(data)) return data.venue ?? null
  return null
}

/** The artist of one work: its own, else the entry-wide default. */
export function workArtist(work: ArtWork, data: ArtData): string | null {
  return work.artist ?? data.artist ?? null
}

/**
 * The museum-label line shown under a work in the lightbox —
 * "Orphée — Károly Ferenczy, 1894. Huile sur toile." Everything but the title
 * is optional, so the punctuation is assembled rather than templated.
 */
export function workCaption(work: ArtWork, data: ArtData): string {
  const artist = workArtist(work, data)
  let line = plain(work.title)

  const attribution = [artist, work.year ? String(work.year) : null].filter(Boolean)
  if (attribution.length) line += ` — ${attribution.join(', ')}`
  line += '.'

  if (work.medium) line += ` ${plain(work.medium)}.`
  return line
}

/**
 * Alt text. The caption fades out and is decorative once read; this is the
 * only place the work is named for a screen reader, so it repeats the same
 * facts without the typographic dressing.
 */
export function workAlt(work: ArtWork, data: ArtData): string {
  const parts = [plain(work.title), workArtist(work, data), work.year ? String(work.year) : null]
  return parts.filter(Boolean).join(', ')
}

/**
 * Describes an art entry in one French sentence, used for the share preview
 * and the feed — "12 œuvres de Károly Ferenczy, vues au Petit Palais, Paris."
 */
export function artSentence(data: ArtData): string {
  const n = data.works.length
  let sentence = `${n} ${n > 1 ? 'œuvres' : 'œuvre'}`

  // Named from the works actually present, not from the entry's default
  // artist: a monograph that includes one contemporary should not describe
  // itself as fifteen works by the one painter.
  const artists = [...new Set(data.works.map((work) => workArtist(work, data)).filter(Boolean))]
  if (artists.length === 1) sentence += ` de ${plain(artists[0]!)}`
  else if (artists.length === 2) sentence += ` de ${plain(artists[0]!)} et ${plain(artists[1]!)}`
  else if (artists.length > 2) {
    sentence += ` de ${plain(artists[0]!)} et ${artists.length - 1} autres artistes`
  }
  sentence += '.'
  // The venue is appended as its own fragment rather than folded in with a
  // preposition: "au Petit Palais" is right but "au Galerie …" is not, and the
  // gender of an arbitrary venue name cannot be guessed from the string.
  if (data.venue) sentence += ` ${plain(data.venue)}.`
  return sentence
}

const MAX_DESCRIPTION = 160

// Roughest possible Markdown strip — enough to turn the opening of a note
// into a link-preview blurb without dragging in a parser. Note there is no
// frontmatter to remove: the glob loader already excludes it from `body`, so
// a leading `---` in the text is a real thematic break.
function excerpt(body: string): string {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // A description is plain text; markup in the body must not survive into
    // meta tags, the feed, or the JSON-LD.
    .replace(/<[^>]+>/g, '')
    .replace(/^\s*[=-]{2,}\s*$/gm, '')
    // Stripping these unconditionally mangled "snake_case", "C#" and "2 * 3".
    // Block markers only count at the start of a line, and emphasis
    // delimiters only where they actually hug a word.
    .replace(/^\s*[#>]+\s*/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/`+/g, '')
    // Both sides allow adjacent punctuation, or the pair breaks asymmetrically
    // — "**gras**," would drop its opening marker and keep the closing one,
    // and "l'_italique_" the reverse.
    .replace(/(^|[\s([{«"'])[*_]+(?=\S)/g, '$1')
    .replace(/(?<=\S)[*_]+(?=[\s.,;:!?)\]}»"']|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= MAX_DESCRIPTION) return text
  return `${text.slice(0, MAX_DESCRIPTION).replace(/\s+\S*$/, '')}…`
}

// Without this, Base.astro falls back to SITE_DESCRIPTION and every journal
// link shared in a chat previews as "A blog about computer security…".
// Never returns undefined for that reason: a thought whose body is empty (or
// is only an image, or only a code fence) still needs something French.
export function deriveDescription(data: JournalData, body: string): string {
  // Stripped like every other source: a description reaches meta tags, the
  // feed and the JSON-LD, all of which are plain text.
  const explicit = data.description && plain(data.description).trim()
  if (explicit) return explicit
  if (isMedia(data)) return summarySentence(data)!
  // An art entry prefers the built sentence over its own prose: "12 œuvres de
  // Károly Ferenczy" tells a reader what a shared link holds, where the first
  // 160 characters of a personal reaction do not. Its body is also optional.
  if (isArt(data)) return artSentence(data)
  return excerpt(body) || `${plain(data.title)} — une pensée.`
}
