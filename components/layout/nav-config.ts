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
  {
    label: "Resources",
    sections: [
      {
        heading: "Content",
        items: [
          { label: "Blog", description: "Engineering notes and product thinking.", href: "/blog", icon: "BookOpen" },
          { label: "Case Studies", description: "Problem, solution, and results from real engagements.", href: "/resources/case-studies", icon: "History" },
          { label: "Whitepapers", description: "In-depth reports, delivered by email.", href: "/resources/whitepapers", icon: "FileText" },
        ],
      },
      {
        heading: "Updates",
        items: [
          { label: "Webinars", description: "Recordings and upcoming live sessions.", href: "/resources/webinars", icon: "Video" },
          { label: "Changelog", description: "What shipped, and when.", href: "/changelog", icon: "Rss" },
          { label: "Glossary", description: "Plain-English definitions for the terms we use.", href: "/glossary", icon: "BookMarked" },
        ],
      },
    ],
    featured: {
      badge: "Resources",
      label: "Read our latest thinking",
      description: "Blog posts, case studies, and events from the team.",
      href: "/blog",
      cta: "Visit the blog",
    },
  },
  {
    label: "Company",
    sections: [
      {
        heading: "About us",
        items: [
          { label: "About", description: "Our story, mission, and values.", href: "/about", icon: "Compass" },
          { label: "Team", description: "The people building with our clients.", href: "/team", icon: "UsersRound" },
          { label: "Careers", description: "Open roles across engineering, design, and product.", href: "/careers", icon: "UserPlus" },
          { label: "Press", description: "Company bio, logos, and media kit.", href: "/press", icon: "FileText" },
          { label: "Partners", description: "Partner with us on client delivery.", href: "/partners", icon: "Handshake" },
        ],
      },
    ],
    featured: {
      badge: "Company",
      label: "Get to know us",
      description: "Our story, the team behind it, and open roles.",
      href: "/about",
      cta: "About Softhorizon",
    },
  },
];

export const simpleLinks = [
  { label: "Work", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

export const navCta = { label: "Contact us", href: "/contact" };
