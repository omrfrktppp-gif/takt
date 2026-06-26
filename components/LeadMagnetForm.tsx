import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";
import {
  WEB3FORMS_SUBMIT_URL,
  Web3FormsHiddenFields,
  web3formsRedirect,
} from "@/lib/web3forms";

export function LeadMagnetForm() {
  const limits = contactFieldLimits;

  return (
    <form action={WEB3FORMS_SUBMIT_URL} method="POST" className="space-y-4">
      <Web3FormsHiddenFields
        redirect={web3formsRedirect("/iletisim?lead=1")}
        subject="Lead magnet talebi — takt.tr"
        kaynak="lead_magnet"
      />
      <input
        type="hidden"
        name="message"
        value="Özel Makine Projesi Başlangıç Kontrol Listesi indirme talebi (lead magnet)."
      />

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <label className="block">
        <span className="mb-1.5 block text-small text-steel">Ad Soyad</span>
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          maxLength={limits.name}
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-small text-steel">E-posta</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={limits.email}
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-small text-steel">
          Firma (opsiyonel)
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={limits.company}
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
        />
      </label>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="lead-kvkk-onay"
          name="kvkk-onay"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-line accent-signal"
        />
        <label htmlFor="lead-kvkk-onay" className="text-small leading-snug text-steel">
          Kişisel verilerinizin işlenmesine ilişkin{" "}
          <a
            href="/kvkk-aydinlatma-metni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
          >
            Aydınlatma Metni
          </a>
          &apos;ni okuduğunuzu kabul edersiniz.
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal"
      >
        Listeyi talep et
      </button>

      <p className="text-small text-steel">
        Sorun olursa{" "}
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
