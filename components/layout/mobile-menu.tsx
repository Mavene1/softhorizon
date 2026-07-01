"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { megaMenus, simpleLinks, navCta } from "@/components/layout/nav-config";
import { DynamicIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openSection: string | null;
  onToggleSection: (label: string) => void;
}

export function MobileMenu({ isOpen, onClose, openSection, onToggleSection }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Mobile navigation">
          {megaMenus.map((menu) => (
            <Collapsible
              key={menu.label}
              open={openSection === menu.label}
              onOpenChange={() => onToggleSection(menu.label)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
                {menu.label}
                <DynamicIcon
                  name="ChevronDown"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSection === menu.label && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-1 space-y-4 pb-2 pl-3">
                  {menu.sections.map((section) => (
                    <div key={section.heading}>
                      <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {section.heading}
                      </p>
                      {section.items.map((item) => (
                        <SheetClose key={item.label} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                          >
                            <DynamicIcon name={item.icon} className="h-4 w-4 shrink-0 text-primary" />
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          {simpleLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <SheetClose key={link.href} asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium",
                    active ? "bg-accent text-primary" : "text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}

          <Separator className="my-3" />

          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>

          <Separator className="my-3" />

          <Button asChild className="w-full" onClick={onClose}>
            <Link href={navCta.href}>{navCta.label}</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
