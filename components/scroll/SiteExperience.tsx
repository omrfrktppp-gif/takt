"use client";

import { AppointmentPanels } from "@/components/scroll/AppointmentPanels";
import { ContactPanels } from "@/components/scroll/ContactPanels";
import { ContentPanelView } from "@/components/scroll/ContentPanelView";
import { HomeHeroPanel } from "@/components/scroll/HomeHeroPanel";
import { useScroll } from "@/components/scroll/ScrollContext";
import { visibleChapters } from "@/lib/content";

export function SiteExperience() {
  const { verticalRef, chapterRefs, registerTrack } = useScroll();

  return (
    <div ref={verticalRef} className="scroll-vertical scrollbar-none h-full">
      {visibleChapters.map((chapter) => (
        <section
          key={chapter.id}
          ref={(el) => {
            if (el) chapterRefs.current.set(chapter.id, el);
            else chapterRefs.current.delete(chapter.id);
          }}
          data-chapter-id={chapter.id}
          className="scroll-chapter relative"
          aria-label={chapter.label}
        >
          {chapter.id === "iletisim" ? (
            <div
              ref={(el) => registerTrack(chapter.id, el)}
              className="scroll-horizontal scrollbar-none flex h-full"
            >
              <ContactPanels />
            </div>
          ) : chapter.id === "gorusme-planla" ? (
            <div className="h-full">
              <AppointmentPanels />
            </div>
          ) : chapter.kind === "hero" ? (
            <div
              ref={(el) => registerTrack(chapter.id, el)}
              className="scroll-horizontal scrollbar-none flex h-full"
            >
              <HomeHeroPanel />
            </div>
          ) : (
            <div
              ref={(el) => registerTrack(chapter.id, el)}
              className="scroll-horizontal scrollbar-none flex h-full"
            >
              {chapter.panels.map((panel, index) => (
                <ContentPanelView
                  key={panel.id}
                  eyebrow={chapter.eyebrow}
                  chapterTitle={chapter.label}
                  panel={panel}
                  panelIndex={index}
                  panelCount={chapter.panels.length}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
