import Link from "next/link";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

type ThankYouPanelProps = {
  mode: "iletisim";
};

export function ThankYouPanel({ mode }: ThankYouPanelProps) {
  if (mode !== "iletisim") return null;

  return (
    <div className="rounded border border-line bg-white p-8 text-center">
      <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal">
        Talep alındı
      </p>
      <h2 className="mt-4 font-display text-h2 text-ink">Teşekkürler</h2>
      <p className="mx-auto mt-4 max-w-lg text-body text-steel">
        Talebiniz alındı. 1 iş günü içinde dönüş yapacağız.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href={siteConfig.whatsapp.href} variant="secondary">
          WhatsApp ile yazın
        </Button>
        <Link
          href="/"
          className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        >
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
