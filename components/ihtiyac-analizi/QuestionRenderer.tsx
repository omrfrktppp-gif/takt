import type { FormQuestion } from "@/lib/ihtiyac-analizi/types";

type QuestionRendererProps = {
  question: FormQuestion;
  value: string | string[] | undefined;
  onChange: (questionId: string, value: string | string[]) => void;
};

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
          className="mb-2 block text-body font-medium text-ink"
        >
          {question.label}
          {question.optional ? (
            <span className="font-normal text-steel"> (opsiyonel)</span>
          ) : null}
        </label>
        <input
          id={question.id}
          type="text"
          value={typeof value === "string" ? value : ""}
          placeholder={question.placeholder}
          onChange={(event) => onChange(question.id, event.target.value)}
          className="w-full rounded border border-line bg-white px-4 py-3 text-body text-ink outline-none transition-colors focus:border-signal"
        />
      </div>
    );
  }

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const isMulti = question.type === "multi";

  return (
    <fieldset>
      <legend className="mb-3 text-body font-medium text-ink">
        {question.label}
        {question.optional ? (
          <span className="font-normal text-steel"> (opsiyonel)</span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
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
              className={`rounded border px-4 py-3 text-left text-body transition-colors ${
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
