import Link from "next/link";
import { Footer } from "@/components/Footer";

type SeoPageLayoutProps = {
  children: React.ReactNode;
};

export function SeoPageLayout({ children }: SeoPageLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scroll-inner scrollbar-none">
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
    <article className="rounded border border-line bg-white p-6 transition-colors hover:border-signal/30">
      <h2 className="font-display text-h3 text-ink">
        <Link
          href={href}
          className="underline-offset-4 hover:text-signal hover:underline"
        >
          {title}
        </Link>
      </h2>
      <p className="mt-3 text-body text-steel">{excerpt}</p>
      <Link
        href={href}
        className="mt-4 inline-block font-mono text-small text-signal underline-offset-4 hover:underline"
      >
        Detay →
      </Link>
    </article>
  );
}
