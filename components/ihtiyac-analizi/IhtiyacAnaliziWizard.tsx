"use client";

import Link from "next/link";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
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

const loadMotionFeatures = () =>
  import("@/components/home/motion-features").then((module) => module.default);

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
  const [direction, setDirection] = useState<1 | -1>(1);
  const submittedRef = useRef(false);
  const abandonTrackedRef = useRef(false);
  const screenHeadingRef = useRef<HTMLHeadingElement>(null);

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
  const screenPath = resolveScreenPath(answers);
  const currentStep = Math.max(screenPath.indexOf(currentScreenId) + 1, 1);
  const totalSteps = answers["s1-main"] ? screenPath.length : 0;

  const secondaryOptions = useMemo(
    () => (primaryService ? getSecondaryServiceOptions(primaryService) : []),
    [primaryService],
  );

  useEffect(() => {
    if (!started) return;
    const focusTimer = window.setTimeout(() => {
      screenHeadingRef.current?.focus({ preventScroll: true });
    }, 360);
    return () => window.clearTimeout(focusTimer);
  }, [currentScreenId, started]);

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

      setDirection(1);
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
    setDirection(-1);
    setScreenHistory(history);
    setCurrentScreenId("s4-contact");
    setError(null);
  }, [answers]);

  const goBack = useCallback(() => {
    if (currentScreenId === "s5-summary") {
      goToContact();
      return;
    }

    setDirection(-1);
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
  const errorId = "ihtiyac-analizi-error";

  function questionError(questionId: string): string | undefined {
    if (!error) return undefined;
    const question = screen?.questions.find((item) => item.id === questionId);
    if (!question) return undefined;

    const value = answers[questionId];
    const isEmpty =
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);
    const isRequired = question.optional !== true && question.required !== false;

    if (isRequired && isEmpty) return "Bu alanı doldurun.";
    if (questionId === "s4-email" && error.includes("e-posta")) {
      return "Geçerli bir e-posta adresi girin.";
    }
    if (questionId === "s4-phone" && error.includes("telefon")) {
      return "Geçerli bir telefon numarası girin.";
    }
    return undefined;
  }

  return (
    <div id="ihtiyac-analizi-form" className="scroll-mt-[var(--sticky-offset)]">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {totalSteps > 0 ? `${currentStep}. adım` : "Başlangıç"}: {screen.title}
      </p>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.7fr)] lg:gap-8">
        <div className="min-w-0">
          <FormProgress
            percent={progress}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          <form
            onSubmit={handleManualSubmit}
            className="interactive-card motion-static overflow-hidden !p-0"
            aria-busy={submitting}
            aria-labelledby="ihtiyac-analizi-screen-title"
            aria-describedby={error ? errorId : undefined}
          >
            <LazyMotion features={loadMotionFeatures} strict>
              <MotionConfig reducedMotion="user">
                <AnimatePresence initial={false} mode="wait">
                  <m.div
                  key={currentScreenId}
                  initial={{ opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -18 }}
                  transition={{
                    duration: 0.32,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                  className="p-5 md:p-6"
                >
                  <p className="mb-2 font-mono text-small uppercase tracking-[0.08em] text-signal-text">
                    Proje tanımı ·{" "}
                    {totalSteps > 0 ? `${currentStep}/${totalSteps}` : "Başlangıç"}
                  </p>
                  <h2
                    ref={screenHeadingRef}
                    id="ihtiyac-analizi-screen-title"
                    tabIndex={-1}
                    className="font-display text-h2 text-ink focus:outline-none focus-visible:outline-none"
                  >
                    {screen.title}
                  </h2>
                  {screen.description ? (
                    <p className="mt-2 text-body text-steel">
                      {screen.description}
                    </p>
                  ) : null}

                  <div className="mt-6 space-y-6">
                    {screen.questions.map((question) => {
                      const fieldError = questionError(question.id);
                      if (isSummary && question.id === "s5-secondary") {
                        return (
                          <QuestionRenderer
                            key={question.id}
                            question={{ ...question, options: secondaryOptions }}
                            value={answers[question.id]}
                            onChange={handleChange}
                            invalid={Boolean(fieldError)}
                            errorMessage={fieldError}
                          />
                        );
                      }
                      return (
                        <QuestionRenderer
                          key={question.id}
                          question={question}
                          value={answers[question.id]}
                          onChange={handleChange}
                          invalid={Boolean(fieldError)}
                          errorMessage={fieldError}
                        />
                      );
                    })}
                  </div>

            {isSummary ? (
              <div className="mt-6 space-y-4">
                <label className="form-checkbox-row text-body text-steel">
                  <input
                    type="checkbox"
                    checked={kvkkAccepted}
                    onChange={(event) => {
                      setKvkkAccepted(event.target.checked);
                      setError(null);
                    }}
                    aria-required="true"
                    aria-invalid={
                      Boolean(error?.includes("KVKK") && !kvkkAccepted) || undefined
                    }
                    aria-describedby={
                      error?.includes("KVKK") && !kvkkAccepted ? errorId : undefined
                    }
                  />
                  <span>
                    <Link
                      href="/kvkk-aydinlatma-metni"
                      className="text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
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

                <div className="sticky bottom-0 z-20 -mx-5 flex flex-col gap-3 border-t border-line bg-white/95 px-5 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:static sm:mx-0 sm:flex-row sm:flex-wrap sm:border-0 sm:bg-transparent sm:p-0">
                  {canGoBack ? (
                    <Button variant="secondary" onClick={goBack}>
                      Geri
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => submit("randevu")}
                    loading={submitting}
                    loadingLabel="Gönderiliyor…"
                  >
                    Randevu oluştur
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => submit("iletisim")}
                    loading={submitting}
                    loadingLabel="Gönderiliyor…"
                  >
                    Sizinle iletişime geçelim
                  </Button>
                </div>
              </div>
            ) : manualAdvance ? (
              <div className="sticky bottom-0 z-20 -mx-5 mt-6 flex flex-col-reverse gap-3 border-t border-line bg-white/95 px-5 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:static sm:mx-0 sm:flex-row sm:justify-between sm:border-0 sm:bg-transparent sm:p-0">
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
              <p id={errorId} className="form-error mt-4" role="alert">
                {error}
                {isSummary &&
                (error.includes("e-posta") || error.includes("telefon")) ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="touch-target-inline underline decoration-signal underline-offset-4"
                      onClick={goToContact}
                    >
                      İletişim bilgilerini düzenle
                    </button>
                  </>
                ) : null}
              </p>
            ) : null}
                  </m.div>
                </AnimatePresence>
              </MotionConfig>
            </LazyMotion>
          </form>

          <SummaryCard
            answers={answers}
            primaryService={primaryService}
            titleId="project-sheet-title-mobile"
            className="mt-6 lg:hidden"
          />
        </div>

        <div className="hidden lg:sticky lg:top-[var(--sticky-offset)] lg:block">
          <SummaryCard
            answers={answers}
            primaryService={primaryService}
            titleId="project-sheet-title-desktop"
          />
        </div>
      </div>
    </div>
  );
}
