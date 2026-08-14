# [blog.lucas.zip](https://blog.lucas.zip/)

Personal blog by Lucas SANTONI. Built with [Astro](https://astro.build/),
deployed on [Vercel](https://vercel.com/).

---

## Quickstart

```sh
nvm use            # picks up .node-version
npm install
npm run dev        # http://localhost:4321
```

Push to `master` → Vercel deploys automatically. Pull requests get preview
URLs.

---

## Local preview & build

```sh
npm run dev        # dev server with hot reload
npm run build      # type-check + static build → dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint
```

`npm run build` runs `astro check` (TypeScript + Astro template type check)
before building. Vercel runs the same on every deploy, so type errors fail
the deploy and never reach production.

`npm run lint` is **advisory only** — it is not part of `build`. CI
(`.github/workflows/ci.yml`) runs both lint and check on every push and PR
as a status check, but lint failures **do not** block Vercel deploys.
Rationale: for a personal blog, blocking a deploy on a stylistic warning
(unused import, missing semicolon) is friction without value. Type errors
would actually break the site, so those still gate deploys via
`astro check`.

---

## Writing a new post

```sh
npm run new "My new post title"
```

This scaffolds `src/content/posts/<slug>.md` with the right frontmatter and
today's date. Open it, write Markdown, save. Code blocks get syntax
highlighting (Shiki, build-time, no client JS).

The frontmatter looks like:

```yaml
---
title: "My new post title"
slug: my-new-post-title
date: 2026-04-29
description: "Optional. Used for OG cards, RSS, and meta description."
cover: "assets/my-post/cover.png"  # Optional. Path under public/.
---
```

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Quote with `"..."` if it contains a colon. |
| `slug` | yes | URL path. `slug: foo` produces `/foo`. |
| `date` | yes (posts only) | `YYYY-MM-DD` or full ISO datetime. Newest first on the homepage. |
| `description` | no | Short summary for OG/RSS/meta. |
| `cover` | no | OG/Twitter image, root-relative. |

The same applies for pages in `src/content/pages/`, except `date` is not used.

---

## Writing a journal entry

The journal at `/journal` is a log of consumed media plus the occasional
stray thought. It shares the codebase, styling and layout conventions of the
blog, but lives in its own collection and its own URL namespace.

**The journal is written in French.** Anything exclusive to it — the intro,
kind labels, dates, back-links, the generated opening sentence, the feed
description — is French, and its pages carry `lang="fr"`. Shared site chrome
(header, footer, `/rss.xml`) stays English so it matches the rest of the
site. Journal wording lives in `src/utils/journal.ts`.

```sh
npm run journal book "Dune"
```

`kind` is one of `book`, `podcast`, `game`, `music`, `film`, `thought`. This
scaffolds `src/content/journal/<slug>.md`, which becomes `/journal/<slug>`.

```yaml
---
kind: book
title: "Dune"
slug: dune
date: 2026-08-02
creator: "Frank Herbert"
year: 1965
rating: 4
status: finished
cover: "assets/journal/dune.jpg"
link: "https://openlibrary.org/works/OL893415W"
---
```

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `kind` | yes | Selects the schema and the rendering. |
| `title` | yes | Quote with `"..."` if it contains a colon. |
| `slug` | yes | `slug: dune` produces `/journal/dune`. |
| `date` | yes | When you wrote the entry, not when the work came out. |
| `creator` | no | Labelled per kind: Author / Host / Developer / Artist / Director. |
| `year` | no | Release year of the work. |
| `rating` | no | Integer 1–5. Rendered as stars. |
| `status` | no | `finished` (default), `abandoned` or `ongoing`. Only shown when it isn't `finished`. |
| `cover` | **yes** (except `thought`) | Path under `public/`, no leading slash. Also used as the OG image. |
| `link` | no | External URL (Goodreads, IMDb, Bandcamp…). |
| `description` | no | Overrides the auto-generated OG/RSS description. |

`kind: thought` accepts only `title`, `slug`, `date` and `description` — the
media fields are a build error there.

A blank key (`year:` with nothing after it) is tolerated on the *optional*
fields only — `description`, `creator`, `year`, `rating`, `link` — so the
half-filled scaffold builds as written. Blanking a required field (`title`,
`slug`, `date`, `status`, `cover`) is a build error.

The body may be empty: an entry can be pure metadata.

**Covers are mandatory** for every kind except `thought` — omitting one is a
build error. Download them by hand into `public/assets/journal/<slug>.jpg`.

Resize to **500px wide**: the poster stencil displays at 150 CSS px, so that
is a little over 3× and stays sharp on a retina screen, at roughly 50–150 KB
per file. There is no image pipeline — files are served exactly as they sit
on disk — so anything larger is bandwidth spent on pixels nobody sees.

```sh
sips --resampleWidth 500 -s format jpeg -s formatOptions 82 cover.jpg
```

If the book is in Kavita, the **epub's own cover** is the best source: same
edition, and typically 1200–2400px before resizing. Kavita's `series-cover`
API returns a downscaled thumbnail (~281px) that looks soft at display size —
extract from the file instead:

```sh
unzip -p "$EPUB" OEBPS/Images/cover.jpg > cover.jpg   # path varies per epub
```

Note that cover art is not yours to relicense — see the carve-out at the top
of `LICENSE-CONTENT`.

Each kind has a fixed cover shape, so the page layout never depends on the
proportions of whatever artwork you found:

| Format | Kinds | Stencil | Find artwork that is… |
|---|---|---|---|
| `poster` | book, film, game | 150×225 (2:3) | roughly 2:3 — book covers, film posters, Steam vertical capsules |
| `square` | music, podcast | 200×200 (1:1) | roughly 1:1 — album and podcast art |
| — | thought | none | the schema rejects `cover` here |

Only the frontmatter field is required — the path is not checked against the
filesystem, so a forgotten download shows a broken image rather than failing
the build.

The mapping lives in `KIND_FORMAT` (`src/utils/journal.ts`) and is derived
from `kind`, so there is nothing to set in frontmatter. CSS crops to the
stencil with `object-fit: cover`, centred — so "roughly right" is enough, but
anything far off gets cropped hard. Watch out for **TV series filed under
`film`**: season artwork is often square or 16:9, and squeezing it into the
2:3 poster stencil crops a third of it away. Prefer a real poster where one
exists.

**Description fallback:** with no `description`, a media entry derives a
French sentence from its metadata — `"Dune est un livre de Frank Herbert,
paru en 1965. Note : 4/5."` — and a thought uses an excerpt of its body,
falling back to its title if the body is empty. This exists so a shared
journal link does not preview as the site-wide blurb about CTF writeups.

The journal has its own feed at `/journal/rss.xml`; the main `/rss.xml` stays
posts-only so subscribers to the essays are not flooded.

---

## Adding images

Drop them in `public/assets/<post-slug>/` and reference with a **leading
slash**:

```markdown
![alt](/assets/my-post/diagram.png)
```

Files in `public/` are copied verbatim to the site root.

---

## Editing the obvious things

| What | Where |
|---|---|
| Site name, intro, email, GitHub link | `src/config.ts` |
| Resume content | `src/pages/resume.astro` |
| About page | `src/content/pages/about.md` |
| 404 page text | `src/content/pages/404.md` |
| Theme CSS | `src/styles/styles.css` (and `resume.css` for the resume) |
| Site head metadata, OG defaults, etc. | `src/layouts/Base.astro` |
| Sitemap excludes / change frequency / priority | `astro.config.mjs` |
| Journal kinds, labels, star rendering | `src/utils/journal.ts` |

---

## Project layout

```
src/
  config.ts            site-wide constants
  content.config.ts    Astro content collection schemas
  content/
    posts/             one Markdown file per blog post
    pages/             non-post pages (about, 404, resume content, etc.)
    journal/           one Markdown file per journal entry
  layouts/Base.astro   shared <head>, header, footer
  pages/               URL routes (Astro auto-routes)
    journal/           /journal index, entries, and journal-only feed
  styles/              global CSS
  utils/               small helpers (date formatting, smart title break)
public/                assets and root files (favicon, robots.txt, manifest…)
  assets/journal/      journal cover art
scripts/new-post.mjs   `npm run new` scaffold
scripts/new-journal.mjs `npm run journal` scaffold
astro.config.mjs       Astro + Vercel + sitemap config
```

---

## License

Source code and code snippets in posts are [MIT](LICENSE). Blog prose and
authored images are [CC BY 4.0](LICENSE-CONTENT) — reuse them, just credit me.

Third-party cover art shown alongside journal entries is **not** covered by
either license; it belongs to its respective copyright holders and is
reproduced at thumbnail size alongside commentary. See the note at the top of
[LICENSE-CONTENT](LICENSE-CONTENT).
