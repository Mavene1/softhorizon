import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/team";
import { teamMembers } from "@/content/team";
import { DynamicIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { CtaStrip } from "@/components/common/cta-strip";
import { TeamMemberCard } from "./team-member-card";

const socialLabels = {
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "Twitter",
} as const;

export function MemberDetailSections({ member }: { member: TeamMember }) {
  const others = teamMembers.filter((m) => m.slug !== member.slug).sort((a, b) => a.order - b.order).slice(0, 3);
  const socialEntries = member.social
    ? (Object.entries(member.social) as [keyof typeof socialLabels, string][]).filter(([, href]) => Boolean(href))
    : [];

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/team" className="text-sm font-semibold text-primary hover:underline">
          ← All team members
        </Link>
        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full">
            <Image src={member.photo} alt={member.name} fill sizes="112px" className="object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-primary uppercase">{member.department}</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{member.name}</h1>
            <p className="mt-1 text-base text-muted-foreground">{member.role}</p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {member.fullBio ?? member.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <DynamicIcon name="Mail" aria-hidden className="h-4 w-4" />
              {member.email}
            </a>
          )}
          {socialEntries.map(([platform, href]) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <DynamicIcon name="ExternalLink" aria-hidden className="h-4 w-4" />
              {socialLabels[platform]}
            </a>
          ))}
        </div>

        {member.skills && member.skills.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Focus areas</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want this team on your next project?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Start a project", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>

      {others.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">More from the team</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((m) => (
              <TeamMemberCard key={m.slug} member={m} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
