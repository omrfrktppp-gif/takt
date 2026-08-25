export const defaultLocale = "tr" as const;
export const supportedLocales = ["tr", "en"] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function stripLocalePrefix(pathname: string): string {
  if (!isEnglishPath(pathname)) return pathname || "/";
  const stripped = pathname.slice(3);
  return stripped || "/";
}

export function withLocalePrefix(pathname: string, locale: SiteLocale): string {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return pathname;
  const suffixIndex = pathname.search(/[?#]/);
  const path = suffixIndex === -1 ? pathname : pathname.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : pathname.slice(suffixIndex);
  const localizedPath = stripLocalePrefix(path);
  if (locale === "tr") return `${localizedPath}${suffix}`;
  return `${localizedPath === "/" ? "/en" : `/en${localizedPath}`}${suffix}`;
}

export function localizeInternalHref(href: string, locale: SiteLocale): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/api/") ||
    href.startsWith("/_next/") ||
    href.startsWith("/locales/")
  ) {
    return href;
  }
  return withLocalePrefix(href, locale);
}

export function isBlogPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);
  return path === "/blog" || path.startsWith("/blog/");
}
