export type ProjectCategory = "web-app" | "mobile-app" | "e-commerce" | "api" | "design-system" | "other";

export interface ProjectResult {
  metric: string;
  value: string;
  description?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  coverImage: string;
  results?: ProjectResult[];
  featured: boolean;
  year: number;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "citizen-services-portal",
    title: "Citizen services portal",
    client: "Public sector agency",
    summary:
      "A unified digital front door for a government agency — permits, payments, and records in one secure place.",
    description:
      "We consolidated a patchwork of paper-based and legacy systems into a single, secure portal that lets citizens apply for permits, make payments, and track requests online.",
    category: "web-app",
    tags: ["Government", "Next.js", "Payments"],
    coverImage: "/images/projects/citizen-services-portal.svg",
    results: [
      { metric: "Citizens served", value: "320k" },
      { metric: "Time to launch", value: "12 wks" },
    ],
    featured: true,
    year: 2025,
    order: 1,
  },
  {
    slug: "mobile-lending-platform",
    title: "Mobile lending platform",
    client: "Fintech company",
    summary: "An end-to-end lending app with KYC, automated credit scoring, and instant disbursement.",
    description:
      "A mobile-first lending experience covering onboarding, identity verification, automated credit scoring, and disbursement, built for markets where a phone is a customer's primary device.",
    category: "mobile-app",
    tags: ["Fintech", "React Native", "KYC"],
    coverImage: "/images/projects/mobile-lending-platform.svg",
    results: [
      { metric: "Faster approvals", value: "60%" },
      { metric: "App rating", value: "4.8★" },
    ],
    featured: true,
    year: 2024,
    order: 2,
  },
  {
    slug: "fleet-inventory-system",
    title: "Fleet & inventory system",
    client: "Logistics operator",
    summary: "Real-time tracking and demand forecasting across a regional supply chain operation.",
    description:
      "A cloud platform that gives a logistics operator live visibility into fleet location, stock levels, and demand, replacing spreadsheets with a single operational dashboard.",
    category: "web-app",
    tags: ["Logistics", "Cloud", "Forecasting"],
    coverImage: "/images/projects/fleet-inventory-system.svg",
    results: [
      { metric: "Fewer stockouts", value: "27%" },
      { metric: "Lower fuel cost", value: "18%" },
    ],
    featured: true,
    year: 2024,
    order: 3,
  },
];
