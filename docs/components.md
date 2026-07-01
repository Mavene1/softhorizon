# Component Catalog

## Placement Decision Tree

```
shadcn/ui primitive?                  → components/ui/           (never hand-edit)
Navigation, Footer, Search dialog?    → components/layout/
Used on 2+ pages / sections?          → components/common/
Specific to exactly one page?         → components/sections/{page}/
Sub-element of one section?           → components/sections/{page}/{element}.tsx
```

The `features/{name}/components/` pattern from SaaS dashboard projects does **not** apply here. This site has no feature modules — all sections are organised by the page they belong to.

---

## shadcn/ui Usage

Always prefer shadcn/ui over raw HTML primitives.

| Raw element | shadcn/ui replacement |
|---|---|
| `<button>` | `<Button>` |
| `<input type="text">` | `<Input>` |
| `<input type="checkbox">` | `<Checkbox>` |
| `<select>` | `<Select>` + `<SelectTrigger>` + `<SelectContent>` + `<SelectItem>` |
| `<textarea>` | `<Textarea>` |
| `<a href={…}>` styled as button | `<Button asChild><Link href="…">…</Link></Button>` |

**Never hand-edit `components/ui/`** — regenerate via `pnpm dlx shadcn@latest add <component>`.

### `asChild` — Link buttons

```tsx
// Internal link
<Button asChild size="lg">
  <Link href="/contact">Work With Us</Link>
</Button>

// External link
<Button asChild variant="outline">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">View Live</a>
</Button>
```

### Button Variants

| Variant | When to use |
|---|---|
| `default` | Primary CTA (one per section) |
| `outline` | Secondary action |
| `ghost` | Low-weight actions, icon buttons |
| `destructive` | Irreversible confirmations |
| `link` | Inline text links |

Never add `cursor-pointer` to individual `<Button>` usages — the CVA base already includes it.

---

## Layout Components (`components/layout/`)

Instantiated once in the root layout. Never render them inside page sections.

| Component | File | Purpose |
|---|---|---|
| `Navbar` | `navbar.tsx` | Fixed top navigation with links and dark-mode toggle |
| `Footer` | `footer.tsx` | Site footer — links, social icons, copyright |
| `MobileMenu` | `mobile-menu.tsx` | Mobile drawer navigation (Zustand: `mobileMenuOpen`) |
| `SearchDialog` | `search-dialog.tsx` | Cmd+K global search modal (Fuse.js over `content/`) |

`MobileMenu` and `SearchDialog` are Client Components. `Navbar` and `Footer` can be Server Components if they only render static links from `content/site.ts`.

---

## Common Components (`components/common/`)

Shared across two or more pages/sections. Import from `@/components/common`.

### `SectionHeader`

Consistent heading block used at the top of most sections. Props: `overline?`, `title`, `subtitle?`, `align?` (`"left"` | `"center"`).

```tsx
import { SectionHeader } from "@/components/common/section-header";

<SectionHeader
  overline="What we do"
  title="Services built for ambitious companies"
  subtitle="From product design to full-stack engineering — end-to-end."
  align="center"
/>
```

### `CtaStrip`

Full-width call-to-action band. Appears at the bottom of most pages.

```tsx
import { CtaStrip } from "@/components/common/cta-strip";

<CtaStrip
  headline="Ready to build something great?"
  subtext="Let's talk about your project."
  primaryCta={{ label: "Get in touch", href: "/contact" }}
  secondaryCta={{ label: "See our work", href: "/projects" }}
/>
```

### `TestimonialCard`

Quote card with avatar, author name, role, and company.

```tsx
import type { Testimonial } from "@/content/testimonials";
import { TestimonialCard } from "@/components/common/testimonial-card";

<TestimonialCard testimonial={testimonial} />
```

### `ServiceCard`

Card for an individual service. Links to `/services/[slug]`.

```tsx
import type { Service } from "@/content/services";
import { ServiceCard } from "@/components/common/service-card";

<ServiceCard service={service} />
```

### `ProjectCard`

Portfolio card with cover image, title, client, category badge, and results teaser. Links to `/projects/[slug]`.

```tsx
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/common/project-card";

<ProjectCard project={project} />
```

### `TeamMemberCard`

Team member thumbnail with photo, name, role. Links to `/team/[slug]`.

```tsx
import type { TeamMember } from "@/content/team";
import { TeamMemberCard } from "@/components/common/team-member-card";

<TeamMemberCard member={member} />
```

### `BlogPostCard`

Blog post preview: cover image, category, title, summary, author, reading time.

```tsx
// Props inferred from blog MDX frontmatter
<BlogPostCard post={post} />
```

### `ClientLogos`

Horizontal strip or grid of client/partner logo images.

```tsx
import { ClientLogos } from "@/components/common/client-logos";

<ClientLogos />  // reads from content/site.ts or a dedicated content/clients.ts
```

### `NewsletterSignup`

Inline email capture block (name + email → Server Action → Mailchimp). A Client Component (uses react-hook-form).

