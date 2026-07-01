# SoftHorizon — Company Website

World-class digital company presence for [softhorizon.com](https://softhorizon.com). Inspired by Stripe, Linear, Vercel, and Notion — built to drive business, build trust, and showcase talent.

## Tech Stack

| Concern | Library | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16 |
| UI | React | 19 |
| Language | TypeScript | 6 |
| Styling | Tailwind CSS v4 + tw-animate-css | 4 |
| Components | shadcn/ui (Radix primitives) | v4 |
| Animations | framer-motion | 12 |
| Forms | React Hook Form + Zod + @hookform/resolvers | v7 / v4 / v5 |
| State | Zustand | 5 |
| Data fetching | TanStack Query | 5 |
| Search | Fuse.js (client-side, Cmd+K) | 7 |
| Email | Resend | 6 |
| Newsletter | Mailchimp REST API (plain fetch) | — |
| Live chat | Crisp (script embed) | — |
| Analytics | Vercel Analytics + Speed Insights | 2 |
| Product analytics | PostHog | 1 |
| Icons | lucide-react (via `lib/icons.ts`) | 1 |
| Package manager | pnpm | — |

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** — `npm i -g pnpm`

> **M4 Pro Mac:** Never install more than 2–3 packages in a single `pnpm add`, and always stop `next dev` before installing. See [`docs/package-management.md`](docs/package-management.md).

## Getting Started

```bash
git clone <repo-url>
cd softhorizon
pnpm install
cp .env.example .env.local   # fill in your values (see below)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` with:

```bash
# Resend — transactional email (contact form, job applications, whitepapers)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
EMAIL_FROM=hello@softhorizon.com
EMAIL_TO=hello@softhorizon.com

# Mailchimp — newsletter subscriptions
MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21
MAILCHIMP_SERVER_PREFIX=us21
MAILCHIMP_AUDIENCE_ID=xxxxxxxxxx

# Crisp — live chat widget
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# PostHog — product analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

Vercel Analytics requires no env vars — it auto-detects on deploy.

## Project Structure

```
app/                    # Next.js App Router routes — thin wrappers only
content/                # All company copy as TypeScript modules (type-safe)
components/
  ui/                   # shadcn/ui — never hand-edit, use CLI to add
  common/               # Shared across 2+ pages
  layout/               # Navbar, Footer, SearchDialog, CrispChat
  sections/             # Page sections organised by route
  motion.tsx            # framer-motion re-exports — always import from here
lib/
  icons.ts              # DynamicIcon + getIcon — always import from here
  utils.ts              # cn()
providers/              # External service providers (QueryClient, PostHog)
store/                  # Zustand (mobile nav + theme only)
hooks/                  # Shared hooks
docs/                   # Deep-dive reference docs (read before building)
```

All authored content lives in `content/` as TypeScript — no CMS, no API calls for content. See [`docs/content.md`](docs/content.md) for schemas.

## Development

```bash
pnpm dev              # dev server → http://localhost:3000
pnpm build            # production build
pnpm tsc --noEmit     # type check (run before every commit)
pnpm lint             # lint
```

Always run `pnpm tsc --noEmit` before committing. Never use `--no-verify`.

## Key Conventions

| Topic | Doc |
|---|---|
| Full feature roadmap + sitemap | [`docs/vision.md`](docs/vision.md) |
| Route conventions, Server vs Client rules | [`docs/pages.md`](docs/pages.md) |
| Content file schemas | [`docs/content.md`](docs/content.md) |
| Third-party integrations (Resend, Mailchimp, PostHog, Crisp) | [`docs/integrations.md`](docs/integrations.md) |
| Component catalog + shadcn/ui rules | [`docs/components.md`](docs/components.md) |
| framer-motion patterns | [`docs/animations.md`](docs/animations.md) |
| Tailwind v4 `@theme`, dark mode, design tokens | [`docs/design-tokens.md`](docs/design-tokens.md) |
| Forms — Zod + RHF + Server Actions | [`docs/forms.md`](docs/forms.md) |
| SEO — `generateMetadata`, OG, structured data | [`docs/seo.md`](docs/seo.md) |
| Icon usage | [`docs/icons.md`](docs/icons.md) |

**Quick rules:**

- Server Components by default. Add `"use client"` only for hooks, event handlers, or browser APIs.
- Import content directly from `content/` — never fetch it via API or TanStack Query.
- Import icons via `lib/icons.ts` — never from `lucide-react` directly.
- Import framer-motion via `@/components/motion` — never from `framer-motion` directly.
- Add shadcn components via `pnpm dlx shadcn@latest add <component>` — never hand-edit `components/ui/`.
- Every `app/*/page.tsx` is a thin wrapper — no inline JSX, no business logic.
- `params` in Next.js 16 are Promises — always `await params`.

## Git Workflow

Branch naming: `feat/description`, `fix/description`, `chore/description`.

Commit prefixes: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`.

```bash
feat: add contact form with Resend integration
fix: resolve dark mode flash on initial load
chore: update TanStack Query to v5.101
```

See [`docs/git-workflow.md`](docs/git-workflow.md) for GPG signing setup.

## Deployment

Deploy on [Vercel](https://vercel.com). `main` is always production-ready.

1. Push to `main` (or merge a PR).
2. Vercel auto-deploys. Analytics and Speed Insights activate automatically.
3. Set all env vars in the Vercel project dashboard.
