export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML from Payload/Lexical
  coverImage?: string;
  tags: string[];
  publishedAt: string; // ISO date string
  status: "published" | "draft";
}

export function readingTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Populated by Payload CMS in Phase 4 — static fallback during development
export const posts: Post[] = [];
