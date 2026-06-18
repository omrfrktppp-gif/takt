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
    <>
      <WheelScrollController />
      <main className="h-[calc(100dvh-4rem)] overflow-hidden">
        <SiteExperience />
      </main>
      <CadenceIndicators />
    </>
  );
}
