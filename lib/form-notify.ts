import { siteConfig } from "@/lib/site";

/** Web3Forms ile yükleme bildirimi (PDF ekli). */
export async function notifyBaslangicFormUpload({
  filename,
  buffer,
  name,
  email,
  company,
  driveLink,
}: {
  filename: string;
  buffer: Buffer;
  name?: string;
  email?: string;
  company?: string;
  driveLink?: string;
}): Promise<{ ok: boolean; message?: string }> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { ok: false, message: "E-posta bildirimi yapılandırılmamış." };
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append(
    "subject",
    `Başlangıç ihtiyaç formu yüklendi — ${name?.trim() || "İsimsiz"}`.slice(
      0,
      200,
    ),
  );
  formData.append("from_name", name?.trim() || "takt.tr ziyaretçisi");
  if (email?.trim()) {
    formData.append("email", email.trim());
    formData.append("replyto", email.trim());
  }
  formData.append(
    "message",
    [
      "Kaynak: baslangic_ihtiyac_formu_upload",
      name?.trim() ? `Ad Soyad: ${name.trim()}` : null,
      company?.trim() ? `Firma: ${company.trim()}` : null,
      email?.trim() ? `E-posta: ${email.trim()}` : null,
      `Dosya: ${filename}`,
      driveLink ? `Google Drive: ${driveLink}` : null,
      "",
      "Ekte doldurulmuş PDF bulunmaktadır.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
  formData.append("attachment", blob, filename);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };
    if (!response.ok || !result.success) {
      return {
        ok: false,
        message: result.message ?? "Bildirim gönderilemedi.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: `Bildirim gönderilemedi. ${siteConfig.email} adresini kontrol edin.`,
    };
  }
}
