import { teamMembers } from "@/content/team";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { TeamMemberCard } from "./team-member-card";

export function TeamGrid() {
  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);
  const departments = Array.from(new Set(sorted.map((member) => member.department)));

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Our team"
          title="The people building with our clients"
          subtitle="A small, senior team spanning engineering, design, and delivery — every engagement is staffed by people who've shipped this kind of work before."
        />
        <div className="mt-14 space-y-14">
          {departments.map((department) => (
            <div key={department}>
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">{department}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sorted
                  .filter((member) => member.department === department)
                  .map((member) => (
                    <TeamMemberCard key={member.slug} member={member} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want to work with this team?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "About SoftHorizon", href: "/about" }}
        />
      </section>
    </>
  );
}
