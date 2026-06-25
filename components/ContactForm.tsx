"use client";

import { FormEvent, useState } from "react";
import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  compact = false,
  dense = false,
}: {
  compact?: boolean;
  dense?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      botcheck: String(data.get("botcheck") ?? ""),
      kvkkAccepted: data.get("kvkk-onay") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
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

  const gap = dense ? "gap-3" : compact ? "gap-4" : "gap-5";
  const fieldPad = dense ? "px-3 py-2 text-sm" : "px-4 py-3";
  const spaceY = dense ? "space-y-3" : "space-y-5";
  const limits = contactFieldLimits;

  return (
    <div>
      <form onSubmit={handleSubmit} className={spaceY}>
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
          disabled={status === "loading"}
          className={`inline-flex items-center justify-center rounded bg-ink font-medium text-white transition-colors hover:bg-signal disabled:opacity-60 ${
            dense ? "px-4 py-2 text-sm" : "px-[22px] py-[14px] text-sm"
          }`}
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
