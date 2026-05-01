import { ImageResponse } from "next/og";

export const alt = "Franco Balich — Full Stack Developer & Data Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#09090B",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.1)",
            filter: "blur(60px)",
          }}
        />

        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "40px", height: "2px", background: "#3B82F6" }} />
          <span
            style={{
              color: "#60A5FA",
              fontSize: "18px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            francobalich.com
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              color: "#F4F4F5",
              fontSize: "88px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Franco
          </span>
          <span
            style={{
              fontSize: "88px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Balich.
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            color: "#71717A",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Full Stack Developer · Data Engineer · Doctorando en Informática
        </span>
      </div>
    ),
    size
  );
}
