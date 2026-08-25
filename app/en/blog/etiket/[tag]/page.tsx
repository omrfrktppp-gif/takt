import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getAllEnglishTagIds, getEnglishPostsByTag, getEnglishTagById } from "@/lib/blog-en";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllEnglishTagIds().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagMeta = getEnglishTagById(tag);
  if (!tagMeta) return {};
  const posts = getEnglishPostsByTag(tag);
  const index = posts.length >= 2;
  return {
    title: `${tagMeta.label} Articles`,
    description: tagMeta.description,
    alternates: {
      canonical: `https://takt.tr/en/blog/etiket/${tag}`,
      languages: {
        tr: `https://takt.tr/blog/etiket/${tag}`,
        en: `https://takt.tr/en/blog/etiket/${tag}`,
        "x-default": `https://takt.tr/blog/etiket/${tag}`,
      },
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function EnglishBlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const tagMeta = getEnglishTagById(tag);
  if (!tagMeta) notFound();
  const posts = getEnglishPostsByTag(tag);
  if (posts.length === 0) notFound();
  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Blog", path: "/en/blog" },
            { name: tagMeta.label, path: `/en/blog/etiket/${tag}` },
          ]),
          collectionPageSchema(
            {
              title: `${tagMeta.label} Articles`,
              description: tagMeta.description ?? `${tagMeta.label} articles.`,
              path: `/en/blog/etiket/${tag}`,
            },
            "en-GB",
          ),
        ]}
      />
      <PageShell eyebrow="BLOG" title={tagMeta.label} description={tagMeta.description ?? `${tagMeta.label} articles.`} breadcrumbs={[{ label: "Home", href: "/en" }, { label: "Blog", href: "/en/blog" }, { label: tagMeta.label }]}>
        <Section><div className="grid gap-6">{posts.map((post) => <BlogPostCard key={post.slug} post={post} locale="en" />)}</div></Section>
      </PageShell>
    </SeoPageLayout>
  );
}
