import type { Metadata, Viewport } from "next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { EnglishCopyBridge } from "@/components/EnglishCopyBridge";
import { LocalePersistence } from "@/components/LocalePersistence";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Nav } from "@/components/Nav";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { fontVariables } from "@/lib/fonts";
import {
  founderPersonSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { buildSearchVerificationMetadata } from "@/lib/indexing";
import "./globals.css";

const ogImage = {
  url: "/opengraph-image.webp",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
  type: "image/webp" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Takt — Mühendislik Danışmanlığı",
    template: "%s — Takt",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "engineering",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: siteConfig.name,
    title: "Takt — Mühendislik Danışmanlığı",
    description: siteConfig.tagline,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/opengraph-image.webp"],
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/favicon-96.webp", sizes: "96x96", type: "image/webp" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/webp" }],
    shortcut: "/favicon-48.webp",
  },
  ...buildSearchVerificationMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#15181c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-paper font-body text-ink">
        <GoogleTagManager />
        <LocalePersistence />
        <EnglishCopyBridge />
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            founderPersonSchema(),
          ]}
        />
        <Nav />
        <CookieConsentBanner />
        <main className="relative flex min-h-0 flex-1 flex-col">{children}</main>
        <MobileCtaBar />
        <WhatsAppButton />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
