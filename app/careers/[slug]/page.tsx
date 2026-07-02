import { notFound } from "next/navigation";
import { jobListings } from "@/content/careers";
import { JobDetailSections } from "@/components/sections/careers/job-detail-sections";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobListings.find((j) => j.slug === slug);
  if (!job) return {};
  return buildMetadata({
    title: job.title,
    description: job.summary,
    path: `/careers/${slug}`,
  });
}

export async function generateStaticParams() {
  return jobListings.map((j) => ({ slug: j.slug }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobListings.find((j) => j.slug === slug);
  if (!job) notFound();
  return <JobDetailSections job={job} />;
}
