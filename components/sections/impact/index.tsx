import { ImpactIntroSection } from "./impact-intro-section";
import { ImpactStatsSection } from "./impact-stats-section";
import { Timeline } from "@/components/common/timeline";
import { CtaStrip } from "@/components/common/cta-strip";

export function ImpactSections() {
  return (
    <>
      <ImpactIntroSection />
      <ImpactStatsSection />
      <Timeline />
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want to be part of the next chapter?"
          subtext="Whether as a client or a teammate, we'd like to hear from you."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See open roles", href: "/careers" }}
        />
      </section>
    </>
  );
}
