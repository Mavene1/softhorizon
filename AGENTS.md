<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.

## Also read before writing code for this project

These packages (installed or planned) have API shapes that differ from earlier versions in your training data:

| Package | Path | Key changes |
|---|---|---|
| Next.js 16 | `node_modules/next/dist/docs/` | App Router, Server Components, `params` and `searchParams` are now **async** (must `await`), `cookies()` is async, new `PageProps`/`LayoutProps` helper types, `generateMetadata` is async |
| React 19 | https://react.dev/blog/2024/12/05/react-19 | `ref` is now a regular prop (no `forwardRef`), `<Context>` replaces `<Context.Provider>`, `useActionState` replaces deprecated `useFormState`, new `use()` hook |
| Tailwind CSS v4 | `node_modules/tailwindcss/README.md` | No `tailwind.config.js` — config via CSS `@theme` blocks only; `@import "tailwindcss"` replaces `@tailwind` directives |
| shadcn/ui v4 | `components.json` | New CSS variable theming aligned with Tailwind v4; always install via `pnpm dlx shadcn@latest add <component>` — never hand-edit `components/ui/` |
| TanStack Query v5 | `node_modules/@tanstack/react-query/README.md` | Single object syntax only: `useQuery({queryKey, queryFn, ...opts})`; `cacheTime` → `gcTime`; `isLoading` → `isPending`; `onSuccess/onError/onSettled` callbacks removed from `useQuery` |
| Zustand v5 | `node_modules/zustand/README.md` | `useShallow` import moved: `zustand/shallow` → `zustand/react/shallow`; TypeScript types tightened |
| Zod v4 | `node_modules/zod/README.md` | Format methods deprecated as chained methods — use top-level: `z.email()` not `z.string().email()`; `z.record()` requires explicit key/value schemas; unified `error` param replaces `message`/`invalid_type_error`/`required_error` |
| React Hook Form v7 | `node_modules/react-hook-form/README.md` | Use `zodResolver` from `@hookform/resolvers/zod` |
| @hookform/resolvers v5 | `node_modules/@hookform/resolvers/README.md` | Resolver signature updated for Zod v4 compatibility |
| Recharts v3 | `node_modules/recharts/README.md` | Component prop names changed; `<Cell>` inside `<Pie>` deprecated |
| date-fns v4 | `node_modules/date-fns/README.md` | Full ESM-only, tree-shakeable; several function signatures changed |
| framer-motion v12 | `node_modules/framer-motion/README.md` | `motion` import path changed; always import via `@/components/motion` |
| lucide-react v1 | `node_modules/lucide-react/README.md` | Icon names may differ from training data; always import via `lib/icons.ts` |
| resend v6 | `node_modules/resend/README.md` | Named import only: `import { Resend } from "resend"`; email body key is `html:` not `body:`; server-side only — never import in Client Components |
| fuse.js v7 | `node_modules/fuse.js/README.md` | Search returns `{ item, refIndex, score }` objects — not raw items; access results with `result.item`; `threshold` is inverted: `0.0` = exact match, `1.0` = match anything (lower is stricter) |
| posthog-js v1 | `node_modules/posthog-js/README.md` | Provider subpath: `import { PostHogProvider } from "posthog-js/react"` — not `"posthog-js"`; browser-only, must be in `"use client"` + `useEffect`; set `capture_pageview: false` in Next.js App Router to avoid double-counting |
| @vercel/analytics v2 | `node_modules/@vercel/analytics/README.md` | Import subpath required: `import { Analytics } from "@vercel/analytics/react"`; Speed Insights: `import { SpeedInsights } from "@vercel/speed-insights/next"`; no-op in local dev — only active on Vercel |

Check `package.json` for exact installed versions before assuming API shape. Read `docs/integrations.md` before writing any integration code.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->
# SoftHorizon — Company Website

## Lean Doc Rule

**AGENTS.md captures only what is non-obvious or unique to this project.** Generic React/Next.js/library patterns belong in official docs or `docs/` with a pointer here. Before adding any rule: ask "Would a senior Next.js developer already know this from official docs?" If yes, link to `docs/` instead. Keep this file under 35k chars.

