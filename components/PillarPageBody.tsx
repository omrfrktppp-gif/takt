import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";
import type { Pillar } from "@/lib/pillars";
import { relatedServiceLabel } from "@/lib/blog";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import { Button } from "@/components/Button";
import { appointmentCta } from "@/lib/site";

type PillarPageBodyProps = {
  pillar: Pillar;
};

export function PillarPageBody({ pillar }: PillarPageBodyProps) {
  const clusterPosts = pillar.relatedBlogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  const updated = new Date(pillar.updatedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl space-y-10">
      <p className="text-body text-steel">{pillar.summary}</p>
      <p className="font-mono text-eyebrow text-steel">
        Son güncelleme:{" "}
        <time dateTime={pillar.updatedAt}>{updated}</time>
      </p>

      {pillar.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body text-steel">
                {paragraph}
              </p>
            ))}
            {section.list && section.list.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-body text-steel">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {clusterPosts.length > 0 ? (
        <section>
          <h2 className="font-display text-h3 text-ink">
            İlgili teknik yazılar
          </h2>
          <p className="mt-3 text-body text-steel">
            Bu rehberdeki konuları blog yazılarımızda ayrıntılı ele alıyoruz.
          </p>
          <ul className="mt-4 space-y-3">
            {clusterPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  {post.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <aside className="rounded border border-line bg-white p-6">
        <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
          İlgili hizmet
        </p>
        <p className="mt-3 text-body text-steel">
          Bu rehberdeki konular için teknik danışmanlık ve proje desteği
          sunuyoruz.
        </p>
        <Link
          href={pillar.servicePath}
          className="mt-4 inline-block font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        >
          {relatedServiceLabel(pillar.servicePath)} →
        </Link>
      </aside>

      <LeadMagnetPromo />

      <div className="flex flex-wrap gap-4">
        <Button href={pillar.servicePath} variant="primary">
          Hizmet detayı
        </Button>
        <Button href={appointmentCta.href} variant="secondary">
          {appointmentCta.label}
        </Button>
      </div>
    </div>
  );
}
