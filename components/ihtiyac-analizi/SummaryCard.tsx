import Link from "next/link";
import { getServiceById } from "@/lib/ihtiyac-analizi/branches";
import type { ServiceBranchId } from "@/lib/ihtiyac-analizi/types";

type SummaryCardProps = {
  summaryText: string;
  primaryService: ServiceBranchId;
};

export function SummaryCard({ summaryText, primaryService }: SummaryCardProps) {
  const service = getServiceById(primaryService);

  return (
    <div className="interactive-card">
      <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal">
        İhtiyaç özeti
      </p>
      <p className="mt-4 text-body-lg text-ink">{summaryText}</p>
      {service ? (
        <Link
          href={service.path}
          className="touch-target-inline mt-2 text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
        >
          {service.label} sayfası →
        </Link>
      ) : null}
    </div>
  );
}
