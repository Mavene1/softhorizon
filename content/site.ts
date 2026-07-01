export const siteConfig = {
  name: "Softhorizon",
  legalName: "Softhorizon Ltd",
  tagline: "We build the technology your business runs on.",
  shortTagline: "Software · Web & Mobile · Cloud · AI",

  heroHeadline: "We build the technology your business runs on.",
  heroSubtitle:
    "Softhorizon is a software engineering partner. From web and mobile apps to cloud, APIs, and AI, we design, build, and scale the custom solutions that move your business forward.",

  mission:
    "To help organisations everywhere build dependable, human-centred technology — from web and mobile to cloud and AI — that drives real, sustainable growth.",
  vision:
    "A world where every business, regardless of size, has access to world-class software craftsmanship.",

  founded: 2020,
  location: "Nairobi, Kenya",
  email: "hello@softhorizon.com",
  address: "Softhorizon Ltd, Nairobi, Kenya",

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
