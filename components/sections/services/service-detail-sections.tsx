import Link from "next/link";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { DynamicIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/common/service-card";
import { CtaStrip } from "@/components/common/cta-strip";

export function ServiceDetailSections({ service }: { service: Service }) {
  const related = services.filter((s) => s.slug !== service.slug).sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/services" className="text-sm font-semibold text-primary hover:underline">
          ← All services
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <DynamicIcon name={service.icon} className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <div className="text-sm font-semibold tracking-wide text-primary uppercase">{service.tagline}</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{service.title}</h1>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.longDescription}</p>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">What's included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <DynamicIcon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.technologies && service.technologies.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Technologies</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <CtaStrip
          headline={`Ready to talk about ${service.title.toLowerCase()}?`}
          subtext="Tell us about your project and we'll get back to you within one business day."
          primaryCta={{ label: "Start a project", href: "/contact" }}
          secondaryCta={{ label: "See our work", href: "/projects" }}
        />
      </section>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Other services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
