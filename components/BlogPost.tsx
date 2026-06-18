import Link from "next/link";
import { Section } from "@/components/Section";
import type { BlogPost } from "@/lib/blog";
import { resolvePostTags } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const tags = resolvePostTags(post);
  const date = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded border border-line bg-white p-6">
      <time
        dateTime={post.publishedAt}
        className="font-mono text-eyebrow text-steel"
      >
        {date}
      </time>
      <h2 className="mt-3 font-display text-h3 text-ink">
        <Link
          href={`/blog/${post.slug}`}
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
    </article>
  );
}

type BlogPostBodyProps = {
  post: BlogPost;
};

export function BlogPostBody({ post }: BlogPostBodyProps) {
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
          </div>
        </section>
      ))}
    </article>
  );
}
