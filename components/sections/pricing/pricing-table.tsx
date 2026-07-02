import Link from "next/link";
import { pricingTiers } from "@/content/pricing";
import { DynamicIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { cn } from "@/lib/utils";

export function PricingTable() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader
        overline="Pricing"
        title="Simple, transparent pricing"
        subtitle="Fixed-price projects for defined scopes, or a custom contract for ongoing, multi-team work. Every tier includes design, engineering, and QA."
        align="center"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "flex flex-col rounded-2xl border p-8",
              tier.highlighted ? "border-primary bg-card shadow-lg shadow-primary/10" : "border-border bg-card"
            )}
          >
            {tier.highlighted && (
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tier.tagline}</p>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight">{tier.price ?? "Contact us"}</span>
            </div>
            {tier.billingNote && <p className="mt-1 text-xs text-muted-foreground">{tier.billingNote}</p>}

            <Button asChild size="lg" variant={tier.highlighted ? "default" : "outline"} className="mt-6">
              <Link href={tier.ctaHref}>{tier.cta}</Link>
            </Button>

            <ul className="mt-8 space-y-3 border-t border-border pt-8">
              {tier.features.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  {feature.included ? (
                    <DynamicIcon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  ) : (
                    <DynamicIcon name="X" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" aria-hidden />
                  )}
                  <span className={cn(!feature.included && "text-muted-foreground/60")}>
                    {feature.label}
                    {typeof feature.included === "string" && (
                      <span className="text-muted-foreground"> — {feature.included}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
