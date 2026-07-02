import Image from "next/image";
import { mediaKitAssets, pressBoilerplate } from "@/content/press";
import { teamMembers } from "@/content/team";
import { SectionHeader } from "@/components/common/section-header";
import { DynamicIcon } from "@/lib/icons";

export function MediaKitSection() {
  const executives = teamMembers.filter((member) => member.department === "Leadership").sort((a, b) => a.order - b.order);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <SectionHeader overline="Media kit" title="Company bio & assets" />

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{pressBoilerplate}</p>

      <div className="mt-10">
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">Logo downloads</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {mediaKitAssets.map((asset) => (
            <a
              key={asset.href}
              href={asset.href}
              download
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50"
            >
              <div>
                <div className="text-sm font-semibold">{asset.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{asset.description}</div>
              </div>
              <DynamicIcon
                name="Download"
                aria-hidden
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            </a>
          ))}
        </div>
      </div>

      {executives.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">Executive headshots</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {executives.map((exec) => (
              <a
                key={exec.slug}
                href={exec.photo}
                download
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/50"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image src={exec.photo} alt={exec.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{exec.name}</div>
                  <div className="text-xs text-muted-foreground">{exec.role}</div>
                </div>
                <DynamicIcon
                  name="Download"
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
