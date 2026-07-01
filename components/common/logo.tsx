import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="flex flex-col items-center gap-[3px]">
        <span className="block h-3 w-6 rounded-t-full bg-primary" />
        <span className="block h-[3px] w-6 rounded-full bg-primary" />
        <span className="block h-[3px] w-[18px] rounded-full bg-primary" />
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-primary">Soft</span>
        <span className={isDark ? "text-white" : "text-brand-blue dark:text-foreground"}>Horizon</span>
      </span>
    </Link>
  );
}
