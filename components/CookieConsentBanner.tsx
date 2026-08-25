"use client";

import Link from "next/link";
import { useCookieConsent } from "@/lib/consent";

export function CookieConsentBanner() {
  const { hasAnswered, acceptAll, rejectOptional } = useCookieConsent();

  if (hasAnswered) return null;

  return (
    <aside
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-live="polite"
      aria-atomic="true"
      className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[80] rounded border border-line bg-white/95 shadow-lg backdrop-blur-sm lg:bottom-5 lg:left-5 lg:right-auto lg:max-w-2xl"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5">
        <div className="min-w-0">
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
              className="touch-target-inline rounded-sm text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
            >
              Aydınlatma metni
            </Link>
          </p>
        </div>
        <div
          role="group"
          className="grid grid-cols-2 gap-2 sm:min-w-[18rem]"
          aria-label="Çerez tercihleri"
        >
          <button
            type="button"
            onClick={acceptAll}
            className="min-h-11 rounded bg-deep px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-signal hover:text-signal-ink"
          >
            Kabul et
          </button>
          <button
            type="button"
            onClick={rejectOptional}
            className="min-h-11 rounded border border-line bg-white px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal-text"
          >
            Yalnızca zorunlu
          </button>
        </div>
      </div>
    </aside>
  );
}
