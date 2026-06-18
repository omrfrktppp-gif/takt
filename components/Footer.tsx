import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { navLinks, servicePillars, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/hakkimizda"
              className="font-display text-lg font-semibold tracking-tight text-ink"
            >
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
              {navLinks.map((link) => (
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
              Hizmetler
            </p>
            <ul className="space-y-2">
              {servicePillars.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/hizmetler#${service.id}`}
                    className="text-small text-ink hover:text-signal"
                  >
                    {service.title}
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
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink hover:text-signal"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="text-ink hover:text-signal"
                >
                  {siteConfig.phone}
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
