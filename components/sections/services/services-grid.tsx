import { services } from "@/content/services";
import { SectionHeader } from "@/components/common/section-header";
import { ServiceCard } from "@/components/common/service-card";
import { CtaStrip } from "@/components/common/cta-strip";

export function ServicesGrid() {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeader
          overline="What we do"
          title="Everything you need to build, ship, and scale"
          subtitle="From custom software to cloud infrastructure, we cover the full stack of your engineering needs — as one dedicated partner."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline="Not sure which service fits your project?"
          subtext="Tell us what you're building and we'll point you in the right direction — no obligation."
          primaryCta={{ label: "Talk to us", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>
    </>
  );
}
