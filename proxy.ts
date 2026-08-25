import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  chapterPath,
  getChapter,
  getChapterPanel,
  isDetailChapter,
  panelPath,
} from "@/lib/pages";

/** Kalıcı yönlendirme — GSC geçici redirect ve eski ?b= URL hatalarını önler */
const PERMANENT_REDIRECT = 308;

function redirectLegacyChapterLinks(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return null;

  const chapterId = request.nextUrl.searchParams.get("b");
  if (!chapterId) return null;

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

  return NextResponse.redirect(
    new URL(chapterPath(chapterId), request.url),
    PERMANENT_REDIRECT,
  );
}

export function proxy(request: NextRequest) {
  const legacyRedirect = redirectLegacyChapterLinks(request);
  if (legacyRedirect) return legacyRedirect;

  const { pathname } = request.nextUrl;
  const preferredLocale = request.cookies.get("takt_locale")?.value;
  const englishPath = pathname === "/en" || pathname.startsWith("/en/");

  if (englishPath) {
    const isServerRenderedEnglish =
      pathname === "/en/blog" || pathname.startsWith("/en/blog/");
    const response = isServerRenderedEnglish
      ? NextResponse.next()
      : (() => {
          const rewriteUrl = request.nextUrl.clone();
          rewriteUrl.pathname = pathname.slice(3) || "/";
          return NextResponse.rewrite(rewriteUrl);
        })();

    response.cookies.set("takt_locale", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    if (!isServerRenderedEnglish) {
      response.headers.set("X-Robots-Tag", "noindex, follow");
    }
    return response;
  }

  if (preferredLocale === "en") {
    const localizedUrl = request.nextUrl.clone();
    localizedUrl.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(localizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|locales|favicon.ico|icon|apple-icon|.*\\..*).*)",
  ],
};
