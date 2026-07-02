import { ImpactSections } from "@/components/sections/impact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Impact",
  description: "Transparent numbers on what SoftHorizon has shipped, and for whom, since founding.",
  path: "/impact",
});

export default function ImpactPage() {
  return <ImpactSections />;
}
