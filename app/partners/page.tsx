import { PartnersSections } from "@/components/sections/partners";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Partners",
  description: "Partner with SoftHorizon as a referral, technology, or agency partner.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersSections />;
}
