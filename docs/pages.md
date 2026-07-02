# Pages & Sections

## Route Map

For the full feature roadmap and IA, see `docs/vision.md`. Below is the complete route list.

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, value proposition, stats, services teaser, projects teaser, testimonials, CTA |
| `/about` | Company story, mission, vision, values, timeline/milestones |
| `/services` | Services overview grid |
| `/services/[slug]` | Individual service detail — features, use cases, tech stack, process, CTA |
| `/solutions` | Solutions overview grid (all personas & industries) |
| `/solutions/[slug]` | Persona/industry landing pages (e.g. "for-startups", "for-fintech") |
| `/projects` | Portfolio/case studies grid (filterable by category) |
| `/projects/[slug]` | Individual project case study — problem, solution, results, gallery |
| `/team` | Team overview grid |
| `/team/[member]` | Individual team member profile |
| `/pricing` | Pricing tiers, feature comparison matrix, FAQ |
| `/blog` | Blog — categorised, searchable, author profiles |
| `/blog/[slug]` | Individual blog post (MDX) |
| `/resources/case-studies` | Deeper narrative case studies |
| `/resources/whitepapers` | Gated lead-gen PDFs (email gate via Server Action) |
| `/resources/webinars` | Recordings + upcoming events |
| `/changelog` | Company and product updates (MDX entries) |
| `/careers` | Open roles, filterable by department/remote |
| `/careers/[slug]` | Individual job listing + application form |
| `/press` | Press releases, media kit, logo downloads, exec headshots |
| `/contact` | Inquiry form, department emails, response SLA, office info |
| `/partners` | Partner program info + application form |
| `/glossary` | Glossary index — all domain terms listed alphabetically |
| `/glossary/[term]` | Individual term definition — SEO-targeted, linkable |
| `/impact` | Transparent company metrics — clients, countries, projects delivered |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |
| `/legal/security` | Security & compliance |
| `/not-found` | Custom 404 page |

## Route File Pattern

Every `app/*/page.tsx` is a thin server wrapper — metadata + a single section component. No inline JSX, no `"use client"`, no business logic:

```tsx
// app/about/page.tsx
import { AboutSections } from "@/components/sections/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about SoftHorizon — our story, mission, and the team behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutSections />;
}
```

For dynamic routes, use `generateMetadata` and `generateStaticParams`. Params are async in Next.js 16:

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectDetailSections } from "@/components/sections/projects";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    image: project.coverImage,
  });
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailSections project={project} />;
}
```

## Section Components

Sections live in `components/sections/{page}/`. They are the primary building blocks of each page.

```
components/sections/
  home/
    hero-section.tsx
    services-preview.tsx
    projects-preview.tsx
    stats-section.tsx
    testimonials-section.tsx
    cta-section.tsx
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
    projects-filter.tsx      → "use client" — category tabs (Tabs) + filtered grid, wrapped by projects-grid.tsx
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
    application-form-section.tsx
  contact/
    contact-form-section.tsx
    contact-info-section.tsx
  partners/
    partner-intro-section.tsx
    partner-application-form-section.tsx
  press/
    press-releases.tsx
    media-kit-section.tsx
  legal/
    legal-document-sections.tsx    → shared renderer for privacy/terms/security, driven by content/legal.ts
  changelog/
    changelog-list.tsx
  glossary/
    glossary-index.tsx
    term-detail.tsx
  resources/
    case-studies-grid.tsx        → [ ] not yet built
    whitepapers-grid.tsx
    whitepaper-card.tsx          → "use client" — Dialog + email-gate form per card
    whitepapers/
      schemas.ts
      actions.ts                 → requestWhitepaper() — Resend emails a download link, per docs/integrations.md
      hooks/
        use-whitepaper-request-form.ts
    webinars-grid.tsx            → [ ] not yet built
```

### Page Aggregator Components

Each page has an aggregator component that composes its sections:

```tsx
// components/sections/home/index.tsx — or home-sections.tsx
import { HeroSection } from "./hero-section";
import { ServicesPreview } from "./services-preview";
import { ProjectsPreview } from "./projects-preview";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
```

## Server vs Client Sections

Most sections are **Server Components** — they read directly from `content/` files:

```tsx
// components/sections/home/services-preview.tsx — Server Component (no "use client")
import { services } from "@/content/services";
import { ServiceCard } from "@/components/common/service-card";
import Link from "next/link";

export function ServicesPreview() {
  const featured = services.filter((s) => s.featured).slice(0, 3);
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="...">View All Services</Link>
        </div>
      </div>
    </section>
  );
}
```

Mark `"use client"` only when a section needs **animation**, **interactive state**, or **forms**:

```tsx
// components/sections/home/hero-section.tsx — Client Component (needs animation)
"use client";
import { companyInfo } from "@/content/site";
import { FadeUp, StaggerContainer } from "@/components/motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <StaggerContainer className="container mx-auto px-6 text-center">
        <FadeUp>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {companyInfo.shortTagline}
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="mt-4 text-5xl font-bold leading-tight lg:text-6xl">
            {companyInfo.heroHeadline}
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            {companyInfo.heroSubtitle}
          </p>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-10 flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Work With Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">See Our Work</Link>
          </Button>
        </FadeUp>
      </StaggerContainer>
    </section>
  );
}
```

## Component Placement Decision Tree

```
shadcn/ui primitive?                 → components/ui/     (never hand-edit)
Navigation / Footer?                 → components/layout/
Used on 2+ pages?                    → components/common/
Specific to one page section?        → components/sections/{page}/
Scoped to one section's sub-element? → components/sections/{page}/{element}.tsx
```

## Named Exports

Named exports everywhere except `app/` route files (`export default function`).

```tsx
// ✅ sections — named export
export function HeroSection() { ... }

// ✅ common components — named export
export function ServiceCard({ service }: ServiceCardProps) { ... }

// ✅ route files — default export (Next.js requirement)
export default function AboutPage() { ... }
```

## Naming Conventions

- Files: `kebab-case` throughout
- Section components: `{context}-section.tsx` (e.g. `hero-section.tsx`, `values-section.tsx`)
- Page aggregators: `{page}-sections.tsx` (e.g. `home-sections.tsx`)
- Cards and sub-components: `{thing}-card.tsx`, `{thing}-detail.tsx`
- Dialogs: `{action}-dialog.tsx` — never `{action}-modal.tsx`

## Do NOT

- Hardcode company copy in section components — import from `content/`
- Put `"use client"` on sections that only read from `content/` (keep Server Components)
- Add business logic to `app/*/page.tsx` route files — extract to section components
- Skip `generateMetadata` or `export const metadata` on any page
- Access `params` synchronously — they are Promises in Next.js 16
- Use `export default` outside `app/` route files
