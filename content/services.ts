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
  icon: string;
  features: string[];
  useCases: ServiceUseCase[];
  technologies?: string[];
  featured: boolean;
  order: number;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

/** Shared delivery process shown on every /services/[slug] page — the engagement model doesn't vary by service. */
export const serviceProcess: ServiceProcessStep[] = [
  {
    title: "Discover",
    description: "We dig into your goals, constraints, and existing systems to scope the right solution.",
  },
  {
    title: "Design",
    description: "Architecture, UX, and technical planning happen before a line of production code is written.",
  },
  {
    title: "Build",
    description: "Iterative delivery in short cycles, with regular demos so you always know where things stand.",
  },
  {
    title: "Launch & support",
    description: "We ship, monitor, and stay on as a partner for the fixes and improvements that follow.",
  },
];

export const services: Service[] = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    tagline: "Built around how you actually work",
    description:
      "Tailored platforms and internal tools built around exactly how your team works, not the other way around.",
    longDescription:
      "Off-the-shelf tools force you to bend your process. We build platforms and internal systems that fit your operations exactly, and grow with you.",
    icon: "Blocks",
    features: [
      "Internal tools & admin portals",
      "Workflow & process automation",
      "Legacy system modernization",
      "Role-based access & audit trails",
    ],
    useCases: [
      {
        title: "Replace a spreadsheet-run process",
        description: "Turn a fragile spreadsheet workflow into a proper internal tool with access control and audit trails.",
      },
      {
        title: "Modernize a legacy system",
        description: "Rebuild an aging desktop or on-prem system as a maintainable, web-based platform.",
      },
      {
        title: "Automate manual operations",
        description: "Remove repetitive manual steps from a team's workflow with purpose-built automation.",
      },
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
    featured: true,
    order: 1,
  },
  {
    slug: "web-mobile",
    title: "Web & Mobile Apps",
    tagline: "Apps people genuinely enjoy using",
    description: "Fast, accessible, beautiful applications for web, iOS, and Android.",
    longDescription:
      "Fast, accessible, beautifully crafted experiences for web, iOS, and Android, designed and engineered as one.",
    icon: "Smartphone",
    features: [
      "Responsive web apps",
      "Native & cross-platform mobile",
      "Design systems & UI kits",
      "Accessibility (WCAG) built in",
    ],
    useCases: [
      {
        title: "Launch a customer-facing app",
        description: "Take a product from idea to a polished web or mobile app customers actually want to use.",
      },
      {
        title: "Unify a fragmented UI",
        description: "Bring inconsistent screens under one design system across web, iOS, and Android.",
      },
      {
        title: "Meet accessibility requirements",
        description: "Bring an existing app up to WCAG 2.1 AA without a full rebuild.",
      },
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Tailwind CSS"],
    featured: true,
    order: 2,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that scales and stays up",
    description: "Scalable infrastructure, CI/CD, and reliability on AWS, GCP, Azure, or on-prem.",
    longDescription:
      "We set up and run reliable, cost-efficient cloud infrastructure with automated delivery, on AWS, GCP, Azure, or on-premise.",
    icon: "Cloud",
    features: [
      "Cloud architecture & migration",
      "CI/CD pipelines",
      "Monitoring & incident response",
      "Cost optimization",
    ],
    useCases: [
      {
        title: "Migrate off legacy hosting",
        description: "Move a system off aging on-prem or shared hosting onto reliable cloud infrastructure.",
      },
      {
        title: "Cut infrastructure spend",
        description: "Right-size cloud resources and automate scaling to bring costs under control.",
      },
      {
        title: "Ship faster with CI/CD",
        description: "Replace manual deploys with automated pipelines and rollback safety nets.",
      },
    ],
    technologies: ["AWS", "GCP", "Docker", "Kubernetes"],
    featured: true,
    order: 3,
  },
  {
    slug: "ai-data",
    title: "AI & Data",
    tagline: "Practical AI that earns its place",
    description: "Practical, explainable AI and analytics that turn your data into decisions.",
    longDescription:
      "We turn your data into decisions with explainable, privacy-respecting AI and analytics, no hype, just measurable value.",
    icon: "Sparkles",
    features: [
      "Data pipelines & warehousing",
      "Dashboards & analytics",
      "ML models & forecasting",
      "Explainable, auditable AI",
    ],
    useCases: [
      {
        title: "Turn raw data into a dashboard",
        description: "Consolidate scattered data sources into a single, trustworthy reporting layer.",
      },
      {
        title: "Forecast demand or churn",
        description: "Build a predictive model your team can act on, with visibility into why it made a call.",
      },
      {
        title: "Add AI without the black box",
        description: "Introduce ML into a product in a way stakeholders and regulators can actually audit.",
      },
    ],
    technologies: ["Python", "PostgreSQL", "TensorFlow"],
    featured: false,
    order: 4,
  },
  {
    slug: "api-integrations",
    title: "API & Integrations",
    tagline: "Connect every system and partner",
    description: "Secure, well-documented APIs that connect your systems and partners.",
    longDescription:
      "Secure, well-documented APIs and integrations that let your tools, partners, and data work together seamlessly.",
    icon: "Plug",
    features: [
      "REST & GraphQL APIs",
      "Third-party integrations",
      "Payment & identity providers",
      "Developer documentation",
    ],
    useCases: [
      {
        title: "Connect siloed systems",
        description: "Give internal tools and partner systems a clean API to talk to each other through.",
      },
      {
        title: "Integrate a payment or identity provider",
        description: "Wire up Stripe, KYC, or similar third-party providers without touching core business logic.",
      },
      {
        title: "Open a platform to partners",
        description: "Ship a documented public or partner API so external teams can build on your product.",
      },
    ],
    technologies: ["Node.js", "GraphQL", "REST"],
    featured: false,
    order: 5,
  },
  {
    slug: "erp-inventory",
    title: "ERP & Inventory Systems",
    tagline: "Run operations with real-time clarity",
    description: "Real-time visibility and forecasting across stock, supply, and operations.",
    longDescription:
      "Inventory, supply, and resource systems that give you live visibility and smarter forecasting across your whole operation.",
    icon: "Package",
    features: [
      "Inventory & stock control",
      "Demand forecasting",
      "Procurement & suppliers",
      "Reporting & analytics",
    ],
    useCases: [
      {
        title: "Get real-time stock visibility",
        description: "Replace end-of-day spreadsheets with a live view of inventory across locations.",
      },
      {
        title: "Reduce stockouts and overstock",
        description: "Use demand forecasting to keep supply aligned with what's actually selling.",
      },
      {
        title: "Streamline procurement",
        description: "Give operations a single system for suppliers, purchase orders, and reporting.",
      },
    ],
    technologies: ["Next.js", "PostgreSQL", "Recharts"],
    featured: false,
    order: 6,
  },
];
