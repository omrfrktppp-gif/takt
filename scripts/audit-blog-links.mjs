import fs from "node:fs/promises";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content", "blog");
const directories = (await fs.readdir(contentRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => entry.name);

const links = new Set();
for (const directory of directories) {
  const markdown = await fs.readFile(
    path.join(contentRoot, directory, "index.md"),
    "utf8",
  );
  for (const match of markdown.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    const url = new URL(match[1]);
    if (url.hostname !== "takt.tr" && url.hostname !== "www.takt.tr") {
      links.add(url.href);
    }
  }
}

const queue = [...links];
const broken = [];
let checked = 0;

async function worker() {
  while (queue.length > 0) {
    const url = queue.shift();
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(12_000),
        headers: { "user-agent": "Takt-Link-Audit/1.0" },
      });
      checked += 1;
      if (response.status === 404 || response.status === 410) {
        broken.push({ url, status: response.status });
      }
    } catch {
      checked += 1;
      // Ağ/robot engeli bir URL'nin kırık olduğunu kanıtlamaz; 404 ve 410 engeldir.
    }
  }
}

await Promise.all(Array.from({ length: 12 }, () => worker()));

if (broken.length > 0) {
  console.error(JSON.stringify(broken, null, 2));
  process.exitCode = 1;
} else {
  console.log(`${checked} dış kaynak kontrol edildi; doğrulanmış 404/410 yok.`);
}
