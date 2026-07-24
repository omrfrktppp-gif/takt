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
  const spaceY = dense ? "space-y-3" : "space-y-5";
  const limits = contactFieldLimits;
  const kvkkId = useId();
  const statusId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const isPending = submitState.status === "pending";
  const isError = submitState.status === "error";
  const isSuccess = submitState.status === "success";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

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
      aria-busy={isPending}
      noValidate
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div
        className={
          compact || dense ? `grid ${gap}` : `grid ${gap} md:grid-cols-2`
        }
      >
        <label className="block">
          <span className="form-label form-label-required">Ad Soyad</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            disabled={isPending}
            aria-required="true"
            className="form-input"
          />
        </label>
        <label className="block">
          <span className="form-label form-label-required">Firma</span>
          <input
            required
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={limits.company}
            disabled={isPending}
            aria-required="true"
            className="form-input"
          />
        </label>
      </div>

      <div
        className={
          compact || dense ? `grid ${gap}` : `grid ${gap} md:grid-cols-2`
        }
      >
        <label className="block">
          <span className="form-label form-label-required">E-posta</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={limits.email}
            disabled={isPending}
            aria-required="true"
            className="form-input"
          />
        </label>
        <label className="block">
          <span className="form-label">Telefon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={limits.phone}
            disabled={isPending}
            className="form-input"
            aria-describedby={`${statusId}-phone-hint`}
          />
          <span id={`${statusId}-phone-hint`} className="sr-only">
            Opsiyonel alan
          </span>
        </label>
      </div>

      <label className="block">
        <span className="form-label form-label-required">İhtiyaç / konu</span>
        <textarea
          required
          name="message"
          rows={dense ? 2 : compact ? 3 : 5}
          maxLength={limits.message}
          disabled={isPending}
          aria-required="true"
          className="form-input form-textarea"
        />
      </label>

      <div className="form-checkbox-row">
        <input
          type="checkbox"
          id={kvkkId}
          name="kvkk-onay"
          required
          disabled={isPending}
          aria-required="true"
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
        disabled={isPending}
        className="inline-flex min-h-11 items-center justify-center rounded bg-ink px-[22px] py-3 text-sm font-medium text-white transition-colors hover:bg-signal disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? "Gönderiliyor…" : "Talebi gönder"}
      </button>

      <p
        id={statusId}
        role={isError ? "alert" : "status"}
        aria-live="polite"
        className={
          isError ? "form-error" : isSuccess ? "form-success" : "form-hint"
        }
      >
        {isSuccess || isError
          ? submitState.message
          : "Bilgileriniz yalnızca talebinize dönüş yapmak için kullanılır."}
      </p>

      <p className="form-hint">
        Sorun olursa doğrudan{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="touch-target-inline text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
        >
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}
