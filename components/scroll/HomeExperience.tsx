"use client";

import { useEffect } from "react";
import { ScrollHints } from "@/components/scroll/ScrollHints";
import { SiteExperience } from "@/components/scroll/SiteExperience";
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
      <main className="h-[calc(100dvh-4rem)] overflow-hidden">
        <SiteExperience />
      </main>
      <ScrollHints />
    </>
  );
}
