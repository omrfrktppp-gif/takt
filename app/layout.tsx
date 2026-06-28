import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Nav } from "@/components/Nav";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { fontVariables } from "@/lib/fonts";
import {
  howToSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { buildSearchVerificationMetadata } from "@/lib/indexing";
import "./globals.css";

const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
  type: "image/png" as const,
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Takt — Mühendislik Danışmanlığı",
    description: siteConfig.tagline,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/webp" }],
    shortcut: "/favicon-48.png",
  },
  ...buildSearchVerificationMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#f4f6f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-paper font-body text-ink">
        <GoogleTagManager />
        <JsonLd
          data={[organizationSchema(), websiteSchema(), howToSchema()]}
        />
        <Nav />
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
        <MobileCtaBar />
        <WhatsAppButton />
        <CookieConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
