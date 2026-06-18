import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProvider } from "@/components/scroll/ScrollContext";
import { fontVariables } from "@/lib/fonts";
import {
  howToSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
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
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
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
    icon: "/icon",
  },
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
      <body className="flex min-h-dvh flex-col bg-paper font-body text-ink">
        <JsonLd
          data={[organizationSchema(), websiteSchema(), howToSchema()]}
        />
        <ScrollProvider>
          <Nav />
          <div className="relative min-h-0 flex-1">{children}</div>
        </ScrollProvider>
      </body>
    </html>
  );
}
