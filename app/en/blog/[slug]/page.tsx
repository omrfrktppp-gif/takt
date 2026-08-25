import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getAllEnglishPostSlugs, getEnglishPostBySlug, resolveEnglishPostTags } from "@/lib/blog-en";
import { getTeamMemberByName } from "@/lib/team";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEnglishPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getEnglishPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: {
      canonical: post.canonicalUrl,
      languages: {
        tr: `https://takt.tr/blog/${post.slug}`,
        en: post.canonicalUrl,
        "x-default": `https://takt.tr/blog/${post.slug}`,
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
      title: post.title,
      description: post.description,
      type: "article",
      url: post.canonicalUrl,
      locale: "en_GB",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: ["/opengraph-image.webp"],
    },
  };
}

export default async function EnglishBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getEnglishPostBySlug(slug);
  if (!post) notFound();
  const tags = resolveEnglishPostTags(post);
  const authorMember = post.author ? getTeamMemberByName(post.author) : undefined;
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  const updatedDate = post.updatedAt && post.updatedAt !== post.publishedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
    : undefined;

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Blog", path: "/en/blog" },
            { name: post.title, path: `/en/blog/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />
      <PageShell
        eyebrow="BLOG"
        title={post.title}
        description={post.description}
        breadcrumbs={[{ label: "Home", href: "/en" }, { label: "Blog", href: "/en/blog" }, { label: post.title }]}
      >
        <Section>
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <time dateTime={post.publishedAt} className="font-mono text-eyebrow text-steel">{date}</time>
            {updatedDate ? <span className="font-mono text-eyebrow text-steel">Updated: <time dateTime={post.updatedAt}>{updatedDate}</time></span> : null}
            {post.author ? (
              <span className="font-mono text-eyebrow text-steel">Author: {authorMember ? <Link href="/en/hakkimizda#omer-faruk-top" className="text-ink underline decoration-signal underline-offset-4 hover:text-signal-text">{authorMember.name}</Link> : post.author}</span>
            ) : null}
            {tags.length > 0 ? <ul className="flex flex-wrap gap-2">{tags.map((tag) => <li key={tag.id}><Link href={`/en/blog/etiket/${tag.id}`} className="tag-pill bg-accent/10 font-mono text-eyebrow text-ink hover:bg-accent/20">{tag.label}</Link></li>)}</ul> : null}
          </div>
          <BlogPostBody post={post} locale="en" />
          <p className="mt-12"><Link href="/en/blog" className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal-text">← All articles</Link></p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
