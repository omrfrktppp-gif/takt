import { NextResponse } from "next/server";
import { parseContactPayload } from "@/lib/contact-validation";
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_SUBMIT_URL,
} from "@/lib/web3forms";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: parsed.error },
      { status: 400 },
    );
  }

  const { name, company, email, phone, message, source } = parsed.data;
  const subject =
    source === "contact_form"
      ? "İletişim talebi — takt.tr"
      : `Form talebi — ${source}`;

  try {
    const upstream = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "takt.tr",
        name,
        company,
        email,
        phone,
        message,
        kaynak: source,
      }),
      cache: "no-store",
    });

    const upstreamResult = (await upstream.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!upstream.ok || !upstreamResult.success) {
      console.error("Contact form upstream error", {
        status: upstream.status,
        source,
      });
      return NextResponse.json(
        {
          success: false,
          message:
            "Talebiniz şu anda gönderilemedi. Lütfen WhatsApp veya e-posta kanalını kullanın.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Talebiniz alındı. Görüşme için verdiğiniz iletişim bilgilerini kullanacağız.",
    });
  } catch (error) {
    console.error("Contact form delivery failed", {
      source,
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "Bağlantı kurulamadı. Lütfen WhatsApp veya e-posta kanalını kullanın.",
      },
      { status: 502 },
    );
  }
}