After any structural change, new section, or content update — update the relevant `docs/` file before committing. Deep context lives in `docs/`, not here.

## What this is

**SoftHorizon** company website (`softhorizon.com`) — a world-class digital company presence inspired by Stripe, Linear, Vercel, and Notion. It goes far beyond a brochure. Its scope includes:

- **Company identity** — mission, vision, values, founding story, timeline
- **Services & solutions** — detailed capability pages, persona/industry landing pages, pricing
- **Portfolio & case studies** — projects with metrics, galleries, client quotes
- **Team & culture** — individual profiles, careers, benefits, DEI, interview process
- **Content & thought leadership** — blog (MDX), case studies, whitepapers, webinars, changelog, glossary
- **Lead generation** — contact form, newsletter, job applications, whitepaper email gates, partner program
- **Trust signals** — client logos, testimonials, press kit, security page, awards
- **Data & transparency** — company metrics, clients served, countries, projects delivered (`/impact`)
- **UX excellence** — global Cmd+K search, dark mode, scroll animations, page transitions, WCAG 2.1 AA

This is a **public-facing company website with no user accounts** — no auth, no dashboards. All content is authored in `content/` as TypeScript files. Server Components by default; interactivity is the exception, not the rule. See `docs/vision.md` for the full feature roadmap and sitemap.

## Detailed Docs

Deep-dive references live in `docs/`. Read these before building:

| Doc | What it covers |
|---|---|
| `docs/vision.md` | **Start here** — full feature roadmap, sitemap IA, backend decision, third-party services |
| `docs/pages.md` | Route conventions, section patterns, Server vs Client rules |
| `docs/content.md` | TypeScript content file schemas (`content/site.ts`, `team.ts`, `projects.ts`, etc.) |
| `docs/integrations.md` | Third-party services — Resend, Mailchimp, Crisp, Vercel Analytics, PostHog, Fuse.js |
| `docs/seo.md` | `generateMetadata`, Open Graph, structured data, sitemap, robots.txt |
| `docs/components.md` | Component catalog, shadcn/ui rules, common and section components |
| `docs/animations.md` | framer-motion patterns for scroll reveals, hero animations, transitions |
| `docs/forms.md` | Contact form, newsletter, job application — Zod + RHF + Server Action |
| `docs/design-tokens.md` | CSS custom properties, Tailwind v4 @theme, dark mode, typography |
| `docs/icons.md` | DynamicIcon vs getIcon, adding icons |
| `docs/performance.md` | Core Web Vitals, image optimisation, Server Components, bundle size |
| `docs/accessibility.md` | aria rules, color contrast, keyboard navigation |
| `docs/state-management.md` | Minimal Zustand (mobile nav, theme), useDisclosure, what lives where |
| `docs/data-fetching.md` | Static content imports; TanStack Query mutation for contact form only |
| `docs/error-handling.md` | error.tsx, not-found.tsx patterns |
| `docs/package-management.md` | pnpm install rules for M4 Pro Mac |
| `docs/git-workflow.md` | Commit conventions, GPG signing |

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 6 |
| Styling | Tailwind CSS v4, tw-animate-css |
| Components | shadcn/ui (radix-ui primitives) |
| Icons | lucide-react (via `lib/icons.ts` only) |
| Animations | framer-motion v12 (via `@/components/motion` only) |
| Forms | react-hook-form v7 + @hookform/resolvers v5 + Zod v4 |
| Toasts | sonner |
| Theme | next-themes |
| State | Zustand v5 (minimal — mobile nav + theme only) |
| Data fetching | TanStack Query v5 (contact form mutations only) |
| Search | fuse.js — client-side fuzzy search for Cmd+K |
| Package manager | pnpm |
| **Email** | **Resend** (`resend`) — contact form, job applications, whitepaper delivery |
| **Newsletter** | **Mailchimp** REST API (plain fetch in Server Actions — no npm SDK) |
| **Live chat** | **Crisp** (script embed via `components/layout/crisp-chat.tsx` — no npm) |
| **Analytics** | **Vercel Analytics** (`@vercel/analytics`) + **Speed Insights** (`@vercel/speed-insights`) |
| **Product analytics** | **PostHog** (`posthog-js`) — event tracking, funnels, session recording |
| **Blog / MDX** | `gray-matter` (frontmatter) + `next-mdx-remote/rsc` (`<MDXRemote>`, async Server Component) — no `@next/mdx`, no `next.config.ts` changes. See `lib/blog.ts` and `docs/content.md` |

