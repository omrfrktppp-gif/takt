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
import { getTeamMemberByName } from "@/lib/team";

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

  const metadata = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    ...metadata.openGraph,
  };
  const twitter: NonNullable<Metadata["twitter"]> = {
    ...metadata.twitter,
  };
  delete openGraph.images;

  return {
    ...metadata,
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: post.canonicalUrl },
    openGraph: {
      ...openGraph,
      type: "article",
      url: post.canonicalUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : undefined,
    },
    twitter,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tags = resolvePostTags(post);
  const authorMember = post.author ? getTeamMemberByName(post.author) : undefined;
  const date = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? new Date(post.updatedAt).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined;

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />

      <PageShell
        eyebrow="BLOG"
        title={post.title}
        description={post.description}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <Section>
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <time
              dateTime={post.publishedAt}
              className="font-mono text-eyebrow text-steel"
            >
              {date}
            </time>
            {updatedDate ? (
              <span className="font-mono text-eyebrow text-steel">
                Güncellendi:{" "}
                <time dateTime={post.updatedAt}>{updatedDate}</time>
              </span>
            ) : null}
            {post.author ? (
              <span className="font-mono text-eyebrow text-steel">
                Yazar:{" "}
                {authorMember ? (
                  <Link
                    href="/hakkimizda#omer-faruk-top"
                    className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                  >
                    {authorMember.name}
                  </Link>
                ) : (
                  post.author
                )}
              </span>
            ) : null}
            {tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      href={`/blog/etiket/${tag.id}`}
                      className="tag-pill bg-accent/10 font-mono text-eyebrow text-ink hover:bg-accent/20"
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
