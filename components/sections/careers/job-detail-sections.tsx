import Link from "next/link";
import type { JobListing } from "@/content/careers";
import { jobListings } from "@/content/careers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationFormSection } from "./application-form-section";

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

export function JobDetailSections({ job }: { job: JobListing }) {
  const otherRoles = jobListings.filter((j) => j.slug !== job.slug && j.open).slice(0, 3);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/careers" className="text-sm font-semibold text-primary hover:underline">
          ← All open roles
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold tracking-wide text-primary uppercase">
            {job.department} · {job.location}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{job.title}</h1>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="outline">{workLocationLabels[job.workLocation]}</Badge>
          <Badge variant="outline">{employmentTypeLabels[job.employmentType]}</Badge>
          {job.salary && <Badge variant="outline">{job.salary}</Badge>}
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{job.description}</p>

        {job.open ? (
          <Button asChild size="lg" className="mt-8">
            <a href="#apply">Apply for this role</a>
          </Button>
        ) : (
          <p className="mt-8 text-sm font-semibold text-muted-foreground">
            This role is no longer accepting applications.
          </p>
        )}

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Responsibilities</h2>
            <ul className="mt-5 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Requirements</h2>
            <ul className="mt-5 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {job.niceToHave && job.niceToHave.length > 0 && (
              <>
                <h2 className="mt-8 text-sm font-semibold tracking-wide text-foreground uppercase">Nice to have</h2>
                <ul className="mt-5 space-y-3">
                  {job.niceToHave.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {job.benefits && job.benefits.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Benefits</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.benefits.map((benefit) => (
                <Badge key={benefit} variant="outline">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>

      {job.open && <ApplicationFormSection job={job} />}

      {otherRoles.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Other open roles</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {otherRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className="flex items-center justify-between gap-4 p-6 transition-colors hover:bg-accent/50"
              >
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{role.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.department} · {role.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