All third-party service packages are installed. See `docs/integrations.md` for setup patterns and env vars for each.

## Folder Structure

For the full sitemap and feature roadmap, see `docs/vision.md`.

```
app/
  layout.tsx              → root layout: fonts, TooltipProvider, Providers, Navbar, Footer
  page.tsx                → homepage
  globals.css             → Tailwind imports + CSS tokens + @theme inline
  not-found.tsx           → custom 404 page
  error.tsx               → root error boundary
  sitemap.ts              → dynamic sitemap from content/
  robots.ts               → robots.txt
  about/page.tsx
  services/
    page.tsx              → services overview
    [slug]/page.tsx       → individual service detail
  solutions/
    page.tsx              → solutions overview grid
    [slug]/page.tsx       → persona/industry landing pages
  projects/
    page.tsx              → portfolio / case studies grid
    [slug]/page.tsx       → individual project detail
  team/
    page.tsx
    [member]/page.tsx
  pricing/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx       → MDX blog post
  resources/
    case-studies/page.tsx
    whitepapers/page.tsx
    webinars/page.tsx
  changelog/page.tsx
  glossary/
    page.tsx              → glossary index (all terms)
    [term]/page.tsx       → individual term definition (SEO-targeted)
  impact/page.tsx         → transparent metrics — clients, countries, projects delivered
  careers/
    page.tsx
    [slug]/page.tsx       → individual job listing
  press/page.tsx
  contact/page.tsx
  partners/page.tsx
  legal/
    privacy/page.tsx
    terms/page.tsx
    security/page.tsx

content/                  → all authored company content (TypeScript — type-safe)
  site.ts                 → company name, tagline, mission, vision, contact info, social links
  team.ts                 → team member profiles
  projects.ts             → portfolio/case studies
  services.ts             → services offered
  solutions.ts            → persona/industry solutions pages
  testimonials.ts         → client testimonials
  values.ts               → company values
  faqs.ts                 → FAQ entries (used on pricing, contact, services)
  pricing.ts              → pricing tiers and feature comparison
  careers.ts              → open job listings
  blog/                   → MDX files (blog posts)
  changelog/              → MDX files (changelog entries)
  glossary/               → MDX or TypeScript files (glossary term definitions)

components/
  ui/                     → shadcn/ui (never hand-edit)
  common/                 → shared across 2+ pages: section-header, cta-strip, testimonial-card,
                            service-card, project-card, team-member-card, blog-post-card,
                            client-logos, newsletter-signup
  layout/
    navbar.tsx
    footer.tsx
    mobile-menu.tsx
    search-dialog.tsx     → global Cmd+K search (Fuse.js)
    crisp-chat.tsx        → Crisp live chat embed ("use client")
  sections/               → page sections, organized by page
    home/                 → hero-section, services-preview, projects-preview, stats-section,
                            testimonials-section, cta-section
    about/                → story-section, mission-vision-section, values-section (Timeline now lives in components/common/, shared with /impact)
    services/             → services-grid, service-detail-sections
    solutions/            → solutions-grid, solution-hero, use-cases-section
    projects/             → projects-grid, project-card, project-detail-sections
    team/                 → team-grid, team-member-card, member-detail-sections
    pricing/              → pricing-table, feature-matrix, pricing-faq
    blog/                 → blog-grid, blog-post-card, blog-post-layout, author-card
    careers/              → jobs-list, job-detail-sections, application-form-section
    contact/              → contact-form-section, contact-info-section
    press/                → press-releases, media-kit-section
    changelog/            → changelog-list
    glossary/             → glossary-index, term-detail
    resources/            → case-studies-grid, whitepapers-grid, webinars-grid
  motion.tsx              → framer-motion re-exports (FadeUp, StaggerContainer, etc.)

lib/
  icons.ts                → DynamicIcon + getIcon (never import lucide-react directly)
  utils.ts                → cn()
  metadata.ts             → buildMetadata helper         [planned]
  query-client.ts         → makeQueryClient (gcTime: 5 min)
  search.ts               → Fuse.js index builder for global search  [planned]
  blog.ts                 → fs + gray-matter reader for content/blog/*.mdx (the one content/ exception — not a static import)
  changelog.ts             → same pattern as blog.ts, for content/changelog/*.mdx (no per-entry route — rendered inline on /changelog)

store/
  ui-store.ts             → Zustand (minimal): mobileMenuOpen, searchOpen  [planned]

hooks/
  use-mobile.ts           → mobile breakpoint detection (currently exists)
  ui/
    use-disclosure.ts     → open/close toggle             [planned]
    use-search.ts         → global Cmd+K search hook      [planned]

providers/
  index.tsx               → Providers composer: QueryClientProvider + PHProvider + ReactQueryDevtools
  posthog.tsx             → PHProvider — PostHog init (useEffect) + PostHogProvider wrapper
```

