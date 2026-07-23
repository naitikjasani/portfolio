import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Monogram favicon / PWA icon: "NJ" on the near-black canvas with an accent node.
export default function Icon() {
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
          borderRadius: 96,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 96,
            right: 96,
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "#5e95ff",
          }}
        />
        <div
          style={{
            fontSize: 260,
            fontWeight: 700,
            letterSpacing: -12,
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
