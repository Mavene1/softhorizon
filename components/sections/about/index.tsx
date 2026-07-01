import { StorySection } from "./story-section";
import { MissionVisionSection } from "./mission-vision-section";
import { ValuesSection } from "./values-section";
import { TimelineSection } from "./timeline-section";
import { CtaStrip } from "@/components/common/cta-strip";

export function AboutSections() {
  return (
    <>
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <TimelineSection />
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Want to work with a team like this?"
          subtext="We're always glad to talk shop, even before there's a project on the table."
          primaryCta={{ label: "Get in touch", href: "/contact" }}
          secondaryCta={{ label: "Meet the team", href: "/team" }}
        />
      </section>
    </>
  );
}
