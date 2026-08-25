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
import { resolveEnglishPostTags } from "@/lib/blog-en";

type BlogPostBodyProps = {
  post: BlogPost;
  locale?: "tr" | "en";
};

export function BlogPostBody({ post, locale = "tr" }: BlogPostBodyProps) {
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
          aria-label={locale === "en" ? "Contents" : "İçindekiler"}
          className="interactive-card mb-8 lg:sticky lg:top-[var(--sticky-offset)] lg:mb-0 lg:max-h-[calc(100vh-var(--nav-h)-2rem)] lg:overflow-y-auto"
        >
          <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
            {locale === "en" ? "Contents" : "İçindekiler"}
          </p>
          <ol className="mt-4 space-y-1.5 text-small text-steel">
            {post.headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.depth === 3 ? "pl-3" : undefined}
              >
                <a
                  href={`#${heading.id}`}
                  className="touch-target-inline w-full rounded-sm underline-offset-4 transition-colors hover:text-signal-text hover:underline"
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
              {locale === "en" ? "Guide collection" : "Rehber kümesi"}
            </p>
            <p className="mt-3 text-body text-steel">
              {locale === "en" ? "Part of this guide:" : "Bu rehberin parçası:"}{" "}
              <Link
              href={`${locale === "en" ? "/en" : ""}/rehber/${pillar.slug}`}
                className="touch-target-inline font-medium text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
              >
              {locale === "en"
                ? ({
                    "tersine-muhendislik-rehberi": "Reverse Engineering Guide",
                    "fea-muhendislik-analizi-rehberi": "FEA / Engineering Analysis Guide",
                    "yalin-uretim-dfm-rehberi": "Lean Manufacturing & DFM Guide",
                  } as Record<string, string>)[pillar.slug] ?? pillar.title
                : pillar.title}
              </Link>
            </p>
          </aside>
        ) : null}

        {relatedPath ? (
          <aside className="interactive-card">
            <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
              {locale === "en" ? "Related service" : "İlgili hizmet"}
            </p>
            <p className="mt-3 text-body text-steel">
              {locale === "en"
                ? "Explore the related service for technical support and consulting on the topics covered in this article."
                : "Bu yazıdaki konularla ilgili teknik destek ve danışmanlık için hizmet sayfamıza göz atın."}
            </p>
            <Link
              href={`${locale === "en" ? "/en" : ""}${relatedPath}`}
              className="touch-target-inline mt-2 font-medium text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
            >
              {locale === "en" ? "View related service" : relatedServiceLabel(relatedPath)} →
            </Link>
          </aside>
        ) : null}

        <LeadMagnetPromo locale={locale} />
      </div>
    </div>
  );
}

type BlogPostCardProps = {
  post: BlogPost;
  locale?: "tr" | "en";
};

export function BlogPostCard({ post, locale = "tr" }: BlogPostCardProps) {
  const href = `${locale === "en" ? "/en" : ""}/blog/${post.slug}`;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "en" ? "en-GB" : "tr-TR",
    {
    year: "numeric",
    month: "long",
    day: "numeric",
    },
  );
  const tags = locale === "en" ? resolveEnglishPostTags(post) : resolvePostTags(post);

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
            {post.readingTimeMinutes} {locale === "en" ? "min read" : "dk okuma"}
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-h3 text-ink">
        <Link
          href={href}
          className="rounded-sm underline-offset-4 transition-colors after:absolute after:inset-0 group-hover:text-signal-text group-hover:underline focus-visible:text-signal-text focus-visible:underline"
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
                href={`${locale === "en" ? "/en" : ""}/blog/etiket/${tag.id}`}
                className="tag-pill rounded-sm bg-accent/10 font-mono text-eyebrow text-ink hover:bg-accent/20"
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <span
        aria-hidden="true"
        className="mt-5 inline-flex min-h-11 items-center font-mono text-small text-signal-text transition-transform duration-200 ease-takt motion-safe:group-hover:translate-x-0.5"
      >
        {locale === "en" ? "Read →" : "Oku →"}
      </span>
    </article>
  );
}
