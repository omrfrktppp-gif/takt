import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  chapterPath,
  getChapter,
  getChapterPanel,
  isDetailChapter,
  panelPath,
} from "@/lib/pages";

export function middleware(request: NextRequest) {
  const chapterId = request.nextUrl.searchParams.get("b");
  if (!chapterId) return NextResponse.next();

  const chapter = getChapter(chapterId);
  if (!chapter || chapter.hidden) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const panelId = request.nextUrl.searchParams.get("p");
  if (panelId && isDetailChapter(chapterId) && getChapterPanel(chapterId, panelId)) {
    return NextResponse.redirect(
      new URL(panelPath(chapterId, panelId), request.url),
    );
  }

  const target = chapterPath(chapterId);
  return NextResponse.redirect(new URL(target, request.url));
}

export const config = {
  matcher: "/",
};
