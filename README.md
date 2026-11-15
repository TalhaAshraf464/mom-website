# Sania Asif · Open Talk Counselling

A warm, responsive website for Sania Asif's clinical psychology practice. Built with React 19 and Next.js, and published as a static site on GitHub Pages.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3001
```

Open http://localhost:3001.

## Add a blog article

Articles live in `content/blog-posts.ts`. The website starts with **no articles**: the blog navigation link, homepage section and blog pages appear only once that list has at least one post.

1. Copy the commented example in `content/blog-posts.ts` into the `blogPosts` array and fill it in. `slug` becomes the address (`/blog/<slug>`).
2. In `content`, separate paragraphs with a blank line. Use `## ` for headings, `**bold**` and `*italic*`.
3. Commit and push to `main`. GitHub Actions rebuilds and publishes the site in about a minute.

Removing every post hides the blog again. (An admin login for writing posts in the browser is shelved for now; it needs a server and database, which GitHub Pages doesn't provide.)

## Publish on GitHub Pages

`.github/workflows/pages.yml` builds a static export (`npm run build:pages`, output in `out/`; the Pages action supplies the base path and site URL) and deploys it on every push to `main`.

One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. The site is served at https://saniaasif.org (custom domain, set in the same settings page).

## Contact information

The phone and WhatsApp destination is **+92 300 202 5956** (local format: **0300 2025956**). Instagram is [@opentalkcounselling](https://www.instagram.com/opentalkcounselling/). Contact links are in `app/page.tsx` and `app/components/SiteFooter.tsx`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` builds the GitHub Pages export and checks the generated pages, including that the blog stays hidden while there are no posts.

## Code map

- `app/page.tsx`, `app/globals.css`: public homepage and design.
- `app/components/`: shared navigation, footer, click-to-play videos, and safe article formatting.
- `content/blog-posts.ts`: published blog articles.
- `lib/blog.ts`: blog helpers; `lib/paths.ts`: GitHub Pages path prefix for static files.
- `app/blog/`: public article list and reading pages.
- `tests/rendered-html.test.mjs`: checks on the static export.
