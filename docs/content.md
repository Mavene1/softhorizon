# Content Structure

## Overview

All company content lives in the `content/` directory as TypeScript files. This makes content:
- **Type-safe** — TypeScript enforces structure
- **Easy to edit** — no CMS login, no API, just edit the file
- **Instantly available** — imported directly in Server Components, no fetch needed
- **Version-controlled** — content changes are tracked in git like code changes

Never hardcode company copy in component files. All text, names, descriptions, links, and data come from `content/`.

## File Map

| File | What it contains |
|---|---|
| `content/site.ts` | Company name, tagline, mission, vision, contact info, social links, hero copy |
| `content/services.ts` | Services/capabilities offered — title, description, icon, features, use cases, tech stack, slug; also exports the shared `serviceProcess` steps |
| `content/projects.ts` | Portfolio/case studies — title, client, summary, outcomes, tags, images, slug |
| `content/team.ts` | Team members — name, role, bio, photo, social links |
| `content/testimonials.ts` | Client testimonials — quote, author, company, photo |
| `content/values.ts` | Company values — title, description, icon |
| `content/faqs.ts` | Frequently asked questions (for pricing, contact, and services pages) |
| `content/careers.ts` | Open job listings — role, department, location, description, requirements |
| `content/pricing.ts` | Pricing tiers — name, price, features, highlight flag |
| `content/solutions.ts` | Persona/industry landing page data — slug, headline, use cases, CTA |
| `content/blog/*.mdx` | Blog posts — MDX with frontmatter (author, date, category, tags) |
| `content/changelog/*.mdx` | Changelog entries — MDX with frontmatter (date, type, version) |

## `content/site.ts` — Company Info

```ts
// content/site.ts
export const siteConfig = {
  name: "SoftHorizon",
  legalName: "SoftHorizon Ltd",
  tagline: "Building digital experiences that matter",
  shortTagline: "Digital Excellence",

  heroHeadline: "We Build Software That Drives Growth",
  heroHeadlineAccent: "Software", // substring of heroHeadline to underline (hero-section.tsx animated SVG)
  heroSubtitle:
    "SoftHorizon partners with ambitious companies to design and build digital products that solve real problems and create lasting impact.",

  mission:
    "To empower businesses with purpose-built software that is fast, reliable, and beautifully crafted.",
  vision:
    "A world where every business, regardless of size, has access to world-class digital tools.",

  founded: 2020,
  location: "Nairobi, Kenya",
  email: "hello@softhorizon.com",
  phone: "+254 700 000 000",
  address: "SoftHorizon Ltd, Nairobi, Kenya",

  social: {
    twitter: "https://twitter.com/softhorizon",
    linkedin: "https://linkedin.com/company/softhorizon",
    github: "https://github.com/softhorizon",
  },

  url: "https://softhorizon.com",
  ogImage: "/images/og-default.jpg",
} as const;
```

## `content/services.ts` — Services

```ts
// content/services.ts
export interface ServiceUseCase {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;             // icon name for DynamicIcon/getIcon
  features: string[];
  useCases: ServiceUseCase[];  // 3+ problem/fit scenarios shown on the detail page
  technologies?: string[];
  featured: boolean;
  order: number;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

// Shared delivery process — rendered on every /services/[slug] page, not duplicated per service
export const serviceProcess: ServiceProcessStep[] = [
  { title: "Discover", description: "..." },
  { title: "Design", description: "..." },
  { title: "Build", description: "..." },
  { title: "Launch & support", description: "..." },
];

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, modern web applications",
    description: "We build scalable web applications using modern frameworks and best practices.",
    longDescription: "...",
    icon: "Globe",
    features: [
      "Next.js & React applications",
      "REST & GraphQL API integration",
      "Performance optimisation",
      "Responsive design",
    ],
    useCases: [
      { title: "Launch a customer-facing app", description: "..." },
      // ...
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js"],
    featured: true,
    order: 1,
  },
  // ...
];
```

## `content/projects.ts` — Portfolio / Case Studies

