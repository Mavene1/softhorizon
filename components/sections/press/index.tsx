import { PressReleases } from "./press-releases";
import { MediaKitSection } from "./media-kit-section";
import { CtaStrip } from "@/components/common/cta-strip";

export function PressSections() {
  return (
    <>
      <PressReleases />
      <MediaKitSection />
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Working on a story about SoftHorizon?"
          subtext="Reach out and we'll get back to you within one business day."
          primaryCta={{ label: "Contact us", href: "/contact" }}
          secondaryCta={{ label: "About SoftHorizon", href: "/about" }}
        />
      </section>
    </>
  );
}
