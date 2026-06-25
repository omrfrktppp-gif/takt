import { NextResponse } from "next/server";
import { safeCompareSecret } from "@/lib/api-secrets";
import { indexingConfig } from "@/lib/indexing";
import { filterIndexNowUrls, submitToIndexNow } from "@/lib/indexnow";

const MAX_URLS = 100;

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

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!safeCompareSecret(token, secret)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let urls: string[] | undefined;
  try {
    const body = (await request.json()) as { urls?: string[] };
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      if (body.urls.length > MAX_URLS) {
        return NextResponse.json(
          { error: `En fazla ${MAX_URLS} URL gönderilebilir.` },
          { status: 400 },
        );
      }
      const filtered = filterIndexNowUrls(body.urls);
      if (filtered.length === 0) {
        return NextResponse.json(
          { error: "Yalnızca takt.tr URL'leri kabul edilir." },
          { status: 400 },
        );
      }
      urls = filtered;
    }
  } catch {
    /* boş gövde → tüm sitemap */
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json({
    ok: result.ok,
    sitemap: indexingConfig.sitemapUrl,
    submitted: urls?.length ?? "all-sitemap-urls",
    results: result.results,
  });
}

export async function GET() {
  return NextResponse.json({ service: "IndexNow", status: "ok" });
}
