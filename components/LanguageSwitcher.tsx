"use client";

import { usePathname } from "next/navigation";
import {
  isEnglishPath,
  withLocalePrefix,
} from "@/lib/i18n";
import { persistLocale } from "@/components/LocalePersistence";

type LanguageSwitcherProps = {
  className?: string;
  onNavigate?: () => void;
};

export function LanguageSwitcher({
  className = "",
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const english = isEnglishPath(pathname);

  const itemClass = (active: boolean) =>
    `inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2.5 font-mono text-xs font-semibold tracking-[0.08em] transition-colors ${
      active
        ? "bg-signal text-signal-ink"
        : "text-steel hover:bg-raised hover:text-signal-text"
    }`;

  return (
    <div
      className={`inline-flex items-center rounded-sm border border-line bg-paper/70 p-0.5 ${className}`}
      aria-label="Dil seçimi / Language selection"
      data-locale-switcher
    >
      <a
        href={withLocalePrefix(pathname, "tr")}
        hrefLang="tr"
        lang="tr"
        className={itemClass(!english)}
        aria-current={!english ? "page" : undefined}
        onClick={() => {
          persistLocale("tr");
          onNavigate?.();
        }}
      >
        TR
      </a>
      <a
        href={withLocalePrefix(pathname, "en")}
        hrefLang="en"
        lang="en"
        className={itemClass(english)}
        aria-current={english ? "page" : undefined}
        onClick={() => {
          persistLocale("en");
          onNavigate?.();
        }}
      >
        EN
      </a>
    </div>
  );
}
