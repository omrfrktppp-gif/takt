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
    <nav aria-label="Sayfa yolu" className="mb-4 md:mb-5">
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
                  className="touch-target-inline rounded-sm underline-offset-4 transition-colors hover:text-signal-text hover:underline"
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
        className="touch-target-inline text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
      >
        ← {backLabel}
      </Link>
      <Link
        href={ctaHref}
        className="touch-target-inline text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
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
      <section className="technical-grid relative overflow-hidden border-b border-line bg-white px-5 pb-8 pt-6 sm:px-6 md:pb-10 md:pt-8">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 size-48 rotate-45 border border-signal/20 bg-signal/5"
        />
        <div className="reveal-up relative mx-auto w-full max-w-content">
          {breadcrumbs?.length ? <PageBreadcrumbs items={breadcrumbs} /> : null}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-balance font-display text-h1 text-ink">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-body-lg text-steel md:mt-5">
              {description}
            </p>
          ) : null}
          <Cadence variant="divider" className="mt-6 md:mt-8" />
        </div>
      </section>
      {children ?? (
        <Section>
          <p className="text-body text-steel">İçerik yakında eklenecek.</p>
        </Section>
      )}
    </>
  );
}
