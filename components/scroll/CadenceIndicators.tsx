"use client";

import { useScroll } from "@/components/scroll/ScrollContext";

type CadenceRulerProps = {
  mode: "chapter" | "panel";
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  labels?: string[];
  compact?: boolean;
};

/** Aktif çubuktan uzaklığa göre piramit uzunluk */
function pyramidLength(
  index: number,
  activeIndex: number,
  compact: boolean,
  isChapter: boolean,
) {
  const distance = Math.abs(index - activeIndex);
  const peak = compact ? (isChapter ? 72 : 58) : isChapter ? 96 : 76;
  const step = compact ? 14 : 18;
  const min = compact ? 14 : 20;

  return Math.max(min, peak - distance * step);
}

function CadenceRuler({
  mode,
  count,
  activeIndex,
  onSelect,
  labels,
  compact = false,
}: CadenceRulerProps) {
  const isChapter = mode === "chapter";
  const bar = compact ? 4 : 5;

  return (
    <div
      className={
        isChapter
          ? "pointer-events-auto flex flex-col items-end gap-2 md:gap-3"
          : "pointer-events-auto flex items-end justify-center gap-2.5 md:gap-3.5"
      }
      role="tablist"
      aria-orientation={isChapter ? "vertical" : "horizontal"}
    >
      {Array.from({ length: count }).map((_, index) => {
        const active = index === activeIndex;
        const length = pyramidLength(index, activeIndex, compact, isChapter);

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={labels?.[index] ?? `Öğe ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`rounded-full transition-all duration-300 ease-takt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isChapter ? "py-1 pl-2 md:py-1.5 md:pl-3" : "px-1 pb-1 md:px-1.5"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ease-takt ${
                active
                  ? "bg-accent shadow-[0_0_10px_rgba(232,93,4,0.35)]"
                  : "bg-line active:bg-steel"
              }`}
              style={
                isChapter
                  ? { width: length, height: bar, marginLeft: "auto" }
                  : { width: bar, height: length }
              }
            />
          </button>
        );
      })}
    </div>
  );
}

export function CadenceIndicators() {
  const {
    chapterIndex,
    panelIndex,
    panelCount,
    chapterId,
    chapters,
    scrollToChapter,
    setPanelIndex,
    isDesktop,
  } = useScroll();

  const showPanelRuler = panelCount > 1;

  return (
    <>
      <div
        className="fixed right-2 z-40 -translate-y-1/2 sm:right-4 md:right-5 lg:right-8"
        style={{ top: "calc(var(--nav-h) + (100dvh - var(--nav-h)) / 2)" }}
      >
        <CadenceRuler
          mode="chapter"
          count={chapters.length}
          activeIndex={chapterIndex}
          labels={chapters.map((c) => c.label)}
          onSelect={(index) => scrollToChapter(chapters[index]!.id)}
          compact={!isDesktop}
        />
      </div>

      {showPanelRuler ? (
        <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] md:bottom-8 md:pb-0">
          <CadenceRuler
            mode="panel"
            count={panelCount}
            activeIndex={panelIndex}
            onSelect={(index) => setPanelIndex(chapterId, index)}
            compact={!isDesktop}
          />
        </div>
      ) : null}
    </>
  );
}
