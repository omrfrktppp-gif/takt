import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ListingGrid, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { englishBlogTags, getEnglishPublishedPosts } from "@/lib/blog-en";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Technical Articles",
  description: "Engineering articles on design, analysis, manufacturing and product development.",
  alternates: {
    canonical: "https://takt.tr/en/blog",
    languages: {
      tr: "https://takt.tr/blog",
      en: "https://takt.tr/en/blog",
      "x-default": "https://takt.tr/blog",
    },
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://takt.tr/en/blog",
    siteName: "Takt",
    title: "Technical Articles — Takt",
    description: "Engineering articles on design, analysis, manufacturing and product development.",
    images: ["/opengraph-image.webp"],
  },
};

export default function EnglishBlogIndexPage() {
  const posts = getEnglishPublishedPosts();
  const tags = englishBlogTags.filter((tag) => posts.some((post) => post.tags.includes(tag.id)));

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Blog", path: "/en/blog" },
          ]),
          collectionPageSchema(
            {
              title: "Technical Articles",
              description:
                "Engineering articles on design, analysis, manufacturing and product development.",
              path: "/en/blog",
            },
            "en-GB",
          ),
        ]}
      />
      <PageShell
        eyebrow="BLOG"
        title="Technical Articles"
        description="Engineering articles on design, analysis, manufacturing and product development."
        breadcrumbs={[{ label: "Home", href: "/en" }, { label: "Blog" }]}
      >
        <Section>
          {tags.length > 0 ? (
            <div className="mb-10">
              <p className="font-mono text-eyebrow text-steel">TAGS</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <Link href={`/en/blog/etiket/${tag.id}`} className="tag-pill border border-line bg-white text-ink hover:border-signal hover:text-signal-text">
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <ListingGrid className="md:grid-cols-1">
            {posts.map((post) => <BlogPostCard key={post.slug} post={post} locale="en" />)}
          </ListingGrid>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
