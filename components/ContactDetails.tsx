import { Mail, MapPin, Phone } from "lucide-react";
import { formatSiteAddressLines, siteConfig } from "@/lib/site";

type ContactDetailsProps = {
  className?: string;
  prominent?: boolean;
};

export function ContactDetails({
  className = "",
  prominent = false,
}: ContactDetailsProps) {
  const iconSize = prominent ? 22 : 18;
  const labelClass = prominent ? "text-body text-steel" : "text-small text-steel";
  const valueClass = prominent
    ? "text-body-lg text-ink"
    : "text-body text-ink";

  return (
    <aside className={className}>
      <ul className="flex flex-col gap-6">
        <li className="flex gap-4">
          <Mail
            className="mt-1 shrink-0 text-signal"
            size={iconSize}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <div>
            <p className={labelClass}>E-posta</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className={`${valueClass} underline decoration-signal underline-offset-4 hover:text-signal`}
            >
              {siteConfig.email}
            </a>
          </div>
        </li>
        <li className="flex gap-4">
          <Phone
            className="mt-1 shrink-0 text-signal"
            size={iconSize}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <div>
            <p className={labelClass}>Telefon</p>
            <a
              href={siteConfig.phoneHref}
              className={`${valueClass} underline decoration-signal underline-offset-4 hover:text-signal`}
            >
              {siteConfig.phone}
            </a>
          </div>
        </li>
        <li className="flex gap-4">
          <MapPin
            className="mt-1 shrink-0 text-signal"
            size={iconSize}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <div>
            <p className={labelClass}>Konum</p>
            <p className={valueClass}>
              {formatSiteAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
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
