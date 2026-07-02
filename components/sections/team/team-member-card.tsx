import Link from "next/link";
import Image from "next/image";
import type { TeamMember } from "@/content/team";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-border bg-card p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full">
        <Image src={member.photo} alt={member.name} fill sizes="96px" className="object-cover" />
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">{member.name}</h3>
      <p className="mt-1 text-sm text-primary">{member.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
    </Link>
  );
}
