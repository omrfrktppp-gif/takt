"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CadenceIndicators } from "@/components/scroll/CadenceIndicators";
import { HorizontalScrollHints } from "@/components/scroll/HorizontalScrollHints";
import { SiteExperience } from "@/components/scroll/SiteExperience";
import { WheelScrollController } from "@/components/scroll/WheelScrollController";
import { useScroll } from "@/components/scroll/ScrollContext";
import { getPanelIndex, isScrollChapter } from "@/lib/pages";

export function HomeExperience() {
  const router = useRouter();
  const { scrollToChapter } = useScroll();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chapter = params.get("b") ?? undefined;
    const panel = params.get("p") ?? undefined;

    if (!chapter) return;

    if (!isScrollChapter(chapter)) {
      router.replace("/", { scroll: false });
      return;
    }

    const panelIndex = panel ? getPanelIndex(chapter, panel) : 0;

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    scrollToChapter(chapter, panelIndex);
  }, [scrollToChapter, router]);

  return (
    <div className="relative flex h-[calc(100dvh-var(--nav-h)-4.25rem)] min-h-0 flex-1 flex-col overflow-hidden lg:h-[calc(100dvh-var(--nav-h))]">
      <WheelScrollController />
      <SiteExperience />
      <HorizontalScrollHints />
      <CadenceIndicators />
    </div>
  );
}
