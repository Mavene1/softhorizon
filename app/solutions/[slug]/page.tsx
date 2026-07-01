import { notFound } from "next/navigation";
import { solutions } from "@/content/solutions";
import { SolutionSections } from "@/components/sections/solutions";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.headline,
    description: solution.subheadline,
    path: `/solutions/${slug}`,
  });
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();
  return <SolutionSections solution={solution} />;
}
