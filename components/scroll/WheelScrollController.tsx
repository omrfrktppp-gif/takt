"use client";

import { useEffect } from "react";
import { useScroll } from "@/components/scroll/ScrollContext";

export function WheelScrollController() {
  const {
    chapterId,
    panelCount,
    verticalRef,
    scrollVerticalBy,
    scrollHorizontalBy,
  } = useScroll();

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, iframe")) {
        return;
      }

      const innerScroll = target?.closest("[data-inner-scroll]") as
        | HTMLElement
        | null;
      if (innerScroll && innerScroll.scrollHeight > innerScroll.clientHeight) {
        const atTop = innerScroll.scrollTop <= 0;
        const atBottom =
          innerScroll.scrollTop + innerScroll.clientHeight >=
          innerScroll.scrollHeight - 2;
        const delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;
        if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
          return;
        }
      }

      const viewportH = window.innerHeight;
      const inBottomThird = event.clientY > viewportH * (2 / 3);
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (inBottomThird && panelCount > 1) {
        event.preventDefault();
        scrollHorizontalBy(delta);
        return;
      }

      event.preventDefault();
      scrollVerticalBy(delta);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [
    chapterId,
    panelCount,
    verticalRef,
    scrollVerticalBy,
    scrollHorizontalBy,
  ]);

  return null;
}
