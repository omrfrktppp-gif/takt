import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { ConversionStory } from "@/components/home/ConversionStory";
import {
  appointmentCta,
  leadMagnet,
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

const problemPaths = [
  {
    label: "Tasarım ve analiz yükü",
    title: "Teknik ekip yetişemiyor",
    description:
      "Tasarım, hesaplama veya teknik dokümantasyon birikiyor; proje kararları gecikiyor.",
    href: "/hizmetler/tasarim-gelistirme",
    linkLabel: "Tasarım desteğini inceleyin",
  },
  {
    label: "İmalat ve tedarik",
    title: "Üretime geçiş dağınık",
    description:
      "Prototip, tedarikçi ve imalat adımları arasında tek bir teknik koordinasyon noktası eksik.",
    href: "/hizmetler/uretim-danismanligi",
    linkLabel: "Üretim desteğini inceleyin",
  },
  {
    label: "Proje ve Ar-Ge",
    title: "Kapsam ilerledikçe bulanıklaşıyor",
    description:
      "Sorumluluklar, takvim ve teknik çıktılar aynı ritimde yönetilemediği için ekip odağını kaybediyor.",
    href: "/hizmetler/proje-danismanligi",
    linkLabel: "Proje desteğini inceleyin",
  },
] as const;

const sectionPad = "mx-auto w-full max-w-content px-4 py-16 md:px-6 md:py-24";

function CtaPair({
  onDark = false,
  includeWhatsApp = false,
}: {
  onDark?: boolean;
  includeWhatsApp?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button variant={onDark ? "light" : "signal"} href={leadMagnet.href}>
        2 dakikada ihtiyacınızı netleştirin
      </Button>
      <Button
        variant="secondary"
        href={appointmentCta.href}
        className={
          onDark
            ? "border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
            : undefined
        }
      >
        Görüşme planlayın
      </Button>
      {includeWhatsApp ? (
        <a
          href={siteConfig.whatsapp.href}
          className={`px-1 py-2 text-small underline decoration-signal underline-offset-4 ${
            onDark ? "text-white/70 hover:text-white" : "text-steel hover:text-ink"
          }`}
        >
          WhatsApp&apos;tan yazın
        </a>
      ) : null}
    </div>
  );
}

export function HomeHub() {
  return (
    <SeoPageLayout>
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l border-line bg-[linear-gradient(135deg,transparent_0_49.5%,rgba(31,79,224,0.12)_50%,transparent_50.5%)] bg-[length:38px_38px] lg:block"
          aria-hidden="true"
        />
        <div className={`${sectionPad} relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-32`}>
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
            <CtaPair includeWhatsApp />
            <p className="mt-5 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Bağlayıcı değil · İlk görüşmede kapsam netleşir
            </p>
          </div>
          <div className="border-l-2 border-signal bg-white/75 p-6 backdrop-blur-sm lg:mb-2 lg:p-8">
            <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-signal">
              Nereden başlayacağınızı bilmiyor musunuz?
            </p>
            <p className="mt-4 font-display text-h3 text-ink">
              İhtiyacı tarif edin; doğru hizmet yolunu birlikte çıkaralım.
            </p>
            <Link
              href={leadMagnet.href}
              className="mt-6 inline-block font-mono text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              İhtiyaç analizini başlatın →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-b border-line bg-white"
        aria-labelledby="home-problem"
      >
        <div className={sectionPad}>
          <div className="max-w-2xl">
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Başlangıç noktası
            </p>
            <h2 id="home-problem" className="mt-3 font-display text-h2 text-ink">
              Şu anda iş nerede sıkışıyor?
            </h2>
            <p className="mt-3 text-body text-steel">
              Hizmet adı seçmek zorunda değilsiniz. Size en yakın problemi
              seçmeniz yeterli.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
            {problemPaths.map((path, index) => (
              <article
                key={path.title}
                className="group flex min-h-72 flex-col bg-white p-6 transition-colors hover:bg-paper md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal">
                    {path.label}
                  </p>
                  <span className="font-mono text-eyebrow text-steel">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-h3 text-ink">
                  {path.title}
                </h3>
                <p className="mt-3 text-body text-steel">{path.description}</p>
                <Link
                  href={path.href}
                  className="mt-auto pt-8 font-mono text-small text-ink underline decoration-signal underline-offset-4 group-hover:text-signal"
                >
                  {path.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
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
            <CtaPair onDark includeWhatsApp />
            <p className="mt-10 text-small text-white/55">
              {siteConfig.phone} · {siteConfig.email}
            </p>
          </div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
