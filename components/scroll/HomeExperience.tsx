"use client";

import { useEffect } from "react";
import { CadenceIndicators } from "@/components/scroll/CadenceIndicators";
import { SiteExperience } from "@/components/scroll/SiteExperience";
import { WheelScrollController } from "@/components/scroll/WheelScrollController";
import { useScroll } from "@/components/scroll/ScrollContext";

export function HomeExperience({ chapter }: { chapter?: string }) {
  const { scrollToChapter } = useScroll();

  useEffect(() => {
    if (!chapter) return;
    const timer = window.setTimeout(() => scrollToChapter(chapter), 120);
    return () => window.clearTimeout(timer);
  }, [chapter, scrollToChapter]);

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <WheelScrollController />
      <SiteExperience />
      <CadenceIndicators />
    </div>
  );
}
