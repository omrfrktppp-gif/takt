import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content", "blog");
const directories = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+-/.test(entry.name))
  .map((entry) => entry.name)
  .sort();
const errors = [];

function markdownLinks(markdown) {
  return [...markdown.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]);
}

for (const directory of directories) {
  const trPath = path.join(root, directory, "index.md");
  const enPath = path.join(root, directory, "index.en.md");
  if (!fs.existsSync(enPath)) {
    errors.push(`${directory}: index.en.md missing`);
    continue;
  }

  const tr = matter(fs.readFileSync(trPath, "utf8"));
  const en = matter(fs.readFileSync(enPath, "utf8"));
  if (tr.data.slug !== en.data.slug) errors.push(`${directory}: slug mismatch`);
  if (!String(en.data.canonical ?? "").includes(`/en/blog/${tr.data.slug}`)) {
    errors.push(`${directory}: English canonical is invalid`);
  }

  const trLinks = markdownLinks(tr.content);
  const enLinks = markdownLinks(en.content);
  if (trLinks.length !== enLinks.length) {
    errors.push(`${directory}: link count ${trLinks.length} -> ${enLinks.length}`);
  }
  for (const href of enLinks) {
    if (/^https?:\/\/takt\.tr\/blog\//.test(href)) {
      errors.push(`${directory}: Turkish internal blog link ${href}`);
    }
    if (/^https?:\/\//.test(href)) {
      try { new URL(href); } catch { errors.push(`${directory}: invalid URL ${href}`); }
    }
  }
  if (/\]\([^)]+\)[A-Za-z]|[A-Za-z][.!?]?\[[^\]]+\]\(/.test(en.content)) {
    errors.push(`${directory}: missing whitespace around a Markdown link`);
  }

  const visible = `${en.data.title}\n${en.data.description}\n${en.content}`
    .replace(/https?:\/\/\S+/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/Türkiye/g, "Turkiye");
  const turkishMatch = visible.match(
    /\b(için|olarak|değil|nedir|üretim|tasarım|mühendislik|güncellendi)\b/u,
  );
  if (turkishMatch) {
    errors.push(`${directory}: visible Turkish phrase remains (${turkishMatch[0]})`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`English blog audit passed: ${directories.length} paired articles.`);
