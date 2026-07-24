"use client";

import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { useCookieConsent } from "@/lib/consent";
import { appointmentCta, siteConfig } from "@/lib/site";

export function MobileCtaBar() {
  const { hasAnswered } = useCookieConsent();

  if (!hasAnswered) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur-sm lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Button
        variant="signal"
        href={appointmentCta.href}
        className="min-w-0 flex-[1.4] px-3 py-3 text-center text-[13px] leading-snug"
        onClick={() => trackEvent("booking_click", { type: "mobile_bar" })}
      >
        {appointmentCta.label}
      </Button>
      <Button
        variant="secondary"
        href={siteConfig.whatsapp.href}
        className="min-w-0 flex-1 px-3 py-3 text-[13px]"
        onClick={() =>
          trackEvent("contact_click", { channel: "whatsapp_mobile_bar" })
        }
      >
        WhatsApp
      </Button>
    </div>
  );
}
