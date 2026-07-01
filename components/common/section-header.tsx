interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ overline, title, subtitle, align = "left" }: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {overline && (
        <div
          className={`mb-4 inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest text-primary uppercase ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="block h-px w-5 bg-primary" aria-hidden />
          {overline}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
