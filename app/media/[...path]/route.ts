import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filename = path.join("/");

  const storageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${filename}`;

  const upstream = await fetch(storageUrl);

  if (!upstream.ok) {
    return new NextResponse(null, { status: upstream.status });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
