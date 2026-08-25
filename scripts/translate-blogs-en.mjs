import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";
const FRONTMATTER_TEXT_KEYS = new Set(["title", "description", "category"]);
const INDENTED_TEXT_KEYS = new Set(["primary", "secondary", "alt"]);
const CONCURRENCY = 4;
const TITLE_OVERRIDES = {
  "05-kaizen-surekli-iyilestirme": "Kaizen: Small, Measurable Steps Instead of One Big Leap",
  "06-muda-yedi-israf": "Muda (Seven Wastes): Waste Begins in Design, Not on the Shop Floor",
  "11-dijital-ikiz": "Digital Twin: Testing a Virtual Copy Before Breaking the Prototype",
  "13-generative-design-topoloji-optimizasyonu": "Generative Design: Software Proposes, Engineers Validate",
  "14-surdurulebilir-uretim-hafifletme": "Sustainable Manufacturing: Achieving Strength with Less Material",
  "16-hibrit-imalat-eklemeli-talasli": "Hybrid Manufacturing (Additive + Subtractive): The Best of Both",
  "17-kobot-robotik-makine-besleme": "Cobots and Robotic Machine Tending: Supporting Workers, Not Replacing Them",
  "18-kestirimci-bakim": "Predictive Maintenance: Stopping Before Failure, Not After",
  "19-makine-gorusu-kalite-kontrol": "Machine Vision Quality Control: Inspecting Every Part with a Camera",
  "20-endustri-5-0": "Industry 5.0: Putting Machines Alongside People, Not in Their Place",
  "23-yerlilestirme-reshoring": "Localization (Reshoring): Producing Closer, Not Simply Cheaper",
  "24-dijital-iplik-digital-thread": "Digital Thread: Moving Data from Design to Production",
  "25-akilli-fabrika-kobi": "Smart Factories for SMEs: Start by Measuring, Not Rebuilding",
  "26-metal-yerine-muhendislik-plastik": "Engineering Plastics Instead of Metal: Match the Material to the Load",
  "27-uretimde-agentik-yapay-zeka": "Agentic AI in Manufacturing: Automating Repetitive Engineering Work",
  "33-kafes-lattice-hafifletme": "Lightweighting with Lattice Structures: Material Along the Load Path",
  "36-makine-tasarim-hizmeti-fiyati": "Machine Design Service Pricing: What Determines the Cost?",
  "41-kadrolu-muhendis-proje-bazli-danismanlik": "In-House Engineer or Project-Based Consulting?",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function polishEnglish(value) {
  return value
    .replace(/machine manufacturing/gi, "machinery manufacturing")
    .replace(/sub-industry/gi, "supplier industry")
    .replace(/engineering picture/gi, "engineering drawing")
    .replace(/technical picture/gi, "engineering drawing")
    .replace(/chip manufacturing/gi, "machining")
    .replace(/shaving manufacturing/gi, "machining")
    .replace(/counter manufacturing/gi, "contract manufacturing")
    .replace(/serial production/gi, "mass production")
    .replace(/sheet hair/gi, "sheet metal")
    .replace(/bench time/gi, "machine time")
    .replace(/Turkey time/gi, "Türkiye time")
    .replace(/\bPieces\b/g, "Parts")
    .replace(/\bpieces\b/g, "parts")
    .replace(/\bPiece\b/g, "Part")
    .replace(/\bpiece\b/g, "part")
    .replace(/; He\b/g, "; it")
    .replace(/\. He\b/g, ". It")
    .replace(/\bloom\b/gi, "machine")
    .replace(/\bsawdust\b/gi, "machining chips")
    .replace(/operator and binding/gi, "operator handling and fixturing")
    .replace(/Machine clock/gi, "Machine time")
    .replace(/were completely disabled/gi, "were eliminated")
    .replace(/How Is It Difference From/gi, "How Does It Differ From")
    .replace(/The problem was the price paid for his work\./gi, "The problem was the cost of making it.")
    .replace(/As takt\.tr/gi, "At Takt")
    .replace(/Kullanılabilirlik/g, "Availability")
    .replace(/Performans/g, "Performance")
    .replace(/Kalite/g, "Quality")
    .replace(/Büküm payı/g, "Bend allowance")
    .replace(/büküm açısı/g, "bend angle")
    .replace(/iç büküm yarıçapı/g, "inside bend radius")
    .replace(/K-faktörü/g, "K-factor")
    .replace(/malzeme kalınlığı/g, "material thickness")
    .replace(/ΔL_ölçüm/g, "ΔL_measured")
    .replace(/güvenlik payı/g, "safety margin")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/ {2,}/g, " ")
    .trim();
}

async function translateSegment(value, attempt = 0) {
  if (!/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(value) || value.trim() === "") return value;
  const leading = /^[\s,.;:!?—–]*/.exec(value)?.[0] ?? "";
  const trailing = /[\s,.;:!?—–]*$/.exec(value)?.[0] ?? "";
  const core = value.slice(leading.length, value.length - trailing.length || undefined);
  const url = new URL(TRANSLATE_URL);
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "tr");
  url.searchParams.set("tl", "en");
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", core);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 Takt content localization" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const translated = payload?.[0]?.map((part) => part?.[0] ?? "").join("");
    if (!translated) throw new Error("empty translation");
    return `${leading}${translated}${trailing}`;
  } catch (error) {
    if (attempt >= 4) throw error;
    await delay(500 * 2 ** attempt);
    return translateSegment(value, attempt + 1);
  }
}

