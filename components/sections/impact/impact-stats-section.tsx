import { impactStats } from "@/content/site";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { DynamicIcon } from "@/lib/icons";

const statMeta: Record<string, { icon: string; description: string }> = {
  "products shipped": {
    icon: "Rocket",
    description: "Every one of them still in production, not shelved after launch.",
  },
  "clients served": {
    icon: "Handshake",
    description: "From early-stage startups to public-sector agencies.",
  },
  industries: {
    icon: "LayoutGrid",
    description: "Government, fintech, logistics, and more.",
  },
  "engineers & designers": {
    icon: "UsersRound",
    description: "A team we've grown deliberately, not just scaled.",
  },
};

export function ImpactStatsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {impactStats.map((stat) => {
          const meta = statMeta[stat.label];
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
              {meta && (
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <DynamicIcon name={meta.icon} className="h-5 w-5" aria-hidden />
                </span>
              )}
              <div className="mt-5 text-4xl font-bold tracking-tight text-primary">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 text-sm font-semibold">{stat.label}</div>
              {meta && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
