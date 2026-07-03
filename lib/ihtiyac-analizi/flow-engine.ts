import {
  getServiceById,
  getServiceByS1Value,
  SERVICE_BRANCHES,
} from "@/lib/ihtiyac-analizi/branches";
import {
  COMMON_TAIL_SCREEN_IDS,
  FIRST_SCREEN_ID,
  FORM_SCREENS,
} from "@/lib/ihtiyac-analizi/definition";
import type { Answers, FormQuestion, FormScreen, ServiceBranchId } from "@/lib/ihtiyac-analizi/types";

function branchScreensForA(answers: Answers): string[] {
  const sub = answers["a1-sub"];
  const screens: string[] = ["a1-sub"];
  if (!sub) return screens;
  if (sub === "sifirdan") screens.push("a2a-design");
  else if (sub === "iyilestirme") screens.push("a2b-goals");
  else if (sub === "tersine") screens.push("a2c-part");
  screens.push("a3-req");
  return screens;
}

function branchScreensForF(answers: Answers): string[] {
  const type = answers["f1-type"];
  const screens: string[] = ["f1-type"];
  if (!type) return screens;
  if (type === "disiplin") screens.push("f1-disiplin");
  else if (type === "surec") screens.push("f1-surec");
  else if (type === "ise-alim") screens.push("f1-ise-alim");
  else if (type === "mentorluk") screens.push("f1-mentorluk");
  screens.push("f2-model");
  return screens;
}

function resolveHBranchScreens(answers: Answers): {
  screens: string[];
  serviceId: ServiceBranchId;
} {
  const triage = answers["h1-triage"];
  if (!triage) {
    return { screens: ["h1-triage"], serviceId: "proje-danismanligi" };
  }

  if (triage === "destek") {
    return { screens: ["h1-triage", "e1-topic", "e2-status"], serviceId: "tubitak-kosgeb" };
  }

  if (triage === "fikir") {
    const screens = ["h1-triage", "h1-fikir-type"];
    const fikirType = answers["h1-fikir-type"];
    if (!fikirType) {
      return { screens, serviceId: "tasarim-gelistirme" };
    }
    if (fikirType === "arge") {
      return { screens: [...screens, "d1-need", "d2-status"], serviceId: "arge-urge" };
    }
    return { screens: [...screens, "a2a-design", "a3-req"], serviceId: "tasarim-gelistirme" };
  }

  if (triage === "sorun") {
    const screens = ["h1-triage", "h1-problem-area"];
    const area = answers["h1-problem-area"];
    if (!area) {
      return { screens, serviceId: "analiz-hesaplama" };
    }
    if (area === "uretim") {
      return {
        screens: [...screens, "c1-method", "c2-quantity", "c3-supplier"],
        serviceId: "uretim-danismanligi",
      };
    }
    return {
      screens: [...screens, "b1-type", "b2-purpose", "b3-output"],
      serviceId: "analiz-hesaplama",
    };
  }

  if (triage === "proje") {
    const screens = ["h1-triage", "h1-blocker"];
    const blocker = answers["h1-blocker"];
    if (!blocker) {
      return { screens, serviceId: "proje-danismanligi" };
    }
    if (blocker === "ekip") {
      return {
        screens: [...screens, "f1-disiplin", "f2-model"],
        serviceId: "teknik-ekip",
      };
    }
    return { screens: [...screens, "g1-type", "g2-status"], serviceId: "proje-danismanligi" };
  }

  return { screens: ["h1-triage"], serviceId: "proje-danismanligi" };
}

function branchScreensForS1(s1: string, answers: Answers): string[] {
  switch (s1) {
    case "A":
      return branchScreensForA(answers);
    case "B":
      return ["b1-type", "b2-purpose", "b3-output"];
    case "C":
      return ["c1-method", "c2-quantity", "c3-supplier"];
    case "D":
      return ["d1-need", "d2-status"];
    case "E":
      return ["e1-topic", "e2-status"];
    case "F":
      return branchScreensForF(answers);
    case "G":
      return ["g1-type", "g2-status"];
    case "H":
      return resolveHBranchScreens(answers).screens;
    default:
      return [];
  }
}

export function resolvePrimaryService(answers: Answers): ServiceBranchId | null {
  const s1 = answers["s1-main"];
  if (typeof s1 !== "string") return null;
  if (s1 === "H") return resolveHBranchScreens(answers).serviceId;
  return getServiceByS1Value(s1)?.id ?? null;
}

export function resolveScreenPath(answers: Answers): string[] {
  const s1 = answers["s1-main"];
  if (typeof s1 !== "string") return [FIRST_SCREEN_ID];

  const path: string[] = [FIRST_SCREEN_ID, ...branchScreensForS1(s1, answers)];
  path.push(...COMMON_TAIL_SCREEN_IDS);
  return path;
}

