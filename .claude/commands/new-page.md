# Scaffold a New Page

Create a new page in this Next.js 16 App Router project following the conventions in `docs/pages.md`.

## Steps

### 1. Read the docs first
Before creating any files, read:
- `docs/pages.md` — route file pattern, naming, Server vs Client rules
- `docs/seo.md` — `generateMetadata` / `buildMetadata` pattern
- The relevant `content/*.ts` file if this page renders existing content

### 2. Determine the route
Identify the correct path under `app/`. Examples:
- Static page: `app/about/page.tsx`
- Dynamic page: `app/blog/[slug]/page.tsx`

### 3. Create the route file (`app/.../page.tsx`)

**Static page pattern:**
```tsx
import { PageNameSections } from "@/components/sections/page-name";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Page Title",
  description: "One-sentence description for search engines.",
  path: "/page-name",
});

export default function PageNamePage() {
  return <PageNameSections />;
}
```

**Dynamic page pattern (params are async in Next.js 16):**
```tsx
import { notFound } from "next/navigation";
import { items } from "@/content/items";
import { ItemDetailSections } from "@/components/sections/items";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = items.find((i) => i.slug === slug);
  if (!item) return {};
  return buildMetadata({ title: item.title, description: item.summary, path: `/items/${slug}` });
}

export async function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = items.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ItemDetailSections item={item} />;
}
```

Rules for route files:
- `export default function` (Next.js requirement)
- No inline JSX beyond a single `return <PageSections />`
- No `"use client"`
- No business logic — everything goes in section components

### 4. Create the sections aggregator (`components/sections/page-name/index.tsx`)

```tsx
import { HeroSection } from "./hero-section";
import { ContentSection } from "./content-section";
import { CtaSection } from "./cta-section";

export function PageNameSections() {
  return (
    <>
      <HeroSection />
      <ContentSection />
      <CtaSection />
    </>
  );
}
```

Named export only — never `export default` outside `app/`.

### 5. Create individual section components

For each section under `components/sections/page-name/`:

**Server Component (most sections):**
```tsx
// No "use client" — reads directly from content/
import { items } from "@/content/items";

export function ContentSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* render items */}
      </div>
    </section>
  );
}
```

**Client Component (only when animation / interactivity needed):**
```tsx
"use client";
import { FadeUp } from "@/components/motion";

export function HeroSection() {
  return (
    <section className="py-32">
      <FadeUp>
        <h1>Headline</h1>
      </FadeUp>
    </section>
  );
}
```

### 6. Add to navigation (if needed)
Update `components/layout/navbar.tsx` and `components/layout/footer.tsx` if the page should appear in navigation.

### 7. Verify
```bash
pnpm tsc --noEmit   # no type errors
pnpm build          # page statically generates
```

## Checklist
- [ ] Route file is thin: only metadata + single section component return
- [ ] `params` are awaited (not accessed synchronously)
- [ ] `generateMetadata` present (or `export const metadata`)
- [ ] Section components use named exports
- [ ] No `"use client"` on sections that only read from `content/`
- [ ] Framer-motion imports go through `@/components/motion`
- [ ] Icons use `<DynamicIcon>` or `getIcon` — not direct `lucide-react` imports
- [ ] `pnpm tsc --noEmit` passes