**Provider separation rule:**
- `providers/` — external service providers (data fetching, analytics)
- `app/layout.tsx` — UI shell only (fonts, TooltipProvider, Navbar, Footer)
- New service providers go in `providers/` as individual files, composed in `providers/index.tsx`

## Critical Rules

### Server Components First

All pages and most sections are **Server Components** by default. They:
- Import directly from `content/` files — no fetch, no loading state
- Are rendered on the server — ideal for SEO and performance
- Cannot use hooks, event handlers, or browser APIs

Mark `"use client"` **only** when a component needs:
- `useState`, `useEffect`, `useRef` — interactive UI state
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`window`, `localStorage`, `navigator`)
- Framer-motion animations that react to scroll/interaction
- The contact form (react-hook-form)

```tsx
// ✅ Server Component — reads from content/, no JS shipped for this component
// components/sections/home/services-preview.tsx
import { services } from "@/content/services";
import { ServiceCard } from "@/components/common/service-card";

export function ServicesPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
```

### Route File Convention

Every `app/*/page.tsx` is a thin wrapper only — `export const metadata` (or `generateMetadata`), optional data read from `content/`, and single `return <*Sections />`:

```tsx
// app/about/page.tsx
import { AboutSections } from "@/components/sections/about";
import { generateMetadata as buildMeta } from "@/lib/metadata";

export const metadata = buildMeta({
  title: "About Us",
  description: "Learn about SoftHorizon — our story, mission, and the team behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutSections />;
}
```

No inline JSX, no `"use client"`, no business logic in route files.

**Params are async in Next.js 16** — always `await params`:

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectDetailSections } from "@/components/sections/projects";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return buildMetadata({ title: project.title, description: project.summary, path: `/projects/${slug}` });
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailSections project={project} />;
}
```

### Content is Always Imported, Never Fetched

`content/` files are TypeScript modules. Import them directly in Server Components — no API calls, no loading states, no TanStack Query for content:

```tsx
// ✅ correct — direct import in Server Component
import { teamMembers } from "@/content/team";

// ❌ wrong — fetching what is already available as a static import
const { data } = useQuery({ queryKey: ["team"], queryFn: () => fetch("/api/team") });
```

### Animations — Client Components Only

Framer-motion animations require `"use client"`. Keep the animation wrapper lean — never put data fetching inside a `"use client"` component:

```tsx
// components/sections/home/hero-section.tsx — needs "use client" for animation
"use client";
import { FadeUp, StaggerContainer } from "@/components/motion";
import { companyInfo } from "@/content/site";

