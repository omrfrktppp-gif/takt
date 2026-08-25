"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";
import { isEnglishPath, localizeInternalHref } from "@/lib/i18n";

type LocaleLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const pathname = usePathname();
  const locale = isEnglishPath(pathname) ? "en" : "tr";
  const value = localizeInternalHref(href, locale);

  if (locale === "en" && value.startsWith("/")) {
    return <a href={value} {...props} />;
  }

  return <Link href={value} {...props} />;
}
