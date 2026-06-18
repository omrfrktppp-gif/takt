import Link from "next/link";
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
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block rounded border border-line bg-white p-6 transition-colors duration-200 hover:border-signal"
      >
        {content}
      </Link>
    );
  }

  return (
    <article className="rounded border border-line bg-white p-6">{content}</article>
  );
}
