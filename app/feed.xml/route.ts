import { getPublishedPosts, resolvePostTags } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** `YYYY-MM-DD` → RFC 822; RSS okuyucuları ve arama motorları bu biçimi bekler. */
function toRfc822(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const day = String(date.getUTCDate()).padStart(2, "0");
  return (
    `${WEEKDAYS[date.getUTCDay()]}, ${day} ${MONTHS[date.getUTCMonth()]} ` +
    `${date.getUTCFullYear()} 00:00:00 +0000`
  );
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = [...getPublishedPosts()].sort((a, b) =>
    (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt),
  );

  const lastBuildDate = toRfc822(
    posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? "2026-01-01",
  );

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      const categories = resolvePostTags(post)
        .map((tag) => `      <category>${escapeXml(tag.label)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toRfc822(post.publishedAt)}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>tr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
