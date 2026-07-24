"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { FormProgress } from "@/components/ihtiyac-analizi/FormProgress";
import { QuestionRenderer } from "@/components/ihtiyac-analizi/QuestionRenderer";
import { SummaryCard } from "@/components/ihtiyac-analizi/SummaryCard";
import { trackEvent } from "@/lib/analytics";
import { FIRST_SCREEN_ID } from "@/lib/ihtiyac-analizi/definition";
import {
  buildSummaryText,
  getNextScreenId,
  getProgressPercent,
  getScreenById,
  getSecondaryServiceOptions,
  isScreenValid,
  rebuildScreenHistory,
  resolvePrimaryService,
  resolveScreenPath,
  shouldAutoAdvanceScreen,
} from "@/lib/ihtiyac-analizi/flow-engine";
import {
  clearFormState,
  loadFormState,
  saveFormState,
} from "@/lib/ihtiyac-analizi/storage";
import { getContactValidationError } from "@/lib/ihtiyac-analizi/validation";
import type { Answers, CtaChoice, ServiceBranchId } from "@/lib/ihtiyac-analizi/types";

function screenNeedsManualAdvance(screenId: string): boolean {
  const screen = getScreenById(screenId);
  if (!screen) return true;
  return screen.questions.some((q) => q.type === "text" || q.type === "multi");
}

