import { SectionHeader } from "@/components/common/section-header";
import { DynamicIcon } from "@/lib/icons";

const partnerBenefits = [
  {
    icon: "Handshake",
    title: "Referral partners",
    description: "Send us client work outside your scope and earn a referral fee on every signed engagement.",
  },
  {
    icon: "Plug",
    title: "Technology partners",
    description: "Platforms and tools we integrate with regularly — co-market and build joint case studies together.",
  },
  {
    icon: "Blocks",
    title: "Agency partners",
    description: "White-label engineering capacity for agencies that need extra hands on client delivery.",
  },
] as const;

export function PartnerIntroSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeader
        overline="Partners"
        title="Build with us"
        subtitle="We work with referral partners, technology partners, and agencies who want to bring their clients world-class software delivery."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {partnerBenefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <DynamicIcon name={benefit.icon} className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-tight">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
