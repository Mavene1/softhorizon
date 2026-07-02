import Link from "next/link";
import type { GlossaryTerm } from "@/content/glossary";
import { glossaryTerms } from "@/content/glossary";
import { Badge } from "@/components/ui/badge";
import { CtaStrip } from "@/components/common/cta-strip";

export function TermDetail({ entry }: { entry: GlossaryTerm }) {
  const related = entry.relatedTerms
    ?.map((slug) => glossaryTerms.find((t) => t.slug === slug))
    .filter((t): t is GlossaryTerm => Boolean(t));

  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        <Link href="/glossary" className="text-sm font-semibold text-primary hover:underline">
          ← All terms
        </Link>

        <div className="mt-6">
          <Badge variant="outline">{entry.category}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{entry.term}</h1>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{entry.longDefinition}</p>

        {related && related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Related terms</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((term) => (
                <Link key={term.slug} href={`/glossary/${term.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    {term.term}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Have a project that needs this?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
