import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import {
  relatedServiceLabel,
  resolvePostTags,
  resolveRelatedServicePath,
} from "@/lib/blog";

type BlogPostBodyProps = {
  post: BlogPost;
};

export function BlogPostBody({ post }: BlogPostBodyProps) {
  const relatedPath = resolveRelatedServicePath(post);

  return (
    <article className="max-w-3xl space-y-10">
      {post.sections.map((section, index) => (
        <section key={index}>
          {section.heading ? (
            <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
          ) : null}
          <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
            {section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-body text-steel">
                {paragraph}
              </p>
            ))}
            {section.list && section.list.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-body text-steel">
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.callToAction ? (
              <p className="rounded border border-line bg-white p-5 text-body text-steel">
                {section.callToAction.lead}{" "}
                <Link
                  href={section.callToAction.href}
                  className="font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  {section.callToAction.label}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </section>
      ))}

      {relatedPath ? (
        <aside className="rounded border border-line bg-white p-6">
          <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
            İlgili hizmet
          </p>
          <p className="mt-3 text-body text-steel">
            Bu yazıdaki konularla ilgili teknik destek ve danışmanlık için
            hizmet sayfamıza göz atın.
          </p>
          <Link
            href={relatedPath}
            className="mt-4 inline-block font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal"
          >
            {relatedServiceLabel(relatedPath)} →
          </Link>
        </aside>
      ) : null}
    </article>
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
    <article className="rounded border border-line bg-white p-6 transition-colors hover:border-signal/30">
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
          className="underline-offset-4 hover:text-signal hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-body text-steel">{post.description}</p>
      {tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
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
      <Link
        href={href}
        className="mt-4 inline-block font-mono text-small text-signal underline-offset-4 hover:underline"
      >
        Oku →
      </Link>
    </article>
  );
}
