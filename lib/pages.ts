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

export function chapterPath(chapterId: string): string {
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
