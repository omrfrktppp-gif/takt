"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { leadMagnet } from "@/lib/site";
import { isEnglishPath, stripLocalePrefix } from "@/lib/i18n";

export function MobileCtaBar() {
  const pathname = usePathname();
  const routePath = stripLocalePrefix(pathname);
  const english = isEnglishPath(pathname);
  const [pageCtaVisible, setPageCtaVisible] = useState(routePath === "/");

  useEffect(() => {
    if (routePath !== "/") return;

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
  }, [routePath]);

  if (
    routePath.startsWith("/ihtiyac-analizi") ||
    (routePath === "/" && pageCtaVisible)
  ) {
    return null;
  }

  return (
    <>
      <div className="h-[calc(3.75rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-signal/35 bg-deep/95 px-3 pt-2 shadow-[0_-12px_36px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label={english ? "Quick action" : "Hızlı işlem"}
      >
        <Button
          variant="signal"
          href={leadMagnet.href}
          className="min-h-11 w-full px-3 py-2.5 text-center text-sm"
          onClick={() =>
            trackEvent("ihtiyac_analizi_cta_click", { source: "mobile_bar" })
          }
        >
          {english
            ? "Clarify Your Needs in 2 Minutes"
            : "2 Dakikada İhtiyacınızı Netleştirin"}
        </Button>
      </div>
    </>
  );
}