export function getScreenById(id: string): FormScreen | undefined {
  return FORM_SCREENS[id];
}

export function getNextScreenId(
  currentId: string,
  answers: Answers,
): string | null {
  const path = resolveScreenPath(answers);
  const index = path.indexOf(currentId);
  if (index === -1 || index >= path.length - 1) return null;
  return path[index + 1] ?? null;
}

export function getPreviousScreenId(
  currentId: string,
  answers: Answers,
): string | null {
  const path = resolveScreenPath(answers);
  const index = path.indexOf(currentId);
  if (index <= 0) return null;
  return path[index - 1] ?? null;
}

/** Kayıtlı oturumda eksik stack'i path'ten yeniden kurar. */
export function rebuildScreenHistory(answers: Answers, screenId: string): string[] {
  const path = resolveScreenPath(answers);
  const index = path.indexOf(screenId);
  if (index <= 0) return [FIRST_SCREEN_ID];
  return path.slice(0, index + 1);
}

export function getProgressPercent(
  currentId: string,
  answers: Answers,
  submitted = false,
): number {
  if (submitted) return 100;
  if (currentId === "s5-summary") return 95;

  const path = resolveScreenPath(answers);
  const index = path.indexOf(currentId);
  if (index === -1) return 8;

  // Ana ihtiyaç seçilmeden yalnızca S1 — dokümana göre ~%8
  if (path.length <= 1) return 8;

  const lastIndex = path.length - 1;
  const ratio = index / lastIndex;
  return Math.min(94, Math.round(8 + ratio * 86));
}

export function shouldAutoAdvanceScreen(
  screen: FormScreen,
  answers: Answers,
): boolean {
  if (screen.id === "s5-summary") return false;
  if (screen.questions.some((q) => q.type === "text" || q.type === "multi")) {
    return false;
  }
  if (!screen.questions.every((q) => q.type === "single")) return false;
  return isScreenValid(screen.id, answers);
}

function labelForAnswer(screenId: string, questionId: string, value: string): string {
  const screen = FORM_SCREENS[screenId];
  const question = screen?.questions.find((item) => item.id === questionId);
  const option = question?.options?.find((item) => item.value === value);
  return option?.label ?? value;
}

function formatAnswerValue(screenId: string, questionId: string, value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.map((item) => labelForAnswer(screenId, questionId, item)).join(", ");
  }
  if (
    questionId.startsWith("s4-") ||
    questionId.endsWith("-note") ||
    questionId.includes("malzeme") ||
    questionId.includes("tolerans") ||
    questionId.includes("program") ||
    questionId.includes("tarih") ||
    questionId === "f1-ise-alim"
  ) {
    return value;
  }
  return labelForAnswer(screenId, questionId, value);
}

export function buildSummaryText(answers: Answers): string {
  const service = resolvePrimaryService(answers);
  const serviceInfo = service ? getServiceById(service) : null;
  const path = resolveScreenPath(answers).filter((id) => id !== "s5-summary");

  const branchLines: string[] = [];
  for (const screenId of path) {
    if (screenId.startsWith("s")) continue;
    const screen = FORM_SCREENS[screenId];
    if (!screen) continue;
    for (const question of screen.questions) {
      const value = answers[question.id];
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      branchLines.push(
        `${question.label}: ${formatAnswerValue(screenId, question.id, value)}`,
      );
    }
  }

  const durationNote = serviceInfo?.typicalDuration
    ? ` (tipik süre ${serviceInfo.typicalDuration}, ilk görüşme ücretsiz)`
    : " (ilk görüşme ücretsiz)";

  const headline = serviceInfo
    ? `İhtiyacınız: ${serviceInfo.label}${durationNote}.`
    : "İhtiyacınız değerlendiriliyor.";

  return [headline, ...branchLines.slice(0, 4)].join(" ");
}

export function getSecondaryServiceOptions(primary: ServiceBranchId) {
  return SERVICE_BRANCHES.filter((branch) => branch.id !== primary).map((branch) => ({
    value: branch.id,
    label: branch.shortLabel,
  }));
}

export function isQuestionRequired(
  question: FormQuestion,
  screenId: string,
): boolean {
  if (screenId === "s5-summary") return false;
  if (question.optional === true) return false;
  if (question.required === false) return false;
  return true;
}

export function isScreenValid(screenId: string, answers: Answers): boolean {
  const screen = FORM_SCREENS[screenId];
  if (!screen) return false;

  for (const question of screen.questions) {
    if (!isQuestionRequired(question, screenId)) continue;
    const value = answers[question.id];
    if (question.type === "multi") {
      if (!Array.isArray(value) || value.length === 0) return false;
    } else if (!value || (typeof value === "string" && !value.trim())) {
      return false;
    }
  }
  return true;
}