export function HeroSection() {
  return (
    <StaggerContainer className="py-32">
      <FadeUp delay={0}>
        <h1 className="text-5xl font-bold">{companyInfo.tagline}</h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="text-xl text-muted-foreground">{companyInfo.heroSubtitle}</p>
      </FadeUp>
    </StaggerContainer>
  );
}
```

All framer-motion imports go through `@/components/motion` — never from `"framer-motion"` directly.

### Exports
Named exports everywhere except:
- `app/**/*.tsx` (page, layout, route, error, not-found) → `export default function` (required by Next.js)
- `next.config.ts` → `export default` (required by tools)

### Icon Usage
- `<DynamicIcon name={str} />` — render a Lucide icon from a string in JSX
- `getIcon(str)` — only when a component prop requires a `LucideIcon` reference
- Never import from `lucide-react` directly

### Zod v4 Schema Rules
- Top-level format validators: `z.email()`, `z.url()`, `z.uuid()` — not `z.string().email()`
- `z.record()` requires explicit key schema: `z.record(z.string(), z.string())`
- Error param: unified `error: "message"` — not `message`/`invalid_type_error`/`required_error`

### Toasts
Use `sonner` for all notifications — `import { toast } from "sonner"`.

## Dev Workflow

```bash
pnpm dev              # → http://localhost:3000
pnpm build            # production build (checks for static generation errors)
pnpm tsc --noEmit     # type check
pnpm lint             # lint
```

Run `pnpm tsc --noEmit` before every commit. Never `--no-verify`.

**Commit after every completed section or meaningful chunk of work.** Prefixes: `feat`, `fix`, `refactor`, `style`, `chore`, `content`.

## What NOT to Do

**Content:**
- Do not hardcode company copy in component files — all copy lives in `content/`
- Do not fetch content via API when it can be a direct TypeScript import
- Do not use TanStack Query for reading `content/` data
- Do not add `useQuery` for remote data without first switching `providers/index.tsx` to the `useState(() => makeQueryClient())` pattern — the current singleton is browser-only safe; see `docs/data-fetching.md` for the full SSR prefetching pattern

**Components:**
- Do not import from `lucide-react` directly — use `<DynamicIcon>` or `getIcon` from `lib/icons.ts`
- Do not hand-edit `components/ui/` — regenerate via `pnpm dlx shadcn@latest add`
- Do not import from `"framer-motion"` directly — use `@/components/motion`
- Do not use raw `<button>`, `<input>`, or `<select>` — use shadcn primitives
- Do not add `cursor-pointer` to individual `<Button>` usages — it is in the CVA base

**Patterns:**
- Do not put `useState`, `useEffect`, `useQuery`, `useForm` in a component body — wrap in hooks
- Do not use `export default` outside `app/` route files
- Do not add inline JSX or business logic to route files — extract to section components
- Do not access `params` synchronously — they are Promises in Next.js 16
- Do not use `z.string().email()` — use `z.email()` (Zod v4)
- Do not use `cacheTime` — use `gcTime` (TanStack Query v5)
- Do not use `forwardRef` for new components — `ref` is a regular prop in React 19
- Do not use `useFormState` — use `useActionState` (React 19)
- Do not import `useShallow` from `zustand/shallow` — use `zustand/react/shallow` (Zustand v5)

**Performance/SEO:**
- Do not skip `generateMetadata` on any page — every page needs a unique title and description
- Do not use `<img>` — always use `next/image` for all images
- Do not skip `alt` text on any image
- Do not skip `sizes` on `fill` images
- Do not add `"use client"` to sections that only read from `content/` — keep them Server Components

**Third-party integrations:**
- Do not call Resend, Mailchimp, or any third-party SDK from a Client Component — API keys are exposed in the browser bundle; always wrap in a Server Action
- Do not use `@mailchimp/mailchimp_marketing` npm package — use plain `fetch` to their REST API (no Node.js compat issues)
- Do not build a live chat or analytics system from scratch — use Crisp (embed) and Vercel Analytics / PostHog
- Do not skip rate limiting or a honeypot field on Server Actions that call external email APIs — see `docs/integrations.md`
- See `docs/integrations.md` for setup patterns for every service

**Package management:**
- Do not install more than 2–3 packages in a single `pnpm add` — causes M4 Pro freeze
- Do not run `pnpm add` while `next dev` is active — stop the dev server first
<!-- END:project-agent-rules -->
