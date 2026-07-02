import { legalDocuments } from "@/content/legal";
import { LegalDocumentSections } from "@/components/sections/legal/legal-document-sections";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How SoftHorizon collects, uses, and protects your information.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return <LegalDocumentSections document={legalDocuments.privacy} />;
}