export function IhtiyacAnaliziWizard() {
  const [answers, setAnswers] = useState<Answers>({});
  const [screenHistory, setScreenHistory] = useState<string[]>([FIRST_SCREEN_ID]);
  const [currentScreenId, setCurrentScreenId] = useState(FIRST_SCREEN_ID);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [botcheck, setBotcheck] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const submittedRef = useRef(false);
  const abandonTrackedRef = useRef(false);

  useEffect(() => {
    const saved = loadFormState();
    if (saved?.answers && Object.keys(saved.answers).length > 0) {
      const lastScreen = saved.screenHistory.at(-1) ?? FIRST_SCREEN_ID;
      const path = resolveScreenPath(saved.answers);
      const restoredScreen = path.includes(lastScreen) ? lastScreen : FIRST_SCREEN_ID;
      const restoredHistory = rebuildScreenHistory(saved.answers, restoredScreen);

      let cancelled = false;
      queueMicrotask(() => {
        if (cancelled) return;
        setAnswers(saved.answers);
        setScreenHistory(restoredHistory);
        setCurrentScreenId(restoredScreen);
        setStarted(true);
      });
      return () => {
        cancelled = true;
      };
    }
  }, []);

  useEffect(() => {
    const primary = resolvePrimaryService(answers);
    saveFormState({
      answers,
      screenHistory,
      primaryService: primary,
    });
  }, [answers, screenHistory]);

  useEffect(() => {
    if (!started) return;

    const onLeave = () => {
      if (submittedRef.current || abandonTrackedRef.current || submitting) return;
      if (!answers["s1-main"]) return;
      abandonTrackedRef.current = true;
      trackEvent("ihtiyac_analizi_abandon", {
        screen: currentScreenId,
        progress: getProgressPercent(currentScreenId, answers),
      });
    };

    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [answers, currentScreenId, started, submitting]);

  const screen = getScreenById(currentScreenId);
  const primaryService = resolvePrimaryService(answers);
  const progress = getProgressPercent(currentScreenId, answers);
  const summaryText = useMemo(() => buildSummaryText(answers), [answers]);
  const manualAdvance = screenNeedsManualAdvance(currentScreenId);

  const secondaryOptions = useMemo(
    () => (primaryService ? getSecondaryServiceOptions(primaryService) : []),
    [primaryService],
  );

  const goNext = useCallback(
    (answersOverride?: Answers) => {
      const currentAnswers = answersOverride ?? answers;

      if (!isScreenValid(currentScreenId, currentAnswers)) {
        setError("Lütfen zorunlu alanları doldurun.");
        return;
      }

      if (currentScreenId === "s4-contact") {
        const contactError = getContactValidationError(currentAnswers);
        if (contactError) {
          setError(contactError);
          return;
        }
      }

      const next = getNextScreenId(currentScreenId, currentAnswers);
      if (!next) return;

      trackEvent("ihtiyac_analizi_screen", { screen: next });
      setScreenHistory((prev) => [...prev, next]);
      setCurrentScreenId(next);
      setError(null);
    },
    [answers, currentScreenId],
  );

  const goToContact = useCallback(() => {
    const path = resolveScreenPath(answers);
    const contactIndex = path.indexOf("s4-contact");
    if (contactIndex === -1) return;
    const history = path.slice(0, contactIndex + 1);
    setScreenHistory(history);
    setCurrentScreenId("s4-contact");
    setError(null);
  }, [answers]);

  const goBack = useCallback(() => {
    if (currentScreenId === "s5-summary") {
      goToContact();
      return;
    }

    setScreenHistory((prev) => {
      if (prev.length <= 1) return prev;
      const nextHistory = prev.slice(0, -1);
      const previousScreen = nextHistory[nextHistory.length - 1] ?? FIRST_SCREEN_ID;
      setCurrentScreenId(previousScreen);
      setError(null);

      return nextHistory;
    });
  }, [currentScreenId, goToContact]);

  const handleChange = useCallback(
    (questionId: string, value: string | string[]) => {
      if (questionId === "s1-main" && !started) {
        setStarted(true);
        trackEvent("ihtiyac_analizi_start");
      }
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: value };
        const currentScreen = getScreenById(currentScreenId);
        if (currentScreen && shouldAutoAdvanceScreen(currentScreen, next)) {
          queueMicrotask(() => goNext(next));
        }
        return next;
      });
      setError(null);
    },
    [currentScreenId, goNext, started],
  );

  const submit = useCallback(
    async (ctaChoice: CtaChoice) => {
      if (!primaryService) {
        setError("Ana ihtiyaç seçilemedi.");
        return;
      }
      if (!kvkkAccepted) {
        setError("KVKK onayı gerekli.");
        return;
      }
      if (!isScreenValid("s4-contact", answers)) {
        setError("İletişim bilgilerini eksiksiz doldurun.");
        return;
      }
      const contactError = getContactValidationError(answers);
      if (contactError) {
        setError(contactError);
        return;
      }

      setSubmitting(true);
      setError(null);

      const secondaryRaw = answers["s5-secondary"];
      const secondaryServices = Array.isArray(secondaryRaw)
        ? (secondaryRaw as ServiceBranchId[])
        : [];

      const payload = {
        answers,
        primaryService,
        secondaryServices,
        ctaChoice,
        contact: {
          name: String(answers["s4-name"] ?? ""),
          company: String(answers["s4-company"] ?? ""),
          email: String(answers["s4-email"] ?? ""),
          phone: String(answers["s4-phone"] ?? ""),
          city: String(answers["s4-city"] ?? ""),
          companySize: String(answers["s4-size"] ?? ""),
          sector: String(answers["s4-sector"] ?? ""),
        },
        kvkkAccepted: true,
        botcheck,
        summaryText,
      };

      try {
        const response = await fetch("/api/ihtiyac-analizi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = (await response.json()) as {
          success?: boolean;
          message?: string;
          redirectUrl?: string;
        };

        if (!response.ok || !result.success) {
          setError(result.message ?? "Gönderilemedi. Lütfen tekrar deneyin.");
          setSubmitting(false);
          return;
        }

        trackEvent("ihtiyac_analizi_submit", { cta: ctaChoice });
        submittedRef.current = true;
        clearFormState();

        if (ctaChoice === "randevu") {
          window.location.href =
            result.redirectUrl ?? "/gorusme-planla?ref=ihtiyac-analizi";
          return;
        }

        window.location.href = "/ihtiyac-analizi/tesekkur";
      } catch {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.");
        setSubmitting(false);
      }
    },
    [answers, botcheck, kvkkAccepted, primaryService, summaryText],
  );

  const handleManualSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      goNext();
    },
    [goNext],
  );

  if (!screen) return null;

  const isSummary = currentScreenId === "s5-summary";
  const isFirst = currentScreenId === FIRST_SCREEN_ID;
  const canGoBack = screenHistory.length > 1 || isSummary;

  return (
    <div id="ihtiyac-analizi-form" className="scroll-mt-24">
      <FormProgress percent={progress} />

      <form
        onSubmit={handleManualSubmit}
        className="rounded border border-line bg-white p-4 md:p-6"
      >
        <h2 className="font-display text-h2 text-ink">{screen.title}</h2>
        {screen.description ? (
          <p className="mt-2 text-body text-steel">{screen.description}</p>
        ) : null}

        {isSummary && primaryService ? (
          <div className="mt-4">
            <SummaryCard summaryText={summaryText} primaryService={primaryService} />
          </div>
        ) : null}

        <div className="mt-6 space-y-6">
          {screen.questions.map((question) => {
            if (isSummary && question.id === "s5-secondary") {
              return (
                <QuestionRenderer
                  key={question.id}
                  question={{ ...question, options: secondaryOptions }}
                  value={answers[question.id]}
                  onChange={handleChange}
                />
              );
            }
            return (
              <QuestionRenderer
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleChange}
              />
            );
          })}
        </div>

        {isSummary ? (
          <div className="mt-6 space-y-4">
            <label className="flex items-start gap-3 text-body text-steel">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(event) => setKvkkAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-line text-signal"
              />
              <span>
                <Link
                  href="/kvkk-aydinlatma-metni"
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                  target="_blank"
                >
                  KVKK aydınlatma metnini
                </Link>{" "}
                okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
              </span>
            </label>

            <input
              type="text"
              name="botcheck"
              value={botcheck}
              onChange={(event) => setBotcheck(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {canGoBack ? (
                <Button variant="secondary" onClick={goBack}>
                  Geri
                </Button>
              ) : null}
              <Button
                onClick={() => submit("randevu")}
                className={submitting ? "pointer-events-none opacity-60" : ""}
              >
                {submitting ? "Gönderiliyor…" : "Randevu oluştur"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => submit("iletisim")}
                className={submitting ? "pointer-events-none opacity-60" : ""}
              >
                Sizinle iletişime geçelim
              </Button>
            </div>
          </div>
        ) : manualAdvance ? (
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {!isFirst && canGoBack ? (
              <Button variant="secondary" onClick={goBack}>
                Geri
              </Button>
            ) : (
              <span />
            )}
            <Button htmlType="submit">Devam</Button>
          </div>
        ) : !isFirst && canGoBack ? (
          <div className="mt-6">
            <Button variant="secondary" onClick={goBack}>
              Geri
            </Button>
          </div>
        ) : null}

        {error ? (
          <p className="mt-4 text-body text-accent" role="alert">
            {error}
            {isSummary && (error.includes("e-posta") || error.includes("telefon")) ? (
              <>
                {" "}
                <button
                  type="button"
                  className="underline decoration-signal underline-offset-4"
                  onClick={goToContact}
                >
                  İletişim bilgilerini düzenle
                </button>
              </>
            ) : null}
          </p>
        ) : null}
      </form>
    </div>
  );
}
