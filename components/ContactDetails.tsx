import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <ul className="space-y-5 text-body">
          <li className="flex gap-3">
            <Mail
              className="mt-0.5 shrink-0 text-signal"
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-small text-steel">E-posta</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                {siteConfig.email}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone
              className="mt-0.5 shrink-0 text-signal"
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-small text-steel">Telefon</p>
              <a
                href={siteConfig.phoneHref}
                className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                {siteConfig.phone}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapPin
              className="mt-0.5 shrink-0 text-signal"
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-small text-steel">Konum</p>
              <p className="text-ink">{siteConfig.addressLabel}</p>
              <a
                href={siteConfig.mapsUrl}
                className="mt-1 inline-block text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Haritalar&apos;da aç
              </a>
            </div>
          </li>
        </ul>
    </aside>
  );
}
