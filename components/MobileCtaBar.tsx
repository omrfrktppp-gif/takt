"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { useScroll } from "@/components/scroll/ScrollContext";
import { trackEvent } from "@/lib/analytics";
import { appointmentCta, siteConfig } from "@/lib/site";

export function MobileCtaBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollToChapter } = useScroll();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur-sm lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {isHome ? (
        <Button
          className="flex-1"
          href={appointmentCta.href}
          onClick={(event) => {
            event.preventDefault();
            trackEvent("booking_click", { type: "mobile_bar_home" });
            scrollToChapter("gorusme-planla");
          }}
        >
          {appointmentCta.label}
        </Button>
      ) : (
        <Button
          href={appointmentCta.href}
          className="flex-1"
          onClick={() => trackEvent("booking_click", { type: "mobile_bar" })}
        >
          {appointmentCta.label}
        </Button>
      )}
      <Button
        variant="secondary"
        href={siteConfig.whatsapp.href}
        className="flex-1"
        onClick={() =>
          trackEvent("contact_click", { channel: "whatsapp_mobile_bar" })
        }
      >
        WhatsApp
      </Button>
    </div>
  );
}
