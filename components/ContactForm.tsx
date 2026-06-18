"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    if (!accessKey) {
      setStatus("error");
      setFeedback("Form anahtarı tanımlı değil. Lütfen doğrudan e-posta yazın.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `İletişim talebi — ${company}`,
          from_name: name,
          name,
          email,
          phone,
          replyto: email,
          message: [
            `Firma: ${company}`,
            phone ? `Telefon: ${phone}` : null,
            "",
            "İhtiyaç / konu:",
            message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setStatus("error");
        setFeedback(
          result.message ??
            "Gönderilemedi, lütfen tekrar deneyin ya da doğrudan e-posta yazın.",
        );
        return;
      }

      form.reset();
      setStatus("success");
      setFeedback("Aldık. En kısa sürede dönüş yapacağız.");
    } catch {
      setStatus("error");
      setFeedback(
        `Gönderilemedi. Doğrudan ${siteConfig.email} adresine yazabilirsiniz.`,
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

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
          Formu gönderdiğinizde mesaj doğrudan{" "}
          <span className="text-ink">{siteConfig.email}</span> adresine iletilir;
          e-posta uygulamanız açılmaz.
        </p>

        <p className="text-small text-steel">
          Formu kullanarak kişisel verilerinizin işlenmesine ilişkin{" "}
          <span className="text-ink">aydınlatma metnini</span> okuduğunuzu
          kabul edersiniz. (Metin yakında eklenecek.)
        </p>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal disabled:opacity-60"
        >
          {status === "loading" ? "Gönderiliyor…" : "Gönder"}
        </button>
      </form>

      {status === "success" ? (
        <p className="mt-4 text-body text-ink" role="status">
          {feedback}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 text-body text-ink" role="alert">
          {feedback}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-signal underline"
          >
            {siteConfig.email}
          </a>
        </p>
      ) : null}
    </div>
  );
}
