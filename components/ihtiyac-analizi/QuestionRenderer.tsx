import type { FormQuestion } from "@/lib/ihtiyac-analizi/types";

type QuestionRendererProps = {
  question: FormQuestion;
  value: string | string[] | undefined;
  onChange: (questionId: string, value: string | string[]) => void;
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
}: QuestionRendererProps) {
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
          className="form-input"
        />
      </div>
    );
  }

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const isMulti = question.type === "multi";

  return (
    <fieldset>
      <legend
        className={`mb-3 text-body font-medium text-ink ${question.optional ? "" : "after:ml-0.5 after:text-signal after:content-['*']"}`}
      >
        {question.label}
        {question.optional ? (
          <span className="font-normal text-steel"> (opsiyonel)</span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {question.options?.map((option) => {
          const active = selected.includes(option.value);
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
              className={`min-h-11 rounded border px-3 py-2.5 text-left text-body transition-colors sm:px-4 sm:py-3 ${
                active
                  ? "border-signal bg-signal/10 text-ink"
                  : "border-line bg-white text-steel hover:border-signal/40 hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
