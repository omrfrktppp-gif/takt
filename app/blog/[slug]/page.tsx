import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import {
  getAllPostSlugs,
  getPostBySlug,
  resolvePostTags,
} from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tags = resolvePostTags(post);
  const date = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hakkımızda", path: "/hakkimizda" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />

      <PageShell eyebrow="BLOG" title={post.title} description={post.description}>
        <Section>
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <time
              dateTime={post.publishedAt}
              className="font-mono text-eyebrow text-steel"
            >
              {date}
            </time>
            {tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      href={`/blog/etiket/${tag.id}`}
                      className="rounded-sm bg-accent/10 px-2 py-1 font-mono text-eyebrow text-accent hover:bg-accent/20"
                    >
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <BlogPostBody post={post} />

          <p className="mt-12">
            <Link
              href="/blog"
              className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              ← Tüm yazılar
            </Link>
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
