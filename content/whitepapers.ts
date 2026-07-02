export interface Whitepaper {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  fileUrl: string;
  topics: string[];
  publishedAt: string;
}

export const whitepapers: Whitepaper[] = [
  {
    slug: "modernizing-legacy-government-systems",
    title: "Modernizing Legacy Government Systems",
    summary:
      "A practical framework for migrating paper-based and legacy public-sector systems to secure, citizen-facing digital services — without a risky big-bang rewrite.",
    coverImage: "/images/whitepapers/modernizing-legacy-government-systems.svg",
    fileUrl: "/whitepapers/modernizing-legacy-government-systems.pdf",
    topics: ["Government", "Modernisation", "Digital services"],
    publishedAt: "2025-09-15",
  },
  {
    slug: "fintech-compliance-for-startups",
    title: "A Practical Guide to Fintech Compliance for Startups",
    summary:
      "What early-stage fintech teams actually need to get right on compliance before launch — and what can safely wait until after.",
    coverImage: "/images/whitepapers/fintech-compliance-for-startups.svg",
    fileUrl: "/whitepapers/fintech-compliance-for-startups.pdf",
    topics: ["Fintech", "Compliance", "Startups"],
    publishedAt: "2025-11-02",
  },
  {
    slug: "scaling-logistics-software",
    title: "Scaling Logistics Software Without Rebuilding From Scratch",
    summary:
      "How to scale a logistics platform's data and infrastructure as order volume grows — before you're forced into a costly rewrite.",
    coverImage: "/images/whitepapers/scaling-logistics-software.svg",
    fileUrl: "/whitepapers/scaling-logistics-software.pdf",
    topics: ["Logistics", "Scalability", "Infrastructure"],
    publishedAt: "2026-01-20",
  },
];
