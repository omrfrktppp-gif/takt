import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "@playwright/test";
import matter from "gray-matter";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createBlogSitemapEntries,
  renderBlogLlmsLinks,
  renderFullBlogEntries,
  type PublicBlogDocument,
} from "../lib/blog-content-formats";

const root = process.cwd();
const contentDirectory = path.join(root, "content", "blog");

type ContentDocument = PublicBlogDocument & {
  status: string;
  directory: string;
};

function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readContentDocuments(): ContentDocument[] {
  return fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => {
      const source = fs.readFileSync(
        path.join(contentDirectory, entry.name, "index.md"),
        "utf8",
      );
      const parsed = matter(source);
      const data = parsed.data as Record<string, unknown>;
      const slug = String(data.slug);
      return {
        directory: entry.name,
        status: String(data.status),
        slug,
        title: String(data.title),
        description: String(data.description),
        canonicalUrl: String(data.canonical),
        publishedAt: isoDate(data.date),
        updatedAt: data.updated ? isoDate(data.updated) : undefined,
        author: typeof data.author === "string" ? data.author : undefined,
        markdown: parsed.content.trim(),
      };
    })
    .filter(
      (post) => post.status === "published" || post.status === "review",
    )
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.slug.localeCompare(b.slug, "tr"),
    );
}

const documents = readContentDocuments();

test("published and review content forms the complete public set", () => {
  expect(documents).toHaveLength(35);
  expect(documents.filter((post) => post.status === "published")).toHaveLength(
    1,
  );
  expect(documents.filter((post) => post.status === "review")).toHaveLength(34);

  for (const post of documents) {
    expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(post.directory).toMatch(new RegExp(`^\\d+-${post.slug}$`));
    expect(post.title.trim()).not.toBe("");
    expect(post.description.trim()).not.toBe("");
    expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(post.updatedAt ?? post.publishedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}$/,
    );
    expect(post.canonicalUrl).toBe(`https://takt.tr/blog/${post.slug}`);
    expect(post.markdown).not.toBe("");
  }
});

test("public blog routes and sitemap entries are unique and use content dates", () => {
  const routes = documents.map((post) => `/blog/${post.slug}`);
  expect(new Set(routes).size).toBe(documents.length);

  const sitemapEntries = createBlogSitemapEntries(documents);
  expect(sitemapEntries).toHaveLength(documents.length);
  expect(new Set(sitemapEntries.map((entry) => entry.path)).size).toBe(
    documents.length,
  );

  for (const [index, entry] of sitemapEntries.entries()) {
    const post = documents[index];
    expect(entry.path).toBe(`/blog/${post.slug}`);
    expect(entry.lastModified).toBe(post.updatedAt ?? post.publishedAt);
  }
});

test("LLM indexes contain valid Markdown links and every public article", () => {
  const links = renderBlogLlmsLinks(documents);
  expect(links).toHaveLength(documents.length);

  for (const [index, link] of links.entries()) {
    expect(link).toContain(`](${documents[index].canonicalUrl}): `);
    expect(link.startsWith("- [")).toBe(true);
  }

  const full = renderFullBlogEntries(documents).join("\n");
  for (const post of documents) {
    expect(full).toContain(`](${post.canonicalUrl})`);
    expect(full).toContain(post.markdown);
  }
});

test("server Markdown preserves links, tables, code, formulas and heading ids", () => {
  const markdown = [
    "## Kaynaklar",
    "",
    "[Güvenli kaynak](https://example.com/source)",
    "",
    "| Ölçüt | Değer |",
    "| --- | ---: |",
    "| Süre | **30 dk** |",
    "",
    "Satır içi `x = 2` ve formül $F = ma$.",
    "",
    "```text",
    "F = m * a",
    "```",
    "",
    "## Kaynaklar",
    "",
    "<script>alert('render edilmemeli')</script>",
  ].join("\n");
  const headingIds = ["kaynaklar", "kaynaklar-2"];
  let headingIndex = 0;
  const components: Components = {
    h2: ({ children }) =>
      createElement("h2", { id: headingIds[headingIndex++] }, children),
    a: ({ href, children }) =>
      createElement(
        "a",
        {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        children,
      ),
  };
  const html = renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm],
        components,
        skipHtml: true,
      },
      markdown,
    ),
  );

  expect(html).toContain('id="kaynaklar"');
  expect(html).toContain('id="kaynaklar-2"');
  expect(html).toContain('href="https://example.com/source"');
  expect(html).toContain('rel="noopener noreferrer"');
  expect(html).toContain("<table");
  expect(html).toContain("<strong");
  expect(html).toContain("<code");
  expect(html).toContain("$F = ma$");
  expect(html).not.toContain("<script");
  expect(html).not.toContain("alert(");

  const rendererSource = fs.readFileSync(
    path.join(root, "components", "blog", "MarkdownContent.tsx"),
    "utf8",
  );
  expect(rendererSource).toContain("remarkPlugins={[remarkGfm]}");
  expect(rendererSource).toContain("skipHtml");
  expect(rendererSource).toContain('rel="noopener noreferrer"');
});
