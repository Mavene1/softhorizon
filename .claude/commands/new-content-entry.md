# Add a Content Entry

Add data to a `content/*.ts` file following the schemas in `docs/content.md`.

## Before Adding

1. Read `docs/content.md` — find the correct file and interface for the content type
2. Open the target `content/*.ts` file and read its existing entries to match the style
3. Check all required fields on the interface — TypeScript will error if any are missing

## Content Files Quick Reference

| Content type | File | Interface |
|---|---|---|
| Company info, tagline, mission | `content/site.ts` | `siteConfig` (const object) |
| Services / capabilities | `content/services.ts` | `Service` |
| Portfolio / case studies | `content/projects.ts` | `Project` |
| Team members | `content/team.ts` | `TeamMember` |
| Client testimonials | `content/testimonials.ts` | `Testimonial` |
| Company values | `content/values.ts` | `Value` |
| FAQ entries | `content/faqs.ts` | `FAQ` |
| Open job listings | `content/careers.ts` | `JobListing` |
| Pricing tiers | `content/pricing.ts` | `PricingTier` |
| Solutions / persona pages | `content/solutions.ts` | `Solution` |
| Blog posts | `content/blog/*.mdx` | MDX frontmatter (see below) |
| Changelog entries | `content/changelog/*.mdx` | MDX frontmatter (see below) |

## Adding to an Array File

Most content files export a typed array. Add a new object to the array, filling every required field:

```ts
// content/services.ts — add to the services array
{
  slug: "mobile-development",        // kebab-case, used in URL /services/mobile-development
  title: "Mobile Development",
  tagline: "iOS and Android apps built to scale",
  description: "We build native and cross-platform mobile apps...",
  longDescription: "...",
  icon: "Smartphone",                 // lucide-react icon name — verify in lib/icons.ts
  features: [
    "React Native & Expo",
    "Native iOS (Swift) & Android (Kotlin)",
    "App Store submission",
  ],
  technologies: ["React Native", "Expo", "TypeScript"],
  featured: false,
  order: 4,                           // controls sort order on the page
}
```

## Slug Rules

- Always `kebab-case`
- Must be unique within the file — TypeScript won't catch duplicates at runtime
- Used directly in the URL — keep it short and descriptive

## Image Paths

Images referenced in content files must exist in `public/images/`. Place files before adding entries:

```
public/images/
  projects/my-project-cover.jpg
  team/jane-smith.jpg
  testimonials/john-doe.jpg
  clients/acme-logo.svg
```

Reference as: `"/images/projects/my-project-cover.jpg"` (leading slash, no `/public`).

## Adding an MDX Blog Post

Create a new file in `content/blog/`:

```mdx
---
title: "Post Title"
slug: "post-title"
date: "2025-07-01"
author: "jane-smith"        # must match a TeamMember slug in content/team.ts
category: "engineering"     # engineering | design | business | culture
tags: ["Next.js", "React"]
summary: "One or two sentence teaser shown on the blog index."
coverImage: "/images/blog/post-title-cover.jpg"
readingTime: 5              # estimated minutes
published: true
---

Post body in MDX here...
```

## Adding an MDX Changelog Entry

Create a new file in `content/changelog/`:

```mdx
---
title: "What changed"
date: "2025-07-01"
version: "2025-07"          # optional — use if you version releases
type: "feature"             # feature | fix | improvement | announcement
---

Description of the change...
```

## After Adding

1. Run `pnpm tsc --noEmit` — TypeScript will catch missing required fields or wrong types immediately
2. Check the page in `pnpm dev` to confirm the new entry appears correctly
3. Commit with prefix `content:` — e.g. `content: add mobile development service`

## Rules

- Never hardcode copy in component files — if it belongs in content, put it in content
- Never fetch content files via HTTP — import them directly in Server Components
- Keep `slug` values URL-safe: lowercase, hyphens only, no spaces
- Keep `order` fields sequential and update existing entries if inserting in the middle
- All images go in `public/images/` — never in `content/` or `components/`
