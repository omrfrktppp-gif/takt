"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function WhatsAppButton() {
  const { whatsapp } = siteConfig;
  if (!whatsapp.enabled) return null;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal lg:bottom-5"
      onClick={() => trackEvent("contact_click", { channel: "whatsapp" })}
    >
      <MessageCircle size={26} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
