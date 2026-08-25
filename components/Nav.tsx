"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocaleLink } from "@/components/LocaleLink";
import { trackEvent } from "@/lib/analytics";
import { isEnglishPath, stripLocalePrefix } from "@/lib/i18n";
import { uiText } from "@/lib/i18n-ui";
import { leadMagnet, navLinks } from "@/lib/site";

const primaryExtraLinks = navLinks.filter((link) => link.id === "sektorler");

export function Nav() {
  const pathname = usePathname();
  const locale = isEnglishPath(pathname) ? "en" : "tr";
  const routePath = stripLocalePrefix(pathname);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncNavHeight = () => {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${el.offsetHeight}px`,
      );
    };

    syncNavHeight();
    const observer = new ResizeObserver(syncNavHeight);
    observer.observe(el);

    const onViewportChange = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onViewportChange);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);

    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      });

      const trapFocus = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;
        const focusable = [
          menuButtonRef.current,
          ...(mobileNavRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ) ?? []),
        ].filter((element): element is HTMLElement => Boolean(element));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };
      window.addEventListener("keydown", trapFocus);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", trapFocus);
        observer.disconnect();
        window.removeEventListener("resize", onViewportChange);
        window.removeEventListener("keydown", onKeyDown);
      };
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const mainLinks = navLinks.filter(
    (link) =>
      link.id === "hakkimizda" ||
      link.id === "hizmetler" ||
      link.id === "kapasitemiz" ||
      link.id === "yaklasim" ||
      link.id === "iletisim",
  );

  function linkClass(active: boolean) {
    return `inline-flex min-h-11 items-center text-sm underline-offset-4 transition-colors hover:text-signal-text hover:underline ${
      active ? "font-medium text-signal-text" : "text-ink"
    }`;
  }

  function isActive(href: string) {
    return routePath === href || routePath.startsWith(`${href}/`);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[70] shrink-0 border-b border-line bg-paper/90 shadow-[0_10px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-4 md:h-16 md:gap-6 md:px-6">
        <LocaleLink
          href="/"
          className="flex min-h-11 items-center gap-2.5 font-display text-base font-semibold tracking-tight text-ink md:text-lg md:gap-3"
          aria-label={locale === "en" ? "Takt home" : "Takt ana sayfa"}
        >
          <BrandLogo size={40} className="h-9 w-9 md:h-10 md:w-10" priority />
          <span>takt</span>
        </LocaleLink>

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label={locale === "en" ? "Main navigation" : "Ana navigasyon"}
        >
          {mainLinks.map((link) => (
            <LocaleLink
              key={link.href}
              href={link.href}
              className={linkClass(isActive(link.href))}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {uiText(link.label, locale)}
            </LocaleLink>
          ))}
          {primaryExtraLinks.map((link) => (
            <LocaleLink
              key={link.href}
              href={link.href}
              className={linkClass(isActive(link.href))}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {uiText(link.label, locale)}
            </LocaleLink>
          ))}
          <LanguageSwitcher />
          <Button
            variant="signal"
            href={leadMagnet.href}
            className="min-h-11 shrink-0 !px-4 !py-2.5 text-xs xl:!px-[22px] xl:text-sm"
            onClick={() =>
              trackEvent("ihtiyac_analizi_cta_click", { source: "nav" })
            }
          >
            {uiText("İhtiyaç Analizi", locale)}
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line p-2.5 text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={
              locale === "en"
                ? open ? "Close menu" : "Open menu"
                : open ? "Menüyü kapat" : "Menüyü aç"
            }
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] -z-10 bg-deep/25 lg:hidden"
            aria-hidden="true"
            onPointerDown={() => setOpen(false)}
          />
          <nav
            ref={mobileNavRef}
            id="mobile-nav"
            className="scroll-inner scrollbar-none absolute inset-x-0 top-full max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-b border-line bg-paper px-4 py-3 shadow-lg lg:hidden"
            aria-label={locale === "en" ? "Mobile navigation" : "Mobil navigasyon"}
          >
          <ul className="flex flex-col gap-1">
            {navLinks
              .filter((link) => link.id !== "lead-magnet")
              .map((link) => (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    className={`flex min-h-11 items-center rounded-sm px-2 py-2 text-base ${
                      isActive(link.href)
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-ink"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {uiText(link.label, locale)}
                  </LocaleLink>
                </li>
              ))}
            <li className="mt-2 border-t border-line pt-3">
              <Button
                variant="signal"
                href={leadMagnet.href}
                className="w-full"
                onClick={() => {
                  trackEvent("ihtiyac_analizi_cta_click", {
                    source: "nav_mobile",
                  });
                  setOpen(false);
                }}
              >
                {uiText("İhtiyaç Analizini Başlat", locale)}
              </Button>
            </li>
          </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
