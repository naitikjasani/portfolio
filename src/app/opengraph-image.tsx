import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stack = ["Node.js", "TypeScript", "AWS SQS", "Java", "Spring Boot"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(120,132,156,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,132,156,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 320,
            width: 720,
            height: 480,
            background:
              "radial-gradient(circle at center, rgba(94,149,255,0.28), transparent 60%)",
            display: "flex",
          }}
        />

        {/* header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid #23262d",
              background: "#0e1014",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#ededef",
            }}
          >
            NJ
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#2ecc8f",
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#9aa3b2",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${site.availability} · ${site.location}`}
            </div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#f3f4f6",
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#9aa3b2",
              maxWidth: 900,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            Backend engineer building order, returns and wallet workflows at OZi.
          </div>
        </div>

        {/* footer chips */}
        <div style={{ display: "flex", gap: 12 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 22,
                color: "#9aa3b2",
                border: "1px solid #23262d",
                background: "#0e1014",
                borderRadius: 10,
                padding: "8px 16px",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
