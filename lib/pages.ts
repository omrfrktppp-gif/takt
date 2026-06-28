import { chapters, type Chapter, type ContentPanel } from "@/lib/content";

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getVisibleChapters(): Chapter[] {
  return chapters.filter((chapter) => !chapter.hidden);
}

export function getChapterPanels(chapterId: string): ContentPanel[] {
  const chapter = getChapter(chapterId);
  if (!chapter) return [];
  return chapter.panels.filter((panel) => panel.body.trim().length > 0);
}

export function getChapterPanel(
  chapterId: string,
  panelId: string,
): ContentPanel | undefined {
  return getChapter(chapterId)?.panels.find((panel) => panel.id === panelId);
}

export function isScrollChapter(chapterId: string): boolean {
  return getVisibleChapters().some((chapter) => chapter.id === chapterId);
}

export function experienceChapterPath(chapterId: string): string {
  return chapterPath(chapterId);
}

export function experiencePanelPath(chapterId: string, panelId: string): string {
  if (isDetailChapter(chapterId) && getChapterPanel(chapterId, panelId)) {
    return panelPath(chapterId, panelId);
  }
  return chapterPath(chapterId);
}

export function getPanelIndex(chapterId: string, panelId: string): number {
  const chapter = getChapter(chapterId);
  if (!chapter) return 0;
  const index = chapter.panels.findIndex((panel) => panel.id === panelId);
  return index >= 0 ? index : 0;
}

export function chapterPath(chapterId: string): string {
  if (chapterId === "giris") return "/";
  if (chapterId === "hakkimizda") return "/hakkimizda";
  if (chapterId === "gorusme-planla") return "/gorusme-planla";
  return `/${chapterId}`;
}

export function panelPath(chapterId: string, panelId: string): string {
  return `${chapterPath(chapterId)}/${panelId}`;
}

export const detailChapters = ["hizmetler", "kapasitemiz"] as const;

export type DetailChapterId = (typeof detailChapters)[number];

export function isDetailChapter(id: string): id is DetailChapterId {
  return detailChapters.includes(id as DetailChapterId);
}
