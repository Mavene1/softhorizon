export type FAQCategory = "general" | "services" | "pricing" | "process" | "careers";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

export const faqs: FAQ[] = [
  {
    id: "pricing-how-quoted",
    question: "How is a project quoted?",
    answer:
      "Most engagements start with a short discovery call, followed by a fixed-price proposal scoped to your requirements. For open-ended or evolving work, we can also structure a monthly retainer instead.",
    category: "pricing",
    order: 1,
  },
  {
    id: "pricing-whats-included",
    question: "What's included in the price?",
    answer:
      "Every tier includes design, engineering, QA, and a defined window of post-launch support. Higher tiers add infrastructure setup, more integrations, and a dedicated account manager — see the comparison table above.",
    category: "pricing",
    order: 2,
  },
  {
    id: "pricing-change-tier",
    question: "Can we change tiers mid-project?",
    answer:
      "Yes. Scope shifts are common — we'll re-quote the difference and adjust the timeline transparently before any extra work begins.",
    category: "pricing",
    order: 3,
  },
  {
    id: "pricing-payment-terms",
    question: "What are your payment terms?",
    answer:
      "Fixed-price projects are typically split across milestones (kickoff, midpoint, delivery). Enterprise contracts are billed monthly against an agreed statement of work.",
    category: "pricing",
    order: 4,
  },
  {
    id: "pricing-ongoing-support",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes — every tier includes a post-launch support window, and we offer ongoing maintenance retainers for teams that want continued iteration after that.",
    category: "pricing",
    order: 5,
  },
  {
    id: "general-response-time",
    question: "How quickly do you respond to inquiries?",
    answer: "We reply to every inquiry within one business day, usually sooner.",
    category: "general",
    order: 1,
  },
  {
    id: "general-project-types",
    question: "What types of projects do you take on?",
    answer:
      "Web and mobile applications, API and systems integrations, cloud infrastructure, and full product builds — for startups, enterprises, and public-sector teams alike.",
    category: "general",
    order: 2,
  },
];
