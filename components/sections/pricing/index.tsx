import { PricingTable } from "./pricing-table";
import { FeatureMatrix } from "./feature-matrix";
import { PricingFaq } from "./pricing-faq";
import { CtaStrip } from "@/components/common/cta-strip";

export function PricingSections() {
  return (
    <>
      <PricingTable />
      <FeatureMatrix />
      <PricingFaq />
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Not sure which tier fits?"
          subtext="Tell us about your project and we'll recommend the right scope — no obligation."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
