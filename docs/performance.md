# Performance

Performance is directly tied to SEO rankings, trust, and conversion — especially critical for a public-facing company website inspected by clients, partners, and talent. Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.

## Server Components First

All pages and their content sections are Server Components by default — no JS is shipped for them. This means fast Time to First Byte (TTFB) and excellent Lighthouse scores out of the box.

Mark `"use client"` only when a component needs:
- Browser APIs (`window`, `localStorage`, `navigator`)
- React hooks (`useState`, `useEffect`, `useRef`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Framer-motion animations

Push `"use client"` as deep as possible. Keep sections as Server Components and mark only the animated or interactive leaves as client:

```tsx
// ✅ Server Component — reads content, zero client JS for this file
// components/sections/projects/projects-grid-wrapper.tsx
import { projects } from "@/content/projects";
import { ProjectsGrid } from "./projects-grid"; // ← client (handles animation)

export function ProjectsGridWrapper() {
  const featured = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
  return <ProjectsGrid projects={featured} />;
}

// ✅ Client Component — only the animation logic; data was passed from server
// components/sections/projects/projects-grid.tsx
"use client";
import { motion, useInView } from "@/components/motion";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  // ... animation variants, useInView, etc.
}
```

## Image Optimisation

Images are a primary performance factor — hero images, team photos, project galleries, and case study covers all need careful handling.

- **Always use `next/image`** — no raw `<img>` tags
- Always provide `alt` text for every image
- Use `priority` on the largest above-the-fold image (typically the hero image or first team photo)
- Every `fill` image needs a `sizes` prop matching the CSS breakpoints
- Store all images in `public/images/` — see `docs/content.md` for the folder map
- Target WebP or AVIF for photos; SVG for logos and icons

```tsx
// ✅ Hero image — priority, explicit dimensions
<Image
  src="/images/hero-bg.jpg"
  alt="Softhorizon team building digital products"
  width={1440}
  height={800}
  priority          // above fold — loads before page is interactive
  className="object-cover"
/>

// ✅ Fill image — needs sizes
<div className="relative w-full aspect-video">
  <Image
    src={project.coverImage}
    alt={project.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover rounded-xl"
  />
</div>

// ✅ Team photo — explicit dimensions matching the rendered size
<Image
  src={member.photo}
  alt={member.name}
  width={320}
  height={320}
  className="rounded-full object-cover"
/>
```

## Static Generation

All pages should statically generate at build time (`next build`). Dynamic routes must export `generateStaticParams` so Next.js pre-renders all pages:

```ts
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

Run `pnpm build` periodically to verify static generation succeeds and to see bundle size output.

## Font Loading

Fonts are loaded via `next/font` — never self-host with `@font-face` or load from a CDN link:

```ts
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// Applied as CSS variables → used by Tailwind
```

## Bundle Optimization

- **framer-motion:** always import via `@/components/motion` — never from `"framer-motion"` directly. Barrel import prevents the entire library from being pulled into components that only use one or two exports.
- **lucide-react:** always import through `lib/icons.ts` — only icons in the `iconMap` are bundled; direct imports pull in all icons.
- **shadcn/ui:** components are copied into `components/ui/` — only installed components are in the bundle. Install only what you need.

## Lazy Loading Sections

For very long pages (especially the homepage), consider dynamic imports for sections below the fold:

```tsx
// components/sections/home/home-sections.tsx
import dynamic from "next/dynamic";
import { HeroSection } from "./hero-section";
import { ServicesPreview } from "./services-preview";

// Below fold — load lazily
const TestimonialsSection = dynamic(() => import("./testimonials-section").then(m => m.TestimonialsSection), {
  loading: () => <div className="py-24 animate-pulse bg-muted/20" />,
});
```

Only add `dynamic()` when `pnpm build` shows a section is notably large (>50kB parsed).

## `useMemo` in Client Components

For any derived data computed inside a Client Component, use `useMemo` to prevent recomputation on every render:

```tsx
"use client";
import { useMemo } from "react";

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(
    () => activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

  // ...
}
```

## Do NOT

- Mark entire pages or large sections `"use client"` — push the client boundary down to individual interactive components
- Use raw `<img>` — always `next/image`
- Skip `priority` on the hero image — it is always above the fold
- Skip `sizes` on `fill` images — without it, Next.js serves the largest possible size to every device
- Omit `generateStaticParams` on dynamic routes — pages won't pre-render and will be server-rendered on demand
- Import from `"framer-motion"` directly — use `@/components/motion`
- Import from `"lucide-react"` directly — use `lib/icons.ts`
- Use `cacheTime` — renamed to `gcTime` in TanStack Query v5
