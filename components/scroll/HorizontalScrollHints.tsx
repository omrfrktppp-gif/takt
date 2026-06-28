"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useScroll } from "@/components/scroll/ScrollContext";

export function HorizontalScrollHints() {
  const {
    panelCount,
    panelIndex,
    chapterId,
    setPanelIndex,
    scrollHorizontalBy,
  } = useScroll();

  useEffect(() => {
    if (panelCount <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a")) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (panelIndex > 0) {
          setPanelIndex(chapterId, panelIndex - 1);
        } else {
          scrollHorizontalBy(-320);
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (panelIndex < panelCount - 1) {
          setPanelIndex(chapterId, panelIndex + 1);
        } else {
          scrollHorizontalBy(320);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    chapterId,
    panelCount,
    panelIndex,
    scrollHorizontalBy,
    setPanelIndex,
  ]);

  if (panelCount <= 1) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Önceki bölüm"
        disabled={panelIndex === 0}
        onClick={() => setPanelIndex(chapterId, panelIndex - 1)}
        className="fixed left-2 top-[calc(var(--nav-h)+50%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-sm transition-colors hover:border-signal hover:text-signal disabled:opacity-30 md:left-4"
      >
        <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Sonraki bölüm"
        disabled={panelIndex >= panelCount - 1}
        onClick={() => setPanelIndex(chapterId, panelIndex + 1)}
        className="fixed right-12 top-[calc(var(--nav-h)+50%)] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-sm transition-colors hover:border-signal hover:text-signal disabled:opacity-30 sm:right-14 md:right-20 lg:right-24"
      >
        <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <p
        className="pointer-events-none fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 rounded-full border border-line bg-white/95 px-3 py-1 font-mono text-eyebrow text-steel md:bottom-8"
        aria-live="polite"
      >
        {panelIndex + 1} / {panelCount}
      </p>
    </>
  );
}
