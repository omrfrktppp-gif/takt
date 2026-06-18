import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F6F4",
          padding: "72px",
          color: "#12161C",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              style={{
                width: 4,
                height: index === 3 ? 40 : 24,
                background: index === 3 ? "#1F4FE0" : "#D7DCE2",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4A5563",
              marginBottom: 16,
            }}
          >
            Mühendislik Danışmanlığı
          </div>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
