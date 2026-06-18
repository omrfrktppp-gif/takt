import { NextResponse } from "next/server";
import { indexingConfig } from "@/lib/indexing";
import { submitToIndexNow } from "@/lib/indexnow";

/**
 * POST /api/indexnow — Bing/IndexNow'a URL bildirimi (deploy sonrası veya içerik güncellemesi).
 * Authorization: Bearer {INDEXNOW_API_SECRET}
 * Body (opsiyonel): { "urls": ["https://takt.tr/blog/yeni-yazi"] }
 */
export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_API_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "INDEXNOW_API_SECRET tanımlı değil." },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let urls: string[] | undefined;
  try {
    const body = (await request.json()) as { urls?: string[] };
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urls = body.urls;
    }
  } catch {
    /* boş gövde → tüm sitemap */
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json({
    ok: result.ok,
    sitemap: indexingConfig.sitemapUrl,
    keyLocation: indexingConfig.indexNow.keyFileUrl,
    submitted: urls?.length ?? "all-sitemap-urls",
    results: result.results,
  });
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    sitemap: indexingConfig.sitemapUrl,
    keyLocation: indexingConfig.indexNow.keyFileUrl,
    docs: "/docs/10-arama-motoru-indeksleme.md",
    note: "POST ile bildirim için INDEXNOW_API_SECRET gerekir.",
  });
}
