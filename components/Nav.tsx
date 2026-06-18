"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { useScroll } from "@/components/scroll/ScrollContext";
import { appointmentCta } from "@/lib/site";
import { visibleChapters } from "@/lib/content";

const navChapters = visibleChapters.filter(
  (c) => c.id !== "gorusme-planla",
);

export function Nav() {
  const [open, setOpen] = useState(false);
  const { chapterId, panelIndex, scrollToChapter } = useScroll();

  return (
    <header className="z-50 shrink-0 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 md:gap-6 md:px-6">
        <button
          type="button"
          onClick={() => scrollToChapter("hakkimizda")}
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink md:gap-3"
          aria-label="Takt ana sayfa"
        >
          <Cadence
            variant="mark"
            activeIndex={Math.min(panelIndex, 3)}
            pulseKey={`${chapterId}-${panelIndex}`}
            className="origin-left scale-75"
          />
          <span>takt</span>
        </button>

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label="Ana navigasyon"
        >
          {navChapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(chapter.id)}
              className={`text-sm underline-offset-4 transition-colors hover:text-signal hover:underline ${
                chapterId === chapter.id
                  ? "font-medium text-signal"
                  : "text-ink"
              }`}
            >
              {chapter.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToChapter("gorusme-planla")}
          >
            {appointmentCta.label}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-line p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-white px-6 py-4 lg:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-4">
            {navChapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={`block w-full text-left text-base ${
                    chapterId === chapter.id ? "font-medium text-signal" : "text-ink"
                  }`}
                  onClick={() => {
                    scrollToChapter(chapter.id);
                    setOpen(false);
                  }}
                >
                  {chapter.label}
                </button>
              </li>
            ))}
            <li>
              <Button
                className="w-full"
                onClick={() => {
                  scrollToChapter("gorusme-planla");
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
