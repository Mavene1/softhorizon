"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";
import { useDisclosure } from "@/hooks/ui/use-disclosure";

export function Navbar() {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1.5 transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {active && <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpen} aria-label="Open menu">
            <DynamicIcon name="Menu" />
          </Button>
        </div>
      </div>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </header>
  );
}
