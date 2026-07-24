"use client";

import Link from "next/link";
import { useCookieConsent } from "@/lib/consent";

export function CookieConsentBanner() {
  const { hasAnswered, acceptAll, rejectOptional } = useCookieConsent();

  if (hasAnswered) return null;

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="border-b border-line bg-white px-4 py-3 shadow-sm md:px-6"
    >
      <div className="mx-auto grid max-w-content gap-2 md:grid-cols-[1fr_auto] md:items-center md:gap-6">
        <div>
          <p
            id="cookie-consent-title"
            className="font-mono text-eyebrow uppercase tracking-[0.08em] text-ink"
          >
            Çerez tercihleri
          </p>
          <p id="cookie-consent-description" className="mt-1 text-small leading-5 text-steel">
            Analitik çerezler yalnızca onayınızla yüklenir.{" "}
            <Link
              href="/kvkk-aydinlatma-metni"
              className="inline-flex min-h-11 items-center text-ink underline decoration-signal underline-offset-4"
            >
              Aydınlatma metni
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:min-w-[18rem]">
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
    </div>
  );
}
