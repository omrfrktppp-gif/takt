"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { appointmentCta, navLinks } from "@/lib/site";

const primaryExtraLinks = navLinks.filter((link) => link.id === "sektorler");

const secondaryExtraLinks = navLinks.filter(
  (link) =>
    link.id === "referanslar" ||
    link.id === "rehber" ||
    link.id === "blog" ||
    link.id === "sss",
);

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onViewportChange);
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
    return `text-sm underline-offset-4 transition-colors hover:text-signal hover:underline ${
      active ? "font-medium text-signal" : "text-ink"
    }`;
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      ref={headerRef}
      className="z-50 shrink-0 border-b border-line bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-4 md:h-16 md:gap-6 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-ink md:text-lg md:gap-3"
          aria-label="Takt ana sayfa"
        >
          <BrandLogo size={40} className="h-9 w-9 md:h-10 md:w-10" priority />
          <span>takt</span>
        </Link>

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label="Ana navigasyon"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
          {primaryExtraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
          {secondaryExtraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden ${linkClass(isActive(link.href))} xl:inline`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            href={appointmentCta.href}
            onClick={() => trackEvent("booking_click", { type: "nav" })}
          >
            {appointmentCta.label}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-line p-2.5 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="scroll-inner scrollbar-none max-h-[min(70dvh,420px)] overflow-y-auto border-t border-line bg-white px-4 py-3 lg:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-1">
            {navLinks
              .filter((link) => link.id !== "lead-magnet")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-sm px-2 py-3 text-base ${
                      isActive(link.href)
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            <li className="mt-2 border-t border-line pt-3">
              <Button
                href={appointmentCta.href}
                className="w-full"
                onClick={() => {
                  trackEvent("booking_click", { type: "nav_mobile" });
                  setOpen(false);
                }}
              >
                {appointmentCta.label}
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
