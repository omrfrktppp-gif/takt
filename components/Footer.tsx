"use client";

import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactChannelLink } from "@/components/ContactChannelLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocaleLink } from "@/components/LocaleLink";
import { isEnglishPath } from "@/lib/i18n";
import { uiText } from "@/lib/i18n-ui";
import { appointmentCta, leadMagnet, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  const locale = isEnglishPath(pathname) ? "en" : "tr";
  const pageLinks = navLinks.filter((link) => link.id !== "lead-magnet");

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr_0.8fr] lg:gap-14">
          <div>
            <LocaleLink
              href="/"
              className="inline-flex min-h-11 items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
              aria-label={locale === "en" ? "Takt home" : "Takt ana sayfa"}
            >
              <BrandLogo size={32} />
              takt
            </LocaleLink>
            <p className="mt-4 max-w-sm text-small text-steel">
              {locale === "en"
                ? "On-demand engineering expertise in design, analysis, project management, and manufacturing coordination for machinery manufacturers, R&D teams, and defense companies."
                : siteConfig.description}
            </p>
            <div className="mt-4 text-small">
              <ContactChannelLink
                href={`mailto:${siteConfig.email}`}
                channel="email"
                className="flex min-h-11 items-center text-ink hover:text-signal-text"
              >
                {siteConfig.email}
              </ContactChannelLink>
              <ContactChannelLink
                href={siteConfig.phoneHref}
                channel="phone"
                className="flex min-h-11 items-center text-ink hover:text-signal-text"
              >
                {siteConfig.phone}
              </ContactChannelLink>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              {uiText("Keşfedin", locale)}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    className="flex min-h-11 items-center text-small text-ink hover:text-signal-text"
                  >
                    {uiText(link.label, locale)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              {uiText("Hızlı yollar", locale)}
            </p>
            <ul className="mt-1 grid grid-cols-2 gap-x-4 text-small sm:grid-cols-4 lg:grid-cols-2">
              {[
                ["Tasarım", "/hizmetler/tasarim-gelistirme"],
                ["Analiz", "/hizmetler/analiz-hesaplama"],
                ["Üretim", "/hizmetler/uretim-danismanligi"],
                ["3B tarama", "/kapasitemiz/3d-tarama"],
              ].map(([label, href]) => (
                <li key={href}>
                  <LocaleLink
                    href={href}
                    className="flex min-h-11 items-center text-ink hover:text-signal-text"
                  >
                    {uiText(label, locale)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
              {uiText("İletişim", locale)}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 text-small lg:block">
              <li>
                <ContactChannelLink
                  href={`mailto:${siteConfig.email}`}
                  channel="email"
                  className="flex min-h-11 items-center text-ink hover:text-signal-text"
                >
                  {uiText("E-posta", locale)}
                </ContactChannelLink>
              </li>
              <li>
                <ContactChannelLink
                  href={siteConfig.phoneHref}
                  channel="phone"
                  className="flex min-h-11 items-center text-ink hover:text-signal-text"
                >
                  {uiText("Telefon", locale)}
                </ContactChannelLink>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  className="flex min-h-11 items-center text-ink hover:text-signal-text"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {uiText("Google Haritalar", locale)}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  className="flex min-h-11 items-center text-ink hover:text-signal-text"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-col items-start border-t border-line pt-3">
              <LocaleLink
                href={leadMagnet.href}
                className="flex min-h-11 items-center text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal-text"
              >
                {uiText("İhtiyaç analizi", locale)}
              </LocaleLink>
              <LocaleLink
                href={appointmentCta.href}
                className="flex min-h-11 items-center text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal-text"
              >
                {uiText("Görüşme planlayın", locale)}
              </LocaleLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <LanguageSwitcher />
          <LocaleLink
            href="/kvkk-aydinlatma-metni"
            className="flex min-h-11 items-center font-mono text-small text-steel hover:text-signal-text"
          >
            {uiText("KVKK Aydınlatma Metni", locale)}
          </LocaleLink>
          <p className="font-mono text-small text-steel">
            © {new Date().getFullYear()} Takt. {uiText("Tüm hakları saklıdır.", locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
