import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 34,
            right: 34,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#5e95ff",
          }}
        />
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -4,
            color: "#ededef",
            fontFamily: "sans-serif",
          }}
        >
          NJ
        </div>
      </div>
    ),
    { ...size },
  );
}
