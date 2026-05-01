import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Badge from "../../components/ui/Badge";
import { posts, formatDate, readingTime } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.status === "published");

  if (!post) return {};

  return {
    title: `${post.title} — Franco Balich`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Franco Balich"],
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.status === "published");

  if (!post) notFound();

  const publishedPosts = posts.filter((p) => p.status === "published");
  const currentIndex = publishedPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
  const next =
    currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : null;

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
    },
    datePublished: post.publishedAt,
    ...(post.coverImage && { image: post.coverImage }),
    url: postUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-[680px] mx-auto px-6">

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
              <Link
                href="/blog"
                className="hover:text-zinc-400 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-500">{post.title}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="blue">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-zinc-500 pb-6 border-b border-white/[0.06]">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>·</span>
              <span>{readingTime(post.content)} min de lectura</span>
            </div>
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 border border-white/[0.06]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 680px"
                priority
              />
            </div>
          )}

          {/* Body */}
          <article
            className="prose prose-invert prose-zinc max-w-none
              prose-headings:font-bold prose-headings:text-zinc-100
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-blue-400 hover:prose-a:text-blue-300
              prose-strong:text-zinc-100
              prose-code:text-cyan-400 prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/[0.08] prose-pre:rounded-xl
              prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-400
              prose-img:rounded-xl prose-img:border prose-img:border-white/[0.06]
              prose-hr:border-white/[0.06]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
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
              className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="flex flex-col gap-1 p-4 rounded-xl glass glass-hover transition-all duration-200 group"
                >
                  <span className="text-xs text-zinc-600">← Anterior</span>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="flex flex-col gap-1 p-4 rounded-xl glass glass-hover transition-all duration-200 group sm:text-right sm:items-end"
                >
                  <span className="text-xs text-zinc-600">Siguiente →</span>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
