import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllChangelogEntries, type ChangelogType } from "@/lib/changelog";
import { SectionHeader } from "@/components/common/section-header";
import { Badge } from "@/components/ui/badge";
import { changelogMdxComponents } from "./changelog-mdx-components";

const typeLabels: Record<ChangelogType, string> = {
  feature: "Feature",
  fix: "Fix",
  improvement: "Improvement",
  announcement: "Announcement",
};

export function ChangelogList() {
  const entries = getAllChangelogEntries();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <SectionHeader overline="Changelog" title="What shipped, and when" subtitle="Company and product updates, newest first." />
      <div className="mt-14 flex flex-col">
        {entries.map((entry, index) => (
          <div key={entry.frontmatter.title} className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 flex h-3 w-3 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
              {index < entries.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
            </div>
            <div className="pb-12">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{typeLabels[entry.frontmatter.type]}</Badge>
                <time dateTime={entry.frontmatter.date} className="text-xs text-muted-foreground">
                  {format(new Date(entry.frontmatter.date), "MMMM d, yyyy")}
                </time>
                {entry.frontmatter.version && (
                  <span className="text-xs text-muted-foreground">· {entry.frontmatter.version}</span>
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{entry.frontmatter.title}</h3>
              <div className="mt-1.5">
                <MDXRemote source={entry.content} components={changelogMdxComponents} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
