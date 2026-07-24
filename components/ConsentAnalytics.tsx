"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useCookieConsent } from "@/lib/consent";

export function ConsentAnalytics() {
  const { analyticsAllowed } = useCookieConsent();

  if (!analyticsAllowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
