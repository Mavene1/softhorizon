export type WebinarStatus = "upcoming" | "recorded";

export interface Webinar {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: WebinarStatus;
  speakerSlugs: string[];
}

export const webinars: Webinar[] = [
  {
    slug: "scaling-fintech-infrastructure",
    title: "Scaling Fintech Infrastructure Without Breaking Compliance",
    description:
      "A live session on how to scale transaction volume and infrastructure without losing sight of regulatory requirements.",
    date: "2026-08-14T15:00:00Z",
    status: "upcoming",
    speakerSlugs: ["brian-otieno", "david-mwangi"],
  },
  {
    slug: "design-systems-for-agencies",
    title: "Building Design Systems That Survive Client Work",
    description: "How we keep one design system consistent across a dozen different client engagements at once.",
    date: "2026-09-10T15:00:00Z",
    status: "upcoming",
    speakerSlugs: ["faith-njeri"],
  },
  {
    slug: "government-digitisation-lessons",
    title: "Lessons From Digitising a Government Agency",
    description:
      "What actually worked — and what didn't — when we took a public-sector agency from paper to a full digital portal.",
    date: "2026-04-22T15:00:00Z",
    status: "recorded",
    speakerSlugs: ["amina-hassan", "samuel-kiptoo"],
  },
  {
    slug: "frontend-performance-at-scale",
    title: "Frontend Performance at Scale",
    description: "Practical techniques we use to keep client-facing apps fast, even as they grow.",
    date: "2026-02-11T15:00:00Z",
    status: "recorded",
    speakerSlugs: ["wanjiru-kamau"],
  },
];
