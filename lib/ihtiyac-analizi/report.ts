import { getSectorById } from "@/lib/sectors";
import { getServiceById } from "@/lib/ihtiyac-analizi/branches";
import { COMPANY_SIZE_OPTIONS, FORM_SCREENS } from "@/lib/ihtiyac-analizi/definition";
import { resolvePrimaryService, resolveScreenPath } from "@/lib/ihtiyac-analizi/flow-engine";
import { urgencyLabel } from "@/lib/ihtiyac-analizi/validation";
import type { FormSubmissionPayload } from "@/lib/ihtiyac-analizi/types";

function labelFor(questionId: string, value: string): string {
  for (const screen of Object.values(FORM_SCREENS)) {
    const question = screen.questions.find((item) => item.id === questionId);
    const option = question?.options?.find((item) => item.value === value);
    if (option) return option.label;
  }
  return value;
}

function formatValues(questionId: string, value: string | string[] | undefined): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return "—";
  if (Array.isArray(value)) {
    return value.map((item) => labelFor(questionId, item)).join(", ");
  }
  return labelFor(questionId, value);
}

const COMPANY_SIZE_LABELS = Object.fromEntries(
  COMPANY_SIZE_OPTIONS.map((option) => [option.value, option.label]),
);

export function buildEmailSubject(payload: FormSubmissionPayload): string {
  const service = getServiceById(payload.primaryService);
  const company = payload.contact.company || payload.contact.name;
  const urgency = urgencyLabel(payload.answers["s2-urgency"] as string | undefined);
  return `[İhtiyaç Analizi] ${company} — ${service?.shortLabel ?? payload.primaryService} (${urgency})`;
}

export function buildEmailBody(payload: FormSubmissionPayload): string {
  const service = getServiceById(payload.primaryService);
  const path = resolveScreenPath(payload.answers).filter(
    (id) => !id.startsWith("s4") && id !== "s5-summary",
  );

  const dalLines: string[] = [];
  for (const screenId of path) {
    if (screenId === "s1-main" || screenId.startsWith("s2") || screenId.startsWith("s3")) continue;
    const screen = FORM_SCREENS[screenId];
    if (!screen) continue;
    for (const question of screen.questions) {
      const value = payload.answers[question.id];
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      if (typeof value === "string" && question.type === "text") {
        dalLines.push(`${question.label}: ${value}`);
      } else {
        dalLines.push(`${question.label}: ${formatValues(question.id, value)}`);
      }
    }
  }

  const secondary =
    payload.secondaryServices.length > 0
      ? payload.secondaryServices
          .map((id) => getServiceById(id)?.shortLabel ?? id)
          .join(", ")
      : "—";

  const sector =
    payload.contact.sector === "diger"
      ? "Diğer"
      : getSectorById(payload.contact.sector)?.title ?? payload.contact.sector;

  const ctaLabel =
    payload.ctaChoice === "randevu"
      ? "Randevu oluşturdu ✓"
      : "İletişim bekliyor";

  const companySize =
    COMPANY_SIZE_LABELS[payload.contact.companySize] ?? payload.contact.companySize;

  return [
    `ANA İHTİYAÇ : ${service?.label ?? payload.primaryService}`,
    `DAL CEVAPLARI:`,
    ...dalLines.map((line) => `  ${line}`),
    `ZAMAN/BÜTÇE : ${formatValues("s2-urgency", payload.answers["s2-urgency"] as string)} · ${formatValues("s2-budget", payload.answers["s2-budget"] as string)}`,
    `DOKÜMANLAR  : ${formatValues("s3-docs", payload.answers["s3-docs"] as string[])} | Gizlilik: ${formatValues("s3-privacy", payload.answers["s3-privacy"] as string)}`,
    `İKİNCİL     : ${secondary}`,
    `İLETİŞİM    : ${payload.contact.name} · ${payload.contact.company || "—"} · ${payload.contact.email} · ${payload.contact.phone} · ${payload.contact.city || "—"} · ${companySize || "—"} · ${sector || "—"}`,
    `CTA         : ${ctaLabel}`,
    "",
    `ÖZET: ${payload.summaryText}`,
  ].join("\n");
}

export function buildWhatsAppSummaryStub(payload: FormSubmissionPayload): string {
  const company = payload.contact.company || payload.contact.name;
  const service = getServiceById(payload.primaryService)?.shortLabel ?? "";
  const urgency = urgencyLabel(payload.answers["s2-urgency"] as string | undefined);
  const nda = payload.answers["s3-privacy"] === "nda" ? "NDA'lı" : "";
  const cta =
    payload.ctaChoice === "randevu" ? "Randevu oluşturdu." : "İletişim bekliyor.";
  return `Yeni ihtiyaç analizi: ${company} — ${service}, ${nda} ${urgency}. ${cta} Detay e-postada.`.replace(
    /\s+/g,
    " ",
  );
}
