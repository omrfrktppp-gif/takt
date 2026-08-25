import {
  ChartNoAxesCombined,
  DraftingCompass,
  Factory,
  FlaskConical,
  Landmark,
  Network,
  Route,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FormQuestion } from "@/lib/ihtiyac-analizi/types";

type QuestionRendererProps = {
  question: FormQuestion;
  value: string | string[] | undefined;
  onChange: (questionId: string, value: string | string[]) => void;
  invalid?: boolean;
  errorMessage?: string;
};

const primaryServiceIcons: Record<string, LucideIcon> = {
  A: DraftingCompass,
  B: ChartNoAxesCombined,
  C: Factory,
  D: FlaskConical,
  E: Landmark,
  F: UsersRound,
  G: Network,
  H: Route,
};

function inputTypeForQuestion(questionId: string): "text" | "email" | "tel" {
  if (questionId === "s4-email") return "email";
  if (questionId === "s4-phone") return "tel";
  return "text";
}

function autoCompleteForQuestion(questionId: string): string | undefined {
  if (questionId === "s4-name") return "name";
  if (questionId === "s4-company") return "organization";
  if (questionId === "s4-email") return "email";
  if (questionId === "s4-phone") return "tel";
  if (questionId === "s4-city") return "address-level2";
  return undefined;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  invalid = false,
  errorMessage = "Bu alanı doldurun.",
}: QuestionRendererProps) {
  const errorId = `${question.id}-error`;

  if (question.type === "text") {
    return (
      <div>
        <label
          htmlFor={question.id}
          className={`form-label ${question.optional ? "" : "form-label-required"}`}
        >
          {question.label}
          {question.optional ? (
            <span className="font-normal text-steel"> (opsiyonel)</span>
          ) : null}
        </label>
        <input
          id={question.id}
          type={inputTypeForQuestion(question.id)}
          inputMode={
            question.id === "s4-email"
              ? "email"
              : question.id === "s4-phone"
                ? "tel"
                : undefined
          }
          autoComplete={autoCompleteForQuestion(question.id)}
          value={typeof value === "string" ? value : ""}
          placeholder={question.placeholder}
          onChange={(event) => onChange(question.id, event.target.value)}
          aria-required={question.optional ? undefined : true}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className="form-input"
        />
        {invalid ? (
          <p id={errorId} className="form-error mt-2">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const isMulti = question.type === "multi";

  return (
    <fieldset aria-invalid={invalid || undefined} aria-describedby={invalid ? errorId : undefined}>
      <legend
        className={`mb-3 text-body font-medium text-ink ${question.optional ? "" : "after:ml-0.5 after:text-signal-text after:content-['*']"}`}
      >
        {question.label}
        {question.optional ? (
          <span className="font-normal text-steel"> (opsiyonel)</span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        {question.options?.map((option) => {
          const active = selected.includes(option.value);
          const OptionIcon =
            question.id === "s1-main"
              ? primaryServiceIcons[option.value]
              : undefined;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (isMulti) {
                  const next = active
                    ? selected.filter((item) => item !== option.value)
                    : [...selected, option.value];
                  onChange(question.id, next);
                } else {
                  onChange(question.id, option.value);
                }
              }}
              className={`group/option relative flex min-h-11 items-start justify-between gap-3 overflow-hidden rounded border px-3 py-2.5 text-left text-body transition-[border-color,background-color,color,transform,box-shadow] duration-200 ease-takt motion-reduce:transition-none sm:px-4 sm:py-3 ${
                active
                  ? "border-signal bg-signal/10 text-ink shadow-[inset_3px_0_0_var(--signal),0_12px_32px_rgba(0,0,0,0.18)]"
                  : invalid
                    ? "border-danger bg-white text-ink"
                    : "border-line bg-white text-steel hover:-translate-y-0.5 hover:border-signal/55 hover:bg-surface-raised hover:text-ink"
              }`}
            >
              <span className="flex min-w-0 items-start gap-3">
                {OptionIcon ? (
                  <OptionIcon
                    aria-hidden="true"
                    className={`mt-0.5 size-5 shrink-0 transition-colors ${
                      active
                        ? "text-signal-text"
                        : "text-steel group-hover/option:text-signal-text"
                    }`}
                    strokeWidth={1.6}
                  />
                ) : null}
                <span>{option.label}</span>
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.7rem] ${
                  active
                    ? "border-signal bg-signal text-signal-ink"
                    : "border-line text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
      {invalid ? (
        <p id={errorId} className="form-error mt-2">
          {errorMessage}
        </p>
      ) : null}
    </fieldset>
  );
}
