import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

const COLUMNS = [
  {
    title: "Services",
    links: [...services]
      .sort((a, b) => a.order - b.order)
      .slice(0, 4)
      .map((service) => ({ label: service.title, href: `/services/${service.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our work", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security", href: "/legal/security" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", abbr: "in", href: siteConfig.social.linkedin },
  { label: "GitHub", abbr: "gh", href: siteConfig.social.github },
  { label: "Twitter", abbr: "tw", href: siteConfig.social.twitter },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-ink text-neutral-300">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-5">
        <div className="col-span-2">
          <Logo variant="dark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            A software engineering partner building dependable, human-centred technology for teams that want to
            grow.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs font-semibold text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
              >
                {s.abbr}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-4 text-xs font-semibold tracking-wider text-neutral-500 uppercase">{col.title}</div>
            <div className="flex flex-col gap-3 text-sm">
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="text-neutral-300 transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="mb-4 text-xs font-semibold tracking-wider text-neutral-500 uppercase">Get in touch</div>
          <div className="flex flex-col gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="text-neutral-300 transition-colors hover:text-white">
              {siteConfig.email}
            </a>
            <span className="text-neutral-400">{siteConfig.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-neutral-500">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span className="flex gap-5">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="transition-colors hover:text-neutral-300">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
