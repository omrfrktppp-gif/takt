"use client";

import { useScroll } from "@/components/scroll/ScrollContext";

const INACTIVE = 28;
const ACTIVE = 56;
const BAR = 2;

type CadenceRulerProps = {
  orientation: "vertical" | "horizontal";
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  labels?: string[];
};

function CadenceRuler({
  orientation,
  count,
  activeIndex,
  onSelect,
  labels,
}: CadenceRulerProps) {
  const vertical = orientation === "vertical";

  return (
    <div
      className={
        vertical
          ? "pointer-events-auto flex flex-col items-center gap-2.5"
          : "pointer-events-auto flex items-end justify-center gap-2.5"
      }
      role="tablist"
      aria-orientation={vertical ? "vertical" : "horizontal"}
    >
      {Array.from({ length: count }).map((_, index) => {
        const active = index === activeIndex;
        const size = active ? ACTIVE : INACTIVE;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={labels?.[index] ?? `Öğe ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`rounded-full transition-all duration-300 ease-takt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active ? "bg-accent" : "bg-line hover:bg-steel"
            }`}
            style={
              vertical
                ? { width: BAR, height: size }
                : { width: BAR, height: size }
            }
          />
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
  } = useScroll();

  return (
    <>
      <div
        className="fixed right-4 top-[4.75rem] z-40 hidden md:block"
        style={{ maxHeight: "min(55vh, 400px)" }}
      >
        <CadenceRuler
          orientation="vertical"
          count={chapters.length}
          activeIndex={chapterIndex}
          labels={chapters.map((c) => c.label)}
          onSelect={(index) => scrollToChapter(chapters[index]!.id)}
        />
      </div>

      {panelCount > 1 ? (
        <div className="fixed bottom-7 left-1/2 z-40 -translate-x-1/2">
          <CadenceRuler
            orientation="horizontal"
            count={panelCount}
            activeIndex={panelIndex}
            onSelect={(index) => setPanelIndex(chapterId, index)}
          />
        </div>
      ) : null}
    </>
  );
}