```tsx
import { NewsletterSignup } from "@/components/common/newsletter-signup";

<NewsletterSignup />
```

---

## Section Components (`components/sections/{page}/`)

Page-specific sections. Each page has an `index.tsx` aggregator that composes its sections:

```tsx
// components/sections/home/index.tsx
import { HeroSection } from "./hero-section";
import { ServicesPreview } from "./services-preview";
import { ProjectsPreview } from "./projects-preview";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <ProjectsPreview />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
```

### Section directory map

```
components/sections/
  home/
    hero-section.tsx          → "use client" (framer-motion animation)
    services-preview.tsx      → Server Component
    projects-preview.tsx      → Server Component
    stats-section.tsx         → Server Component (or "use client" for count-up animation)
    testimonials-section.tsx  → Server Component
    cta-section.tsx           → Server Component
  about/
    story-section.tsx
    mission-vision-section.tsx
    values-section.tsx
    timeline-section.tsx
  services/
    services-grid.tsx
    service-detail-sections.tsx
  solutions/
    solutions-grid.tsx
    solution-hero.tsx
    use-cases-section.tsx
  projects/
    projects-grid.tsx
    project-card.tsx
    project-detail-sections.tsx
  team/
    team-grid.tsx
    team-member-card.tsx
    member-detail-sections.tsx
  pricing/
    pricing-table.tsx
    feature-matrix.tsx
    pricing-faq.tsx
  blog/
    blog-grid.tsx
    blog-post-card.tsx
    blog-post-layout.tsx
    author-card.tsx
  careers/
    jobs-list.tsx
    job-detail-sections.tsx
    application-form-section.tsx   → "use client" (react-hook-form)
  contact/
    contact-form-section.tsx       → "use client" (react-hook-form)
    contact-info-section.tsx
  press/
    press-releases.tsx
    media-kit-section.tsx
  changelog/
    changelog-list.tsx
  glossary/
    glossary-index.tsx        → alphabetical listing of all terms
    term-detail.tsx           → individual term page (title, definition, related terms)
  resources/
    case-studies-grid.tsx     → narrative case studies listing
    whitepapers-grid.tsx      → gated PDF downloads with email gate form
    webinars-grid.tsx         → recordings + upcoming events listing
```

---

## Motion Components (`components/motion.tsx`)

Framer-motion primitives. **Always import from `@/components/motion`** — never from `"framer-motion"` directly.

```tsx
import { FadeUp, FadeIn, StaggerContainer, SlideIn } from "@/components/motion";

// Basic fade-up on scroll
<FadeUp>
  <h2>Section heading</h2>
</FadeUp>

// Staggered children
<StaggerContainer className="grid grid-cols-3 gap-8">
  <FadeUp delay={0}>  <ServiceCard ... />  </FadeUp>
  <FadeUp delay={0.1}><ServiceCard ... />  </FadeUp>
  <FadeUp delay={0.2}><ServiceCard ... />  </FadeUp>
</StaggerContainer>
```

See `docs/animations.md` for the full motion component API and animation patterns.

---

## React 19 Notes

- **No `forwardRef`** — `ref` is a regular prop in React 19:

```tsx
// ✅ React 19
export function MyInput({ ref, ...props }: React.ComponentProps<"input"> & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}

// ❌ React 18 — do not use forwardRef for new components
export const MyInput = forwardRef<HTMLInputElement, Props>((props, ref) => { ... });
```

- **No `<Context.Provider>`** — use `<MyContext>` directly:

```tsx
// ✅ React 19
<ThemeContext value={theme}>{children}</ThemeContext>

// ❌ React 18
<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
```

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Section | `{context}-section.tsx` | `hero-section.tsx`, `values-section.tsx` |
| Page aggregator | `index.tsx` | `components/sections/about/index.tsx` |
| Card | `{thing}-card.tsx` | `service-card.tsx`, `project-card.tsx` |
| Dialog | `{action}-dialog.tsx` | `apply-dialog.tsx` |
| Detail block | `{thing}-detail.tsx` | `project-detail.tsx` |
| Common component | `{thing}.tsx` | `section-header.tsx`, `cta-strip.tsx` |

All filenames: `kebab-case`. All exports: **named** — never `export default` outside `app/`.

---

## Do NOT

- Use `features/{name}/components/` — this SaaS pattern does not apply; use `components/sections/{page}/`
- Hand-edit `components/ui/` — regenerate via `pnpm dlx shadcn@latest add`
- Use raw `<button>`, `<input>`, `<select>`, `<textarea>` — use shadcn/ui equivalents
- Use `<a>` styled as a button — use `<Button asChild><Link …></Button>`
- Add `cursor-pointer` to `<Button>` — it's already in the CVA base
- Import from `"framer-motion"` directly — use `@/components/motion`
- Import from `"lucide-react"` directly — use `<DynamicIcon>` or `getIcon` from `lib/icons.ts`
- Add `"use client"` to sections that only read from `content/` — keep them Server Components
- Use `forwardRef` for new components — `ref` is a regular prop in React 19
- Use `<Context.Provider>` — use `<Context>` directly in React 19
