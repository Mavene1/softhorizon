import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="-6 0 88 58" className="h-7 w-auto shrink-0 text-primary" fill="currentColor" aria-hidden="true">
        <path d="M36.9684 1.65817C6.64075 2.71618 -4.16554 37.328 1.40674 37.328H10.5035C29.0968 37.328 68.8858 37.328 73.6334 37.328C79.5693 37.328 67.2961 0.600166 36.9684 1.65817Z" />
        <path d="M64.1993 39.7075H10.886C8.88984 39.7075 7.27159 41.3055 7.27159 43.2768C7.27159 45.248 8.88984 46.846 10.886 46.846H64.1993C66.1955 46.846 67.8138 45.248 67.8138 43.2768C67.8138 41.3055 66.1955 39.7075 64.1993 39.7075Z" />
        <path d="M55.4644 49.2256H19.621C17.6248 49.2256 16.0065 50.8236 16.0065 52.7948C16.0065 54.766 17.6248 56.364 19.621 56.364H55.4644C57.4606 56.364 59.0788 54.766 59.0788 52.7948C59.0788 50.8236 57.4606 49.2256 55.4644 49.2256Z" />
      </svg>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-primary">Soft</span>
        <span className={isDark ? "text-white" : "text-brand-blue dark:text-foreground"}>Horizon</span>
      </span>
    </Link>
  );
}
