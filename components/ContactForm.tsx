"use client";

import { FormEvent } from "react";
import { siteConfig } from "@/lib/site";

function buildMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "");
  const company = String(data.get("company") ?? "");
  const email = String(data.get("email") ?? "");
  const phone = String(data.get("phone") ?? "");
  const message = String(data.get("message") ?? "");

  const subject = `İletişim talebi — ${company}`;
  const body = [
    `Ad Soyad: ${name}`,
    `Firma: ${company}`,
    `E-posta: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    "",
    "İhtiyaç / konu:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const link = document.createElement("a");
    link.href = buildMailto(form);
    link.rel = "noopener noreferrer";
    link.click();
    form.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-small text-steel">Ad Soyad</span>
            <input
              required
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-small text-steel">Firma</span>
            <input
              required
              name="company"
              type="text"
              autoComplete="organization"
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-small text-steel">E-posta</span>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-small text-steel">
              Telefon (opsiyonel)
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-small text-steel">İhtiyaç / konu</span>
          <textarea
            required
            name="message"
            rows={5}
            className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
          />
        </label>

        <p className="text-small text-steel">
          Gönder&apos;e bastığınızda e-posta uygulamanız açılır; mesaj{" "}
          <span className="text-ink">{siteConfig.email}</span> adresine
          iletilir. Kişisel verileriniz tarayıcı adres çubuğuna yazılmaz.
        </p>

        <p className="text-small text-steel">
          Formu kullanarak kişisel verilerinizin işlenmesine ilişkin{" "}
          <span className="text-ink">aydınlatma metnini</span> okuduğunuzu
          kabul edersiniz. (Metin yakında eklenecek.)
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal"
        >
          E-posta ile gönder
        </button>
      </form>
    </div>
  );
}
