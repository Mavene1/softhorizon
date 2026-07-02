import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { DynamicIcon } from "@/lib/icons";

export function CaseStudiesGrid() {
  const sorted = [...caseStudies].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Case studies"
          title="Problem, solution, results"
          subtitle="A closer look at how a few of our engagements actually played out — not just the highlight reel."
        />
      </section>

      <div className="space-y-20 pb-24">
        {sorted.map((study, index) => (
          <section key={study.slug} className="mx-auto w-full max-w-6xl px-6">
            <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative h-64 w-full overflow-hidden rounded-2xl lg:h-80">
                <Image
                  src={study.coverImage}
                  alt={`${study.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-wide text-primary uppercase">{study.client}</div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance">{study.title}</h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Problem</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{study.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Solution</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{study.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Results</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{study.results}</p>
                  </div>
                </div>

                {study.quote && (
                  <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                    <DynamicIcon name="Quote" aria-hidden className="h-5 w-5 text-primary/30" />
                    <p className="mt-2 text-sm leading-relaxed italic">{study.quote.text}</p>
                    <p className="mt-3 text-xs font-semibold text-muted-foreground">
                      {study.quote.author} — {study.quote.role}
                    </p>
                  </div>
                )}

                {study.projectSlug && (
                  <Link
                    href={`/projects/${study.projectSlug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View full project
                    <DynamicIcon name="ArrowRight" aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want results like these?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See all projects", href: "/projects" }}
        />
      </section>
    </>
  );
}
