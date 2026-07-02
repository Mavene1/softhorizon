export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
export type WorkLocation = "remote" | "on-site" | "hybrid";

export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  workLocation: WorkLocation;
  employmentType: EmploymentType;
  salary?: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  postedAt: string;
  closingAt?: string;
  open: boolean;
}

export const jobListings: JobListing[] = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Nairobi, Kenya",
    workLocation: "hybrid",
    employmentType: "full-time",
    salary: "KES 250k – 400k / month",
    summary: "Build production React and Next.js interfaces for client platforms across government, fintech, and logistics.",
    description:
      "You'll work alongside our lead frontend engineer to build and ship client-facing platforms — from early architecture decisions through to launch and support. Most of our work is React and Next.js, with a strong emphasis on performance, accessibility, and maintainable component design.",
    responsibilities: [
      "Own frontend architecture for one or more client engagements",
      "Build accessible, responsive interfaces from design handoff to production",
      "Review pull requests and mentor junior engineers on the team",
      "Collaborate directly with designers and backend engineers on API contracts",
    ],
    requirements: [
      "5+ years building production React applications",
      "Strong TypeScript skills",
      "Experience with Next.js App Router or comparable meta-frameworks",
      "Comfortable working directly with clients on requirements",
    ],
    niceToHave: ["Experience with design systems", "Familiarity with framer-motion or similar animation libraries"],
    benefits: ["Hybrid working", "Learning budget", "Health cover", "Annual team retreat"],
    postedAt: "2026-06-01",
    open: true,
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Nairobi, Kenya",
    workLocation: "hybrid",
    employmentType: "full-time",
    summary: "Design and build the APIs and data systems behind our clients' platforms, with a focus on reliability.",
    description:
      "You'll design APIs, model data, and build the backend systems that power client platforms handling real transaction volume. We care about correctness, observability, and systems that are boring to operate.",
    responsibilities: [
      "Design and build REST/GraphQL APIs for client platforms",
      "Model data and own database schema decisions",
      "Set up observability — logging, metrics, and alerting — for production systems",
      "Pair with frontend engineers on API contracts",
    ],
    requirements: [
      "3+ years building production backend systems",
      "Strong SQL and data modelling skills",
      "Experience with Node.js or a comparable backend runtime",
      "Comfortable owning a service from design through to production support",
    ],
    niceToHave: ["Experience with cloud infrastructure (AWS/GCP)", "Exposure to fintech or payments systems"],
    benefits: ["Hybrid working", "Learning budget", "Health cover", "Annual team retreat"],
    postedAt: "2026-06-01",
    open: true,
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Nairobi, Kenya",
    workLocation: "hybrid",
    employmentType: "full-time",
    summary: "Lead design across client engagements, from discovery workshops through to final UI polish.",
    description:
      "You'll design for real client problems — often ambiguous, often under time pressure — and pair closely with engineering to ship interfaces people can actually use. You'll also contribute to our internal design system.",
    responsibilities: [
      "Run discovery workshops and translate findings into product decisions",
      "Design end-to-end user flows and high-fidelity interfaces",
      "Pair with engineers through implementation to protect design quality",
      "Contribute components and patterns to our shared design system",
    ],
    requirements: [
      "3+ years of product design experience, ideally client-facing",
      "A portfolio showing end-to-end product thinking, not just visuals",
      "Comfortable presenting and defending design decisions to clients",
    ],
    benefits: ["Hybrid working", "Learning budget", "Health cover", "Annual team retreat"],
    postedAt: "2026-06-15",
    open: true,
  },
  {
    slug: "delivery-manager",
    title: "Delivery Manager",
    department: "Operations",
    location: "Nairobi, Kenya",
    workLocation: "on-site",
    employmentType: "full-time",
    summary: "Keep client engagements on time and on scope, from kickoff through launch and support.",
    description:
      "You'll be the primary point of contact for one or more client engagements once they move from sales into build — balancing scope, timeline, and budget, and keeping engineering and design aligned with what the client actually needs.",
    responsibilities: [
      "Own delivery for 2–3 concurrent client engagements",
      "Run sprint planning, standups, and client check-ins",
      "Flag scope or timeline risk early and manage change requests",
      "Be the first point of escalation for client concerns",
    ],
    requirements: [
      "3+ years managing software delivery, agency or product side",
      "Comfortable running agile ceremonies without being dogmatic about them",
      "Strong written and verbal communication with non-technical stakeholders",
    ],
    benefits: ["Health cover", "Annual team retreat"],
    postedAt: "2026-05-20",
    open: true,
  },
];
