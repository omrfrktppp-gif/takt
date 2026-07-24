import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  BlogCover,
  BlogHeading,
  BlogPost,
  BlogPostKind,
  BlogPostStatus,
  BlogSchemaType,
} from "@/lib/blog-types";
import { siteConfig } from "@/lib/site";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type FrontMatter = Record<string, unknown>;

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
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'")
    .trim();
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

function requiredString(data: FrontMatter, key: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`"${key}" dolu bir metin olmalı`);
  }
  return value.trim();
}

function optionalString(data: FrontMatter, key: string): string | undefined {
  const value = data[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`"${key}" metin olmalı`);
  }
  return value.trim() || undefined;
}

function parseDate(value: unknown, key: string): string {
  const normalized =
    value instanceof Date && !Number.isNaN(value.getTime())
      ? value.toISOString().slice(0, 10)
      : typeof value === "string"
        ? value.trim()
        : "";

  if (!DATE_PATTERN.test(normalized)) {
    throw new Error(`"${key}" YYYY-MM-DD biçiminde olmalı`);
  }

  const parsed = new Date(`${normalized}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== normalized
  ) {
    throw new Error(`"${key}" geçerli bir tarih olmalı`);
  }
  return normalized;
}

function parseTags(value: unknown): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    throw new Error('"tags" boş olmayan bir metin dizisi olmalı');
  }
  return [...new Set(value.map((tag) => (tag as string).trim()))];
}

function parseStatus(value: unknown): BlogPostStatus | "draft" {
  if (value === "draft") return value;
  if (value === "published" || value === "review") return value;
  throw new Error('"status" draft, review veya published olmalı');
}

function parseKind(value: unknown): BlogPostKind {
  if (value === undefined) return "article";
  if (value === "article" || value === "case-study") return value;
  throw new Error('"kind" article veya case-study olmalı');
}

function parseSchemaType(value: unknown): BlogSchemaType {
  if (value === undefined) return "BlogPosting";
  if (
    value === "Article" ||
    value === "TechArticle" ||
    value === "BlogPosting"
  ) {
    return value;
  }
  throw new Error('"schema" Article, TechArticle veya BlogPosting olmalı');
}

function parseReadingTime(value: unknown): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error('"reading_time" pozitif bir tam sayı olmalı');
  }
  return value;
}

function parseCanonical(value: unknown, slug: string): string {
  const expected = `${siteConfig.url}/blog/${slug}`;
  if (value === undefined) return expected;
  if (typeof value !== "string") {
    throw new Error('"canonical" mutlak bir URL olmalı');
  }

  let canonical: URL;
  try {
    canonical = new URL(value);
  } catch {
    throw new Error('"canonical" geçerli bir URL olmalı');
  }

  if (
    canonical.origin !== new URL(siteConfig.url).origin ||
    canonical.pathname.replace(/\/$/, "") !== `/blog/${slug}` ||
    canonical.search ||
    canonical.hash
  ) {
    throw new Error(`"canonical" ${expected} ile eşleşmeli`);
  }
  return expected;
}

function parseCover(value: unknown): BlogCover | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error('"cover" src ve alt alanları içeren bir nesne olmalı');
  }
  const cover = value as Record<string, unknown>;
  if (
    typeof cover.src !== "string" ||
    !/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[a-zA-Z0-9_./-]+$/.test(cover.src) ||
    typeof cover.alt !== "string" ||
    cover.alt.trim() === ""
  ) {
    throw new Error('"cover" güvenli bir src ve dolu bir alt içermeli');
  }
  return { src: cover.src, alt: cover.alt.trim() };
}

function headingSlug(text: string): string {
  const slug = text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "bolum";
}

function extractHeadings(markdown: string): BlogHeading[] {
  const counts = new Map<string, number>();
  const headings: BlogHeading[] = [];
  let fence: "```" | "~~~" | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = /^\s*(```|~~~)/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1] as "```" | "~~~";
      fence = fence === marker ? undefined : fence ?? marker;
      continue;
    }
    if (fence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = stripMarkdownInline(match[2]);
    if (!text) continue;
    const base = headingSlug(text);
    const occurrence = (counts.get(base) ?? 0) + 1;
    counts.set(base, occurrence);
    headings.push({
      depth: match[1].length as 2 | 3,
      id: occurrence === 1 ? base : `${base}-${occurrence}`,
      text,
    });
  }
  return headings;
}

function removeRepeatedTitle(markdown: string, title: string): string {
  const lines = markdown.trim().split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim() !== "");
  if (firstContentIndex === -1) return "";
  const match = /^#{1,2}\s+(.+?)\s*#*\s*$/.exec(lines[firstContentIndex]);
  if (
    match &&
    normalizeHeading(stripMarkdownInline(match[1])) === normalizeHeading(title)
  ) {
    lines.splice(firstContentIndex, 1);
  }
  return lines.join("\n").trim();
}

function loadPostFromFile(filePath: string, directoryName: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as FrontMatter;
  const status = parseStatus(data.status);
  if (status === "draft") return null;

  const slug = requiredString(data, "slug");
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error('"slug" küçük harfli, sayılı ve tireli olmalı');
  }
  if (!directoryName.match(new RegExp(`^\\d+-${slug}$`))) {
    throw new Error(`klasör adı slug ile eşleşmiyor: ${directoryName}`);
  }

  const title = requiredString(data, "title");
  const description = requiredString(data, "description");
  const publishedAt = parseDate(data.date, "date");
  const updatedAt = data.updated
    ? parseDate(data.updated, "updated")
    : publishedAt;
  if (updatedAt < publishedAt) {
    throw new Error('"updated" yayın tarihinden önce olamaz');
  }

  const sourceTags = parseTags(data.tags);
  const author = optionalString(data, "author");
  const category = optionalString(data, "category");
  const markdown = removeRepeatedTitle(parsed.content, title);
  if (!markdown) throw new Error("Markdown gövdesi boş olamaz");

  return {
    slug,
    title,
    description,
    status,
    kind: parseKind(data.kind),
    publishedAt,
    updatedAt,
    author,
    category,
    readingTimeMinutes: parseReadingTime(data.reading_time),
    tags: resolveTagIds(category, sourceTags),
    canonicalUrl: parseCanonical(data.canonical, slug),
    cover: parseCover(data.cover),
    schemaType: parseSchemaType(data.schema),
    markdown,
    headings: extractHeadings(markdown),
  };
}

export function loadBlogPostsFromContent(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const postsBySlug = new Map<string, BlogPost>();
  const duplicateSlugs = new Set<string>();

  const entries = fs
    .readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;

    const indexPath = path.join(BLOG_CONTENT_DIR, entry.name, "index.md");
    if (!fs.existsSync(indexPath)) continue;

    try {
      const post = loadPostFromFile(indexPath, entry.name);
      if (!post) continue;
      if (postsBySlug.has(post.slug) || duplicateSlugs.has(post.slug)) {
        throw new Error(`yinelenen slug: ${post.slug}`);
      }
      postsBySlug.set(post.slug, post);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const status = matter(fs.readFileSync(indexPath, "utf8")).data.status;
      if (status === "published") {
        throw new Error(`Yayınlanmış blog geçersiz (${entry.name}): ${message}`);
      }
      console.warn(`Blog yazısı atlandı (${entry.name}): ${message}`);
    }
  }

  return [...postsBySlug.values()].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug, "tr"),
  );
}
