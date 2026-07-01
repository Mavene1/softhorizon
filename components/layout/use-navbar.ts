"use client";

import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@/hooks/ui/use-disclosure";

export function useNavbar() {
  const { isOpen: mobileOpen, onOpen: openMobile, onClose: closeMobile } = useDisclosure();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }

  function closeMenu() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }

  function keepMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  function toggleMobileSection(label: string) {
    setOpenMobileSection((prev) => (prev === label ? null : label));
  }

  return {
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
  };
}
