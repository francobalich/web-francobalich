import { ImageResponse } from "next/og";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 0,
  });
  const post = docs[0];
  const title = post?.title ?? "Blog — Franco Balich";
  const excerpt = post?.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "#09090B",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow top-left */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.13)",
            filter: "blur(80px)",
          }}
        />
        {/* Glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.09)",
            filter: "blur(60px)",
          }}
        />

        {/* Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "absolute",
            top: "64px",
            left: "80px",
          }}
        >
          <div style={{ width: "32px", height: "2px", background: "#3B82F6" }} />
          <span style={{ color: "#60A5FA", fontSize: "16px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            francobalich.com/blog
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              color: "#F4F4F5",
              fontSize: title.length > 60 ? "44px" : "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            {title}
          </span>
          {excerpt && (
            <span
              style={{
                color: "#71717A",
                fontSize: "22px",
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: "900px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </span>
          )}

          {/* Author line */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>F</span>
            </div>
            <span style={{ color: "#52525B", fontSize: "18px" }}>Franco Balich</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
