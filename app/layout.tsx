import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Nav } from "@/components/Nav";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProvider } from "@/components/scroll/ScrollContext";
import { fontVariables } from "@/lib/fonts";
import {
  howToSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { buildSearchVerificationMetadata } from "@/lib/indexing";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Takt — Mühendislik Danışmanlığı",
    template: "%s — Takt",
  },
  description:
    "Makina imalatı ve sanayide firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  category: "engineering",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Takt — Mühendislik Danışmanlığı",
    description: siteConfig.tagline,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/logo.webp", sizes: "700x700", type: "image/webp" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/webp" }],
    shortcut: "/favicon-48.png",
  },
  ...buildSearchVerificationMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#12161C",
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
      <body className="flex h-dvh flex-col overflow-hidden bg-paper font-body text-ink">
        <GoogleTagManager />
        <JsonLd
          data={[organizationSchema(), websiteSchema(), howToSchema()]}
        />
        <ScrollProvider>
          <Nav />
          <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
          <MobileCtaBar />
          <WhatsAppButton />
        </ScrollProvider>
      </body>
    </html>
  );
}