```ts
// content/projects.ts
export interface Project {
  slug: string;
  title: string;
  client: string;
  clientLogo?: string;
  summary: string;           // 1–2 sentence description for cards
  description: string;       // full markdown/prose for detail page
  category: ProjectCategory;
  tags: string[];
  coverImage: string;        // path to image in public/
  gallery?: string[];        // additional images
  url?: string;              // live project URL (if public)
  results?: ProjectResult[]; // measurable outcomes
  featured: boolean;
  year: number;
  order: number;
}

export interface ProjectResult {
  metric: string;            // e.g. "Conversion rate"
  value: string;             // e.g. "+42%"
  description?: string;
}

export type ProjectCategory =
  | "web-app"
  | "mobile-app"
  | "e-commerce"
  | "api"
  | "design-system"
  | "other";

export const projects: Project[] = [
  {
    slug: "iot-platform",
    title: "IoT Management Platform",
    client: "Safaricom",
    summary: "A unified console for managing IoT devices, SIM cards, and connectivity across Kenya.",
    description: "...",
    category: "web-app",
    tags: ["Next.js", "React", "TypeScript", "Micro-Frontend"],
    coverImage: "/images/projects/iot-platform-cover.jpg",
    results: [
      { metric: "Devices managed", value: "500K+", description: "Active IoT devices on the platform" },
      { metric: "Time to provision", value: "-70%", description: "Reduction in SIM provisioning time" },
    ],
    featured: true,
    year: 2024,
    order: 1,
  },
  // ...
];
```

## `content/team.ts` — Team Members

```ts
// content/team.ts
export interface TeamMember {
  slug: string;              // used in /team/[member] URL
  name: string;
  role: string;
  department: string;
  bio: string;               // short bio for team grid
  fullBio?: string;          // longer bio for detail page
  photo: string;             // path to image in public/
  email?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills?: string[];
  featured: boolean;         // appears in homepage team preview
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "john-doe",
    name: "John Doe",
    role: "Co-founder & CEO",
    department: "Leadership",
    bio: "John leads SoftHorizon's strategy and vision, bringing 10+ years of experience in software product development.",
    photo: "/images/team/john-doe.jpg",
    social: { linkedin: "https://linkedin.com/in/johndoe" },
    featured: true,
    order: 1,
  },
  // ...
];
```

## `content/testimonials.ts` — Testimonials

```ts
// content/testimonials.ts
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  photo?: string;
  projectSlug?: string;      // links to a project in content/projects.ts
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "SoftHorizon delivered a platform that exceeded our expectations. The team is exceptional.",
    author: "Jane Smith",
    role: "Head of Digital",
    company: "Acme Corp",
    photo: "/images/testimonials/jane-smith.jpg",
    projectSlug: "acme-platform",
  },
  // ...
];
```

## `content/faqs.ts` — FAQ Entries

```ts
// content/faqs.ts
export type FAQCategory = "general" | "services" | "pricing" | "process" | "careers";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What types of projects do you take on?",
    answer: "We work with companies of all sizes across web, mobile, and API projects...",
    category: "general",
    order: 1,
  },
  // ...
];
```

Filter by category in the section component: `faqs.filter((f) => f.category === "pricing")`.

## `content/careers.ts` — Job Listings

```ts
// content/careers.ts
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
export type WorkLocation = "remote" | "on-site" | "hybrid";

export interface JobListing {
  slug: string;                  // URL: /careers/[slug]
  title: string;
  department: string;            // e.g. "Engineering", "Design", "Operations"
  location: string;              // e.g. "Nairobi, Kenya" or "Remote"
  workLocation: WorkLocation;
  employmentType: EmploymentType;
  salary?: string;               // e.g. "$60k–$80k" — optional, show if comfortable
  summary: string;               // short teaser for the jobs list card
  description: string;           // full markdown body for the detail page
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  postedAt: string;              // ISO date string: "2025-07-01"
  closingAt?: string;            // ISO date string — optional application deadline
  open: boolean;                 // set to false to hide from listings without deleting
}

export const jobListings: JobListing[] = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Nairobi, Kenya",
    workLocation: "hybrid",
    employmentType: "full-time",
    summary: "Build world-class UIs for our client projects using React and Next.js.",
    description: "...",
    responsibilities: ["Lead frontend architecture decisions", "Mentor junior developers"],
    requirements: ["5+ years React experience", "Strong TypeScript skills"],
    niceToHave: ["Next.js App Router experience", "framer-motion animations"],
    postedAt: "2025-07-01",
    open: true,
  },
  // ...
];
```

## `content/pricing.ts` — Pricing Tiers

