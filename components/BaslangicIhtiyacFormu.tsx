"use client";

import { Download, FileUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { DragEvent, FormEvent, useCallback, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  baslangicFormuAsset,
} from "@/lib/baslangic-formu";
import { contactFieldLimits } from "@/lib/contact-validation";
import { siteConfig } from "@/lib/site";
import {
  getWeb3FormsAccessKey,
  parseWeb3FormsResponse,
} from "@/lib/web3forms";

type Status = "idle" | "dragging" | "uploading" | "success" | "error";

export function BaslangicIhtiyacFormu() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const limits = contactFieldLimits;

  const whatsappFormMessage = encodeURIComponent(
    "Merhaba, Takt web sitesinden doldurduğum başlangıç ihtiyaç formunu paylaşmak istiyorum.",
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.number}?text=${whatsappFormMessage}`;
  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Başlangıç ihtiyaç formu")}&body=${encodeURIComponent("Merhaba,\n\nEkte doldurduğum başlangıç ihtiyaç formunu iletiyorum.\n\n")}`;

  const validatePdf = useCallback((file: File): string | null => {
    if (
      file.type !== baslangicFormuAsset.acceptMime &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return "Yalnızca PDF dosyası yükleyebilirsiniz.";
    }
    if (file.size > baslangicFormuAsset.maxBytes) {
      return `Dosya en fazla ${Math.round(baslangicFormuAsset.maxBytes / (1024 * 1024))} MB olabilir.`;
    }
    return null;
  }, []);

  const pickFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      const error = validatePdf(file);
      if (error) {
        setSelectedFile(null);
        setStatus("error");
        setFeedback(error);
        return;
      }
      setSelectedFile(file);
      setStatus("idle");
      setFeedback("");
    },
    [validatePdf],
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setStatus("idle");
      const file = event.dataTransfer.files?.[0] ?? null;
      pickFile(file);
    },
    [pickFile],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      setStatus("error");
      setFeedback("Lütfen bir PDF dosyası seçin veya sürükleyip bırakın.");
      return;
    }

    const accessKey = getWeb3FormsAccessKey();
    if (!accessKey) {
      setStatus("error");
      setFeedback(
        "Form yapılandırması eksik. WhatsApp veya e-posta ile gönderebilirsiniz.",
      );
      return;
    }

    setStatus("uploading");
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const storedName = `takt-baslangic-formu_${timestamp}_${selectedFile.name}`;

    const web3Data = new FormData();
    web3Data.append("access_key", accessKey);
    web3Data.append(
      "subject",
      `Başlangıç ihtiyaç formu — ${name || "İsimsiz"}`.slice(0, 200),
    );
    web3Data.append("from_name", name || "takt.tr ziyaretçisi");
    web3Data.append("email", email || siteConfig.email);
    web3Data.append("replyto", email || siteConfig.email);
    web3Data.append(
      "message",
      [
        "Kaynak: baslangic_ihtiyac_formu_upload",
        name ? `Ad Soyad: ${name}` : null,
        company ? `Firma: ${company}` : null,
        email ? `Ziyaretçi e-posta: ${email}` : null,
        `Dosya: ${storedName}`,
        "",
        "Ekte doldurulmuş PDF bulunmaktadır.",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    web3Data.append("attachment", selectedFile, storedName);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3Data,
      });
      const result = await parseWeb3FormsResponse(response);

      if (!result.success) {
        setStatus("error");
        setFeedback(
          result.message ??
            "Yükleme başarısız. WhatsApp veya e-posta ile de gönderebilirsiniz.",
        );
        return;
      }

      // Drive yedeklemesi (opsiyonel, hata olursa e-posta yine gitti)
      const driveData = new FormData();
      driveData.append("file", selectedFile, storedName);
      try {
        await fetch("/api/baslangic-formu/drive", {
          method: "POST",
          body: driveData,
        });
      } catch {
        /* Drive isteğe bağlı */
      }

      setStatus("success");
      trackEvent("lead_form_submit", { location: "baslangic_formu_upload" });
      setFeedback(
        "Teşekkürler. Formunuz bize ulaştı; en kısa sürede dönüş yapacağız.",
      );
      setSelectedFile(null);
      form.reset();
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setStatus("error");
      setFeedback(
        `Yükleme başarısız. ${siteConfig.email} adresine veya WhatsApp üzerinden gönderebilirsiniz.`,
      );
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded border border-line bg-white p-6">
        <h2 className="font-display text-h3 text-ink">1. Formu indirin</h2>
        <p className="mt-3 text-body text-steel">
          Başlangıç ihtiyaç formunu tek tıkla indirin; interaktif PDF dosyasını
          ihtiyaçlarınıza göre bilgisayarınızda doldurun.
        </p>
        <a
          href={baslangicFormuAsset.downloadPath}
          download={baslangicFormuAsset.downloadFilename}
          className="mt-6 inline-flex items-center gap-2 rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal"
          onClick={() =>
            trackEvent("contact_click", { channel: "baslangic_form_download" })
          }
        >
          <Download size={18} strokeWidth={1.5} aria-hidden="true" />
          Formu indir (PDF)
        </a>
      </section>

      <section className="rounded border border-line bg-white p-6">
        <h2 className="font-display text-h3 text-ink">2. Doldurulmuş formu gönderin</h2>
        <p className="mt-3 text-body text-steel">
          Formu doldurduktan sonra bu sayfadan yükleyebilir,{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            onClick={() =>
              trackEvent("contact_click", { channel: "whatsapp_baslangic_form" })
            }
          >
            WhatsApp
          </a>{" "}
          ile veya{" "}
          <a
            href={mailtoHref}
            className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            onClick={() =>
              trackEvent("contact_click", { channel: "email_baslangic_form" })
            }
          >
            e-posta
          </a>{" "}
          üzerinden iletebilirsiniz. Yükleme yalnızca PDF kabul eder.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                inputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setStatus("dragging");
            }}
            onDragLeave={() => setStatus("idle")}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-6 py-10 text-center transition-colors ${
              status === "dragging"
                ? "border-signal bg-accent/5"
                : "border-line bg-paper hover:border-signal/40"
            }`}
          >
            <FileUp
              className="text-signal"
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 font-medium text-ink">
              PDF dosyasını sürükleyip bırakın
            </p>
            <p className="mt-1 text-small text-steel">veya dosya seçin</p>
            {selectedFile ? (
              <p className="mt-3 text-small text-ink">{selectedFile.name}</p>
            ) : null}
            <input
              ref={inputRef}
              type="file"
              name="file"
              accept={baslangicFormuAsset.acceptMime}
              className="sr-only"
              onChange={(event) =>
                pickFile(event.target.files?.[0] ?? null)
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-small text-steel">
                Ad Soyad (opsiyonel)
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                maxLength={limits.name}
                className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-small text-steel">
                E-posta (opsiyonel)
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={limits.email}
                className="w-full rounded-sm border border-line bg-white px-4 py-3 text-ink outline-none focus:border-signal"
              />
            </label>
          </div>
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

          <button
            type="submit"
            disabled={status === "uploading" || !selectedFile}
            className="inline-flex items-center justify-center gap-2 rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal disabled:opacity-60"
          >
            {status === "uploading" ? (
              <Loader2
                className="animate-spin"
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ) : null}
            {status === "uploading" ? "Yükleniyor…" : "PDF yükle"}
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
            <Link
              href="/iletisim"
              className="underline decoration-signal underline-offset-4 hover:text-signal"
            >
              İletişim
            </Link>
          </p>
        ) : null}
      </section>
    </div>
  );
}
