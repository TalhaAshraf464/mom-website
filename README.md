# Sania Asif · Open Talk Counselling

A warm, responsive website for Sania Asif's clinical psychology practice, with a private writing studio and a database-backed blog. Built with React 19 and vinext on Cloudflare Workers.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3001
```

- Website: http://localhost:3001
- Writing studio: http://localhost:3001/admin

Cloudflare's local D1 emulator starts automatically. Articles, the administrator account, and sessions persist under the ignored `.wrangler/` directory across restarts. No cloud account or production credentials are needed for local development. Local data is separate from production data.

## Add a blog article

1. Open `/admin`. On the first visit, create an administrator account with your email and a password of at least 12 characters. Leave the setup key empty on localhost. Subsequent visits use the same email and password to sign in.
2. Select **Write an article**. Add a title, topic, short summary, and article text. The article URL is generated from its title on the first save; you can also choose your own URL.
3. Use the formatting buttons for headings, bold, italic, lists, and quotes. Separate paragraphs with a blank line. **Preview** shows the formatted article without making it public.
4. Select **Save draft** to save privately, or **Publish article** when it is ready for readers. The confirmation explains that publishing makes the article public.
5. Open an existing article to update it. **Save changes** updates a published article. **Unpublish & move to drafts** removes it from the public website. Deletion requires confirmation and is permanent.

The website starts with **no articles**. The blog navigation link, homepage section, blog index, and article pages become available only when at least one article is published. Draft URLs return 404. Unpublishing the last article hides the blog again. Publication changes appear on the next page load without a rebuild.

There are no seeded or demo articles. Integration tests use their own temporary database, never the local preview's data.

## Hosting the admin and blog

The admin login and persistent blog require a server and database; GitHub Pages alone cannot run them. This repository's existing Cloudflare Workers/vinext setup supports both.

- Provision a real Cloudflare D1 database and bind it as `DB`. `.openai/hosting.json` declares this binding for Sites-compatible hosting. The all-zero database ID in `vite.config.ts` is only a local emulator placeholder; a production host must supply the real binding.
- Before the first production admin setup, configure a strong, random `ADMIN_SETUP_TOKEN` as a **Worker secret**, using your hosting platform's secrets interface or `wrangler secret put ADMIN_SETUP_TOKEN` with your production Worker config. Do not put it in Git or a client-exposed variable.
- Open the production `/admin` page, enter the setup key, and create the administrator account. Only one administrator account can be created. After setup, the key is no longer used for login and may be removed from the host.
- Use HTTPS. Sessions use HttpOnly, SameSite=Strict cookies, and Secure on HTTPS. Passwords use salted PBKDF2-SHA256; session tokens are random and stored only as hashes. Write requests require an authenticated session and a matching Origin. Login/setup attempts are limited in D1.
- Blog tables initialize automatically on the first database-backed request. Back up D1 before changing the database or deploying future schema changes.
- There is no email-based password recovery. If the password is lost, the site owner can use the D1 console to run `DELETE FROM blog_sessions; DELETE FROM blog_admin;`, then configure a new setup secret and recreate the account. This leaves articles intact and revokes existing sessions. Never do this without the owner's authorization.

No production deployment is performed by local development or the test suite.

## Contact information

The phone and WhatsApp destination is **+92 300 202 5956** (local format: **0300 2025956**). Instagram is [@opentalkcounselling](https://www.instagram.com/opentalkcounselling/). Contact links are in `app/page.tsx` and `app/components/SiteFooter.tsx`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` builds the production Worker, launches it locally on port 3097 with an isolated temporary D1 database, and verifies public rendering, hidden blogs, draft privacy, authentication, cross-origin write protection, safe formatting, publication, unpublication, deletion, and logout. It stops the test Worker and removes its temporary data afterward. Keep port 3097 free when running tests.

## Code map

- `app/page.tsx`, `app/globals.css`: public homepage and design.
- `app/components/`: shared navigation, footer, click-to-play videos, and safe article formatting.
- `app/admin/`, `app/studio.css`: sign-in, dashboard, editor, and private preview.
- `app/api/admin/`: server-validated login and article management endpoints.
- `lib/admin.ts`: password hashing and session helpers.
- `lib/blog.ts`: D1 initialization and published-only queries.
- `app/blog/`: public article list and reading pages.
- `tests/rendered-html.test.mjs`: production-Worker integration coverage.
