import { legalDocuments } from "@/content/legal";
import { LegalDocumentSections } from "@/components/sections/legal/legal-document-sections";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Security & Compliance",
  description: "How SoftHorizon approaches security, infrastructure, and compliance.",
  path: "/legal/security",
});

export default function SecurityPage() {
  return <LegalDocumentSections document={legalDocuments.security} />;
}
