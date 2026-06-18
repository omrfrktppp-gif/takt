import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 4,
          background: "#F4F6F4",
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            style={{
              width: 3,
              height: index === 2 ? 18 : 12,
              background: index === 2 ? "#1F4FE0" : "#D7DCE2",
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
