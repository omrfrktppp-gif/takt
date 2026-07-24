"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { appointmentCta } from "@/lib/site";

export function MobileCtaBar() {
  const pathname = usePathname();
  const [pageCtaVisible, setPageCtaVisible] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") return;

    const targets = ["home-hero", "home-cta"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (targets.length === 0) return;

    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target, entry.isIntersecting);
        setPageCtaVisible([...visibility.values()].some(Boolean));
      },
      { threshold: 0.2 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/" && pageCtaVisible) return null;

  return (
    <>
      <div className="h-[calc(3.75rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-2 backdrop-blur-sm lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label="Hızlı işlem"
      >
        <Button
          variant="signal"
          href={appointmentCta.href}
          className="min-h-11 w-full px-3 py-2.5 text-center text-sm"
          onClick={() => trackEvent("booking_click", { type: "mobile_bar" })}
        >
          {appointmentCta.label}
        </Button>
      </div>
    </>
  );
}
