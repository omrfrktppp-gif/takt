/**
 * SEO metadata — bölüm ve panel sayfaları için title/description/canonical.
 * Yeni bölüm: `chapterSeo` kaydı + `app/{path}/page.tsx` redirect.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { ContentPanel } from "@/lib/content";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export const chapterSeo: Record<string, PageSeo> = {
  hakkimizda: {
    title: "Hakkımızda",
    description:
      "Takt, makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan mühendislik gücü katan Ankara merkezli danışmanlık ekibidir.",
    path: "/hakkimizda",
  },
  hizmetler: {
    title: "Hizmetler",
    description:
      "Proje danışmanlığı, tasarım, analiz, üretim danışmanlığı, Ar-Ge ve TÜBİTAK/KOSGEB/patent destekleri tek elden.",
    path: "/hizmetler",
  },
  kapasitemiz: {
    title: "Kapasitemiz",
    description:
      "3D tarama/baskı, CNC, lazer kesim, fason üretim, kaynak, kaplama — geniş çözüm ortağı ağıyla tek noktadan.",
    path: "/kapasitemiz",
  },
  yaklasim: {
    title: "Yaklaşım",
    description:
      "Net kapsam, doğru tempo ve gerçekçi mühendislik: süreçlerinize ölçülebilir bir ritim kazandırıyoruz.",
    path: "/yaklasim",
  },
  iletisim: {
    title: "İletişim",
    description:
      "Projenizdeki eksik halkayı konuşalım. Takt ile görüşme planlayın.",
    path: "/iletisim",
  },
  "gorusme-planla": {
    title: "Görüşme Planla",
    description:
      "Takt ile danışmanlık veya ön görüşme randevusu planlayın. Takvim Türkiye saati ve Türkçe olarak gösterilir.",
    path: "/gorusme-planla",
  },
  referanslar: {
    title: "Referanslar",
    description: "Çalıştığımız proje tipleri ve çalışma alanları.",
    path: "/referanslar",
  },
  sss: {
    title: "Sık Sorulan Sorular",
    description:
      "Takt hakkında sık sorulan sorular: hizmetler, üretim modeli, kapsam, konum ve fikirden üretime süreç.",
    path: "/sss",
  },
};

export const blogSeo: PageSeo = {
  title: "Blog",
  description:
    "Mühendislik danışmanlığı, makina tasarımı, üretim ve Ar-Ge üzerine teknik yazılar — Takt blog.",
  path: "/blog",
};

function truncate(text: string, max = 155): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function panelSeo(
  chapterLabel: string,
  panel: ContentPanel,
  path: string,
): PageSeo {
  const title = panel.title ?? chapterLabel;
  return {
    title,
    description: truncate(panel.body),
    path,
  };
}

export function buildMetadata({
  title,
  description,
  path,
}: PageSeo): Metadata {
  const canonical = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.name,
      title: `${title} — ${siteConfig.name}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description,
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
  };
}
