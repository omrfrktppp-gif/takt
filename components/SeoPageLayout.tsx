import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";

type SeoPageLayoutProps = {
  children: React.ReactNode;
};

export function SeoPageLayout({ children }: SeoPageLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-x-clip">
      {children}
      <Footer />
    </div>
  );
}

type PanelCardProps = {
  href: string;
  title: string;
  excerpt: string;
};

export function PanelCard({ href, title, excerpt }: PanelCardProps) {
  return (
    <article className="interactive-card group relative flex flex-col overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-takt group-hover:scale-x-100 motion-reduce:transition-none"
      />
      <h2 className="font-display text-h3 text-ink">
        <Link
          href={href}
          className="rounded-sm underline-offset-4 transition-colors after:absolute after:inset-0 group-hover:text-signal-text group-hover:underline focus-visible:text-signal-text focus-visible:underline"
        >
          {title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-body text-steel">{excerpt}</p>
      <span
        aria-hidden="true"
        className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-small text-signal-text"
      >
        Detay
        <ArrowUpRight
          className="size-4 transition-transform duration-200 ease-takt group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
          strokeWidth={1.7}
        />
      </span>
    </article>
  );
}

type ContentCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ContentCard({
  title,
  children,
  className = "",
}: ContentCardProps) {
  return (
    <article className={`interactive-card flex flex-col ${className}`}>
      <h2 className="font-display text-h3 text-ink">{title}</h2>
      <div className="mt-3 flex-1">{children}</div>
    </article>
  );
}

type ListingGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function ListingGrid({ children, className = "" }: ListingGridProps) {
  return (
    <div className={`grid gap-5 sm:gap-6 md:grid-cols-2 ${className}`}>
      {children}
    </div>
  );
}
