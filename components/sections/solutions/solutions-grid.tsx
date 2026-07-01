import Link from "next/link";
import { solutions } from "@/content/solutions";
import { SectionHeader } from "@/components/common/section-header";
import { DynamicIcon } from "@/lib/icons";
import { CtaStrip } from "@/components/common/cta-strip";

export function SolutionsGrid() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Who we work with"
          title="Solutions built around your industry"
          subtitle="The same engineering discipline, tailored to the constraints and pace of the world you operate in."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                {solution.persona}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">{solution.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{solution.subheadline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore
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
          headline="Don't see your industry?"
          subtext="We work across sectors — tell us what you're building and we'll tell you if we're the right fit."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
