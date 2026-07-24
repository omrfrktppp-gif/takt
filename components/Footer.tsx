import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactChannelLink } from "@/components/ContactChannelLink";
import { appointmentCta, leadMagnet, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const pageLinks = navLinks.filter((link) => link.id !== "lead-magnet");

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr_0.8fr] lg:gap-14">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
              aria-label="Takt ana sayfa"
            >
              <BrandLogo size={32} />
              takt
            </Link>
            <p className="mt-4 max-w-sm text-small text-steel">
              {siteConfig.description}
            </p>
            <div className="mt-4 text-small">
              <ContactChannelLink
                href={`mailto:${siteConfig.email}`}
                channel="email"
                className="flex min-h-11 items-center text-ink hover:text-signal"
              >
                {siteConfig.email}
              </ContactChannelLink>
              <ContactChannelLink
                href={siteConfig.phoneHref}
                channel="phone"
                className="flex min-h-11 items-center text-ink hover:text-signal"
              >
                {siteConfig.phone}
              </ContactChannelLink>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Keşfedin
            </p>
            <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-small text-ink hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Hızlı yollar
            </p>
            <ul className="mt-1 grid grid-cols-2 gap-x-4 text-small sm:grid-cols-4 lg:grid-cols-2">
              {[
                ["Tasarım", "/hizmetler/tasarim-gelistirme"],
                ["Analiz", "/hizmetler/analiz-hesaplama"],
                ["Üretim", "/hizmetler/uretim-danismanligi"],
                ["3B tarama", "/kapasitemiz/3d-tarama"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex min-h-11 items-center text-ink hover:text-signal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              İletişim
            </p>
            <ul className="grid grid-cols-2 gap-x-4 text-small lg:block">
              <li>
                <ContactChannelLink
                  href={`mailto:${siteConfig.email}`}
                  channel="email"
                  className="flex min-h-11 items-center text-ink hover:text-signal"
                >
                  E-posta
                </ContactChannelLink>
              </li>
              <li>
                <ContactChannelLink
                  href={siteConfig.phoneHref}
                  channel="phone"
                  className="flex min-h-11 items-center text-ink hover:text-signal"
                >
                  Telefon
                </ContactChannelLink>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  className="flex min-h-11 items-center text-ink hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Haritalar
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  className="flex min-h-11 items-center text-ink hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-col items-start border-t border-line pt-3">
              <Link
                href={leadMagnet.href}
                className="flex min-h-11 items-center text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                İhtiyaç analizi
              </Link>
              <Link
                href={appointmentCta.href}
                className="flex min-h-11 items-center text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                Görüşme planlayın
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/kvkk-aydinlatma-metni"
            className="flex min-h-11 items-center font-mono text-small text-steel hover:text-signal"
          >
            KVKK Aydınlatma Metni
          </Link>
          <p className="font-mono text-small text-steel">
            © {new Date().getFullYear()} Takt. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
