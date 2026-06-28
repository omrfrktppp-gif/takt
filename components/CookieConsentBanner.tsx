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
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-line bg-white p-4 shadow-lg lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md lg:rounded lg:border"
    >
      <p id="cookie-consent-title" className="font-display text-h3 text-ink">
        Çerez tercihleri
      </p>
      <p className="mt-2 text-small text-steel">
        Zorunlu çerezler site işlevi için gereklidir. Analitik çerezler yalnızca
        onay verirseniz yüklenir.{" "}
        <Link
          href="/kvkk-aydinlatma-metni"
          className="text-ink underline decoration-signal underline-offset-4"
        >
          Aydınlatma metni
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={acceptAll}
          className="rounded bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-signal"
        >
          Kabul et
        </button>
        <button
          type="button"
          onClick={rejectOptional}
          className="rounded border border-line px-4 py-2.5 text-sm font-medium text-ink hover:border-signal"
        >
          Yalnızca zorunlu
        </button>
      </div>
    </div>
  );
}
