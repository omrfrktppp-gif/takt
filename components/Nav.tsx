"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { useScroll } from "@/components/scroll/ScrollContext";
import { appointmentCta } from "@/lib/site";
import { visibleChapters } from "@/lib/content";
import { experienceChapterPath } from "@/lib/pages";

const navChapters = visibleChapters.filter(
  (chapter) => chapter.id !== "gorusme-planla",
);

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { chapterId, panelIndex, scrollToChapter } = useScroll();

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
    return () => observer.disconnect();
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="z-50 shrink-0 border-b border-line bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-4 md:h-16 md:gap-6 md:px-6">
        {isHome ? (
          <button
            type="button"
            onClick={() => scrollToChapter("hakkimizda")}
            className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-ink md:text-lg md:gap-3"
            aria-label="Takt ana sayfa"
          >
            <Cadence
              variant="mark"
              activeIndex={Math.min(panelIndex, 3)}
              pulseKey={`${chapterId}-${panelIndex}`}
              className="origin-left scale-[0.65] md:scale-75"
            />
            <span>takt</span>
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-ink md:text-lg md:gap-3"
            aria-label="Takt ana sayfa"
          >
            <Cadence
              variant="mark"
              activeIndex={0}
              className="origin-left scale-[0.65] md:scale-75"
            />
            <span>takt</span>
          </Link>
        )}

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label="Ana navigasyon"
        >
          {navChapters.map((chapter) => {
            const href = experienceChapterPath(chapter.id);
            const active = isHome && chapterId === chapter.id;
            const className = `text-sm underline-offset-4 transition-colors hover:text-signal hover:underline ${
              active ? "font-medium text-signal" : "text-ink"
            }`;

            if (isHome) {
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => scrollToChapter(chapter.id)}
                  className={className}
                >
                  {chapter.label}
                </button>
              );
            }

            return (
              <Link key={chapter.id} href={href} className={className}>
                {chapter.label}
              </Link>
            );
          })}
          <Link
            href="/blog"
            className={`text-sm underline-offset-4 transition-colors hover:text-signal hover:underline ${
              pathname.startsWith("/blog")
                ? "font-medium text-signal"
                : "text-ink"
            }`}
          >
            Blog
          </Link>
          {isHome ? (
            <Button onClick={() => scrollToChapter("gorusme-planla")}>
              {appointmentCta.label}
            </Button>
          ) : (
            <Button href={appointmentCta.href}>{appointmentCta.label}</Button>
          )}
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
          className="max-h-[min(70dvh,420px)] overflow-y-auto border-t border-line bg-white px-4 py-3 scrollbar-none lg:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-1">
            {navChapters.map((chapter) => {
              const href = experienceChapterPath(chapter.id);
              const active = isHome && chapterId === chapter.id;

              if (isHome) {
                return (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      className={`block w-full rounded-sm px-2 py-3 text-left text-base ${
                        active
                          ? "bg-accent/10 font-medium text-accent"
                          : "text-ink"
                      }`}
                      onClick={() => {
                        scrollToChapter(chapter.id);
                        setOpen(false);
                      }}
                    >
                      {chapter.label}
                    </button>
                  </li>
                );
              }

              return (
                <li key={chapter.id}>
                  <Link
                    href={href}
                    className={`block rounded-sm px-2 py-3 text-base ${
                      active
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {chapter.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/blog"
                className={`block rounded-sm px-2 py-3 text-base ${
                  pathname.startsWith("/blog")
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-ink"
                }`}
                onClick={() => setOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li className="mt-2 border-t border-line pt-3">
              {isHome ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    scrollToChapter("gorusme-planla");
                    setOpen(false);
                  }}
                >
                  {appointmentCta.label}
                </Button>
              ) : (
                <Button href={appointmentCta.href} className="w-full">
                  {appointmentCta.label}
                </Button>
              )}
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
