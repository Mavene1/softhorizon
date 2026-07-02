export const siteConfig = {
  name: "SoftHorizon",
  legalName: "SoftHorizon Ltd",
  tagline: "We build the technology your business runs on.",
  shortTagline: "Software · Web & Mobile · Cloud · AI",

  heroHeadline: "We build the technology your business runs on.",
  heroHeadlineAccent: "technology",
  heroSubtitle:
    "SoftHorizon is a software engineering partner. From web and mobile apps to cloud, APIs, and AI, we design, build, and scale the custom solutions that move your business forward.",

  mission:
    "To help organisations everywhere build dependable, human-centred technology — from web and mobile to cloud and AI — that drives real, sustainable growth.",
  vision:
    "A world where every business, regardless of size, has access to world-class software craftsmanship.",

  story: [
    "SoftHorizon started in 2020 as a two-person studio in Nairobi, building software for local businesses that had been overlooked by bigger agencies.",
    "What began as a handful of internal tools and small business sites grew into full platforms for government agencies, fintech startups, and logistics operators — the kind of software that has to work, every day, for people who don't have the patience for bugs.",
    "Today we're a team of engineers, designers, and product thinkers spread across Kenya, still operating on the same principle we started with: build it like you'll be the one maintaining it in five years.",
  ],

  founded: 2020,
  location: "Nairobi, Kenya",
  email: "hello@softhorizon.com",
  address: "SoftHorizon Ltd, Nairobi, Kenya",

  social: {
    twitter: "https://twitter.com/softhorizon",
    linkedin: "https://linkedin.com/company/softhorizon",
    github: "https://github.com/softhorizon",
  },

  url: "https://softhorizon.com",
  ogImage: "/images/og-default.jpg",
} as const;

export interface ImpactStat {
  target: number;
  suffix: string;
  label: string;
}

export const impactStats: ImpactStat[] = [
  { target: 150, suffix: "+", label: "products shipped" },
  { target: 40, suffix: "+", label: "clients served" },
  { target: 12, suffix: "", label: "industries" },
  { target: 35, suffix: "+", label: "engineers & designers" },
];

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Founded in Nairobi",
    description: "Started as a two-person studio building software for local businesses.",
  },
  {
    year: "2021",
    title: "First enterprise client",
    description: "Delivered our first large-scale platform for a public-sector agency.",
  },
  {
    year: "2022",
    title: "Team doubles",
    description: "Grew past ten engineers and designers, and formalised our delivery process.",
  },
  {
    year: "2023",
    title: "Expanded into fintech",
    description: "Shipped lending and payments platforms for fintech clients across the region.",
  },
  {
    year: "2024",
    title: "40+ clients served",
    description: "Crossed 40 clients across government, fintech, and logistics.",
  },
  {
    year: "2025",
    title: "150+ products shipped",
    description: "Reached 150+ shipped products with a team of 35 engineers and designers.",
  },
];
