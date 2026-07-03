import { S1_OPTIONS, SERVICE_BRANCHES } from "@/lib/ihtiyac-analizi/branches";
import { COMPANY_SIZE_OPTIONS, FORM_SCREENS } from "@/lib/ihtiyac-analizi/definition";
import {
  isScreenValid,
  resolvePrimaryService,
  resolveScreenPath,
} from "@/lib/ihtiyac-analizi/flow-engine";
import { getAllSectorIds } from "@/lib/sectors";
import type {
  Answers,
  CtaChoice,
  FormQuestion,
  FormSubmissionPayload,
  ServiceBranchId,
} from "@/lib/ihtiyac-analizi/types";

const VALID_SERVICE_IDS = new Set(SERVICE_BRANCHES.map((branch) => branch.id));
const VALID_S1_VALUES = new Set<string>(S1_OPTIONS.map((option) => option.value));
const VALID_COMPANY_SIZES = new Set(COMPANY_SIZE_OPTIONS.map((option) => option.value));
const VALID_SECTOR_IDS = new Set([...getAllSectorIds(), "diger"]);

const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  city: 80,
  text: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+().-]{7,40}$/;

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function questionById(questionId: string): FormQuestion | undefined {
  for (const screen of Object.values(FORM_SCREENS)) {
    const question = screen.questions.find((item) => item.id === questionId);
    if (question) return question;
  }
  return undefined;
}

function allowedQuestionIds(path: string[]): Set<string> {
  const ids = new Set<string>();
  for (const screenId of path) {
    const screen = FORM_SCREENS[screenId];
    if (!screen) continue;
    for (const question of screen.questions) {
      ids.add(question.id);
    }
  }
  return ids;
}

function validateAnswerValue(
  question: FormQuestion,
  value: string | string[],
  answers: Answers,
): boolean {
  if (question.id === "s5-secondary") {
    if (!Array.isArray(value)) return false;
    const primary = resolvePrimaryService(answers);
    return value.every(
      (item) =>
        typeof item === "string" &&
        VALID_SERVICE_IDS.has(item as ServiceBranchId) &&
        item !== primary,
    );
  }

  if (question.type === "text") {
    if (typeof value !== "string") return false;
    return value.length <= LIMITS.text;
  }

  if (question.type === "single") {
    if (typeof value !== "string") return false;
    return question.options?.some((option) => option.value === value) ?? false;
  }

  if (!Array.isArray(value) || value.length === 0) return false;
  const allowed = new Set(question.options?.map((option) => option.value) ?? []);
  return value.every((item) => typeof item === "string" && allowed.has(item));
}

function sanitizeAnswers(raw: Record<string, string | string[]>, path: string[]): Answers {
  const allowed = allowedQuestionIds(path);
  const sanitized: Answers = {};

  for (const [key, value] of Object.entries(raw)) {
    if (!allowed.has(key)) continue;

    if (typeof value === "string") {
      sanitized[key] = trimField(value, LIMITS.text);
    } else if (Array.isArray(value)) {
      sanitized[key] = value
        .filter((item): item is string => typeof item === "string")
        .map((item) => trimField(item, 120))
        .slice(0, 12);
    }
  }

  return sanitized;
}

export function getContactValidationError(answers: Answers): string | null {
  const email = trimField(answers["s4-email"], LIMITS.email);
  const phone = trimField(answers["s4-phone"], LIMITS.phone);

  if (email && !EMAIL_RE.test(email)) {
    return "Geçerli bir e-posta girin.";
  }
  if (phone && !PHONE_RE.test(phone)) {
    return "Geçerli bir telefon girin.";
  }
  return null;
}

export function validateSubmissionAnswers(answers: Answers): string | null {
  const s1 = answers["s1-main"];
  if (typeof s1 !== "string" || !VALID_S1_VALUES.has(s1)) {
    return "Ana ihtiyaç geçersiz.";
  }

  const path = resolveScreenPath(answers);
  for (const screenId of path) {
    if (screenId === "s5-summary") continue;
    if (!isScreenValid(screenId, answers)) {
      return "Form cevapları eksik.";
    }
  }

  for (const [questionId, value] of Object.entries(answers)) {
    const question = questionById(questionId);
    if (!question) continue;
    if (value === "" || (Array.isArray(value) && value.length === 0)) continue;
    if (!validateAnswerValue(question, value, answers)) {
      return "Form cevapları geçersiz.";
    }
  }

  const companySize = answers["s4-size"];
  if (
    typeof companySize === "string" &&
    companySize &&
    !VALID_COMPANY_SIZES.has(companySize)
  ) {
    return "Firma ölçeği geçersiz.";
  }

  const sector = answers["s4-sector"];
  if (typeof sector === "string" && sector && !VALID_SECTOR_IDS.has(sector)) {
    return "Sektör geçersiz.";
  }

  return null;
}

export function urgencyLabel(urgency: string | undefined): string {
  switch (urgency) {
    case "hemen":
      return "Acil";
    case "1-3-ay":
      return "1–3 ay";
    case "esnek":
      return "Esnek";
    default:
      return "Belirtilmedi";
  }
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

  const rawAnswers =
    record.answers && typeof record.answers === "object"
      ? (record.answers as Record<string, string | string[]>)
      : null;
  if (!rawAnswers || Object.keys(rawAnswers).length === 0) {
    return { ok: false, error: "Form cevapları eksik." };
  }

  const s1 = rawAnswers["s1-main"];
  if (typeof s1 !== "string" || !VALID_S1_VALUES.has(s1)) {
    return { ok: false, error: "Ana ihtiyaç geçersiz." };
  }

  const path = resolveScreenPath(rawAnswers);
  const answers = sanitizeAnswers(rawAnswers, path);
  if (Object.keys(answers).length === 0) {
    return { ok: false, error: "Form cevapları eksik." };
  }

  const answersError = validateSubmissionAnswers(answers);
  if (answersError) {
    return { ok: false, error: answersError };
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

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }

  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: "Geçerli bir telefon girin." };
  }

  if (companySize && !VALID_COMPANY_SIZES.has(companySize)) {
    return { ok: false, error: "Firma ölçeği geçersiz." };
  }

  if (sector && !VALID_SECTOR_IDS.has(sector)) {
    return { ok: false, error: "Sektör geçersiz." };
  }

  const secondaryRaw = record.secondaryServices;
  const secondaryServices = Array.isArray(secondaryRaw)
    ? secondaryRaw
        .filter((item): item is ServiceBranchId => typeof item === "string")
        .filter((item) => VALID_SERVICE_IDS.has(item))
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
