import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProvider } from "@/components/scroll/ScrollContext";
import { fontVariables } from "@/lib/fonts";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Takt — Mühendislik Danışmanlığı",
    template: "%s — Takt",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Takt — Mühendislik Danışmanlığı",
    description: siteConfig.tagline,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takt",
    description: siteConfig.tagline,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${fontVariables} h-full antialiased`}>
      <body className="flex h-dvh flex-col overflow-hidden bg-paper font-body text-ink">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ScrollProvider>
          <Nav />
          <div className="relative min-h-0 flex-1">{children}</div>
        </ScrollProvider>
      </body>
    </html>
  );
}
