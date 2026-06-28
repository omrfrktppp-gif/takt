import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import {
  appointmentCta,
  leadMagnet,
  siteConfig,
} from "@/lib/site";

const primaryLinks = [
  {
    href: "/hakkimizda",
    label: "Hakkımızda",
    description: "Ekibimiz, odağımız ve çalışma alanlarımız.",
  },
  {
    href: "/hizmetler",
    label: "Hizmetlerimiz",
    description: "Danışmanlık, tasarım, analiz, üretim ve Ar-Ge desteği.",
  },
  {
    href: "/kapasitemiz",
    label: "Kapasitemiz",
    description: "3D, CNC, lazer, fason üretim ve tek noktadan koordinasyon.",
  },
  {
    href: "/yaklasim",
    label: "Yaklaşım",
    description: "Net kapsam, gerçekçi mühendislik, ölçülebilir tempo.",
  },
  {
    href: "/sektorler",
    label: "Sektörler",
    description: "Savunma, Ar-Ge, otomotiv, tıbbi cihaz ve özel makina.",
  },
  {
    href: "/referanslar",
    label: "Referanslar",
    description: "Çalıştığımız proje tipleri ve alanlar.",
  },
] as const;

const resourceLinks = [
  {
    href: "/rehber",
    label: "Teknik rehberler",
    description: "Tersine mühendislik, FEA, yalın üretim, destek programları.",
  },
  {
    href: leadMagnet.href,
    label: leadMagnet.label,
    description: leadMagnet.description,
  },
  { href: "/blog", label: "Blog", description: "Teknik yazılar ve mühendislik notları." },
  { href: "/sss", label: "SSS", description: "Sık sorulan sorular ve kısa yanıtlar." },
] as const;

const contactLinks = [
  {
    href: "/iletisim",
    label: "İletişim",
    description: "Adres, telefon, e-posta ve mesaj formu.",
  },
  {
    href: appointmentCta.href,
    label: appointmentCta.label,
    description: "Danışmanlık veya ön görüşme randevusu.",
  },
] as const;

function HubLinkGrid({
  links,
}: {
  links: readonly { href: string; label: string; description: string }[];
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group block rounded border border-line bg-white p-5 transition-colors hover:border-signal/40 hover:bg-accent/5"
          >
            <span className="font-display text-h3 text-ink group-hover:text-signal">
              {link.label}
            </span>
            <span className="mt-2 block text-small text-steel">{link.description}</span>
            <span className="mt-3 inline-block font-mono text-small text-signal">
              Sayfaya git →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function HomeHub() {
  return (
    <SeoPageLayout>
      <div className="mx-auto w-full max-w-content px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="max-w-3xl">
          <Cadence variant="hero" tickCount={9} activeIndex={4} className="max-w-xs" />
          <p className="mt-8 font-mono text-eyebrow uppercase tracking-[0.12em] text-signal">
            Mühendislik danışmanlığı · Ankara
          </p>
          <h1 className="mt-4 font-display text-h1 text-ink">{siteConfig.tagline}</h1>
          <p className="mt-4 text-body-lg text-steel">{siteConfig.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={appointmentCta.href}>{appointmentCta.label}</Button>
            <Button variant="secondary" href={siteConfig.whatsapp.href}>
              WhatsApp
            </Button>
            <Button variant="secondary" href="/iletisim">
              İletişim
            </Button>
          </div>
        </div>

        <section className="mt-16" aria-labelledby="hub-kurumsal">
          <h2
            id="hub-kurumsal"
            className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel"
          >
            Keşfedin
          </h2>
          <div className="mt-6">
            <HubLinkGrid links={primaryLinks} />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="hub-kaynaklar">
          <h2
            id="hub-kaynaklar"
            className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel"
          >
            Kaynaklar
          </h2>
          <div className="mt-6">
            <HubLinkGrid links={resourceLinks} />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="hub-iletisim">
          <h2
            id="hub-iletisim"
            className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel"
          >
            İletişim
          </h2>
          <div className="mt-6">
            <HubLinkGrid links={contactLinks} />
          </div>
        </section>

        <p className="mt-12 max-w-2xl text-small text-steel">
          {siteConfig.phone} · {siteConfig.email} ·{" "}
          <a
            href={siteConfig.mapsUrl}
            className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Haritalar
          </a>
        </p>
      </div>
    </SeoPageLayout>
  );
}
