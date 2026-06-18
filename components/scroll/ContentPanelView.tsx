"use client";

import { Eyebrow } from "@/components/Eyebrow";
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
}: ContentPanelViewProps) {
  return (
    <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always flex-col justify-center px-4 py-4 pb-20 pr-10 md:px-10 md:py-6 md:pb-6 md:pr-28 lg:pr-36">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 md:gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        {panel.title ? (
          <h2 className="font-display text-[1.35rem] leading-tight text-ink md:text-h1">
            {panel.title}
          </h2>
        ) : (
          <h2 className="font-display text-[1.35rem] leading-tight text-ink md:text-h1">
            {chapterTitle}
          </h2>
        )}
        <p className="max-w-2xl text-body text-steel md:text-body-lg">
          {panel.body}
        </p>
      </div>
    </article>
  );
}
