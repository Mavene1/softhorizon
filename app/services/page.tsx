import { ServicesGrid } from "@/components/sections/services/services-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Custom software, web & mobile apps, cloud & DevOps, AI & data, API integrations, and ERP systems — one partner for everything you need to build.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesGrid />;
}
