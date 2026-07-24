import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  chapterPath,
  getChapter,
  getChapterPanel,
  isDetailChapter,
  panelPath,
} from "@/lib/pages";

/** Kalıcı yönlendirme — GSC "geçici redirect" ve redirect hatalarını önler */
const PERMANENT_REDIRECT = 308;

export function proxy(request: NextRequest) {
  const chapterId = request.nextUrl.searchParams.get("b");
  if (!chapterId) return NextResponse.next();

  const chapter = getChapter(chapterId);
  if (!chapter) {
    return NextResponse.redirect(new URL("/", request.url), PERMANENT_REDIRECT);
  }

  const panelId = request.nextUrl.searchParams.get("p");
  if (panelId && isDetailChapter(chapterId) && getChapterPanel(chapterId, panelId)) {
    return NextResponse.redirect(
      new URL(panelPath(chapterId, panelId), request.url),
      PERMANENT_REDIRECT,
    );
  }

  const target = chapterPath(chapterId);
  return NextResponse.redirect(new URL(target, request.url), PERMANENT_REDIRECT);
}

export const config = {
  matcher: "/",
};
