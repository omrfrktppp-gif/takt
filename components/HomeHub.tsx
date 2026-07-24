import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { ConversionStory } from "@/components/home/ConversionStory";
import {
  appointmentCta,
  leadMagnet,
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

const problemPaths = [
  {
    title: "Teknik ekip yetişmiyor",
    href: "/hizmetler/tasarim-gelistirme",
    label: "Tasarım ve analiz yükü",
  },
  {
    title: "Üretime geçiş dağınık",
    href: "/hizmetler/uretim-danismanligi",
    label: "İmalat ve tedarik",
  },
  {
    title: "Kapsam ilerledikçe bulanıklaşıyor",
    href: "/hizmetler/proje-danismanligi",
    label: "Proje ve Ar-Ge",
  },
] as const;

const sectionPad = "mx-auto w-full max-w-content px-4 py-16 md:px-6 md:py-24";

export function HomeHub() {
  return (
    <SeoPageLayout>
      <section
        id="home-hero"
        className="relative overflow-hidden border-b border-line bg-paper"
      >
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l border-line bg-[linear-gradient(135deg,transparent_0_49.5%,var(--signal-tint)_50%,transparent_50.5%)] bg-[length:38px_38px] lg:block"
          aria-hidden="true"
        />
        <div className={`${sectionPad} relative lg:py-32`}>
          <div className="max-w-4xl">
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
              Teknik ekibinizin eksik halkası.
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-steel">
              Tasarım, analiz, proje yönetimi veya üretim koordinasyonunda
              sıkışan işi; kapsamı, ritmi ve teslimi belli bir teknik sürece
              dönüştürüyoruz.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button variant="signal" href={leadMagnet.href}>
                İhtiyacınızı netleştirin
              </Button>
              <Link
                href="/hizmetler"
                className="inline-flex min-h-11 items-center px-1 font-mono text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                Hizmetleri inceleyin →
              </Link>
            </div>
            <p className="mt-5 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Bağlayıcı değil · İlk görüşmede kapsam netleşir
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-line bg-white"
        aria-labelledby="home-problem"
      >
        <div className="mx-auto grid w-full max-w-content gap-8 px-4 py-12 md:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Başlangıç noktası
            </p>
            <h2 id="home-problem" className="mt-3 font-display text-h3 text-ink">
              İş nerede sıkışıyor?
            </h2>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {problemPaths.map((path) => (
              <li key={path.title}>
                <Link
                  href={path.href}
                  className="group flex min-h-24 flex-col justify-center px-4 py-4 md:px-5"
                >
                  <span className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                    {path.label}
                  </span>
                  <span className="mt-2 font-display text-base text-ink group-hover:text-signal">
                    {path.title} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConversionStory />

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
              className="inline-flex min-h-11 shrink-0 items-center font-mono text-small text-signal underline-offset-4 hover:underline"
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
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button variant="light" href={appointmentCta.href}>
                {appointmentCta.label}
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center px-1 text-small text-white/70 underline decoration-signal underline-offset-4 hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
