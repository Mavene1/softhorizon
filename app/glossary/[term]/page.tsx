import { notFound } from "next/navigation";
import { glossaryTerms } from "@/content/glossary";
import { TermDetail } from "@/components/sections/glossary/term-detail";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }) {
  const { term: slug } = await params;
  const entry = glossaryTerms.find((t) => t.slug === slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.term,
    description: entry.definition,
    path: `/glossary/${slug}`,
  });
}

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term: slug } = await params;
  const entry = glossaryTerms.find((t) => t.slug === slug);
  if (!entry) notFound();
  return <TermDetail entry={entry} />;
}
