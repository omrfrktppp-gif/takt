import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";
import {
  WEB3FORMS_SUBMIT_URL,
  Web3FormsHiddenFields,
  web3formsRedirect,
} from "@/lib/web3forms";

export function ContactForm({
  compact = false,
  dense = false,
  source = "contact_form",
  redirectPath,
}: {
  compact?: boolean;
  dense?: boolean;
  source?: string;
  redirectPath?: string;
}) {
  const gap = dense ? "gap-3" : compact ? "gap-4" : "gap-5";
  const fieldPad = dense ? "px-3 py-2 text-sm" : "px-4 py-3";
  const spaceY = dense ? "space-y-3" : "space-y-5";
  const limits = contactFieldLimits;

  const subject =
    source === "contact_form"
      ? "İletişim talebi — takt.tr"
      : source === "lead_magnet"
        ? "Lead magnet talebi — takt.tr"
        : `Form talebi — ${source}`;

  const redirect =
    redirectPath ?? web3formsRedirect("/iletisim?gonderildi=1");

  return (
    <form
      action={WEB3FORMS_SUBMIT_URL}
      method="POST"
      className={spaceY}
    >
      <Web3FormsHiddenFields
        redirect={redirect}
        subject={subject}
        kaynak={source}
      />

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={compact || dense ? `grid ${gap}` : `grid ${gap} md:grid-cols-2`}>
        <label className="block">
          <span className="mb-1.5 block text-small text-steel">Ad Soyad</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            className={`w-full rounded-sm border border-line bg-white text-ink outline-none focus:border-signal ${fieldPad}`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-small text-steel">Firma</span>
          <input
            required
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={limits.company}
            className={`w-full rounded-sm border border-line bg-white text-ink outline-none focus:border-signal ${fieldPad}`}
          />
        </label>
      </div>

      <div className={compact || dense ? `grid ${gap}` : `grid ${gap} md:grid-cols-2`}>
        <label className="block">
          <span className="mb-1.5 block text-small text-steel">E-posta</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={limits.email}
            className={`w-full rounded-sm border border-line bg-white text-ink outline-none focus:border-signal ${fieldPad}`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-small text-steel">
            Telefon (opsiyonel)
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={limits.phone}
            className={`w-full rounded-sm border border-line bg-white text-ink outline-none focus:border-signal ${fieldPad}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-small text-steel">İhtiyaç / konu</span>
        <textarea
          required
          name="message"
          rows={dense ? 2 : compact ? 3 : 5}
          maxLength={limits.message}
          className={`w-full rounded-sm border border-line bg-white text-ink outline-none focus:border-signal ${fieldPad}`}
        />
      </label>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="kvkk-onay"
          name="kvkk-onay"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-line accent-signal"
        />
        <label htmlFor="kvkk-onay" className="text-small leading-snug text-steel">
          Formu kullanarak kişisel verilerinizin işlenmesine ilişkin{" "}
          <a
            href="/kvkk-aydinlatma-metni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
          >
            Aydınlatma Metni
          </a>
          &apos;ni okuduğunuzu kabul edersiniz.
        </label>
      </div>

      <button
        type="submit"
        className={`inline-flex items-center justify-center rounded bg-ink font-medium text-white transition-colors hover:bg-signal ${
          dense ? "px-4 py-2 text-sm" : "px-[22px] py-[14px] text-sm"
        }`}
      >
        Gönder
      </button>

      <p className="text-small text-steel">
        Sorun olursa doğrudan{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-ink underline decoration-signal underline-offset-4"
        >
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}
