/**
 * Generate docs/gsc-url-list.txt — mirrors lib/sitemap-routes.ts getStaticSitemapEntries().
 * Run: node scripts/gen-gsc-urls.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = "https://takt.tr";

const chapterSeoPaths = [
  "/hakkimizda",
  "/hizmetler",
  "/kapasitemiz",
  "/yaklasim",
  "/iletisim",
  "/gorusme-planla",
  "/referanslar",
  "/sss",
];

const faz3Paths = [
  "/kaynaklar/baslangic-kontrol-listesi",
  "/sektorler",
  "/sektorler/savunma-sanayi",
  "/sektorler/arge-urun-gelistirme",
  "/sektorler/prototipten-seri-uretime",
  "/sektorler/ozel-makina-imalati",
  "/sektorler/otomotiv-yan-sanayi",
  "/sektorler/tibbi-cihaz",
];

const rehberPaths = [
  "/rehber",
  "/rehber/tersine-muhendislik",
  "/rehber/muhendislik-analizi",
  "/rehber/yalin-uretim-dfm",
  "/rehber/tubitak-kosgeb-rehberi",
];

const hizmetSlugs = [
  "proje-danismanligi",
  "teknik-ekip",
  "tasarim-gelistirme",
  "analiz-hesaplama",
  "uretim-danismanligi",
  "arge-urge",
  "tubitak-kosgeb",
];

const kapasiteSlugs = [
  "intro",
  "3d-tarama",
  "lazer",
  "cnc",
  "fason",
  "yuzey",
  "prototip-seri",
  "ozet",
];

const blogTagIds = [
  "muhendislik-danismanligi",
  "proje-danismanligi",
  "teknik-ekip-yonetimi",
  "tasarim-gelistirme",
  "analiz-hesaplama",
  "uretim-danismanligi",
  "kapasite-imalat",
  "arge-urge",
  "tubitak-kosgeb-patent",
  "ankara-sanayi",
  "dfm-dfa",
  "japon-muhendislik",
  "kalite-ilkeleri",
  "muhendislik-trendleri",
];

const CATEGORY_TAG_MAP = {
  "DFM/DFA": "dfm-dfa",
  "Japon Mühendislik İlkeleri": "japon-muhendislik",
  "Kalite İlkeleri": "kalite-ilkeleri",
  "Mühendislik Trendleri": "muhendislik-trendleri",
  "Saha & Analiz": "analiz-hesaplama",
};

const TAG_ALIAS_MAP = {
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

function parseQuotedValue(line, key) {
  const match = line.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`));
  return match?.[1] ?? "";
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = { tags: [] };
  for (const line of match[1].split("\n")) {
    if (line.startsWith("slug:")) data.slug = parseQuotedValue(line, "slug");
    else if (line.startsWith("title:")) data.title = parseQuotedValue(line, "title");
    else if (line.startsWith("description:"))
      data.description = parseQuotedValue(line, "description");
    else if (line.startsWith("date:"))
      data.date = line.split(":").slice(1).join(":").trim();
    else if (line.startsWith("status:"))
      data.status = line.split(":").slice(1).join(":").trim();
    else if (line.startsWith("category:"))
      data.category = parseQuotedValue(line, "category");
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
  return data;
}

function resolveTagIds(category, tags) {
  const ids = new Set();
  if (category && CATEGORY_TAG_MAP[category]) {
    ids.add(CATEGORY_TAG_MAP[category]);
  }
  for (const tag of tags) {
    const mapped = TAG_ALIAS_MAP[tag];
    if (mapped) ids.add(mapped);
  }
  if (ids.size === 0) ids.add("muhendislik-danismanligi");
  return [...ids].slice(0, 4);
}

const blogDir = path.join(root, "content", "blog");
const publishedPosts = [];

for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const mdPath = path.join(blogDir, entry.name, "index.md");
  if (!fs.existsSync(mdPath)) continue;
  const data = parseFrontMatter(fs.readFileSync(mdPath, "utf8"));
  if (!data?.slug || !data.title || !data.description || !data.date) continue;
  if (data.status !== "published" && data.status !== "review") continue;
  publishedPosts.push({
    slug: data.slug,
    tags: resolveTagIds(data.category, data.tags),
  });
}

const activeTagIds = blogTagIds.filter((tagId) =>
  publishedPosts.some((post) => post.tags.includes(tagId)),
);

const paths = [
  "/",
  "/blog",
  "/kvkk-aydinlatma-metni",
  ...chapterSeoPaths,
  ...faz3Paths,
  ...rehberPaths,
  ...hizmetSlugs.map((s) => `/hizmetler/${s}`),
  ...kapasiteSlugs.map((s) => `/kapasitemiz/${s}`),
  ...publishedPosts.map((p) => `/blog/${p.slug}`),
  ...activeTagIds.map((t) => `/blog/etiket/${t}`),
];

const urls = paths.map((p) => `${base}${p}`);
const outPath = path.join(root, "docs/gsc-url-list.txt");
const header = `# Takt — Google Search Console toplu dizin URL listesi
# Kaynak: lib/sitemap-routes.ts getStaticSitemapEntries()
# Toplam: ${urls.length} URL
# Kullanım: Search Console → URL Denetimi veya toplu gönderim

`;

fs.writeFileSync(outPath, header + urls.join("\n") + "\n", "utf8");
console.log(`Wrote ${urls.length} URLs to docs/gsc-url-list.txt`);
