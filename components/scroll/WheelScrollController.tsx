"use client";

import { useEffect } from "react";
import { useScroll } from "@/components/scroll/ScrollContext";

function shouldBypassWheelHijack(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(max-width: 1023px)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  return false;
}

export function WheelScrollController() {
  const { panelCount, scrollVerticalBy, scrollHorizontalBy } = useScroll();

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (shouldBypassWheelHijack()) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, iframe")) {
        return;
      }

      const innerScroll = target?.closest(".scroll-inner") as
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

      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        ) || 64;
      const viewportH = window.innerHeight;
      const contentH = viewportH - navH;
      const relativeY = event.clientY - navH;
      const inBottomThird = relativeY > contentH * (2 / 3);
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
  }, [panelCount, scrollVerticalBy, scrollHorizontalBy]);

  return null;
}
