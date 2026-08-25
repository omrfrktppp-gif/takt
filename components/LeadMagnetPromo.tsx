import { BadgeCheck, Clock3, FileText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { leadMagnet } from "@/lib/site";

export function LeadMagnetPromo({ locale = "tr" }: { locale?: "tr" | "en" }) {
  const english = locale === "en";
  return (
    <aside className="technical-grid group relative overflow-hidden rounded border border-signal/45 bg-deep p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] md:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-signal"
      />
      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo
              variant="signal"
              size={42}
              className="h-10 w-10"
            />
            <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-signal-text">
              {english ? "Project definition tool" : "Proje tanımlama aracı"}
            </p>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-h2 text-ink">
            {english
              ? "Turn your needs into a technical brief in two minutes."
              : "İhtiyacınızı iki dakikada teknik bir özete dönüştürün."}
          </h2>
          <p className="mt-3 max-w-2xl text-body text-steel">
            {english
              ? "Describe your project in two minutes so we can identify the right service together. Your live project brief takes shape as you answer."
              : `${leadMagnet.description} Yanıtlarınız ilerledikçe canlı proje föyünüz oluşur.`}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-small text-steel">
            <li className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4 text-signal-text" />
              {english ? "About 2 minutes" : "Yaklaşık 2 dakika"}
            </li>
            <li className="inline-flex items-center gap-2">
              <FileText aria-hidden="true" className="size-4 text-signal-text" />
              {english ? "Live technical brief" : "Canlı teknik özet"}
            </li>
            <li className="inline-flex items-center gap-2">
              <BadgeCheck aria-hidden="true" className="size-4 text-signal-text" />
              {english ? "No obligation" : "Bağlayıcı değil"}
            </li>
          </ul>
        </div>
        <Button
          href={english ? `/en${leadMagnet.href}` : leadMagnet.href}
          variant="signal"
          className="w-full lg:w-auto"
        >
          {english ? "Start Needs Analysis" : "İhtiyaç Analizini Başlat"}
        </Button>
      </div>
    </aside>
  );
}
