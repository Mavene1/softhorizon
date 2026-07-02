import { siteConfig } from "@/content/site";
import { DynamicIcon } from "@/lib/icons";

const socialLabels = {
  linkedin: "LinkedIn",
  twitter: "Twitter",
  github: "GitHub",
} as const;

const infoCards = [
  {
    icon: "Mail",
    label: "Email us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: "MapPin",
    label: "Based in",
    value: siteConfig.location,
    href: undefined,
  },
  {
    icon: "Clock",
    label: "Response time",
    value: "Within one business day",
    href: undefined,
  },
] as const;

export function ContactInfoSection() {
  const socialEntries = Object.entries(siteConfig.social) as [keyof typeof socialLabels, string][];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="grid gap-5 sm:grid-cols-3">
        {infoCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <DynamicIcon name={card.icon} className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="mt-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {card.label}
            </div>
            {card.href ? (
              <a href={card.href} className="mt-1 block text-base font-semibold text-primary hover:underline">
                {card.value}
              </a>
            ) : (
              <p className="mt-1 text-base font-semibold">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        {socialEntries.map(([platform, href]) => (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <DynamicIcon name="ExternalLink" aria-hidden className="h-4 w-4" />
            {socialLabels[platform]}
          </a>
        ))}
      </div>
    </section>
  );
}
