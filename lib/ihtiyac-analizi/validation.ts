import { resolvePrimaryService } from "@/lib/ihtiyac-analizi/flow-engine";
import type {
  CtaChoice,
  FormSubmissionPayload,
  ServiceBranchId,
} from "@/lib/ihtiyac-analizi/types";

const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  city: 80,
  text: 2000,
} as const;

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseIhtiyacPayload(body: unknown):
  | { ok: true; data: FormSubmissionPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Geçersiz istek." };
  }

  const record = body as Record<string, unknown>;

  if (typeof record.botcheck === "string" && record.botcheck.trim()) {
    return { ok: false, error: "Spam algılandı." };
  }

  if (record.kvkkAccepted !== true) {
    return { ok: false, error: "KVKK onayı gerekli." };
  }

  const answers =
    record.answers && typeof record.answers === "object"
      ? (record.answers as Record<string, string | string[]>)
      : null;
  if (!answers) {
    return { ok: false, error: "Form cevapları eksik." };
  }

  const primaryFromAnswers = resolvePrimaryService(answers);
  const primaryService = (record.primaryService as ServiceBranchId) ?? primaryFromAnswers;
  if (!primaryService || primaryService !== primaryFromAnswers) {
    return { ok: false, error: "Ana hizmet doğrulanamadı." };
  }

  const ctaChoice = record.ctaChoice;
  if (ctaChoice !== "randevu" && ctaChoice !== "iletisim") {
    return { ok: false, error: "Geçersiz CTA seçimi." };
  }

  const contactRecord =
    record.contact && typeof record.contact === "object"
      ? (record.contact as Record<string, unknown>)
      : null;
  if (!contactRecord) {
    return { ok: false, error: "İletişim bilgileri eksik." };
  }

  const name = trimField(contactRecord.name ?? answers["s4-name"], LIMITS.name);
  const company = trimField(contactRecord.company ?? answers["s4-company"], LIMITS.company);
  const email = trimField(contactRecord.email ?? answers["s4-email"], LIMITS.email);
  const phone = trimField(contactRecord.phone ?? answers["s4-phone"], LIMITS.phone);
  const city = trimField(contactRecord.city ?? answers["s4-city"], LIMITS.city);
  const companySize = trimField(contactRecord.companySize ?? answers["s4-size"], 40);
  const sector = trimField(contactRecord.sector ?? answers["s4-sector"], 80);

  if (!name || !email || !phone) {
    return { ok: false, error: "Ad, e-posta ve telefon zorunludur." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }

  if (!/^[\d\s+().-]{7,40}$/.test(phone)) {
    return { ok: false, error: "Geçerli bir telefon girin." };
  }

  const secondaryRaw = record.secondaryServices;
  const secondaryServices = Array.isArray(secondaryRaw)
    ? secondaryRaw
        .filter((item): item is ServiceBranchId => typeof item === "string")
        .filter((item) => item !== primaryService)
        .slice(0, 6)
    : [];

  const summaryText = trimField(record.summaryText, 4000);
  if (!summaryText) {
    return { ok: false, error: "Özet metni eksik." };
  }

  return {
    ok: true,
    data: {
      answers,
      primaryService,
      secondaryServices,
      ctaChoice: ctaChoice as CtaChoice,
      contact: {
        name,
        company,
        email,
        phone,
        city,
        companySize,
        sector,
      },
      kvkkAccepted: true,
      botcheck: "",
      summaryText,
    },
  };
}