async function translateText(value) {
  const protectedPattern = /(!?\[[^\]]*\]\(https?:\/\/[^)]+\)|https?:\/\/[^\s)>]+|`[^`]+`|<[^>]+>)/g;
  const parts = value.split(protectedPattern);
  const translated = await Promise.all(
    parts.map(async (part, index) => {
      if (index % 2 === 0) return translateSegment(part);
      const link = /^(!?)\[([^\]]*)\]\((https?:\/\/[^)]+)\)$/.exec(part);
      if (!link) return part;
      const [, imagePrefix, label, url] = link;
      return `${imagePrefix}[${await translateSegment(label)}](${url})`;
    }),
  );
  return polishEnglish(translated.join(""));
}

async function mapConcurrent(items, mapper) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await mapper(items[index], index);
      await delay(60);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return output;
}

function splitDocument(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error("frontmatter not found");
  return { frontmatter: match[1], body: match[2] };
}

function applyTitleOverride(raw, directory) {
  const title = TITLE_OVERRIDES[directory];
  if (!title) return raw;
  return raw
    .replace(/^title: ".*"$/m, `title: ${JSON.stringify(title)}`)
    .replace(/^## .*$/m, `## ${title}`);
}

function quotedValues(value) {
  return [...value.matchAll(/"((?:\\.|[^"])*)"/g)].map((match) => ({
    full: match[0],
    text: match[1],
  }));
}

async function translateFrontmatter(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  return (await mapConcurrent(lines, async (line) => {
    const keyMatch = /^(\s*)([a-z_]+):\s*(.*)$/.exec(line);
    if (!keyMatch) return line;
    const [, indent, key, rawValue] = keyMatch;

    if (key === "canonical") {
      return line.replace("https://takt.tr/blog/", "https://takt.tr/en/blog/");
    }
    if (!(FRONTMATTER_TEXT_KEYS.has(key) || INDENTED_TEXT_KEYS.has(key))) return line;

    const values = quotedValues(rawValue);
    if (values.length === 0) return line;
    let translatedValue = rawValue;
    for (const item of values) {
      const translated = await translateText(item.text);
      translatedValue = translatedValue.replace(item.full, JSON.stringify(translated));
    }
    return `${indent}${key}: ${translatedValue}`;
  })).join("\n");
}

function bodyUnits(body) {
  const lines = body.split(/\r?\n/);
  const units = [];
  let paragraph = [];
  let fenced = false;

  const flush = () => {
    if (paragraph.length) units.push({ translate: true, lines: paragraph.splice(0) });
  };

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      flush();
      fenced = !fenced;
      units.push({ translate: false, lines: [line] });
      continue;
    }
    if (fenced || line.trim() === "" || /^\s*---\s*$/.test(line)) {
      flush();
      units.push({ translate: false, lines: [line] });
      continue;
    }
    if (/^(#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*|\|)/.test(line)) {
      flush();
      units.push({ translate: true, lines: [line] });
      continue;
    }
    paragraph.push(line);
  }
  flush();
  return units;
}

function extractPrefix(value) {
  const match = /^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*))/u.exec(value);
  return match ? [match[1], value.slice(match[1].length)] : ["", value];
}

async function translateBody(body) {
  const units = bodyUnits(body);
  const translated = await mapConcurrent(units, async (unit) => {
    if (!unit.translate) return unit.lines.join("\n");
    const source = unit.lines.join("\n");
    const [prefix, text] = extractPrefix(source);
    return `${prefix}${await translateText(text)}`;
  });

  return translated
    .join("\n")
    .replaceAll("https://takt.tr/blog/", "https://takt.tr/en/blog/")
    .replaceAll("https://takt.tr/iletisim", "https://takt.tr/en/iletisim")
    .replaceAll("https://takt.tr/hizmetler/", "https://takt.tr/en/hizmetler/");
}

async function translatePost(directory) {
  const sourcePath = path.join(CONTENT_DIR, directory, "index.md");
  const targetPath = path.join(CONTENT_DIR, directory, "index.en.md");
  const raw = await fs.readFile(sourcePath, "utf8");
  const { frontmatter, body } = splitDocument(raw);
  const [translatedFrontmatter, translatedBody] = await Promise.all([
    translateFrontmatter(frontmatter),
    translateBody(body),
  ]);
  const output = applyTitleOverride(
    `---\n${translatedFrontmatter}\n---\n${translatedBody.trim()}\n`,
    directory,
  );
  await fs.writeFile(
    targetPath,
    output,
    "utf8",
  );
  process.stdout.write(`translated ${directory}\n`);
}

const entries = (await fs.readdir(CONTENT_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && /^\d+-/.test(entry.name))
  .map((entry) => entry.name)
  .sort();

if (process.argv.includes("--polish-only")) {
  for (const entry of entries) {
    const targetPath = path.join(CONTENT_DIR, entry, "index.en.md");
    const raw = await fs.readFile(targetPath, "utf8");
    const polished = applyTitleOverride(raw
      .split("\n")
      .map((line) => {
        const leading = /^\s*/.exec(line)?.[0] ?? "";
        return `${leading}${polishEnglish(line.slice(leading.length))}`;
      })
      .join("\n"), entry);
    await fs.writeFile(targetPath, polished, "utf8");
  }
  process.stdout.write(`polished: ${entries.length} English blog files\n`);
  process.exit(0);
}

for (const entry of entries) {
  await translatePost(entry);
}

process.stdout.write(`done: ${entries.length} English blog files\n`);
