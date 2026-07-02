"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { megaMenus, simpleLinks, navCta, isMegaMenuActive, type MegaMenu } from "@/components/layout/nav-config";
import { useNavbar } from "@/components/layout/use-navbar";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function MegaMenuPanel({ menu, onKeep, onClose }: { menu: MegaMenu; onKeep: () => void; onClose: () => void }) {
  return (
    <div
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 w-screen max-w-3xl"
      onMouseEnter={onKeep}
      onMouseLeave={onClose}
    >
      <div className="h-3" />
      <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/10">
        <div className={cn("grid gap-6 p-6", menu.sections.length > 1 ? "grid-cols-[1fr_1fr_240px]" : "grid-cols-[1fr_240px]")}>
          {menu.sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">{section.heading}</p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary group-hover:bg-accent transition-colors">
                        <DynamicIcon name={item.icon} className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-tight line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col justify-between rounded-xl border border-border bg-secondary/50 p-5">
            <div>
              <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {menu.featured.badge}
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground leading-snug">{menu.featured.label}</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{menu.featured.description}</p>
            </div>
            <Link
              href={menu.featured.href}
              onClick={onClose}
              className="group mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors"
            >
              {menu.featured.cta}
              <DynamicIcon name="ArrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopNavItem({
  menu,
  isOpen,
  active,
  onOpen,
  onClose,
  onKeep,
}: {
  menu: MegaMenu;
  isOpen: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  onKeep: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Button
        variant="ghost"
        className={cn(
          "flex h-auto items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          isOpen ? "bg-accent text-foreground" : active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        aria-expanded={isOpen}
      >
        {menu.label}
        <DynamicIcon
          name="ChevronDown"
          className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </Button>
      {isOpen && <MegaMenuPanel menu={menu} onKeep={onKeep} onClose={onClose} />}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const {
    mobileOpen,
    openMobile,
    closeMobile,
    activeMenu,
    openMobileSection,
    scrolled,
    openMenu,
    closeMenu,
    keepMenu,
    toggleMobileSection,
  } = useNavbar();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-background/85 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {megaMenus.map((menu) => (
            <DesktopNavItem
              key={menu.label}
              menu={menu}
              isOpen={activeMenu === menu.label}
              active={isMegaMenuActive(menu, pathname)}
              onOpen={() => openMenu(menu.label)}
              onClose={closeMenu}
              onKeep={keepMenu}
            />
          ))}
          {simpleLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground hover:bg-accent/50",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:inline-flex" />
          <Button asChild className="hidden md:inline-flex">
            <Link href={navCta.href}>{navCta.label}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={openMobile}
            aria-label="Open menu"
          >
            <DynamicIcon name="Menu" />
          </Button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        openSection={openMobileSection}
        onToggleSection={toggleMobileSection}
      />
    </header>
  );
}
