"use client";

import { useEffect } from "react";
import { CadenceIndicators } from "@/components/scroll/CadenceIndicators";
import { SiteExperience } from "@/components/scroll/SiteExperience";
import { WheelScrollController } from "@/components/scroll/WheelScrollController";
import { useScroll } from "@/components/scroll/ScrollContext";
import { getPanelIndex } from "@/lib/pages";

type HomeExperienceProps = {
  chapter?: string;
  panel?: string;
};

export function HomeExperience({ chapter, panel }: HomeExperienceProps) {
  const { scrollToChapter } = useScroll();

  useEffect(() => {
    if (!chapter) return;
    const panelIndex = panel ? getPanelIndex(chapter, panel) : 0;
    const timer = window.setTimeout(
      () => scrollToChapter(chapter, panelIndex),
      120,
    );
    return () => window.clearTimeout(timer);
  }, [chapter, panel, scrollToChapter]);

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <WheelScrollController />
      <SiteExperience />
      <CadenceIndicators />
    </div>
  );
}
