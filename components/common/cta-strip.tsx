import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaAction {
  label: string;
  href: string;
}

interface CtaStripProps {
  headline: string;
  subtext?: string;
  primaryCta: CtaAction;
  secondaryCta?: CtaAction;
}

export function CtaStrip({ headline, subtext, primaryCta, secondaryCta }: CtaStripProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 sm:px-14">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 text-white/10" aria-hidden />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{headline}</h2>
        {subtext && <p className="mt-4 text-base leading-relaxed text-white/85">{subtext}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta && (
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
