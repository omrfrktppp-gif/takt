import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/components/BlogPost";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getAllTagIds, getPostsByTag, getTagById } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getAllTagIds().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagMeta = getTagById(tag);
  if (!tagMeta) return {};

  return buildMetadata({
    title: `${tagMeta.label} yazıları`,
    description:
      tagMeta.description ??
      `Takt blog — ${tagMeta.label} etiketli mühendislik ve danışmanlık yazıları.`,
    path: `/blog/etiket/${tag}`,
  });
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const tagMeta = getTagById(tag);
  if (!tagMeta) notFound();

  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: "Blog", path: "/blog" },
          { name: tagMeta.label, path: `/blog/etiket/${tag}` },
        ])}
      />

      <PageShell
        eyebrow="BLOG"
        title={tagMeta.label}
        description={
          tagMeta.description ??
          `${tagMeta.label} etiketli yazılar.`
        }
      >
        <Section>
          <div className="grid gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
