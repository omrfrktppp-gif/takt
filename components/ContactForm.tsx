"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formspreeId) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
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
          Formu göndererek kişisel verilerinizin işlenmesine ilişkin{" "}
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
          Aldık. En kısa sürede dönüş yapacağız.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 text-body text-ink" role="alert">
          Gönderilemedi, lütfen tekrar deneyin ya da doğrudan{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-signal underline">
            {siteConfig.email}
          </a>{" "}
          adresine yazın.
        </p>
      ) : null}

      {!formspreeId ? (
        <p className="mt-4 text-small text-steel">
          Form gönderimi için{" "}
          <code className="font-mono">NEXT_PUBLIC_FORMSPREE_ID</code> tanımlanmalı.
          Şimdilik doğrudan{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-signal underline">
            {siteConfig.email}
          </a>{" "}
          üzerinden yazabilirsiniz.
        </p>
      ) : null}
    </div>
  );
}
