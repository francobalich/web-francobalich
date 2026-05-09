import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Badge from "../../components/ui/Badge";
import TableOfContents, { type Heading } from "./TableOfContents";
import { getPayloadClient } from "@/lib/payload";
import { formatDate } from "@/data/blog";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { highlightCodeBlocks } from "@/lib/highlight";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function extractHeadings(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const counts: Record<string, number> = {};

  const processed = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
    const level = parseInt(tag[1]) as 2 | 3;
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    counts[base] = (counts[base] ?? 0) + 1;
    const id = counts[base] > 1 ? `${base}-${counts[base]}` : base;
    headings.push({ id, text, level });
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });

  return { html: processed, headings };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    depth: 0,
    limit: 1,
  });
  const post = docs[0];
  if (!post) return {};

  const postUrl = `https://francobalich.com/blog/${post.slug}`;
  const tags = (post.tags ?? []).map((t: unknown) => (t as { tag: string }).tag);
  const publishedAt = post.publishedAt as string | undefined;
  const updatedAt = post.updatedAt as string | undefined;

  return {
    title: `${post.title} — Franco Balich`,
    description: post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Franco Balich",
      locale: "es_AR",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: ["Franco Balich"],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Franco Balich`,
      description: post.excerpt,
      creator: "@francobalich",
      site: "@francobalich",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayloadClient();

  const { docs: allPosts } = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
  });

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) notFound();

  const post = allPosts[currentIndex];
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const coverUrl =
    typeof post.coverImage === "object" && post.coverImage
      ? (post.coverImage as { url?: string }).url
      : null;
  const tags = (post.tags ?? []).map((t: unknown) => (t as { tag: string }).tag);
  const publishedAt = post.publishedAt as string | null;

  // Related posts: share at least one tag, exclude current
  const related = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => {
      const pTags = (p.tags ?? []).map((t: unknown) => (t as { tag: string }).tag);
      return tags.some((tag: string) => pTags.includes(tag));
    })
    .slice(0, 3);

  const rawHtml = convertLexicalToHTML({
    data: post.content as SerializedEditorState,
    disableContainer: true,
    converters: ({ defaultConverters }) => ({
      ...defaultConverters,
      code: ({ node }) => {
        const lang = (node as unknown as { language?: string }).language ?? "";
        const text = ((node as unknown as { children?: SerializedLexicalNode[] }).children ?? [])
          .map((child) => (child as unknown as { text?: string }).text ?? "")
          .join("");
        const escaped = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
      },
    }),
  });

  const highlighted = await highlightCodeBlocks(rawHtml);
  const { html: contentHtml, headings } = extractHeadings(highlighted);

  const postUrl = `https://francobalich.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&via=francobalich`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: "Franco Balich",
      url: "https://francobalich.com",
      sameAs: [
        "https://linkedin.com/in/francobalich",
        "https://github.com/francobalich",
        "https://twitter.com/francobalich",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Franco Balich",
      url: "https://francobalich.com",
    },
    ...(publishedAt && { datePublished: publishedAt }),
    dateModified: post.updatedAt as string,
    ...(coverUrl && { image: coverUrl }),
    ...(tags.length > 0 && { keywords: tags.join(", ") }),
    url: postUrl,
    inLanguage: "es-AR",
    isPartOf: {
      "@type": "Blog",
      name: "Blog — Franco Balich",
      url: "https://francobalich.com/blog",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12 xl:gap-16">

            {/* Main content */}
            <div className="min-w-0">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                <Link href="/blog" className="hover:text-zinc-300 transition-colors">
                  Blog
                </Link>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400 truncate">{post.title}</span>
              </div>

              {/* Reading surface card */}
              <div className="bg-zinc-800/50 border border-zinc-700/60 rounded-3xl px-8 md:px-14 py-10 md:py-12 mb-10 backdrop-blur-sm">
                <header className="mb-10">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag: string) => (
                      <Badge key={tag} variant="blue">{tag}</Badge>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-4">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-3 text-sm text-zinc-500 pb-6 border-b border-white/[0.06]">
                    {publishedAt && (
                      <>
                        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                        <span>·</span>
                      </>
                    )}
                    <span>
                      {Math.max(1, Math.round(contentHtml.split(/\s+/).length / 200))} min de lectura
                    </span>
                  </div>
                </header>

                {coverUrl && (
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 border border-white/[0.06]">
                    <Image
                      src={coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 720px"
                      priority
                    />
                  </div>
                )}

                <article
                  className="prose prose-lg prose-invert prose-zinc max-w-none
                    prose-headings:font-bold prose-headings:text-zinc-100
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-a:text-blue-400 hover:prose-a:text-blue-300
                    prose-strong:text-zinc-100
                    prose-code:text-cyan-400 prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/[0.08] prose-pre:rounded-xl
                    prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-400
                    prose-img:rounded-xl prose-img:border prose-img:border-white/[0.06]
                    prose-hr:border-white/[0.06]"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              {/* Share */}
              <div className="mb-8">
                <p className="text-sm text-zinc-500 mb-4">Compartir</p>
                <div className="flex gap-3">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-400 hover:text-zinc-100 transition-all duration-200"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter / X
                  </a>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-400 hover:text-zinc-100 transition-all duration-200"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Prev / Next */}
              {(prev || next) && (
                <nav
                  aria-label="Navegación entre posts"
                  className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
                >
                  {next && (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="flex flex-col gap-1 p-4 rounded-xl glass glass-hover transition-all duration-200 group"
                    >
                      <span className="text-xs text-zinc-500">← Anterior</span>
                      <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                        {next.title}
                      </span>
                    </Link>
                  )}
                  {prev && (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="flex flex-col gap-1 p-4 rounded-xl glass glass-hover transition-all duration-200 group sm:text-right sm:items-end"
                    >
                      <span className="text-xs text-zinc-500">Siguiente →</span>
                      <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                        {prev.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}

              {/* Related posts */}
              {related.length > 0 && (
                <section>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                    También te puede interesar
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {related.map((p) => {
                      const pTags = (p.tags ?? []).map((t: unknown) => (t as { tag: string }).tag);
                      const pDate = p.publishedAt as string | null;
                      return (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="flex flex-col gap-2 p-4 rounded-xl glass glass-hover transition-all duration-200 group"
                        >
                          <div className="flex flex-wrap gap-1">
                            {(pTags as string[]).slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="blue">{tag}</Badge>
                            ))}
                          </div>
                          <p className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                            {p.title}
                          </p>
                          {pDate && (
                            <p className="text-xs text-zinc-600">{formatDate(pDate)}</p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* TOC sidebar */}
            {headings.length > 1 && (
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
