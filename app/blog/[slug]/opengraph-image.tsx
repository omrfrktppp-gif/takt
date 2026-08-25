import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Takt teknik blog yazısı";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function slugHash(slug: string): number {
  let hash = 2166136261;
  for (const character of slug) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const hash = slugHash(post.slug);
  const titleSize =
    post.title.length > 82 ? 44 : post.title.length > 58 ? 50 : 58;
  const nodeOffsets = Array.from({ length: 6 }, (_, index) => ({
    left: 92 + ((hash >>> (index * 4)) % 940),
    top: 84 + ((hash >>> (index * 3)) % 430),
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#15181c",
          color: "#f4f6f4",
          padding: "68px 76px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {Array.from({ length: 13 }, (_, index) => (
          <div
            key={`v-${index}`}
            style={{
              position: "absolute",
              left: index * 100,
              top: 0,
              width: 1,
              height: 630,
              backgroundColor: "#343b44",
              opacity: 0.65,
            }}
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`h-${index}`}
            style={{
              position: "absolute",
              left: 0,
              top: index * 90,
              width: 1200,
              height: 1,
              backgroundColor: "#343b44",
              opacity: 0.65,
            }}
          />
        ))}
        {nodeOffsets.map((node, index) => (
          <div
            key={`node-${index}`}
            style={{
              position: "absolute",
              left: node.left,
              top: node.top,
              width: index % 2 === 0 ? 12 : 8,
              height: index % 2 === 0 ? 12 : 8,
              border: "2px solid #5b8cff",
              backgroundColor: "#1c2127",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#aeb7c2",
          }}
        >
          <span style={{ color: "#5b8cff", marginRight: 16 }}>■</span>
          TAKT · TEKNİK BLOG
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            width: 1000,
            padding: "28px 32px",
            borderLeft: "8px solid #5b8cff",
            backgroundColor: "rgba(28, 33, 39, 0.96)",
            fontSize: titleSize,
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: -1.5,
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#aeb7c2",
          }}
        >
          <span>{post.category ?? "Mühendislik"}</span>
          <span style={{ color: "#5b8cff" }}>takt.tr/blog/{post.slug}</span>
        </div>
      </div>
    ),
    size,
  );
}
