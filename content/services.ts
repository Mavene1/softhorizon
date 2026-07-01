export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  technologies?: string[];
  featured: boolean;
  order: number;
}

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
    technologies: ["Next.js", "PostgreSQL", "Recharts"],
    featured: false,
    order: 6,
  },
];
