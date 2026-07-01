import { CtaStrip } from "@/components/common/cta-strip";

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <CtaStrip
        headline="Let's build the right solution for you."
        subtext="Whatever your team needs to build, we're a message away. Reach out and we'll get back within one business day."
        primaryCta={{ label: "Get in touch", href: "/contact" }}
        secondaryCta={{ label: "See our work", href: "/projects" }}
      />
    </section>
  );
}
