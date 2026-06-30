# Website Vision & Feature Roadmap

This document captures the full scope of what Softhorizon's website aims to be — not a brochure, but a world-class company presence that drives business, builds trust, and showcases talent. Use it as the north star during development. Check off features as they are built.

## Philosophy

Study and draw inspiration from: **Stripe** (copywriting, animations, developer docs), **Linear** (product demo, design system feel), **Vercel** (performance, dark mode, changelog), **Notion** (case studies, template gallery), **HubSpot** (content depth, SEO, lead capture), **Intercom** (pricing page, customer stories), **Loom** (homepage hero, social proof).

---

## Backend & Infrastructure Decision

**No custom backend API server is required.** Here is the full picture:

| Need | Solution | Notes |
|---|---|---|
| Contact / inquiry form | Server Action + Resend | No DB needed; email goes to inbox |
| Newsletter signup | Server Action + Mailchimp or Buttondown | They own the list and the send infra |
| Job application | Server Action + email (Resend) | Submissions emailed to HR; or Notion/Airtable for tracking |
| Live chat | Crisp or Intercom (third-party embed) | Full product; no custom build |
| Global search (Cmd+K) | Fuse.js (client-side, static content) | Fast, zero infra, works with static TS files |
| Analytics | Vercel Analytics + Plausible | Privacy-first; no backend needed |
| Media / images | `public/images/` via `next/image` | Static; CDN-served |
| Blog / articles | MDX files in `content/blog/` | Devs write; TypeScript type-checks frontmatter |

**Rule:** If a need can be met by a Server Action + third-party service, do that. Only add a database (Supabase, PlanetScale) if you need persistent storage that a third-party service does not own — e.g., a custom partner portal with login, or a job application inbox you want to query and filter inside the app.

---

## Full Sitemap / Information Architecture

```
softhorizon.com
├── / (Homepage)
├── /about                       → story, mission, vision, values, timeline/milestones
├── /services
│   ├── /services                → services overview grid
│   └── /services/[slug]         → individual service detail
├── /solutions
│   └── /solutions/[slug]        → one dynamic route covers all personas & industries
│                                  (e.g. "for-fintech", "for-startups", "for-enterprise")
├── /projects                    → portfolio / case studies
│   └── /projects/[slug]
├── /team
│   └── /team/[member]
├── /pricing
├── /blog
│   └── /blog/[slug]
├── /resources
│   ├── /resources/case-studies  → deeper than portfolio cards
│   ├── /resources/whitepapers   → gated lead-gen PDFs (email gate)
│   └── /resources/webinars      → recordings + upcoming
├── /changelog
├── /careers
│   └── /careers/[slug]          → individual job listing
├── /press
├── /contact
├── /partners
├── /legal
│   ├── /legal/privacy
│   ├── /legal/terms
│   └── /legal/security
├── /glossary                    → domain glossary index
│   └── /glossary/[term]         → individual term definition (SEO-targeted)
├── /impact                      → transparent metrics page (optional standalone)
└── (planned later — Phase 3)
    ├── /community               → link out to Discord / Circle forum
    └── /api-docs                → if Softhorizon ships a developer-facing product
```

---

## Feature Checklist

Track progress here. Move items to "Done" by adding ✅.

### Core Pages

- [ ] **Homepage** — Hero, value proposition, stats/social proof, services teaser, projects teaser, testimonials, CTA strip
- [ ] **About** — Founding story, mission & vision, values (visual treatment), timeline/milestones
- [ ] **Services** — Services grid overview
- [ ] **Service detail** (`/services/[slug]`) — Features, use cases, tech stack, process, CTA
- [ ] **Projects / Portfolio** — Filterable grid by category
- [ ] **Project detail** (`/projects/[slug]`) — Problem → Solution → Results, metrics, gallery, testimonial
- [ ] **Team** — Grid with photos, roles, bios
- [ ] **Team member** (`/team/[member]`) — Full profile: bio, skills, social links
- [ ] **Contact** — Form, company email, office location, response SLA, department emails
- [ ] **Pricing** — Tier table, feature comparison matrix, FAQ, trust signals
- [ ] **404 not-found page** — On-brand, helpful navigation links
- [ ] **Error boundary** (`error.tsx`) — Graceful error with retry

### Marketing & Growth

- [ ] **Solutions pages** (`/solutions/[industry]`) — Persona-specific landing pages (e.g. "For Fintech", "For Startups")
- [ ] **Newsletter signup** — Inline section + dedicated block; Server Action → Mailchimp/Buttondown
- [ ] **Lead capture forms** — Progressive profiling: name + email first, details later
- [ ] **Live chat widget** — Crisp or Intercom embed (script in layout)
- [ ] **Webinar / Event pages** (`/resources/webinars`) — Upcoming + past recordings
- [ ] **Partner program page** (`/partners`) — What partnership entails, application form

### Content & Thought Leadership

- [ ] **Blog** (`/blog`) — Categorised, searchable, author profiles, reading time estimate
- [ ] **Blog post** (`/blog/[slug]`) — MDX with syntax highlighting, table of contents, social share
- [ ] **Case studies** (`/resources/case-studies`) — Narrative format: problem → solution → results → quote
- [ ] **Whitepapers / Reports** (`/resources/whitepapers`) — Email gate (Server Action → Resend delivers PDF link)
- [ ] **Webinar recordings** (`/resources/webinars`) — Embedded Vimeo/YouTube, filterable
- [ ] **Glossary / Knowledge base** (`/glossary/[term]`) — SEO play, establish authority

