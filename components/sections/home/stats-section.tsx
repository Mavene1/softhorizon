import { impactStats } from "@/content/site";
import { AnimatedCounter } from "@/components/common/animated-counter";

export function StatsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="rounded-3xl bg-brand-blue px-8 py-14 sm:px-14">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 text-sm text-brand-blue-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
