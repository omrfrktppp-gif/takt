import Link from "next/link";
import { getServiceById } from "@/lib/ihtiyac-analizi/branches";
import { FORM_SCREENS } from "@/lib/ihtiyac-analizi/definition";
import { resolveScreenPath } from "@/lib/ihtiyac-analizi/flow-engine";
import type {
  Answers,
  FormQuestion,
  ServiceBranchId,
} from "@/lib/ihtiyac-analizi/types";

type SummaryCardProps = {
  answers: Answers;
  primaryService: ServiceBranchId | null;
  titleId: string;
  className?: string;
};

type SummaryRow = {
  id: string;
  label: string;
  value: string;
};

function formatValue(question: FormQuestion, value: string | string[]): string {
  const values = Array.isArray(value) ? value : [value];
  return values
    .map((item) => {
      if (question.id === "s5-secondary") {
        return getServiceById(item as ServiceBranchId)?.shortLabel ?? item;
      }
      return (
        question.options?.find((option) => option.value === item)?.label ?? item
      );
    })
    .join(", ");
}

function getSummaryRows(answers: Answers): SummaryRow[] {
  const rows: SummaryRow[] = [];
  const path = resolveScreenPath(answers);

  for (const screenId of path) {
    if (screenId === "s1-main" || screenId === "s4-contact") continue;
    const screen = FORM_SCREENS[screenId];
    if (!screen) continue;

    for (const question of screen.questions) {
      const value = answers[question.id];
      if (
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        continue;
      }

      rows.push({
        id: question.id,
        label: question.label,
        value: formatValue(question, value),
      });
    }
  }

  return rows;
}

export function SummaryCard({
  answers,
  primaryService,
  titleId,
  className = "",
}: SummaryCardProps) {
  const service = primaryService ? getServiceById(primaryService) : null;
  const rows = getSummaryRows(answers);

  return (
    <aside
      aria-labelledby={titleId}
      className={`overflow-hidden rounded border border-line bg-white shadow-[0_22px_55px_rgba(0,0,0,0.2)] ${className}`}
    >
      <div className="border-b border-signal/30 bg-deep px-5 py-4 text-ink">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-ink/65">
              Canlı proje kaydı
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-h3 text-ink"
            >
              Proje özeti / teknik föy
            </h2>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 size-2 shrink-0 rounded-sm bg-signal"
          />
        </div>
      </div>

      <div className="relative p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <div className="relative">
          <div className="border-b border-line pb-4">
            <p className="font-mono text-small uppercase tracking-[0.08em] text-steel">
              Ana ihtiyaç
            </p>
            <p className="mt-1 font-medium text-ink">
              {service?.label ?? "Henüz seçilmedi"}
            </p>
            {service ? (
              <Link
                href={service.path}
                className="touch-target-inline mt-1 text-small text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
              >
                Hizmet kapsamını inceleyin →
              </Link>
            ) : null}
          </div>

          {rows.length > 0 ? (
            <dl className="divide-y divide-line" aria-label="Verilen yanıtlar">
              {rows.map((row) => (
                <div
                  key={`${row.id}-${row.value}`}
                  className="reveal-up grid gap-1 py-3"
                >
                  <dt className="font-mono text-small text-steel">{row.label}</dt>
                  <dd className="text-body text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="py-5 text-body text-steel">
              Yanıtlarınız burada düzenli bir teknik föye dönüşecek.
            </p>
          )}

          <p className="border-t border-line pt-3 font-mono text-small text-steel">
            {rows.length > 0
              ? `${rows.length} proje bilgisi kaydedildi`
              : "FORM / TAKT-01"}
          </p>
        </div>
      </div>
    </aside>
  );
}
