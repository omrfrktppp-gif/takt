import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Form servisi henüz yapılandırılmadı." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !company || !email || !message) {
    return NextResponse.json(
      { error: "Lütfen zorunlu alanları doldurun." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `İletişim talebi — ${company}`,
      from_name: name,
      name,
      email,
      phone,
      message: [
        `Firma: ${company}`,
        phone ? `Telefon: ${phone}` : null,
        "",
        "İhtiyaç / konu:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      replyto: email,
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    return NextResponse.json(
      { error: "Gönderilemedi, lütfen tekrar deneyin." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Talebiniz alındı. En kısa sürede ${siteConfig.email} üzerinden dönüş yapılacak.`,
  });
}
