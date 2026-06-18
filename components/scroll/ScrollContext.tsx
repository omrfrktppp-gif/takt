"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { visibleChapters, type Chapter } from "@/lib/content";

function panelCountFor(chapter: Chapter) {
  if (chapter.kind === "contact") return 4;
  if (chapter.kind === "booking") return 1;
  return chapter.panels.length;
}

type ScrollContextValue = {
  chapterIndex: number;
  panelIndex: number;
  chapterId: string;
  panelCount: number;
  chapters: typeof visibleChapters;
  verticalRef: React.RefObject<HTMLDivElement | null>;
  chapterRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  scrollToChapter: (chapterId: string, panelIndex?: number) => void;
  setPanelIndex: (chapterId: string, panelIndex: number) => void;
  registerTrack: (chapterId: string, el: HTMLDivElement | null) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const verticalRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Map<string, HTMLElement>>(new Map());
  const trackRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const trackCleanup = useRef<Map<string, () => void>>(new Map());
  const chapterIndexRef = useRef(0);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [panelIndex, setPanelIndexState] = useState(0);

  const chapter = visibleChapters[chapterIndex] ?? visibleChapters[0];
  const chapterId = chapter.id;
  const panelCount = panelCountFor(chapter);

  chapterIndexRef.current = chapterIndex;

  const scrollToChapter = useCallback((id: string, panel = 0) => {
    const chapterEl = chapterRefs.current.get(id);
    const trackEl = trackRefs.current.get(id);
    chapterEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (trackEl) {
      const width = trackEl.clientWidth || 1;
      trackEl.scrollTo({ left: width * panel, behavior: "smooth" });
    }
  }, []);

  const setPanelIndex = useCallback((id: string, index: number) => {
    const trackEl = trackRefs.current.get(id);
    if (!trackEl) return;
    const width = trackEl.clientWidth || 1;
    trackEl.scrollTo({ left: width * index, behavior: "smooth" });
  }, []);

  const registerTrack = useCallback((chapterId: string, el: HTMLDivElement | null) => {
    trackCleanup.current.get(chapterId)?.();
    trackCleanup.current.delete(chapterId);

    if (!el) {
      trackRefs.current.delete(chapterId);
      return;
    }

    trackRefs.current.set(chapterId, el);

    const onScroll = () => {
      const idx = visibleChapters.findIndex((c) => c.id === chapterId);
      if (idx !== chapterIndexRef.current) return;
      const width = el.clientWidth || 1;
      const next = Math.round(el.scrollLeft / width);
      setPanelIndexState(
        Math.min(next, panelCountFor(visibleChapters[idx]!) - 1),
      );
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    trackCleanup.current.set(chapterId, () =>
      el.removeEventListener("scroll", onScroll),
    );
    onScroll();
  }, []);

  useEffect(() => {
    const root = verticalRef.current;
    if (!root) return;

    const syncChapter = () => {
      const center = root.scrollTop + root.clientHeight * 0.45;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      chapterRefs.current.forEach((el, id) => {
        const idx = visibleChapters.findIndex((c) => c.id === id);
        if (idx < 0) return;
        const mid = el.offsetTop + el.clientHeight * 0.5;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });

      if (best !== chapterIndexRef.current) {
        setChapterIndex(best);
        const track = trackRefs.current.get(visibleChapters[best]!.id);
        if (track) {
          const width = track.clientWidth || 1;
          setPanelIndexState(Math.round(track.scrollLeft / width));
        } else {
          setPanelIndexState(0);
        }
      }
    };

    root.addEventListener("scroll", syncChapter, { passive: true });
    syncChapter();
    return () => root.removeEventListener("scroll", syncChapter);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToChapter(hash), 120);
    return () => window.clearTimeout(timer);
  }, [scrollToChapter]);

  const value = useMemo<ScrollContextValue>(
    () => ({
      chapterIndex,
      panelIndex,
      chapterId,
      panelCount,
      chapters: visibleChapters,
      verticalRef,
      chapterRefs,
      scrollToChapter,
      setPanelIndex,
      registerTrack,
    }),
    [
      chapterIndex,
      panelIndex,
      chapterId,
      panelCount,
      scrollToChapter,
      setPanelIndex,
      registerTrack,
    ],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used within ScrollProvider");
  return ctx;
}
