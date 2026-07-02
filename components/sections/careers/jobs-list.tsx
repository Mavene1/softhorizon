import Link from "next/link";
import { jobListings } from "@/content/careers";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/lib/icons";

const workLocationLabels = {
  remote: "Remote",
  "on-site": "On-site",
  hybrid: "Hybrid",
} as const;

const employmentTypeLabels = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
} as const;

export function JobsList() {
  const open = jobListings.filter((job) => job.open);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Careers"
          title="Open roles"
          subtitle="A small, senior team spanning engineering, design, and delivery — we're always glad to talk to people who care about doing the work well."
        />
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {open.length === 0 && (
            <p className="p-8 text-sm text-muted-foreground">
              No open roles right now — check back soon, or{" "}
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                get in touch
              </Link>{" "}
              anyway.
            </p>
          )}
          {open.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group flex flex-col gap-3 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-base font-semibold tracking-tight">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.department} · {job.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">{workLocationLabels[job.workLocation]}</Badge>
                  <Badge variant="outline">{employmentTypeLabels[job.employmentType]}</Badge>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                View role
                <DynamicIcon
                  name="ArrowRight"
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Don't see the right role?"
          subtext="We're always glad to hear from people who'd be a great fit — tell us a bit about yourself."
          primaryCta={{ label: "Get in touch", href: "/contact" }}
          secondaryCta={{ label: "Meet the team", href: "/team" }}
        />
      </section>
    </>
  );
}
