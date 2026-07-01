import Link from "next/link";
import type { Service } from "@/content/services";
import { DynamicIcon } from "@/lib/icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <DynamicIcon name={service.icon} className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Explore
        <DynamicIcon
          name="ArrowRight"
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
