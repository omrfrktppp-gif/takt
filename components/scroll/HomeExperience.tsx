"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CadenceIndicators } from "@/components/scroll/CadenceIndicators";
import { SiteExperience } from "@/components/scroll/SiteExperience";
import { WheelScrollController } from "@/components/scroll/WheelScrollController";
import { useScroll } from "@/components/scroll/ScrollContext";
import { getPanelIndex, isScrollChapter } from "@/lib/pages";

type HomeExperienceProps = {
  chapter?: string;
  panel?: string;
};

export function HomeExperience({ chapter, panel }: HomeExperienceProps) {
  const router = useRouter();
  const { scrollToChapter } = useScroll();

  useEffect(() => {
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
  }, [chapter, panel, scrollToChapter, router]);

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <WheelScrollController />
      <SiteExperience />
      <CadenceIndicators />
    </div>
  );
}
