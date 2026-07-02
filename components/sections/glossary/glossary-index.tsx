import Link from "next/link";
import { glossaryTerms } from "@/content/glossary";
import { SectionHeader } from "@/components/common/section-header";

export function GlossaryIndex() {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(sorted.map((entry) => entry.term[0].toUpperCase()))).sort();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader
        overline="Glossary"
        title="Plain-English definitions"
        subtitle="Terms we use often, explained without the jargon."
      />
      <div className="mt-14 space-y-12">
        {letters.map((letter) => (
          <div key={letter}>
            <h2 className="text-lg font-bold text-primary">{letter}</h2>
            <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {sorted
                .filter((entry) => entry.term[0].toUpperCase() === letter)
                .map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/glossary/${entry.slug}`}
                    className="flex flex-col gap-1 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <h3 className="text-base font-semibold tracking-tight">{entry.term}</h3>
                    <p className="text-sm text-muted-foreground sm:max-w-md sm:text-right">{entry.definition}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
