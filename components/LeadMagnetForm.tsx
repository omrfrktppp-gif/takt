"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";
import {
  getWeb3FormsAccessKey,
  parseWeb3FormsResponse,
} from "@/lib/web3forms";

type Status = "idle" | "loading" | "success" | "error";

export function LeadMagnetForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const limits = contactFieldLimits;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const botcheck = String(data.get("botcheck") ?? "");
    if (botcheck) {
      setStatus("error");
      setFeedback("Gönderilemedi.");
      return;
    }

    const accessKey = getWeb3FormsAccessKey();
    if (!accessKey) {
      setStatus("error");
      setFeedback(
        "Form yapılandırması eksik. Doğrudan e-posta yazın.",
      );
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim() || "Belirtilmedi";
    const email = String(data.get("email") ?? "").trim();
    const message =
      "Özel Makine Projesi Başlangıç Kontrol Listesi indirme talebi (lead magnet).";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Lead magnet talebi — ${company}`.slice(0, 200),
          from_name: name,
          name,
          email,
          replyto: email,
          message: [
            "Kaynak: lead_magnet",
            `Firma: ${company}`,
            "",
            "İhtiyaç / konu:",
            message,
          ].join("\n"),
        }),
      });

      const result = await parseWeb3FormsResponse(response);

      if (!result.success) {
        setStatus("error");
        setFeedback(
          result.message ??
            "Gönderilemedi, lütfen tekrar deneyin ya da doğrudan e-posta yazın.",
        );
        return;
      }

      form.reset();
      setStatus("success");
      trackEvent("lead_form_submit", { location: "lead_magnet" });
      setFeedback(
        "Teşekkürler. Kontrol listesi hazır olduğunda e-posta ile paylaşılacak.",
      );
    } catch {
      setStatus("error");
      setFeedback(
        `Gönderilemedi. Doğrudan ${siteConfig.email} adresine yazabilirsiniz.`,
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal disabled:opacity-60"
        >
          {status === "loading" ? "Gönderiliyor…" : "Listeyi talep et"}
        </button>
      </form>

      {status === "success" ? (
        <p className="mt-4 text-body text-ink" role="status">
          {feedback}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 text-body text-ink" role="alert">
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
