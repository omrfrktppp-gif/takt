import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { blogTags, getPublishedPosts } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { blogSeo, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(blogSeo);

export default function BlogIndexPage() {
  const posts = getPublishedPosts();
  const tags = blogTags.filter((tag) =>
    posts.some((post) => post.tags.includes(tag.id)),
  );

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: "Blog", path: blogSeo.path },
        ])}
      />

      <PageShell
        eyebrow="BLOG"
        title="Teknik yazılar"
        description={blogSeo.description}
      >
        <Section>
          {tags.length > 0 ? (
            <div className="mb-10">
              <p className="font-mono text-eyebrow text-steel">ETİKETLER</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      href={`/blog/etiket/${tag.id}`}
                      className="rounded-sm border border-line bg-white px-3 py-1.5 text-small text-ink hover:border-signal hover:text-signal"
                    >
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded border border-dashed border-line bg-white p-8 text-center">
              <p className="font-display text-h3 text-ink">Yakında</p>
              <p className="mt-3 text-body text-steel">
                Blog yazıları hazırlanıyor. Teknik içerikler burada yayınlanacak.
              </p>
            </div>
          )}
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
