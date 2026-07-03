/**
 * Resend bağlantı testi — ilk kurulumda çalıştırın.
 *
 * 1. .env.local oluşturun (veya düzenleyin):
 *    RESEND_API_KEY=re_xxxxxxxxx   ← Resend panelindeki gerçek anahtarınız
 *    RESEND_FROM=onboarding@resend.dev
 *    RESEND_TO=omrfrktppp@gmail.com
 *
 * 2. npm run test:resend
 *
 * Domain doğrulandıktan sonra RESEND_FROM=Takt <noreply@takt.tr> kullanın.
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY?.trim();
if (!apiKey || apiKey === "re_xxxxxxxxx") {
  console.error(
    "RESEND_API_KEY eksik veya placeholder. .env.local içine gerçek anahtarınızı yazın (re_...).",
  );
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
  from: process.env.RESEND_FROM?.trim() ?? "onboarding@resend.dev",
  to: process.env.RESEND_TO?.trim() ?? "omrfrktppp@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});

if (error) {
  console.error("Resend hatası:", error);
  process.exit(1);
}

console.log("E-posta gönderildi:", data);
