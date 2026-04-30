import Link from "next/link";
import GlassCard from "./ui/GlassCard";

export default function BlogPreview() {
  // En Fase 4 esto consultará Payload CMS
  const posts: never[] = [];

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Contenido
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
              Blog
            </h2>
          </div>

          <GlassCard hover={false} className="p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl glass-blue flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
            <p className="text-zinc-300 font-medium text-lg mb-2">El blog está en camino</p>
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
                href="https://twitch.tv/francobalich"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg glass glass-hover text-sm text-zinc-400 hover:text-zinc-100 transition-all duration-200"
              >
                Twitch
              </a>
            </div>
          </GlassCard>

        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Contenido
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
              Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            Ver todos
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        {/* Lista de posts — se implementa en Fase 4 */}
      </div>
    </section>
  );
}
