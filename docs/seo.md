# SEO

SEO is a primary channel for a public-facing company website — it drives inbound from potential clients, recruits, and press. Every page must have a unique title, description, and Open Graph tags. Next.js 16 App Router provides a first-class metadata API.

## `generateMetadata` Helper (`lib/metadata.ts`)

Centralise all metadata defaults in one place:

```ts
// lib/metadata.ts
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: MetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}${ogImage}`, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [`${siteConfig.url}${ogImage}`],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
```

## Root Layout Metadata

Set site-wide defaults in `app/layout.tsx`:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.heroSubtitle,
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@softhorizon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
```

`metadataBase` is required for absolute Open Graph image URLs. Set it on the root layout.

## Page-Level Metadata

Every page must export `metadata` or `generateMetadata`:

```tsx
// app/about/page.tsx — static metadata
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about SoftHorizon — our mission, vision, and the team behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutSections />;
}
```

```tsx
// app/projects/[slug]/page.tsx — dynamic metadata
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    image: project.coverImage,
  });
}
```

## Sitemap (`app/sitemap.ts`)

Generate a dynamic sitemap from `content/`:

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { teamMembers } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const teamRoutes = teamMembers.map((m) => ({
    url: `${base}/team/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...teamRoutes];
}
```

## Robots (`app/robots.ts`)

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

## Structured Data (JSON-LD)

Add structured data for Organization and pages. Render as a `<script>` tag in the root layout or page:

```tsx
// app/layout.tsx
import { siteConfig } from "@/content/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "customer service",
  },
  sameAs: Object.values(siteConfig.social),
};

// In the <head> via layout:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

For individual project pages, add `CreativeWork` schema. For team member pages, add `Person` schema.

## Open Graph Images

- Default OG image: `public/images/og-default.jpg` — 1200×630px
- Per-page OG images: `public/images/og/{page-name}.jpg` — 1200×630px
- Per-project OG image: use the project `coverImage` field from `content/projects.ts`

## Page Title Convention

| Page | Title |
|---|---|
| Homepage | `SoftHorizon — Building digital experiences that matter` |
| About | `About Us \| SoftHorizon` |
| Services | `Services \| SoftHorizon` |
| Individual service | `Web Development \| SoftHorizon` |
| Projects | `Our Work \| SoftHorizon` |
| Individual project | `IoT Management Platform \| SoftHorizon` |
| Team | `Our Team \| SoftHorizon` |
| Contact | `Contact Us \| SoftHorizon` |

## `next.config.ts` SEO Settings

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce trailing slash consistency
  trailingSlash: false,
  // Redirect www to non-www (or vice versa) in production
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.softhorizon.com" }],
        destination: "https://softhorizon.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

## Do NOT

- Skip `generateMetadata` or `export const metadata` on any page — every page needs a unique title and description
- Duplicate titles across pages — each must be unique
- Leave the default Next.js "Create Next App" metadata in `app/layout.tsx`
- Use `<head>` tags directly — use the Next.js metadata API
- Add `metadataBase` anywhere but the root layout
- Use relative URLs in Open Graph `images` — they must be absolute; `metadataBase` makes them absolute automatically
- Skip the `sitemap.ts` and `robots.ts` files before launch
