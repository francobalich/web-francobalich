import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { getPayloadClient } from "@/lib/payload";
import { formatDate } from "@/data/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Franco Balich",
  description:
    "Artículos sobre desarrollo de software, IoT, datos y tecnología.",
};

function readingTime(content: object): number {
  const text = JSON.stringify(content).replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPage() {
  const payload = await getPayloadClient();
  const { docs: posts } = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
  });

  if (posts.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
                Contenido
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight">
                Blog
              </h1>
            </div>

            <GlassCard hover={false} className="p-16 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl glass-blue flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="text-blue-400"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
              </div>
              <p className="text-zinc-300 font-medium text-lg mb-2">
                El blog está en camino
              </p>
              <p className="text-zinc-500 text-base leading-relaxed mb-6">
                Mientras tanto, seguí mi contenido en Instagram y Twitch.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="https://instagram.com/francobalich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-400 hover:text-zinc-100 transition-all duration-200"
                >
                  Instagram
                </a>
                <a
                  href="https://twitch.tv/francolabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-400 hover:text-zinc-100 transition-all duration-200"
                >
                  Twitch
                </a>
              </div>
            </GlassCard>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Contenido
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight">
              Blog
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => {
              const coverUrl =
                typeof post.coverImage === "object" && post.coverImage
                  ? (post.coverImage as { url?: string }).url
                  : null;
              const tags = (post.tags ?? []).map((t: unknown) => (t as { tag: string }).tag);
              const publishedAt = post.publishedAt as string | null;

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <GlassCard className="overflow-hidden h-full flex flex-col">
                    <div className="h-44 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border-b border-white/[0.05] flex-shrink-0 relative overflow-hidden">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-zinc-700 text-sm">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-600">
                        {publishedAt && (
                          <>
                            <time dateTime={publishedAt}>
                              {formatDate(publishedAt)}
                            </time>
                            <span>·</span>
                          </>
                        )}
                        <span>{readingTime(post.content as object)} min de lectura</span>
                      </div>

                      <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-blue-300 transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag: string) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
