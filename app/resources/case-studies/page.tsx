import { CaseStudiesGrid } from "@/components/sections/resources/case-studies-grid";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Case Studies",
  description: "A closer look at how a few of our engagements played out — problem, solution, and results.",
  path: "/resources/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudiesGrid />;
}
