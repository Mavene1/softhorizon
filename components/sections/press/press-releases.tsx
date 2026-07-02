import { format } from "date-fns";
import { pressReleases } from "@/content/press";
import { SectionHeader } from "@/components/common/section-header";

export function PressReleases() {
  const sorted = [...pressReleases].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader overline="Press" title="Company news" subtitle="Milestones and announcements from SoftHorizon." />
      <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
        {sorted.map((release) => (
          <article key={release.slug} className="p-6">
            <time dateTime={release.date} className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {format(new Date(release.date), "MMMM d, yyyy")}
            </time>
            <h3 className="mt-2 text-base font-semibold tracking-tight">{release.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{release.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
