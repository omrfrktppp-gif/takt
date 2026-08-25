"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isEnglishPath, localizeInternalHref } from "@/lib/i18n";

const COOKIE_NAME = "takt_locale";

export function persistLocale(locale: "tr" | "en") {
  document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  try {
    window.localStorage.setItem(COOKIE_NAME, locale);
  } catch {
    // Cookie remains the canonical preference if storage is unavailable.
  }
}

export function LocalePersistence() {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);

  useEffect(() => {
    persistLocale(english ? "en" : "tr");
  }, [english]);

  useEffect(() => {
    if (!english) return;

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (
        !target ||
        target.closest("[data-locale-switcher]") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      const rawHref = target.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      const url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin) return;

      const localized = localizeInternalHref(
        `${url.pathname}${url.search}${url.hash}`,
        "en",
      );
      event.preventDefault();
      window.location.assign(localized);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [english]);

  return null;
}
