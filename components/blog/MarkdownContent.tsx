import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogHeading } from "@/lib/blog-types";

type MarkdownContentProps = {
  markdown: string;
  headings: BlogHeading[];
};

function safeLinkTarget(href: string): {
  href: string;
  external: boolean;
} | null {
  if (href.startsWith("/") || href.startsWith("#")) {
    return { href, external: false };
  }

  try {
    const url = new URL(href);
    if (url.protocol === "https:" || url.protocol === "http:") {
      if (url.hostname === "takt.tr" || url.hostname === "www.takt.tr") {
        return {
          href: `${url.pathname}${url.search}${url.hash}`,
          external: false,
        };
      }
      return { href: url.toString(), external: true };
    }
    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return { href: url.toString(), external: false };
    }
  } catch {
    return null;
  }

  return null;
}

function MarkdownLink({
  href,
  children,
  title,
}: ComponentPropsWithoutRef<"a">) {
  const target = href ? safeLinkTarget(href) : null;
  if (!target) return <span>{children}</span>;

  const className =
    "font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal";

  if (!target.external) {
    return (
      <Link href={target.href} title={title} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={target.href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function HeadingAnchor({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${id}`}
      className="group text-inherit no-underline"
      aria-label="Bu bölüme bağlantı"
    >
      {children}
      <span
        aria-hidden="true"
        className="ml-2 text-signal opacity-0 transition-opacity group-hover:opacity-100"
      >
        #
      </span>
    </a>
  );
}

export function MarkdownContent({
  markdown,
  headings,
}: MarkdownContentProps) {
  let headingIndex = 0;
  const nextHeading = () => headings[headingIndex++];

  const components: Components = {
    h1: ({ children }) => (
      <h2 className="mt-10 scroll-mt-28 font-display text-h2 text-ink first:mt-0">
        {children}
      </h2>
    ),
    h2: ({ children }) => {
      const heading = nextHeading();
      return (
        <h2
          id={heading?.id}
          className="mt-10 scroll-mt-28 font-display text-h3 text-ink first:mt-0"
        >
          {heading ? (
            <HeadingAnchor id={heading.id}>{children}</HeadingAnchor>
          ) : (
            children
          )}
        </h2>
      );
    },
    h3: ({ children }) => {
      const heading = nextHeading();
      return (
        <h3
          id={heading?.id}
          className="mt-8 scroll-mt-28 font-display text-xl text-ink"
        >
          {heading ? (
            <HeadingAnchor id={heading.id}>{children}</HeadingAnchor>
          ) : (
            children
          )}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mt-6 scroll-mt-28 font-display text-lg text-ink">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-body leading-relaxed text-steel">{children}</p>
    ),
    a: MarkdownLink,
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="text-ink">{children}</em>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-body text-steel">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-body text-steel">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-signal bg-white px-5 py-1 text-steel">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-line" />,
    pre: ({ children }) => (
      <pre
        className="mt-5 overflow-x-auto rounded border border-line bg-ink p-4 font-mono text-small leading-relaxed text-paper"
        tabIndex={0}
        aria-label="Yatay kaydırılabilir kod örneği"
      >
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      const isBlock = Boolean(className) || String(children).endsWith("\n");
      return (
        <code
          className={
            isBlock
              ? `${className ?? ""} font-mono`
              : "rounded bg-accent/10 px-1.5 py-0.5 font-mono text-small text-ink"
          }
        >
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div
        className="mt-6 overflow-x-auto rounded border border-line"
        tabIndex={0}
        role="region"
        aria-label="Yatay kaydırılabilir teknik tablo"
      >
        <table className="w-full border-collapse text-left text-small text-steel">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-accent/10">{children}</thead>,
    th: ({ children }) => (
      <th className="border-b border-line px-4 py-3 font-semibold text-ink">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-line px-4 py-3 align-top">{children}</td>
    ),
  };

  return (
    <div className="blog-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
