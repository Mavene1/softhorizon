import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/team";

export function AuthorCard({ author }: { author: TeamMember }) {
  return (
    <Link
      href={`/team/${author.slug}`}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
        <Image src={author.photo} alt={author.name} fill sizes="56px" className="object-cover" />
      </div>
      <div>
        <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Written by</div>
        <div className="mt-0.5 text-sm font-semibold">{author.name}</div>
        <div className="text-xs text-muted-foreground">{author.role}</div>
      </div>
    </Link>
  );
}
