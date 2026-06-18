"use client";

import { useScroll } from "@/components/scroll/ScrollContext";

/** Yatay çubuk kalınlığı / dikey çubuk genişliği */
const BAR = 5;
/** Pasif çubuk uzunluğu (~2× önceki) */
const INACTIVE = 64;
/** Aktif çubuk — içeri doğru uzar */
const ACTIVE_CHAPTER = 148;
const ACTIVE_PANEL = 120;

type CadenceRulerProps = {
  mode: "chapter" | "panel";
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  labels?: string[];
};

function CadenceRuler({
  mode,
  count,
  activeIndex,
  onSelect,
  labels,
}: CadenceRulerProps) {
  const isChapter = mode === "chapter";

  return (
    <div
      className={
        isChapter
          ? "pointer-events-auto flex flex-col items-end gap-3.5"
          : "pointer-events-auto flex items-end justify-center gap-4"
      }
      role="tablist"
      aria-orientation={isChapter ? "vertical" : "horizontal"}
    >
      {Array.from({ length: count }).map((_, index) => {
        const active = index === activeIndex;
        const length = active
          ? isChapter
            ? ACTIVE_CHAPTER
            : ACTIVE_PANEL
          : INACTIVE;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={labels?.[index] ?? `Öğe ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`rounded-full transition-all duration-300 ease-takt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent ${
              isChapter ? "py-1.5 pl-3" : "px-1.5 pb-1"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ease-takt ${
                active ? "bg-accent shadow-[0_0_12px_rgba(232,93,4,0.35)]" : "bg-line hover:bg-steel"
              }`}
              style={
                isChapter
                  ? { width: length, height: BAR, marginLeft: "auto" }
                  : { width: BAR, height: length }
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
  } = useScroll();

  return (
    <>
      {/* Sayfalar — içerik alanının dikey ortasında */}
      <div
        className="fixed right-5 z-40 hidden -translate-y-1/2 md:block lg:right-8"
        style={{ top: "calc(var(--nav-h) + (100dvh - var(--nav-h)) / 2)" }}
      >
        <CadenceRuler
          mode="chapter"
          count={chapters.length}
          activeIndex={chapterIndex}
          labels={chapters.map((c) => c.label)}
          onSelect={(index) => scrollToChapter(chapters[index]!.id)}
        />
      </div>

      {/* Alt başlıklar — altta dikey çizgiler, yukarı uzanır */}
      {panelCount > 1 ? (
        <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 md:bottom-10">
          <CadenceRuler
            mode="panel"
            count={panelCount}
            activeIndex={panelIndex}
            onSelect={(index) => setPanelIndex(chapterId, index)}
          />
        </div>
      ) : null}
    </>
  );
}
