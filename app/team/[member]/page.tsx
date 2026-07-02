import { notFound } from "next/navigation";
import { teamMembers } from "@/content/team";
import { MemberDetailSections } from "@/components/sections/team/member-detail-sections";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ member: string }> }) {
  const { member: slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return {};
  return buildMetadata({
    title: member.name,
    description: member.bio,
    path: `/team/${slug}`,
  });
}

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ member: m.slug }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ member: string }> }) {
  const { member: slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();
  return <MemberDetailSections member={member} />;
}
