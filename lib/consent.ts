"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "takt-cookie-consent";

export type CookieConsentValue = "all" | "essential" | null;

function readConsent(): CookieConsentValue {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "all" || value === "essential" ? value : null;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("takt-consent-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("takt-consent-change", onStoreChange);
  };
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);

  const setConsent = useCallback((value: Exclude<CookieConsentValue, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("takt-consent-change"));
  }, []);

  return {
    consent,
    analyticsAllowed: consent === "all",
    hasAnswered: consent !== null,
    acceptAll: () => setConsent("all"),
    rejectOptional: () => setConsent("essential"),
  };
}
