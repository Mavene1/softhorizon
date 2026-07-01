import { SolutionsGrid } from "@/components/sections/solutions/solutions-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Persona and industry landing pages — software solutions for fintech startups, early-stage startups, and enterprise & public sector teams.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <SolutionsGrid />;
}
