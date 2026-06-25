import { FaqList } from "@/components/FaqList";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import type { PanelSeoContent } from "@/lib/seo-content";

type ServiceDetailBodyProps = {
  content: PanelSeoContent;
  intro?: string;
};

export function ServiceDetailBody({ content, intro }: ServiceDetailBodyProps) {
  const meta = content.meta;

  return (
    <div className="max-w-3xl space-y-10">
      {meta &&
      (meta.typicalDuration || meta.pricingNote || meta.proofPoint) ? (
        <div className="grid gap-4 rounded border border-line bg-white p-6 sm:grid-cols-3">
          {meta.typicalDuration ? (
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
                Tipik süre
              </p>
              <p className="mt-2 text-body text-ink">{meta.typicalDuration}</p>
            </div>
          ) : null}
          {meta.pricingNote ? (
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
                Ücretlendirme
              </p>
              <p className="mt-2 text-body text-ink">{meta.pricingNote}</p>
            </div>
          ) : null}
          {meta.proofPoint ? (
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
                Örnek sonuç
              </p>
              <p className="mt-2 text-body text-ink">{meta.proofPoint}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="text-body-lg text-ink">{content.summary}</p>
      {intro ? <p className="text-body text-steel">{intro}</p> : null}

      {content.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body text-steel">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {content.faq.length > 0 ? (
        <section>
          <h2 className="font-display text-h3 text-ink">Sık sorulan sorular</h2>
          <dl className="mt-6 divide-y divide-line rounded border border-line bg-white">
            {content.faq.map((item) => (
              <div key={item.question} className="p-6">
                <dt className="font-display text-body font-medium text-ink">
                  {item.question}
                </dt>
                <dd className="mt-2 text-body text-steel">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <LeadMagnetPromo />
    </div>
  );
}

export { FaqList };
