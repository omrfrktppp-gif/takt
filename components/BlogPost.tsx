import Link from "next/link";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import type { BlogPost } from "@/lib/blog-types";
import {
  relatedServiceLabel,
  resolvePostTags,
  resolveRelatedServicePath,
} from "@/lib/blog";
import { getPillarForBlogSlug } from "@/lib/pillars";

type BlogPostBodyProps = {
  post: BlogPost;
};

export function BlogPostBody({ post }: BlogPostBodyProps) {
  const relatedPath = resolveRelatedServicePath(post);
  const pillar = getPillarForBlogSlug(post.slug);
  const hasToc = post.headings.length > 1;

  return (
    <div
      className={
        hasToc
          ? "lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] xl:gap-12"
          : undefined
      }
    >
      {hasToc ? (
        <nav
          aria-label="İçindekiler"
          className="interactive-card mb-8 lg:sticky lg:top-[var(--sticky-offset)] lg:mb-0 lg:max-h-[calc(100vh-var(--nav-h)-2rem)] lg:overflow-y-auto"
        >
          <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
            İçindekiler
          </p>
          <ol className="mt-4 space-y-1.5 text-small text-steel">
            {post.headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.depth === 3 ? "pl-3" : undefined}
              >
                <a
                  href={`#${heading.id}`}
                  className="touch-target-inline w-full rounded-sm underline-offset-4 transition-colors hover:text-signal hover:underline"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="blog-reading-column min-w-0 space-y-10">
        <MarkdownContent markdown={post.markdown} headings={post.headings} />

        {pillar ? (
          <aside className="interactive-card border-signal/20 bg-signal/10">
            <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
              Rehber kümesi
            </p>
            <p className="mt-3 text-body text-steel">
              Bu rehberin parçası:{" "}
              <Link
                href={`/rehber/${pillar.slug}`}
                className="touch-target-inline font-medium text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
              >
                {pillar.title}
              </Link>
            </p>
          </aside>
        ) : null}

        {relatedPath ? (
          <aside className="interactive-card">
            <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
              İlgili hizmet
            </p>
            <p className="mt-3 text-body text-steel">
              Bu yazıdaki konularla ilgili teknik destek ve danışmanlık için
              hizmet sayfamıza göz atın.
            </p>
            <Link
              href={relatedPath}
              className="touch-target-inline mt-2 font-medium text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
            >
              {relatedServiceLabel(relatedPath)} →
            </Link>
          </aside>
        ) : null}

        <LeadMagnetPromo />
      </div>
    </div>
  );
}

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;
  const date = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const tags = resolvePostTags(post);

  return (
    <article className="interactive-card group relative flex flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-eyebrow text-steel"
        >
          {date}
        </time>
        {post.readingTimeMinutes ? (
          <span className="font-mono text-eyebrow text-steel">
            {post.readingTimeMinutes} dk okuma
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-h3 text-ink">
        <Link
          href={href}
          className="rounded-sm underline-offset-4 transition-colors after:absolute after:inset-0 group-hover:text-signal group-hover:underline focus-visible:text-signal focus-visible:underline"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-body text-steel">{post.description}</p>
      {tags.length > 0 ? (
        <ul className="relative z-10 mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/blog/etiket/${tag.id}`}
                className="tag-pill rounded-sm bg-accent/10 font-mono text-eyebrow text-accent hover:bg-accent/20"
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <span
        aria-hidden="true"
        className="mt-5 inline-flex min-h-11 items-center font-mono text-small text-signal transition-transform duration-200 ease-takt motion-safe:group-hover:translate-x-0.5"
      >
        Oku →
      </span>
    </article>
  );
}
