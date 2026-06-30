# Create a New Section Component

Create a section component following the conventions in `docs/pages.md` and `docs/components.md`.

## Decision: Server or Client?

Answer these questions in order:

1. Does this section use `useState`, `useEffect`, or `useRef`? → **Client**
2. Does it have `onClick`, `onChange`, or `onSubmit` handlers? → **Client**
3. Does it use framer-motion animations (scroll-triggered, interactive)? → **Client**
4. Does it use `react-hook-form`, `useMutation`, or browser APIs? → **Client**
5. None of the above — it only reads from `content/` and renders JSX? → **Server** (no `"use client"`)

Keep Server Components by default. Mark `"use client"` only when required.

## Placement

```
Used on 2+ pages?                    → components/common/{component-name}.tsx
Specific to one page?                → components/sections/{page}/{section-name}.tsx
Scoped to one section's sub-element? → components/sections/{page}/{element}.tsx
```

## Server Component Template

```tsx
// components/sections/{page}/{name}-section.tsx
import { dataItems } from "@/content/data-file";
import { SomeCommonComponent } from "@/components/common";
import { SectionHeader } from "@/components/common/section-header";

export function NameSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          overline="Optional small label"
          title="Section Heading"
          subtitle="Supporting description text."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {dataItems.map((item) => (
            <SomeCommonComponent key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Client Component Template (animation)

```tsx
// components/sections/{page}/{name}-section.tsx
"use client";
import { FadeUp, StaggerContainer } from "@/components/motion";
import { siteConfig } from "@/content/site";

export function NameSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <StaggerContainer className="container mx-auto px-6 text-center">
        <FadeUp>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {siteConfig.shortTagline}
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-4xl font-bold">{siteConfig.heroHeadline}</h2>
        </FadeUp>
      </StaggerContainer>
    </section>
  );
}
```

## Card / Sub-component Template

```tsx
// components/sections/{page}/{thing}-card.tsx  OR  components/common/{thing}-card.tsx
import type { MyType } from "@/content/my-file";
import { DynamicIcon } from "@/lib/icons";

interface Props {
  item: MyType;
}

export function MyThingCard({ item }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <DynamicIcon name={item.icon} className="h-8 w-8 text-primary mb-4" />
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
    </div>
  );
}
```

## Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| Section | `{context}-section.tsx` | `hero-section.tsx`, `values-section.tsx` |
| Page aggregator | `index.tsx` in the page folder | `components/sections/about/index.tsx` |
| Card | `{thing}-card.tsx` | `service-card.tsx`, `blog-post-card.tsx` |
| Dialog | `{action}-dialog.tsx` | `apply-dialog.tsx` |
| Detail block | `{thing}-detail.tsx` | `project-detail.tsx` |

All files: `kebab-case`. All exports: named (never `export default` outside `app/`).

## Rules

- Never put data fetching logic (fetch, useQuery) inside section components — content comes from `content/` imports
- Never import from `lucide-react` directly — use `<DynamicIcon name="..." />` or `getIcon("...")`
- Never import from `"framer-motion"` directly — use `@/components/motion`
- Never use raw `<button>`, `<input>`, `<select>` — use shadcn/ui equivalents
- Never add `cursor-pointer` to `<Button>` — the CVA base already includes it
