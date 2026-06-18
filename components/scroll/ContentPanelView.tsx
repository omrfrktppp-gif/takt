"use client";

import { Eyebrow } from "@/components/Eyebrow";
import { Cadence } from "@/components/Cadence";
import type { ContentPanel } from "@/lib/content";

type ContentPanelViewProps = {
  eyebrow: string;
  chapterTitle: string;
  panel: ContentPanel;
  panelIndex: number;
  panelCount: number;
};

export function ContentPanelView({
  eyebrow,
  chapterTitle,
  panel,
  panelIndex,
  panelCount,
}: ContentPanelViewProps) {
  const cadenceActive = Math.min(panelIndex, Math.min(panelCount, 9) - 1);

  return (
    <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always flex-col justify-center px-6 py-8 md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-end justify-between gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Cadence
            variant="divider"
            tickCount={Math.min(panelCount, 9)}
            activeIndex={cadenceActive}
            pulseKey={`${chapterTitle}-${panelIndex}`}
            className="hidden sm:flex"
          />
        </div>
        {panel.title ? (
          <h2 className="font-display text-h2 text-ink md:text-h1">
            {panel.title}
          </h2>
        ) : (
          <h2 className="font-display text-h2 text-ink md:text-h1">
            {chapterTitle}
          </h2>
        )}
        <p className="max-w-2xl text-body-lg text-steel">{panel.body}</p>
      </div>
    </article>
  );
}
