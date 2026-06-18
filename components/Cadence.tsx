"use client";

import { useEffect, useState } from "react";

type CadenceProps = {
  tickCount?: number;
  activeIndex?: number;
  variant?: "hero" | "divider" | "mark" | "footer";
  className?: string;
};

const heights = [16, 24, 32, 40, 32, 24, 16];

export function Cadence({
  tickCount = 7,
  activeIndex = 3,
  variant = "divider",
  className = "",
}: CadenceProps) {
  const [animated, setAnimated] = useState(variant !== "hero");
  const count = variant === "mark" ? 4 : tickCount;
  const active = variant === "mark" ? 2 : activeIndex;

  useEffect(() => {
    if (variant !== "hero") return;

    const timer = window.setTimeout(() => setAnimated(true), 100);
    return () => window.clearTimeout(timer);
  }, [variant]);

  return (
    <div
      className={`flex items-end gap-3 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => {
        const height = heights[index % heights.length];
        const isActive = index === active;
        const delay = variant === "hero" ? index * 120 : 0;

        return (
          <span
            key={index}
            className={`w-0.5 shrink-0 rounded-none transition-colors duration-300 ease-takt ${
              variant === "hero" && !animated
                ? "opacity-0 motion-safe:animate-cadence-in"
                : "opacity-100"
            } ${isActive ? "bg-signal" : "bg-line"}`}
            style={{
              height: `${height}px`,
              animationDelay: `${delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
