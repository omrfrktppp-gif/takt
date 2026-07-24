"use client";

import Link from "next/link";
import { useCookieConsent } from "@/lib/consent";

export function CookieConsentBanner() {
  const { hasAnswered, acceptAll, rejectOptional } = useCookieConsent();

  if (hasAnswered) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-3 top-[calc(var(--nav-h)+0.75rem)] z-[60] mx-auto max-w-sm rounded border border-line bg-white p-3 shadow-lg sm:p-4 lg:bottom-auto lg:left-auto lg:right-4 lg:top-[calc(var(--nav-h)+1rem)] lg:mx-0 lg:max-w-md"
    >
      <p
        id="cookie-consent-title"
        className="font-mono text-eyebrow uppercase tracking-[0.08em] text-ink"
      >
        Çerez tercihleri
      </p>
      <p id="cookie-consent-description" className="mt-1.5 text-small leading-5 text-steel">
        Analitik çerezler yalnızca onayınızla yüklenir.{" "}
        <Link
          href="/kvkk-aydinlatma-metni"
          className="inline-flex min-h-11 items-center text-ink underline decoration-signal underline-offset-4 sm:min-h-0"
        >
          Aydınlatma metni
        </Link>
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-4">
        <button
          type="button"
          onClick={acceptAll}
          className="min-h-11 rounded bg-ink px-3 py-2 text-sm font-medium text-white hover:bg-signal"
        >
          Kabul et
        </button>
        <button
          type="button"
          onClick={rejectOptional}
          className="min-h-11 rounded border border-line px-3 py-2 text-sm font-medium text-ink hover:border-signal"
        >
          Yalnızca zorunlu
        </button>
      </div>
    </div>
  );
}
