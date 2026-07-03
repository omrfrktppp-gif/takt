"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { FormProgress } from "@/components/ihtiyac-analizi/FormProgress";
import { QuestionRenderer } from "@/components/ihtiyac-analizi/QuestionRenderer";
import { SummaryCard } from "@/components/ihtiyac-analizi/SummaryCard";
import { trackEvent } from "@/lib/analytics";
import { FIRST_SCREEN_ID } from "@/lib/ihtiyac-analizi/definition";
import {
  buildSummaryText,
  getNextScreenId,
  getPreviousScreenId,
  getProgressPercent,
  getScreenById,
  getSecondaryServiceOptions,
  isScreenValid,
  resolvePrimaryService,
} from "@/lib/ihtiyac-analizi/flow-engine";
import {
  clearFormState,
  loadFormState,
  saveFormState,
} from "@/lib/ihtiyac-analizi/storage";
import type { Answers, CtaChoice, ServiceBranchId } from "@/lib/ihtiyac-analizi/types";

export function IhtiyacAnaliziWizard() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentScreenId, setCurrentScreenId] = useState(FIRST_SCREEN_ID);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const saved = loadFormState();
    if (saved?.answers && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      const lastScreen = saved.screenHistory.at(-1);
      if (lastScreen) setCurrentScreenId(lastScreen);
      setStarted(true);
    }
  }, []);

  useEffect(() => {
    if (!started && answers["s1-main"]) {
      setStarted(true);
      trackEvent("ihtiyac_analizi_start");
    }
  }, [answers, started]);

  useEffect(() => {
    const primary = resolvePrimaryService(answers);
    saveFormState({
      answers,
      screenHistory: [currentScreenId],
      primaryService: primary,
    });
  }, [answers, currentScreenId]);

  const screen = getScreenById(currentScreenId);
  const primaryService = resolvePrimaryService(answers);
  const progress = getProgressPercent(currentScreenId, answers);
  const summaryText = useMemo(() => buildSummaryText(answers), [answers]);

  const secondaryOptions = useMemo(
    () => (primaryService ? getSecondaryServiceOptions(primaryService) : []),
    [primaryService],
  );

  const handleChange = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  }, []);

  const goNext = useCallback(() => {
    if (!isScreenValid(currentScreenId, answers)) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }
    const next = getNextScreenId(currentScreenId, answers);
    if (!next) return;
    trackEvent("ihtiyac_analizi_screen", { screen: next });
    setCurrentScreenId(next);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [answers, currentScreenId]);

  const goBack = useCallback(() => {
    const prev = getPreviousScreenId(currentScreenId, answers);
    if (!prev) return;
    setCurrentScreenId(prev);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [answers, currentScreenId]);

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
        botcheck: "",
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
    [answers, kvkkAccepted, primaryService, summaryText],
  );

  if (!screen) return null;

  const isSummary = currentScreenId === "s5-summary";
  const isFirst = currentScreenId === FIRST_SCREEN_ID;

  return (
    <div>
      <FormProgress percent={progress} />

      <div className="rounded border border-line bg-white p-6 md:p-8">
        <h2 className="font-display text-h2 text-ink">{screen.title}</h2>
        {screen.description ? (
          <p className="mt-3 text-body text-steel">{screen.description}</p>
        ) : null}

        {isSummary && primaryService ? (
          <div className="mt-6">
            <SummaryCard summaryText={summaryText} primaryService={primaryService} />
          </div>
        ) : null}

        <div className="mt-8 space-y-8">
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
          <div className="mt-8 space-y-4">
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
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
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
                Sizinle iletişime geçin
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {!isFirst ? (
              <Button variant="secondary" onClick={goBack}>
                Geri
              </Button>
            ) : (
              <span />
            )}
            <Button onClick={goNext}>Devam</Button>
          </div>
        )}

        {error ? (
          <p className="mt-4 text-body text-accent" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
