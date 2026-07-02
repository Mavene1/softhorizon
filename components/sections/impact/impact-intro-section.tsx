import { SectionHeader } from "@/components/common/section-header";
import { siteConfig } from "@/content/site";

export function ImpactIntroSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader
        overline="Impact"
        title="Transparent by default"
        subtitle={`We'd rather share the real numbers than a highlight reel. Here's what we've actually shipped since founding SoftHorizon in ${siteConfig.founded}.`}
      />
    </section>
  );
}
