import { webinars } from "@/content/webinars";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { WebinarsFilter } from "./webinars-filter";

export function WebinarsGrid() {
  const sorted = [...webinars].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Webinars"
          title="Recordings and upcoming sessions"
          subtitle="Live sessions and recordings from our team on the topics we think about most."
        />
        <div className="mt-12">
          <WebinarsFilter webinars={sorted} />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Have a topic you'd like us to cover?"
          subtext="Tell us what you'd find useful and we'll consider it for a future session."
          primaryCta={{ label: "Suggest a topic", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
