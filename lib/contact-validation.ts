const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  message: 4000,
} as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  botcheck: string;
  kvkkAccepted: boolean;
};

export function parseContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Geçersiz istek." };
  }

  const record = body as Record<string, unknown>;
  const name = trimField(record.name, LIMITS.name);
  const company = trimField(record.company, LIMITS.company);
  const email = trimField(record.email, LIMITS.email);
  const phone = trimField(record.phone ?? "", LIMITS.phone);
  const message = trimField(record.message, LIMITS.message);
  const botcheck = typeof record.botcheck === "string" ? record.botcheck : "";
  const kvkkAccepted = record.kvkkAccepted === true;

  if (botcheck) {
    return { ok: false, error: "Spam algılandı." };
  }

  if (!name || !company || !email || !message) {
    return { ok: false, error: "Zorunlu alanları doldurun." };
  }

  if (!kvkkAccepted) {
    return { ok: false, error: "KVKK onayı gerekli." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }

  if (phone && !/^[\d\s+().-]{7,40}$/.test(phone)) {
    return { ok: false, error: "Geçerli bir telefon girin." };
  }

  return {
    ok: true,
    data: { name, company, email, phone, message, botcheck, kvkkAccepted },
  };
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export { LIMITS as contactFieldLimits };
