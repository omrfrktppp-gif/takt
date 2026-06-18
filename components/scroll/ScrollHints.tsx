"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useScroll } from "@/components/scroll/ScrollContext";

export function ScrollHints() {
  const {
    chapterIndex,
    panelIndex,
    panelCount,
    chapterId,
    chapters,
    scrollToChapter,
    setPanelIndex,
  } = useScroll();

  const isLastChapter = chapterIndex >= chapters.length - 1;
  const hasHorizontal = panelCount > 1;
  const canGoLeft = panelIndex > 0;
  const canGoRight = panelIndex < panelCount - 1;

  return (
    <>
      {/* Dikey bölüm göstergesi */}
      <div
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-300 ease-takt ${
              index === chapterIndex
                ? "scale-125 bg-signal"
                : "bg-line hover:bg-steel"
            }`}
            aria-label={chapter.label}
            onClick={() => scrollToChapter(chapter.id)}
          />
        ))}
        {!isLastChapter ? (
          <ChevronDown
            size={14}
            className="mt-2 animate-bounce text-steel"
            strokeWidth={1.5}
          />
        ) : null}
      </div>

      {/* Yatay panel göstergesi */}
      {hasHorizontal ? (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3">
          {canGoLeft ? (
            <ChevronLeft
              size={16}
              className="hidden text-steel motion-safe:animate-pulse sm:block"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : null}
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 py-2 backdrop-blur-sm">
            {Array.from({ length: panelCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-1.5 rounded-full transition-all duration-300 ease-takt ${
                  index === panelIndex
                    ? "w-5 bg-signal"
                    : "w-1.5 bg-line hover:bg-steel"
                }`}
                aria-label={`Panel ${index + 1}`}
                onClick={() => setPanelIndex(chapterId, index)}
              />
            ))}
          </div>
          {canGoRight ? (
            <ChevronRight
              size={16}
              className="hidden text-steel motion-safe:animate-pulse sm:block"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
