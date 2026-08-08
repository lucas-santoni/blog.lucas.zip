#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const JOURNAL = join(HERE, '..', 'src', 'content', 'journal')

// Keep in sync with KIND_FORMAT in src/utils/journal.ts.
const POSTER_KINDS = ['book', 'film', 'game']
const SQUARE_KINDS = ['music', 'podcast']
const MEDIA_KINDS = [...POSTER_KINDS, ...SQUARE_KINDS]
const KINDS = [...MEDIA_KINDS, 'thought']

const [kind, ...titleParts] = process.argv.slice(2)
const title = titleParts.join(' ').trim()

if (!kind || !KINDS.includes(kind) || !title) {
  console.error(`Usage: npm run journal <kind> "Title"`)
  console.error(`       kind is one of: ${KINDS.join(', ')}`)
  process.exit(1)
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

// A title with no ASCII alphanumerics ("攻殻機動隊", "???") slugifies to "",
// which would write a dotfile the glob loader silently skips.
if (!slug) {
  console.error(`Cannot derive a slug from ${JSON.stringify(title)}.`)
  console.error('Pass a title containing letters or digits, then rename it.')
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)

// `cover` is required for every media kind, so the path is pre-filled rather
// than left for you to add — deleting the line is a build error. The file it
// points at need not exist yet: nothing checks the path against the
// filesystem, so a forgotten download shows a broken image instead of failing
// a deploy.
//
// Every optional field is written as a bare key, which YAML parses as null
// and the schema accepts. An empty string would not do: `link` must match
// ^https?:// once it is a string at all.
const mediaFields = `creator:
year:
rating:
status: finished
cover: "assets/journal/${slug}.jpg"
link:
`

const fm = `---
kind: ${kind}
title: ${JSON.stringify(title)}
slug: ${JSON.stringify(slug)}
date: ${today}
${kind === 'thought' ? '' : mediaFields}---

`

if (!existsSync(JOURNAL)) mkdirSync(JOURNAL, { recursive: true })
const path = join(JOURNAL, `${slug}.md`)
if (existsSync(path)) {
  console.error(`Already exists: ${path}`)
  process.exit(1)
}
writeFileSync(path, fm)
console.log(`Created ${path}`)
if (kind !== 'thought') {
  const shape = POSTER_KINDS.includes(kind) ? 'poster, roughly 2:3' : 'square, roughly 1:1'
  console.log(`Cover REQUIRED at public/assets/journal/${slug}.jpg — ${shape}`)
}
