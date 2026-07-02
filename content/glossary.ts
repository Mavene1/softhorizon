export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  longDefinition: string;
  category: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "api",
    term: "API",
    definition: "A defined way for two pieces of software to talk to each other.",
    longDefinition:
      "An Application Programming Interface (API) is a contract that lets one system request data or trigger actions in another — without needing to know how the other system works internally. Most modern products are built from many services communicating over APIs.",
    category: "Engineering",
    relatedTerms: ["microservices", "latency"],
  },
  {
    slug: "ci-cd",
    term: "CI/CD",
    definition: "Automated pipelines that test and ship code changes.",
    longDefinition:
      "Continuous Integration / Continuous Deployment (CI/CD) automatically tests every code change and, once it passes, deploys it — reducing the manual work and risk involved in shipping software.",
    category: "Engineering",
    relatedTerms: ["staging-environment", "technical-debt"],
  },
  {
    slug: "design-system",
    term: "Design system",
    definition: "A shared library of reusable UI components and rules.",
    longDefinition:
      "A design system is a single source of truth — components, typography, color, spacing — that keeps a product consistent as more people build on it, and lets teams ship new screens faster without re-deciding the basics each time.",
    category: "Design",
    relatedTerms: ["wireframe"],
  },
  {
    slug: "headless-cms",
    term: "Headless CMS",
    definition: "A content system with no built-in frontend — just an API.",
    longDefinition:
      "A headless content management system stores and serves content through an API, leaving the frontend free to be built in whatever framework fits the product — useful when the same content needs to power a website, app, and other surfaces.",
    category: "Engineering",
    relatedTerms: ["api"],
  },
  {
    slug: "latency",
    term: "Latency",
    definition: "The delay between a request and its response.",
    longDefinition:
      "Latency measures how long it takes for a system to respond to a request — network round-trips, database queries, and processing time all add to it. Lower latency means a faster-feeling product.",
    category: "Engineering",
    relatedTerms: ["scalability", "load-testing"],
  },
  {
    slug: "load-testing",
    term: "Load testing",
    definition: "Simulating real traffic to see how a system holds up.",
    longDefinition:
      "Load testing simulates many concurrent users or requests against a system to find its breaking point before real users do — critical before a launch expected to draw a lot of traffic.",
    category: "Engineering",
    relatedTerms: ["scalability", "uptime-sla"],
  },
  {
    slug: "microservices",
    term: "Microservices",
    definition: "An architecture of small, independently deployable services.",
    longDefinition:
      "Instead of one large application, a microservices architecture splits functionality into small, independently deployable services that communicate over APIs — trading some operational complexity for independent scaling and deployment.",
    category: "Engineering",
    relatedTerms: ["api", "scalability"],
  },
  {
    slug: "mvp",
    term: "MVP",
    definition: "The smallest version of a product that delivers real value.",
    longDefinition:
      "A Minimum Viable Product (MVP) is the leanest version of a product that still solves the core problem for real users — built to validate an idea quickly rather than build every feature up front.",
    category: "Product",
    relatedTerms: ["user-story", "sprint"],
  },
  {
    slug: "scalability",
    term: "Scalability",
    definition: "A system's ability to handle growth without falling over.",
    longDefinition:
      "Scalability describes how well a system copes as load increases — more users, more data, more requests — without a proportional drop in performance or a rewrite of the underlying architecture.",
    category: "Engineering",
    relatedTerms: ["load-testing", "microservices"],
  },
  {
    slug: "sprint",
    term: "Sprint",
    definition: "A short, fixed period of focused work, usually one to two weeks.",
    longDefinition:
      "In agile delivery, a sprint is a fixed-length iteration — typically one or two weeks — during which a team commits to and delivers a specific set of work, then reviews and plans the next one.",
    category: "Process",
    relatedTerms: ["user-story", "mvp"],
  },
  {
    slug: "staging-environment",
    term: "Staging environment",
    definition: "A production-like environment used to test changes safely.",
    longDefinition:
      "A staging environment mirrors production as closely as possible, letting a team test changes in realistic conditions before they reach real users — the last checkpoint before a production release.",
    category: "Engineering",
    relatedTerms: ["ci-cd"],
  },
  {
    slug: "technical-debt",
    term: "Technical debt",
    definition: "The future cost of shortcuts taken to ship faster today.",
    longDefinition:
      "Technical debt is the implied cost of rework created when a team chooses a faster, less thorough solution now instead of a better approach that would take longer — useful when managed deliberately, expensive when it accumulates unchecked.",
    category: "Engineering",
    relatedTerms: ["ci-cd"],
  },
  {
    slug: "uptime-sla",
    term: "Uptime SLA",
    definition: "A contractual promise about how often a system stays available.",
    longDefinition:
      "An uptime Service Level Agreement (SLA) is a commitment — often expressed as a percentage like 99.9% — for how much of the time a system will be available and working as expected, usually with remedies if it's not met.",
    category: "Business",
    relatedTerms: ["load-testing"],
  },
  {
    slug: "user-story",
    term: "User story",
    definition: "A short description of a feature from the user's point of view.",
    longDefinition:
      "A user story frames a piece of work in terms of who needs it and why — typically \"As a [user], I want [goal], so that [reason]\" — keeping teams focused on outcomes rather than just tasks.",
    category: "Product",
    relatedTerms: ["mvp", "sprint"],
  },
  {
    slug: "wireframe",
    term: "Wireframe",
    definition: "A low-fidelity sketch of a screen's layout and structure.",
    longDefinition:
      "A wireframe is a simplified, mostly visual-design-free layout of a screen — used early in the design process to agree on structure and flow before investing in visual design.",
    category: "Design",
    relatedTerms: ["design-system"],
  },
];
