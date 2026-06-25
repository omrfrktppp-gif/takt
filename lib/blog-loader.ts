import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { BlogPost, BlogPostSection } from "@/lib/blog-types";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type FrontMatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  status: string;
  author?: string;
  category?: string;
  tags: string[];
  reading_time?: number;
};

const CATEGORY_TAG_MAP: Record<string, string> = {
  "DFM/DFA": "dfm-dfa",
  "Japon Mühendislik İlkeleri": "japon-muhendislik",
  "Kalite İlkeleri": "kalite-ilkeleri",
  "Mühendislik Trendleri": "muhendislik-trendleri",
  "Saha & Analiz": "analiz-hesaplama",
};

const TAG_ALIAS_MAP: Record<string, string> = {
  dfm: "dfm-dfa",
  dfa: "dfm-dfa",
  dfam: "dfm-dfa",
  gdt: "dfm-dfa",
  "poka-yoke": "dfm-dfa",
  "lazer-kesim": "kapasite-imalat",
  "eklemeli-imalat": "kapasite-imalat",
  "metal-3d-baski": "kapasite-imalat",
  "3d-baski": "kapasite-imalat",
  prototip: "kapasite-imalat",
  "makine-tasarimi": "tasarim-gelistirme",
  tasarim: "tasarim-gelistirme",
  "generative-design": "tasarim-gelistirme",
  topoloji: "tasarim-gelistirme",
  hafifletme: "tasarim-gelistirme",
  lightweighting: "tasarim-gelistirme",
  simulasyon: "analiz-hesaplama",
  "dijital-ikiz": "analiz-hesaplama",
  "digital-twin": "analiz-hesaplama",
  fmea: "kalite-ilkeleri",
  "six-sigma": "kalite-ilkeleri",
  taguchi: "kalite-ilkeleri",
  kalite: "kalite-ilkeleri",
  muda: "japon-muhendislik",
  kaizen: "japon-muhendislik",
  gemba: "japon-muhendislik",
  "genchi-genbutsu": "japon-muhendislik",
  "yalin-uretim": "japon-muhendislik",
  "termal-genlesme": "analiz-hesaplama",
  "termal-gerilme": "analiz-hesaplama",
  "surdurulebilir-uretim": "muhendislik-trendleri",
  "endustri-40": "muhendislik-trendleri",
  "uretim-yontemi": "uretim-danismanligi",
  "talasli-imalat": "uretim-danismanligi",
  verimlilik: "proje-danismanligi",
  "surec-iyilestirme": "proje-danismanligi",
};

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function normalizeHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'")
    .trim();
}

