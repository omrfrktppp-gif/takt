import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Sayfa yolu" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-small text-steel">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex max-w-full items-center gap-2"
            >
              {index > 0 ? (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="touch-target-inline rounded-sm underline-offset-4 transition-colors hover:text-signal hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`truncate ${isLast ? "text-ink" : ""}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type DetailPageNavProps = {
  backHref: string;
  backLabel: string;
  ctaHref: string;
  ctaLabel: string;
};

export function DetailPageNav({
  backHref,
  backLabel,
  ctaHref,
  ctaLabel,
}: DetailPageNavProps) {
  return (
    <nav
      aria-label="Sayfa eylemleri"
      className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8"
    >
      <Link
        href={backHref}
        className="touch-target-inline text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
      >
        ← {backLabel}
      </Link>
      <Link
        href={ctaHref}
        className="touch-target-inline text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
      >
        {ctaLabel} →
      </Link>
    </nav>
  );
}

export function PageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageShellProps) {
  return (
    <>
      <Section
        variant="white"
        className="pb-10 pt-[calc(var(--nav-h)+1.5rem)] md:pb-12 md:pt-[calc(var(--nav-h)+2rem)]"
      >
        {breadcrumbs?.length ? <PageBreadcrumbs items={breadcrumbs} /> : null}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-balance font-display text-h1 text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-body-lg text-steel">{description}</p>
        ) : null}
        <Cadence variant="divider" className="mt-10 md:mt-12" />
      </Section>
      {children ?? (
        <Section>
          <p className="text-body text-steel">İçerik yakında eklenecek.</p>
        </Section>
      )}
    </>
  );
}
