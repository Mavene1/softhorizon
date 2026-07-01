export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "SoftHorizon completely transformed the way we operate. Their system streamlined our workflow, reduced errors, and gave us back countless hours every week.",
    name: "Operations Director",
    role: "Operations Director",
    company: "Public-sector client",
  },
  {
    quote:
      "What stood out most was the support, every question answered quickly and thoroughly, and the delivery never slipped.",
    name: "Head of Data",
    role: "Head of Data",
    company: "Enterprise client",
  },
  {
    quote: "They felt like part of our own team. We went from idea to a launched product in under four months.",
    name: "Founder",
    role: "Founder",
    company: "Fintech client",
  },
];
