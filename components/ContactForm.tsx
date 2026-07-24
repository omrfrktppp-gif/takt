"use client";

import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";

type SubmitState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

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
  const kvkkId = useId();
  const statusId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState.status === "pending") return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      botcheck: String(formData.get("botcheck") ?? ""),
      kvkkAccepted: formData.get("kvkk-onay") === "on",
      source,
    };

    setSubmitState({ status: "pending" });
    trackEvent("contact_form_submit_start", { source });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "Talebiniz gönderilemedi. Lütfen tekrar deneyin.",
        );
      }

      formElement.reset();
      setSubmitState({
        status: "success",
        message:
          result.message ??
          "Talebiniz alındı. Görüşme için verdiğiniz iletişim bilgilerini kullanacağız.",
      });
      trackEvent("contact_form_submit_success", { source });

      if (redirectPath) {
        window.location.assign(redirectPath);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Bağlantı hatası. Lütfen tekrar deneyin.";
      setSubmitState({ status: "error", message });
      trackEvent("contact_form_submit_error", { source });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={spaceY}
      aria-describedby={statusId}
    >
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
          id={kvkkId}
          name="kvkk-onay"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-line accent-signal"
        />
        <label htmlFor={kvkkId} className="text-small leading-snug text-steel">
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
        disabled={submitState.status === "pending"}
        className={`inline-flex items-center justify-center rounded bg-ink font-medium text-white transition-colors hover:bg-signal ${
          dense ? "px-4 py-2 text-sm" : "px-[22px] py-[14px] text-sm"
        } disabled:cursor-wait disabled:opacity-60`}
      >
        {submitState.status === "pending" ? "Gönderiliyor…" : "Talebi gönder"}
      </button>

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`text-small ${
          submitState.status === "error" ? "text-red-700" : "text-steel"
        }`}
      >
        {submitState.status === "success" || submitState.status === "error"
          ? submitState.message
          : "Bilgileriniz yalnızca talebinize dönüş yapmak için kullanılır."}
      </p>

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