```ts
// content/pricing.ts
export interface PricingFeature {
  label: string;
  included: boolean | string;    // true/false or a string like "Up to 5 users"
}

export interface PricingTier {
  id: string;
  name: string;                  // e.g. "Starter", "Growth", "Enterprise"
  tagline: string;               // short description under the name
  price: string | null;          // e.g. "$2,500/mo" — null means "Contact us"
  billingNote?: string;          // e.g. "billed monthly" or "custom contract"
  highlighted: boolean;          // true = visually emphasised (most popular)
  cta: string;                   // e.g. "Get started" or "Book a call"
  ctaHref: string;               // e.g. "/contact" or "#contact"
  features: PricingFeature[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For early-stage startups with clear scope",
    price: "$5,000",
    billingNote: "one-time project",
    highlighted: false,
    cta: "Get started",
    ctaHref: "/contact",
    features: [
      { label: "Up to 5 pages", included: true },
      { label: "Responsive design", included: true },
      { label: "CMS integration", included: false },
      { label: "Dedicated account manager", included: false },
    ],
  },
  // ...
];
```

## `content/solutions.ts` — Persona / Industry Solutions

```ts
// content/solutions.ts
export interface SolutionUseCase {
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  slug: string;                  // URL: /solutions/[slug]  e.g. "for-fintech"
  headline: string;              // hero H1 — audience-specific
  subheadline: string;           // supporting paragraph
  persona: string;               // e.g. "Fintech Startups", "Enterprise Teams"
  heroImage?: string;            // optional hero illustration
  useCases: SolutionUseCase[];   // 3–6 problem/solution pairs
  featuredProjects?: string[];   // slugs from content/projects.ts
  testimonialId?: string;        // id from content/testimonials.ts
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export const solutions: Solution[] = [
  {
    slug: "for-fintech",
    headline: "Software built for the pace of Fintech",
    subheadline: "Compliance-ready, API-first, and fast to market — for teams that can't afford to slow down.",
    persona: "Fintech Startups",
    useCases: [
      {
        title: "Rapid MVP delivery",
        description: "Ship a compliant, production-ready product in weeks, not months.",
        icon: "Zap",
      },
    ],
    featuredProjects: ["iot-platform"],
    cta: {
      primary: { label: "Talk to us", href: "/contact" },
      secondary: { label: "See our work", href: "/projects" },
    },
  },
  // ...
];
```

## Blog MDX Frontmatter

```mdx
---
title: "Post Title Here"
slug: "post-title-here"
date: "2025-07-01"
author: "john-doe"            # must match a slug in content/team.ts
category: "engineering"       # engineering | design | business | culture
tags: ["Next.js", "Performance"]
summary: "One or two sentence teaser shown on the blog index and in search results."
coverImage: "/images/blog/post-title-cover.jpg"
readingTime: 6                # estimated reading time in minutes
published: true               # false = draft, excluded from listings
---

Post body in MDX below the frontmatter...
```

## Changelog MDX Frontmatter

```mdx
---
title: "What shipped or changed"
date: "2025-07-01"
version: "2025-07"            # optional — use for versioned product releases
type: "feature"               # feature | fix | improvement | announcement
---

Description of the change in MDX...
```

## Using Content in Components

Import directly in Server Components — no fetch, no API, no loading state:

```tsx
// components/sections/team/team-grid.tsx — Server Component
import { teamMembers } from "@/content/team";
import { TeamMemberCard } from "./team-member-card";

export function TeamGrid() {
  const featured = teamMembers.filter((m) => m.featured).sort((a, b) => a.order - b.order);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featured.map((member) => (
        <TeamMemberCard key={member.slug} member={member} />
      ))}
    </div>
  );
}
```

## Images

All images referenced in `content/` are stored in `public/images/`:

```
public/images/
  og-default.jpg           → default Open Graph image (1200×630)
  projects/
    iot-platform-cover.jpg
    ...
  team/
    john-doe.jpg
    ...
  testimonials/
    jane-smith.jpg
    ...
  clients/
    safaricom-logo.svg
    ...
```

Always use `next/image` when rendering images from content:

```tsx
import Image from "next/image";
import { teamMembers } from "@/content/team";

const member = teamMembers.find((m) => m.slug === slug);

<Image
  src={member.photo}
  alt={member.name}
  width={320}
  height={320}
  className="rounded-full object-cover"
/>
```

## Content Update Workflow

When company information changes:
1. Edit the relevant `content/*.ts` file
2. TypeScript will catch any missing required fields immediately
3. Commit with prefix `content:` — e.g. `content: add Q3 2025 case study`
4. Deploy — changes are reflected on the next build

## Do NOT

- Hardcode names, descriptions, taglines, or URLs in component files
- Create API routes to serve data that already exists in `content/`
- Fetch content files via HTTP — import them directly
- Put images directly in `components/` or `content/` — they go in `public/images/`
- Put business logic in content files — only data structures and values
