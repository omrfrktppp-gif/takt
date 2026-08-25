import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { LazyConversionStory } from "@/components/home/LazyConversionStory";
import { getPublishedPosts } from "@/lib/blog";
import {
  appointmentCta,
  leadMagnet,
  servicePillars,
  siteConfig,
} from "@/lib/site";
import styles from "./HomeHub.module.css";

const pillarHrefs: Record<(typeof servicePillars)[number]["id"], string> = {
  "muhendislik-danismanligi": "/hizmetler/proje-danismanligi",
  "tasarim-gelistirme": "/hizmetler/tasarim-gelistirme",
  "analiz-hesaplama": "/hizmetler/analiz-hesaplama",
  "uretim-optimizasyon": "/hizmetler/uretim-danismanligi",
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

const deliveryOutputs = [
  {
    code: "01",
    title: "3B model",
    description: "Geometri, montaj ilişkileri ve revizyon kaydı.",
  },
  {
    code: "02",
    title: "Teknik resim",
    description: "Ölçü, tolerans ve üretim için gerekli teknik dil.",
  },
  {
    code: "03",
    title: "Analiz notu",
    description: "Kabul, varsayım, yöntem ve mühendislik değerlendirmesi.",
  },
  {
    code: "04",
    title: "İmalat paketi",
    description: "Üreticiyle paylaşılabilir, devredilebilir çıktı bütünü.",
  },
] as const;

const technicalCases = getPublishedPosts()
  .filter((post) => post.kind === "case-study")
  .slice(0, 3);

export function HomeHub() {
  return (
    <SeoPageLayout>
      <section
        id="home-hero"
        className="relative overflow-hidden border-b border-line bg-paper"
      >
        <div className={`${sectionPad} relative lg:py-24`}>
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="max-w-3xl">
            <Cadence
              variant="hero"
              tickCount={9}
              activeIndex={4}
              className="max-w-xs"
            />
            <p className="mt-10 font-mono text-eyebrow uppercase tracking-[0.12em] text-signal-text">
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
                className="inline-flex min-h-11 items-center px-1 font-mono text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal-text"
              >
                Hizmetleri inceleyin →
              </Link>
            </div>
            <p className="mt-5 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Bağlayıcı değil · İlk görüşmede kapsam netleşir
            </p>
            </div>

            <div className={styles.heroField} aria-hidden="true">
              <svg
                className={styles.heroSvg}
                viewBox="0 0 620 470"
                focusable="false"
              >
                <defs>
                  <pattern
                    id="hero-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M24 0H0V24"
                      fill="none"
                      stroke="var(--line)"
                      strokeOpacity="0.62"
                    />
                  </pattern>
                </defs>
                <rect width="620" height="470" fill="url(#hero-grid)" />
                <path
                  className={styles.heroTrace}
                  d="M48 346H146V278H226V202H330V128H472V78H570"
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth="2"
                />
                <g className={styles.heroGeometry}>
                  <rect x="146" y="252" width="184" height="94" />
                  <rect x="226" y="164" width="246" height="114" />
                  <circle cx="330" cy="221" r="42" />
                  <path d="M330 263V346M118 382H500M118 374V390M500 374V390" />
                  <path d="M92 252V346M84 252H100M84 346H100" />
                </g>
                <g className={styles.heroNodes}>
                  <circle cx="146" cy="278" r="5" />
                  <circle cx="226" cy="202" r="5" />
                  <circle cx="330" cy="128" r="5" />
                  <circle cx="472" cy="78" r="5" />
                </g>
                <g className={styles.heroLabels}>
                  <text x="48" y="332">GİRDİ / DARBOĞAZ</text>
                  <text x="312" y="406">382 mm · ANA EKSEN</text>
                  <text x="500" y="64">TESLİM</text>
                  <text x="42" y="302" transform="rotate(-90 42 302)">
                    94 mm
                  </text>
                </g>
              </svg>
              <div className={styles.heroLegend}>
                <span>TAKT / SİSTEM ŞEMASI</span>
                <span>REV. 01</span>
              </div>
            </div>
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
                  className={`${styles.problemLink} group flex min-h-24 flex-col justify-center px-4 py-4 md:px-5`}
                >
                  <span className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                    {path.label}
                  </span>
                  <span className="mt-2 font-display text-base text-ink group-hover:text-signal-text">
                    {path.title} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-b border-line bg-paper"
        aria-label="İhtiyaç analizi"
      >
        <div className="mx-auto w-full max-w-content px-4 py-10 md:px-6 md:py-14">
          <LeadMagnetPromo />
        </div>
      </section>

      <LazyConversionStory />

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
              className="inline-flex min-h-11 shrink-0 items-center font-mono text-small text-signal-text underline-offset-4 hover:underline"
            >
              Tüm hizmetler →
            </Link>
          </div>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {servicePillars.map((pillar) => (
              <li key={pillar.id}>
                <Link
                  href={pillarHrefs[pillar.id]}
                  className={`${styles.serviceRow} group flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:gap-8 md:py-7`}
                >
                  <span className="w-8 shrink-0 font-mono text-small text-signal-text">
                    {pillar.number}
                  </span>
                  <span className="min-w-0 font-display text-h3 text-ink group-hover:text-signal-text">
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
        aria-labelledby="home-deliverables"
      >
        <div className={sectionPad}>
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
            <div className="max-w-md">
              <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                Teslim edilebilir çıktı
              </p>
              <h2
                id="home-deliverables"
                className="mt-3 font-display text-h2 text-ink"
              >
                Sadece fikir değil, kullanılabilir teknik paket.
              </h2>
              <p className="mt-4 text-body text-steel">
                Kapsama göre gereken çıktıları baştan tanımlar, ekibinizin
                devralabileceği biçimde teslim ederiz.
              </p>
            </div>

            <ol className="grid border-l border-t border-line sm:grid-cols-2">
              {deliveryOutputs.map((output) => (
                <li
                  key={output.code}
                  className={`${styles.outputCard} border-b border-r border-line bg-white p-5 md:p-6`}
                >
                  <span className="font-mono text-eyebrow text-signal-text">
                    {output.code}
                  </span>
                  <h3 className="mt-8 font-display text-h3 text-ink">
                    {output.title}
                  </h3>
                  <p className="mt-2 text-body text-steel">
                    {output.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {technicalCases.length > 0 ? (
        <section
          className="border-b border-line bg-white"
          aria-labelledby="home-cases"
        >
          <div className={sectionPad}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                  Teknik vakalar
                </p>
                <h2 id="home-cases" className="mt-3 font-display text-h2 text-ink">
                  Kararı, yöntemi ve sınırları açıkça anlatıyoruz.
                </h2>
              </div>
              <Link
                href="/referanslar"
                className="inline-flex min-h-11 items-center font-mono text-small text-signal-text underline-offset-4 hover:underline"
              >
                Çalışma alanlarını görün →
              </Link>
            </div>

            <div className="mt-10 grid border-l border-t border-line lg:grid-cols-3">
              {technicalCases.map((post, index) => (
                <article
                  key={post.slug}
                  className={`${styles.caseCard} group relative border-b border-r border-line p-5 md:p-6`}
                >
                  <div className={styles.caseDiagram} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="mt-6 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                    Vaka {String(index + 1).padStart(2, "0")} ·{" "}
                    {post.category ?? "Teknik çalışma"}
                  </p>
                  <h3 className="mt-3 font-display text-h3 text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 group-hover:text-signal-text"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-body text-steel">
                    {post.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-6 inline-flex font-mono text-small text-signal-text"
                  >
                    Teknik vakayı okuyun →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="home-cta"
        className="bg-deep text-ink"
        aria-labelledby="home-cta-title"
      >
        <div className={sectionPad}>
          <div className="max-w-2xl">
            <h2 id="home-cta-title" className="font-display text-h2 text-ink">
              Projenizdeki eksik halkayı birlikte netleştirelim.
            </h2>
            <p className="mt-4 text-body text-ink/75">
              İlk görüşmede kapsamı, takvimi ve çıktıları yazılı koyarız.
              Bağlayıcı değildir.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button variant="light" href={appointmentCta.href}>
                {appointmentCta.label}
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center px-1 text-small text-ink/70 underline decoration-signal underline-offset-4 hover:text-ink"
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
