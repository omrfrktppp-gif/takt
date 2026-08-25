import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cadence } from "@/components/Cadence";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  const content = (
    <>
      <Cadence variant="divider" tickCount={5} activeIndex={2} className="mb-6" />
      <h3 className="font-display text-h3 text-ink">{title}</h3>
      <p className="mt-3 text-body text-steel">{description}</p>
      {href ? (
        <span
          aria-hidden="true"
          className="mt-5 inline-flex items-center gap-2 font-mono text-small text-signal-text"
        >
          İnceleyin
          <ArrowUpRight
            className="size-4 transition-transform duration-200 ease-takt group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            strokeWidth={1.7}
          />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group relative block overflow-hidden rounded border border-line bg-white p-6 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-takt hover:-translate-y-0.5 hover:border-signal hover:bg-surface-raised hover:shadow-[0_18px_42px_rgba(0,0,0,0.2)] motion-reduce:transition-none"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-takt group-hover:scale-x-100 motion-reduce:transition-none"
        />
        {content}
      </Link>
    );
  }

  return (
    <article className="rounded border border-line bg-white p-6">{content}</article>
  );
}
