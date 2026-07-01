import Link from "next/link";
import { services } from "@/content/services";
import { SectionHeader } from "@/components/common/section-header";
import { ServiceCard } from "@/components/common/service-card";

export function ServicesPreview() {
  const featured = services.filter((service) => service.featured).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
        <SectionHeader overline="What we do" title="One partner for everything you need to build" />
        <Link href="/services" className="text-sm font-semibold text-primary hover:underline">
          All services →
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
