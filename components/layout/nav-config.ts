import { services } from "@/content/services";
import { solutions } from "@/content/solutions";

export interface NavItem {
  label: string;
  description: string;
  href: string;
  icon: string;
}

export interface NavSection {
  heading: string;
  items: NavItem[];
}

export interface MegaMenu {
  label: string;
  sections: NavSection[];
  featured: {
    badge: string;
    label: string;
    description: string;
    href: string;
    cta: string;
  };
}

const featuredServices = services.filter((service) => service.featured);
const otherServices = services.filter((service) => !service.featured);

export const megaMenus: MegaMenu[] = [
  {
    label: "Services",
    sections: [
      {
        heading: "Core services",
        items: featuredServices.map((service) => ({
          label: service.title,
          description: service.description,
          href: `/services/${service.slug}`,
          icon: service.icon,
        })),
      },
      {
        heading: "More services",
        items: otherServices.map((service) => ({
          label: service.title,
          description: service.description,
          href: `/services/${service.slug}`,
          icon: service.icon,
        })),
      },
    ],
    featured: {
      badge: "Overview",
      label: "See every service",
      description: "Compare all six services and how we scope engagements.",
      href: "/services",
      cta: "View all services",
    },
  },
  {
    label: "Solutions",
    sections: [
      {
        heading: "By industry",
        items: solutions.map((solution) => ({
          label: solution.persona,
          description: solution.subheadline,
          href: `/solutions/${solution.slug}`,
          icon: "Compass",
        })),
      },
    ],
    featured: {
      badge: "Overview",
      label: "Find your industry",
      description: "See solutions across fintech, startups, and enterprise.",
      href: "/solutions",
      cta: "View all solutions",
    },
  },
];

export const simpleLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const navCta = { label: "Contact us", href: "/contact" };