### Trust & Credibility Signals

- [ ] **Client logos wall** — Recognisable client names on homepage + about
- [ ] **Testimonials** — Video > text; embedded on homepage and relevant pages
- [ ] **Awards & certifications section** — ISO, industry awards, recognitions
- [ ] **Press / Media kit** (`/press`) — Company bio, logo downloads, exec headshots, press releases
- [ ] **Security & compliance page** (`/legal/security`) — Data handling, certifications, pentesting

### Careers & Culture

- [ ] **Careers page** (`/careers`) — Open roles, filterable by department / remote / location
- [ ] **Job listing** (`/careers/[job-slug]`) — Role detail, responsibilities, application form (Server Action → Resend)
- [ ] **Life at Softhorizon section** — Real photos, team events, culture values
- [ ] **Benefits & perks page** — Detailed, visual, honest
- [ ] **Interview process section** — Demystify: stages, timelines, what to expect
- [ ] **DEI commitments** — With data and actual goals

### Technical & UX Excellence

- [ ] **Global search** — Cmd+K modal; Fuse.js over all static `content/` data + blog MDX frontmatter
- [ ] **Dark mode toggle** — next-themes (already wired)
- [ ] **Scroll animations** — Framer-motion reveals, staggered grids, hero entrance
- [ ] **Page transitions** — AnimatePresence fade on route change
- [ ] **Responsive design** — Mobile-first; tested at 320px, 768px, 1280px, 1536px
- [ ] **Accessibility (WCAG 2.1 AA)** — Keyboard nav, screen reader support, color contrast
- [ ] **Performance** — LCP < 2.5s, CLS < 0.1, Lighthouse 90+; `priority` on hero images
- [ ] **Sitemap** (`/sitemap.xml`) — Dynamic from `content/` data
- [ ] **Robots.txt** (`/robots.txt`)
- [ ] **Open Graph images** — Per-page and per-project OG images (1200×630)
- [ ] **JSON-LD structured data** — Organization schema on root, Article on blog posts, Person on team pages
- [ ] **Analytics** — Vercel Analytics + Speed Insights (Day 1); PostHog for event tracking (Phase 2)
- [ ] **PWA** — Web app manifest, service worker, installable from browser (Phase 3)
- [ ] **i18n / localisation** — `next-intl` for multi-language support (Phase 3, if global markets are a priority)

### Content & Knowledge

- [ ] **Glossary / Knowledge base** (`/glossary`, `/glossary/[term]`) — Definitions of terms in your domain; strong SEO play; establishes authority. Each term is a static MDX or TypeScript entry.
- [ ] **Changelog page** (`/changelog`) — Company updates, product releases, milestone announcements; MDX entries sorted by date

### Data & Transparency

- [ ] **Impact / Metrics page** — Transparent numbers: clients served, countries, projects delivered, team size. Modelled on Buffer's transparency. Lives as a section on `/about` or its own `/impact` page.
- [ ] **Status page** — Real-time uptime signal. Use an external service (Better Uptime, Instatus, or Atlassian Statuspage); link from footer. Not a Next.js page — just a badge/link.

---

## Content Files Required

All content lives in `content/` as TypeScript — see `docs/content.md` for schemas.

| File | Status |
|---|---|
| `content/site.ts` | needs creating |
| `content/services.ts` | needs creating |
| `content/projects.ts` | needs creating |
| `content/team.ts` | needs creating |
| `content/testimonials.ts` | needs creating |
| `content/values.ts` | needs creating |
| `content/faqs.ts` | needs creating |
| `content/blog/` (MDX files) | needs creating |
| `content/careers.ts` | needs creating |
| `content/pricing.ts` | needs creating |
| `content/changelog/` (MDX files) | needs creating |
| `content/solutions.ts` | needs creating |

---

## Third-Party Integrations (Planned)

Full setup patterns for every service live in **`docs/integrations.md`**. Install rules: max 2–3 packages per `pnpm add`, stop `next dev` first (M4 Pro freeze prevention — see `docs/package-management.md`).

| Service | Package | Purpose | When to integrate |
|---|---|---|---|
| **Resend** | `resend` | Transactional email — contact form, job applications, whitepaper delivery | When building contact form |
| **Mailchimp** | _(raw fetch, no SDK)_ | Newsletter list management | When building newsletter signup |
| **Crisp** | _(script embed, no npm)_ | Live chat widget | Phase 2 |
| **Vercel Analytics** | `@vercel/analytics` | Page views, Core Web Vitals — 1-line setup | Day 1 |
| **Vercel Speed Insights** | `@vercel/speed-insights` | Performance monitoring | Day 1 (install with Analytics) |
| **PostHog** | `posthog-js` | Event tracking, funnels, session recording (open-source, self-hostable) | Phase 2 |
| **Fuse.js** | `fuse.js` | Client-side fuzzy search for Cmd+K global search | When building search dialog |

---

## Sites Worth Studying

| Company | What to steal |
|---|---|
| **Stripe** | Developer docs, animations, copywriting density |
| **Linear** | Product demo UX, design system precision |
| **Vercel** | Performance, dark mode, changelog format |
| **Notion** | Case study depth, template showcase |
| **HubSpot** | Content breadth, SEO architecture, lead capture |
| **Intercom** | Pricing page layout, customer story format |
| **Loom** | Homepage hero structure, social proof placement |
| **Raycast** | Command palette (Cmd+K inspiration) |
| **Resend** | Clean developer-focused copywriting |
