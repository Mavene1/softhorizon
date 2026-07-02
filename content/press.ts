export interface PressRelease {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export const pressReleases: PressRelease[] = [
  {
    slug: "150-products-shipped",
    title: "SoftHorizon crosses 150 shipped products",
    date: "2025-11-10",
    summary:
      "SoftHorizon has now shipped over 150 products for clients across government, fintech, and logistics, with a team of 35+ engineers and designers.",
  },
  {
    slug: "40-clients-served",
    title: "SoftHorizon reaches 40+ clients across three industries",
    date: "2024-09-02",
    summary:
      "Crossing 40 clients served, SoftHorizon marks a milestone year of delivery across public-sector, fintech, and logistics engagements.",
  },
  {
    slug: "fintech-expansion",
    title: "SoftHorizon expands into fintech, shipping lending and payments platforms",
    date: "2023-04-18",
    summary:
      "Building on its public-sector track record, SoftHorizon began delivering lending and payments platforms for fintech clients across the region.",
  },
  {
    slug: "first-enterprise-client",
    title: "SoftHorizon delivers its first large-scale public-sector platform",
    date: "2021-06-01",
    summary:
      "One year after founding, SoftHorizon delivered its first enterprise engagement — a large-scale platform for a public-sector agency.",
  },
];

export const pressBoilerplate =
  "SoftHorizon is a software engineering partner based in Nairobi, Kenya, building web, mobile, cloud, and AI-powered products for government, fintech, and logistics clients across the region. Founded in 2020, the team has shipped 150+ products for 40+ clients.";

export interface MediaKitAsset {
  label: string;
  description: string;
  href: string;
}

export const mediaKitAssets: MediaKitAsset[] = [
  {
    label: "Logo — light background",
    description: "SVG, for use on white or light backgrounds",
    href: "/press/softhorizon-logo-dark.svg",
  },
  {
    label: "Logo — dark background",
    description: "SVG, for use on dark or brand-colored backgrounds",
    href: "/press/softhorizon-logo-light.svg",
  },
];
