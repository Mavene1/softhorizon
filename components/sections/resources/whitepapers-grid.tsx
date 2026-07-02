import { whitepapers } from "@/content/whitepapers";
import { SectionHeader } from "@/components/common/section-header";
import { CtaStrip } from "@/components/common/cta-strip";
import { WhitepaperCard } from "./whitepaper-card";

export function WhitepapersGrid() {
  const sorted = [...whitepapers].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="Whitepapers"
          title="In-depth reports, delivered by email"
          subtitle="Enter your email and we'll send you a link to download — no spam, unsubscribe anytime."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((whitepaper) => (
            <WhitepaperCard key={whitepaper.slug} whitepaper={whitepaper} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want to talk through any of this?"
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
