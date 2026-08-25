export type PublicBlogDocument = {
  slug: string;
  title: string;
  description: string;
  canonicalUrl: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  markdown: string;
};

export function markdownText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\s+/g, " ")
    .trim();
}

export function markdownLink(
  label: string,
  url: string,
  description?: string,
): string {
  const suffix = description ? `: ${markdownText(description)}` : "";
  return `- [${markdownText(label)}](${url})${suffix}`;
}

export function renderBlogLlmsLinks(posts: PublicBlogDocument[]): string[] {
  return posts.map((post) =>
    markdownLink(post.title, post.canonicalUrl, post.description),
  );
}

export function renderFullBlogEntries(
  posts: PublicBlogDocument[],
  locale: "tr" | "en" = "tr",
): string[] {
  const labels =
    locale === "en"
      ? {
          published: "Published",
          updated: "Last updated",
          author: "Author",
          canonical: "Canonical article page",
        }
      : {
          published: "Yayın tarihi",
          updated: "Güncelleme tarihi",
          author: "Yazar",
          canonical: "Yazının kanonik sayfası",
        };
  return posts.flatMap((post) => [
    `### [${markdownText(post.title)}](${post.canonicalUrl})`,
    "",
    `> ${markdownText(post.description)}`,
    "",
    `${labels.published}: ${post.publishedAt}  `,
    `${labels.updated}: ${post.updatedAt ?? post.publishedAt}  `,
    post.author ? `${labels.author}: ${markdownText(post.author)}` : "",
    "",
    post.markdown,
    "",
    `[${labels.canonical}](${post.canonicalUrl})`,
    "",
    "---",
    "",
  ]);
}

export function createBlogSitemapEntries(posts: PublicBlogDocument[]) {
  return posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));
}
