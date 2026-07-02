export interface PricingFeature {
  label: string;
  included: boolean | string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string | null;
  billingNote?: string;
  highlighted: boolean;
  cta: string;
  ctaHref: string;
  features: PricingFeature[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For early-stage teams with a clear, scoped project",
    price: "$5,000",
    billingNote: "one-time project",
    highlighted: false,
    cta: "Get started",
    ctaHref: "/contact",
    features: [
      { label: "Pages / screens", included: "Up to 5" },
      { label: "Dedicated project lead", included: true },
      { label: "Custom design system", included: false },
      { label: "API integrations", included: "1 included" },
      { label: "Cloud infrastructure setup", included: false },
      { label: "Post-launch support", included: "30 days" },
      { label: "Priority response SLA", included: false },
      { label: "Dedicated account manager", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams shipping a full product with room to iterate",
    price: "$15,000",
    billingNote: "starting price, per project",
    highlighted: true,
    cta: "Talk to us",
    ctaHref: "/contact",
    features: [
      { label: "Pages / screens", included: "Up to 20" },
      { label: "Dedicated project lead", included: true },
      { label: "Custom design system", included: true },
      { label: "API integrations", included: "Up to 5" },
      { label: "Cloud infrastructure setup", included: true },
      { label: "Post-launch support", included: "90 days" },
      { label: "Priority response SLA", included: true },
      { label: "Dedicated account manager", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For complex, multi-team engagements at scale",
    price: null,
    billingNote: "custom contract",
    highlighted: false,
    cta: "Book a call",
    ctaHref: "/contact",
    features: [
      { label: "Pages / screens", included: "Unlimited" },
      { label: "Dedicated project lead", included: true },
      { label: "Custom design system", included: true },
      { label: "API integrations", included: "Unlimited" },
      { label: "Cloud infrastructure setup", included: true },
      { label: "Post-launch support", included: "Ongoing" },
      { label: "Priority response SLA", included: true },
      { label: "Dedicated account manager", included: true },
    ],
  },
];
