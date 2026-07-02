import { format } from "date-fns";
import type { LegalDocument } from "@/content/legal";

export function LegalDocumentSections({ document }: { document: LegalDocument }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{document.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated {format(new Date(document.lastUpdated), "MMMM d, yyyy")}
      </p>
      <p className="mt-8 text-base leading-relaxed text-muted-foreground">{document.intro}</p>

      <div className="mt-10 space-y-10">
        {document.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
