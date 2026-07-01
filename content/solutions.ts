export interface SolutionUseCase {
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  slug: string;
  headline: string;
  subheadline: string;
  persona: string;
  heroImage?: string;
  useCases: SolutionUseCase[];
  featuredProjects?: string[];
  testimonialId?: string;
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export const solutions: Solution[] = [
  {
    slug: "for-fintech",
    headline: "Software built for the pace of fintech",
    subheadline:
      "Compliance-ready, API-first, and fast to market — for teams that can't afford to slow down.",
    persona: "Fintech Startups",
    useCases: [
      {
        title: "KYC & onboarding automation",
        description: "Digital identity verification and onboarding flows that meet regulatory requirements.",
        icon: "ShieldCheck",
      },
      {
        title: "Credit scoring & risk models",
        description: "Automated, explainable scoring models that speed up approvals without adding risk.",
        icon: "Gauge",
      },
      {
        title: "Payments & ledger integrations",
        description: "Reliable integrations with payment rails, banks, and mobile money providers.",
        icon: "CreditCard",
      },
      {
        title: "Regulatory reporting",
        description: "Audit-ready reporting pipelines built alongside your compliance team.",
        icon: "ClipboardCheck",
      },
    ],
    featuredProjects: ["mobile-lending-platform"],
    cta: {
      primary: { label: "Talk to us", href: "/contact" },
      secondary: { label: "See our work", href: "/projects" },
    },
  },
  {
    slug: "for-startups",
    headline: "Ship your MVP without cutting corners",
    subheadline:
      "Production-ready software in weeks, built to survive contact with real users and real funding rounds.",
    persona: "Early-Stage Startups",
    useCases: [
      {
        title: "Rapid MVP delivery",
        description: "Go from idea to a live, testable product in weeks, not quarters.",
        icon: "Rocket",
      },
      {
        title: "Technical due-diligence readiness",
        description: "Architecture and code quality that hold up when investors or acquirers look under the hood.",
        icon: "ShieldCheck",
      },
      {
        title: "Scalable foundations from day one",
        description: "Avoid the rebuild — we architect for the traffic and team you'll have in a year, not just today.",
        icon: "Layers",
      },
      {
        title: "Fractional CTO-level guidance",
        description: "Senior technical judgment on tap, without a full-time hire.",
        icon: "Compass",
      },
    ],
    cta: {
      primary: { label: "Talk to us", href: "/contact" },
      secondary: { label: "See our work", href: "/projects" },
    },
  },
  {
    slug: "for-enterprise",
    headline: "Modernize legacy systems without disrupting operations",
    subheadline:
      "Phased delivery, rigorous security, and integration with the systems you already run on.",
    persona: "Enterprise & Public Sector",
    useCases: [
      {
        title: "Legacy modernization",
        description: "Replace aging systems incrementally, with zero downtime for the teams depending on them.",
        icon: "History",
      },
      {
        title: "Systems integration & data migration",
        description: "Connect and migrate data across departments and vendors without losing a record.",
        icon: "Plug",
      },
      {
        title: "Security & compliance reviews",
        description: "Built-in access controls, audit trails, and reviews aligned to your compliance framework.",
        icon: "ShieldCheck",
      },
      {
        title: "Multi-team delivery at scale",
        description: "Coordinated delivery across stakeholders, procurement cycles, and multiple departments.",
        icon: "UsersRound",
      },
    ],
    featuredProjects: ["citizen-services-portal", "fleet-inventory-system"],
    cta: {
      primary: { label: "Talk to us", href: "/contact" },
      secondary: { label: "See our work", href: "/projects" },
    },
  },
];
