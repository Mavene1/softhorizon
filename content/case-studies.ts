export interface CaseStudyQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  summary: string;
  problem: string;
  solution: string;
  results: string;
  quote?: CaseStudyQuote;
  projectSlug?: string;
  coverImage: string;
  publishedAt: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "citizen-services-portal",
    title: "Turning a paper-based agency into a digital front door",
    client: "Public sector agency",
    summary:
      "How a public-sector agency replaced a patchwork of paper forms and in-person queues with a single, secure citizen portal — in twelve weeks.",
    problem:
      "Citizens had to visit a physical office, often more than once, to apply for permits, make payments, or check the status of a request. Records lived across spreadsheets and paper files, and staff spent most of their time on manual data entry rather than resolving cases.",
    solution:
      "We consolidated the agency's services into a single web portal: citizens could apply for permits, pay fees online, and track requests in real time. Behind the scenes, staff got a case management view that replaced the spreadsheets entirely, with role-based access and an audit trail for every action.",
    results:
      "Within the first year, the portal served over 320,000 citizens. Average time-to-resolution for permit requests dropped significantly, and staff reported spending far less time on manual data entry — time redirected to actually resolving cases.",
    quote: {
      text: "SoftHorizon completely transformed the way we operate. Their system streamlined our workflow, reduced errors, and gave us back countless hours every week.",
      author: "Operations Director",
      role: "Public-sector client",
    },
    projectSlug: "citizen-services-portal",
    coverImage: "/images/projects/citizen-services-portal.svg",
    publishedAt: "2025-12-05",
  },
  {
    slug: "mobile-lending-platform",
    title: "Shipping a compliant lending product in under four months",
    client: "Fintech company",
    summary:
      "A fintech startup needed a mobile lending experience — onboarding, KYC, credit scoring, and disbursement — built fast without cutting corners on compliance.",
    problem:
      "The client had a lending model validated on spreadsheets but no product. They needed to move from idea to a compliant, production-ready mobile app quickly, in a market where trust and speed both mattered.",
    solution:
      "We built a mobile-first lending app covering onboarding, identity verification, automated credit scoring, and instant disbursement — architected from day one around the compliance requirements of a regulated lender, not retrofitted afterward.",
    results:
      "The app launched in under four months from kickoff. Loan approval times dropped by 60% compared to the client's manual process, and the app maintains a 4.8-star rating from real users.",
    quote: {
      text: "They felt like part of our own team. We went from idea to a launched product in under four months.",
      author: "Founder",
      role: "Fintech client",
    },
    projectSlug: "mobile-lending-platform",
    coverImage: "/images/projects/mobile-lending-platform.svg",
    publishedAt: "2025-08-14",
  },
  {
    slug: "fleet-inventory-system",
    title: "Replacing spreadsheets with real-time fleet visibility",
    client: "Logistics operator",
    summary:
      "A regional logistics operator needed live visibility into fleet location and stock levels — not a weekly spreadsheet reconciliation.",
    problem:
      "Fleet location and inventory data lived in disconnected spreadsheets updated manually by dispatchers. Stockouts and fuel overruns were discovered after the fact, not prevented.",
    solution:
      "We built a cloud platform giving operations a single, real-time dashboard for fleet location, stock levels, and demand forecasting — replacing manual reconciliation with live data pulled directly from the field.",
    results:
      "Stockouts dropped by 27% and fuel costs by 18% in the first two quarters after launch, as dispatchers could act on live data instead of last week's spreadsheet.",
    quote: {
      text: "What stood out most was the support, every question answered quickly and thoroughly, and the delivery never slipped.",
      author: "Head of Data",
      role: "Enterprise client",
    },
    projectSlug: "fleet-inventory-system",
    coverImage: "/images/projects/fleet-inventory-system.svg",
    publishedAt: "2025-05-22",
  },
];
