import { GlossaryIndex } from "@/components/sections/glossary/glossary-index";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Glossary",
  description: "Plain-English definitions for the engineering, design, and product terms we use often.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return <GlossaryIndex />;
}
