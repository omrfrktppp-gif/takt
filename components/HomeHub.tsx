import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import {
  appointmentCta,
  processSteps,
  servicePillars,
  siteConfig,
} from "@/lib/site";

const pillarHrefs: Record<(typeof servicePillars)[number]["id"], string> = {
  "muhendislik-danismanligi": "/hizmetler/proje-danismanligi",
  "tasarim-gelistirme": "/hizmetler/tasarim-gelistirme",
  "analiz-hesaplama": "/hizmetler/analiz-hesaplama",
  "uretim-optimizasyon": "/hizmetler/uretim-danismanligi",
  "arge-proje": "/hizmetler/arge-urge",
};

const deliverables = [
  {
    title: "Yazılı kapsam ve takvim",
    description:
      "Ne yapacağımızı, ne zaman ve hangi çıktıyla yapacağımızı işin başında yazarız.",
  },
  {
    title: "İmalata hazır dokümantasyon",
    description:
      "Teknik resim, model ve imalat dosyalarını kullanılabilir formatta teslim ederiz.",
  },
  {
    title: "Teknik rapor ve karar desteği",
    description:
      "Analiz, hesap ve risk notlarıyla kararlarınızı sayıyla destekleriz.",
  },
  {
    title: "Tek muhatap koordinasyon",
    description:
      "Tasarımdan imalata kadar süreci tek elden yönetir, ekibinizle uyumlu çalışırız.",
  },
] as const;

const sectionPad = "mx-auto w-full max-w-content px-4 py-16 md:px-6 md:py-24";

function CtaPair({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button variant={onDark ? "light" : "signal"} href={appointmentCta.href}>
        {appointmentCta.label}
      </Button>
      <Button
        variant="secondary"
        href={siteConfig.whatsapp.href}
        className={
          onDark
            ? "border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
            : undefined
        }
      >
        WhatsApp
      </Button>
    </div>
  );
}

export function HomeHub() {
  return (
    <SeoPageLayout>
      <section className="border-b border-line bg-paper">
        <div className={`${sectionPad} lg:py-28`}>
          <div className="max-w-3xl">
            <Cadence
              variant="hero"
              tickCount={9}
              activeIndex={4}
              className="max-w-xs"
            />
            <p className="mt-10 font-mono text-eyebrow uppercase tracking-[0.12em] text-signal">
              Mühendislik danışmanlığı · Ankara
            </p>
            <h1 className="mt-5 font-display text-h1 text-ink">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-steel">
              {siteConfig.description}
            </p>
            <CtaPair />
          </div>
        </div>
      </section>

      <section
        className="border-b border-line bg-white"
        aria-labelledby="home-hizmetler"
      >
        <div className={sectionPad}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                Hizmetler
              </p>
              <h2
                id="home-hizmetler"
                className="mt-3 font-display text-h2 text-ink"
              >
                Teknik ekibinize dışarıdan güç
              </h2>
              <p className="mt-3 text-body text-steel">
                Danışmanlık, tasarım, analiz, üretim ve Ar-Ge desteği.
              </p>
            </div>
            <Link
              href="/hizmetler"
              className="shrink-0 pb-0.5 font-mono text-small text-signal underline-offset-4 hover:underline"
            >
              Tüm hizmetler →
            </Link>
          </div>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {servicePillars.map((pillar) => (
              <li key={pillar.id}>
                <Link
                  href={pillarHrefs[pillar.id]}
                  className="group flex flex-col gap-1.5 py-6 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-8 md:py-7"
                >
                  <span className="w-8 shrink-0 font-mono text-small text-signal">
                    {pillar.number}
                  </span>
                  <span className="min-w-0 font-display text-h3 text-ink group-hover:text-signal">
                    {pillar.title}
                  </span>
                  <span className="text-body text-steel sm:ml-auto sm:max-w-sm sm:text-right">
                    {pillar.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-b border-line bg-paper"
        aria-labelledby="home-surec"
      >
        <div className={sectionPad}>
          <div className="max-w-2xl">
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Süreç
            </p>
            <h2 id="home-surec" className="mt-3 font-display text-h2 text-ink">
              Çalışma süreci
            </h2>
            <p className="mt-3 text-body text-steel">
              Net kapsam, ölçülebilir tempo, raporlanabilir teslim.
            </p>
          </div>

          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-eyebrow text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-h3 text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-body text-steel">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="border-b border-line bg-white"
        aria-labelledby="home-teslim"
      >
        <div className={sectionPad}>
          <div className="max-w-2xl">
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Teslimat
            </p>
            <h2 id="home-teslim" className="mt-3 font-display text-h2 text-ink">
              Ne teslim ederiz?
            </h2>
            <p className="mt-3 text-body text-steel">
              Abartısız, devredilebilir ve takip edilebilir çıktılar.
            </p>
          </div>

          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li key={item.title} className="border-l-2 border-signal pl-5 md:pl-6">
                <h3 className="font-display text-h3 text-ink">{item.title}</h3>
                <p className="mt-2 text-body text-steel">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-white" aria-labelledby="home-cta">
        <div className={sectionPad}>
          <div className="max-w-2xl">
            <h2 id="home-cta" className="font-display text-h2 text-white">
              Projenizdeki eksik halkayı birlikte netleştirelim.
            </h2>
            <p className="mt-4 text-body text-white/75">
              İlk görüşmede kapsamı, takvimi ve çıktıları yazılı koyarız.
              Bağlayıcı değildir.
            </p>
            <CtaPair onDark />
            <p className="mt-10 text-small text-white/55">
              {siteConfig.phone} · {siteConfig.email}
            </p>
          </div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
