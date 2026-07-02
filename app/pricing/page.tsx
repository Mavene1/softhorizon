import { PricingSections } from "@/components/sections/pricing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing",
  description: "Fixed-price project tiers and custom enterprise contracts — transparent pricing for every stage of your product.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingSections />;
}
