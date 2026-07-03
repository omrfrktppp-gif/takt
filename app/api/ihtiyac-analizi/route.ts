import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildEmailBody,
  buildEmailSubject,
  buildWhatsAppSummaryStub,
} from "@/lib/ihtiyac-analizi/report";
import { parseIhtiyacPayload } from "@/lib/ihtiyac-analizi/validation";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const MAX_BODY_BYTES = 100_000;
const MAX_RATE_LIMIT_ENTRIES = 5_000;
const hits = new Map<string, number[]>();
let lastRateLimitPrune = 0;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function pruneRateLimitMap(now: number): void {
  if (now - lastRateLimitPrune < 60_000) return;
  lastRateLimitPrune = now;

  for (const [ip, timestamps] of hits) {
    const fresh = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) hits.delete(ip);
    else hits.set(ip, fresh);
  }

  if (hits.size <= MAX_RATE_LIMIT_ENTRIES) return;

  const overflow = hits.size - MAX_RATE_LIMIT_ENTRIES;
  let removed = 0;
  for (const ip of hits.keys()) {
    hits.delete(ip);
    removed += 1;
    if (removed >= overflow) break;
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateLimitMap(now);

  const timestamps = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: "E-posta servisi yapılandırılmamış." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: "İstek çok büyük." },
      { status: 413 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Çok fazla deneme. Lütfen biraz bekleyin." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "İstek çok büyük." },
        { status: 413 },
      );
    }
    body = raw ? JSON.parse(raw) : null;
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const parsed = parseIhtiyacPayload(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: parsed.error },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM?.trim() ?? "Takt <noreply@takt.tr>";
  const to = process.env.RESEND_TO?.trim() ?? "info@takt.tr";

  const subject = buildEmailSubject(payload);
  const text = buildEmailBody(payload);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.contact.email,
      subject,
      text,
    });

    if (error) {
      console.error("[ihtiyac-analizi] Resend error:", error);
      return NextResponse.json(
        { success: false, message: "E-posta gönderilemedi." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[ihtiyac-analizi] Resend exception:", error);
    return NextResponse.json(
      { success: false, message: "E-posta gönderilemedi." },
      { status: 502 },
    );
  }

  if (process.env.WHATSAPP_CLOUD_API_TOKEN?.trim()) {
    console.info(
      "[ihtiyac-analizi] WhatsApp stub:",
      buildWhatsAppSummaryStub(payload),
    );
  }

  return NextResponse.json({
    success: true,
    redirectUrl:
      payload.ctaChoice === "randevu"
        ? "/gorusme-planla?ref=ihtiyac-analizi"
        : undefined,
  });
}

export async function GET() {
  return NextResponse.json({ service: "ihtiyac-analizi", status: "ok" });
}
