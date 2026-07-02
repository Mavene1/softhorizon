import { legalDocuments } from "@/content/legal";
import { LegalDocumentSections } from "@/components/sections/legal/legal-document-sections";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of the SoftHorizon website.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return <LegalDocumentSections document={legalDocuments.terms} />;
}