function parseQuotedValue(line: string, key: string): string {
  const match = line.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`));
  return match?.[1] ?? "";
}

function parseFrontMatter(raw: string): { data: FrontMatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("YAML front matter bulunamadı");
  }

  const yaml = match[1];
  const body = match[2].trim();
  const lines = yaml.split(/\r?\n/);

  const data: FrontMatter = {
    title: "",
    description: "",
    slug: "",
    date: "",
    status: "draft",
    tags: [],
  };

  for (const line of lines) {
    if (line.startsWith("title:")) data.title = parseQuotedValue(line, "title");
    else if (line.startsWith("description:"))
      data.description = parseQuotedValue(line, "description");
    else if (line.startsWith("slug:")) data.slug = parseQuotedValue(line, "slug");
    else if (line.startsWith("date:"))
      data.date = String(line.split(":").slice(1).join(":").trim());
    else if (line.startsWith("updated:"))
      data.updated = String(line.split(":").slice(1).join(":").trim());
    else if (line.startsWith("status:"))
      data.status = line.split(":").slice(1).join(":").trim();
    else if (line.startsWith("author:"))
      data.author = parseQuotedValue(line, "author");
    else if (line.startsWith("category:"))
      data.category = parseQuotedValue(line, "category");
    else if (line.startsWith("reading_time:"))
      data.reading_time = Number(line.split(":")[1]?.trim());
    else if (line.startsWith("tags:")) {
      const arrayMatch = line.match(/\[([^\]]*)\]/);
      if (arrayMatch) {
        data.tags = arrayMatch[1]
          .split(",")
          .map((tag) => tag.trim().replace(/^"|"$/g, ""))
          .filter(Boolean);
      }
    }
  }

  return { data, body };
}

function parseCtaBlock(text: string): BlogPostSection["callToAction"] | undefined {
  const linkMatch = text.match(/\*\*([^*]+)\*\*[^[]*\[([^\]]+)\]\(([^)]+)\)/);
  if (!linkMatch) return undefined;

  let href = linkMatch[3].trim();
  if (href.includes("takt.tr/iletisim") || href === "/iletisim") {
    href = "/iletisim";
  } else if (href.startsWith("https://takt.tr")) {
    href = href.replace("https://takt.tr", "");
  }

  return {
    lead: stripMarkdownInline(linkMatch[1]),
    label: linkMatch[2].trim(),
    href,
  };
}

function parseMarkdownSections(body: string, title: string): BlogPostSection[] {
  const ctaSplit = body.split(/\r?\n---\r?\n/);
  const mainBody = ctaSplit[0]?.trim() ?? "";
  const ctaText = ctaSplit.slice(1).join("\n---\n").trim();

  const lines = mainBody.split(/\r?\n/);
  const sections: BlogPostSection[] = [];
  let current: BlogPostSection = { paragraphs: [] };
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    const text = stripMarkdownInline(paragraphBuffer.join(" "));
    paragraphBuffer = [];
    if (!text) return;
    current.paragraphs.push(text);
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;
    current.list = [...(current.list ?? []), ...listBuffer];
    listBuffer = [];
  };

  const flushSection = () => {
    flushParagraph();
    flushList();
    if (
      current.heading ||
      current.paragraphs.length > 0 ||
      (current.list?.length ?? 0) > 0 ||
      current.callToAction
    ) {
      sections.push(current);
    }
    current = { paragraphs: [] };
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushSection();
      const heading = line.slice(3).trim();
      if (normalizeHeading(heading) !== normalizeHeading(title)) {
        current.heading = heading;
      }
      continue;
    }

    if (line.startsWith("### ")) {
      flushSection();
      current.heading = line.slice(4).trim();
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(stripMarkdownInline(line.slice(2)));
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    paragraphBuffer.push(line.trim());
  }

  flushSection();

  const cta = ctaText ? parseCtaBlock(ctaText) : undefined;
  if (cta) {
    sections.push({
      paragraphs: [],
      callToAction: cta,
    });
  }

  return sections;
}

function resolveTagIds(category: string | undefined, tags: string[]): string[] {
  const ids = new Set<string>();

  if (category && CATEGORY_TAG_MAP[category]) {
    ids.add(CATEGORY_TAG_MAP[category]);
  }

  for (const tag of tags) {
    const mapped = TAG_ALIAS_MAP[tag];
    if (mapped) ids.add(mapped);
  }

  if (ids.size === 0) {
    ids.add("muhendislik-danismanligi");
  }

  return [...ids].slice(0, 4);
}

function formatDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
}

function loadPostFromFile(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontMatter(raw);

  if (!data.slug || !data.title || !data.description || !data.date) {
    return null;
  }

  if (data.status !== "published" && data.status !== "review") {
    return null;
  }

  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    publishedAt: formatDate(data.date),
    updatedAt: data.updated ? formatDate(data.updated) : formatDate(data.date),
    author: data.author,
    category: data.category,
    readingTimeMinutes: data.reading_time,
    tags: resolveTagIds(data.category, data.tags),
    sections: parseMarkdownSections(body, data.title),
  };
}

export function loadBlogPostsFromContent(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const posts: BlogPost[] = [];

  for (const entry of fs.readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;

    const indexPath = path.join(BLOG_CONTENT_DIR, entry.name, "index.md");
    if (!fs.existsSync(indexPath)) continue;

    try {
      const post = loadPostFromFile(indexPath);
      if (post) posts.push(post);
    } catch (error) {
      console.warn(`Blog yazısı atlandı (${entry.name}):`, error);
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
