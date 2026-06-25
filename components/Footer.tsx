import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Cadence } from "@/components/Cadence";
import { ContactChannelLink } from "@/components/ContactChannelLink";
import { getChapterPanels, panelPath } from "@/lib/pages";
import { sectors } from "@/lib/sectors";
import { leadMagnet, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const services = getChapterPanels("hizmetler");
  const capacity = getChapterPanels("kapasitemiz").filter((panel) => panel.title);
  const pageLinks = navLinks.filter((link) => link.id !== "lead-magnet");

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
          <div className="md:col-span-2 xl:col-span-1 2xl:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
            >
              <BrandLogo size={32} />
              takt
            </Link>
            <p className="mt-4 max-w-sm text-small text-steel">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Sayfalar
            </p>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-ink hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Sektörler
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sektorler"
                  className="text-small text-ink hover:text-signal"
                >
                  Tüm sektörler
                </Link>
              </li>
              {sectors.map((sector) => (
                <li key={sector.id}>
                  <Link
                    href={`/sektorler/${sector.id}`}
                    className="text-small text-ink hover:text-signal"
                  >
                    {sector.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Kaynaklar
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href={leadMagnet.href}
                  className="text-small text-ink hover:text-signal"
                >
                  {leadMagnet.label}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Hizmetler
            </p>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={panelPath("hizmetler", service.id)}
                    className="text-small text-ink hover:text-signal"
                  >
                    {service.title ?? service.id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              Kapasitemiz
            </p>
            <ul className="space-y-2">
              {capacity.map((item) => (
                <li key={item.id}>
                  <Link
                    href={panelPath("kapasitemiz", item.id)}
                    className="text-small text-ink hover:text-signal"
                  >
                    {item.title ?? item.id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              İletişim
            </p>
            <ul className="space-y-2 text-small">
              <li>
                <ContactChannelLink
                  href={`mailto:${siteConfig.email}`}
                  channel="email"
                  className="text-ink hover:text-signal"
                >
                  {siteConfig.email}
                </ContactChannelLink>
              </li>
              <li>
                <ContactChannelLink
                  href={siteConfig.phoneHref}
                  channel="phone"
                  className="text-ink hover:text-signal"
                >
                  {siteConfig.phone}
                </ContactChannelLink>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  className="text-ink hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Haritalar
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  className="text-ink hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <Cadence variant="footer" tickCount={9} activeIndex={4} />
          <div className="flex flex-col items-start gap-2 md:items-end">
            <Link
              href="/kvkk-aydinlatma-metni"
              className="font-mono text-small text-steel hover:text-signal"
            >
              KVKK Aydınlatma Metni
            </Link>
            <p className="font-mono text-small text-steel">
              © {new Date().getFullYear()} Takt. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
