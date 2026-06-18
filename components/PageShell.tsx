import { Cadence } from "@/components/Cadence";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <>
      <Section variant="white" className="pb-12 pt-20 md:pt-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl font-display text-h1 text-ink">{title}</h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-body-lg text-steel">{description}</p>
        ) : null}
        <Cadence variant="divider" className="mt-12" />
      </Section>
      {children ?? (
        <Section>
          <p className="text-body text-steel">İçerik yakında eklenecek.</p>
        </Section>
      )}
    </>
  );
}
