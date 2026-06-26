import { NextResponse } from "next/server";
import { parseContactPayload } from "@/lib/contact-validation";
import {
  parseWeb3FormsResponse,
} from "@/lib/web3forms";
import { siteConfig } from "@/lib/site";

/**
 * @deprecated İletişim formu artık tarayıcıdan doğrudan Web3Forms'a gider.
 * Ücretsiz planda sunucu IP'si engellenir. Bu route geriye dönük uyumluluk içindir.
 */
export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Sunucu proxy devre dışı. NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ile istemci tarafı kullanın.",
      },
      { status: 503 },
    );
  }

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
  const subjectPrefix =
    source === "lead_magnet"
      ? "Lead magnet talebi"
      : source === "contact_form"
        ? "İletişim talebi"
        : `Form talebi (${source})`;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `${subjectPrefix} — ${company}`.slice(0, 200),
        from_name: name,
        name,
        email,
        phone,
        replyto: email,
        message: [
          `Kaynak: ${source}`,
          `Firma: ${company}`,
          phone ? `Telefon: ${phone}` : null,
          "",
          "İhtiyaç / konu:",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    const result = await parseWeb3FormsResponse(response);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ??
            "Web3Forms reddetti. Ücretsiz planda sunucudan gönderim kapalı olabilir — formu güncel sürümle deneyin.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: `Gönderilemedi. Doğrudan ${siteConfig.email} adresine yazabilirsiniz.`,
      },
      { status: 502 },
    );
  }
}
