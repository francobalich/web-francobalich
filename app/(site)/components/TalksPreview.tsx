import Link from "next/link";
import GlassCard from "./ui/GlassCard";
import Badge from "./ui/Badge";
import { talks } from "@/data/talks";

export default function TalksPreview() {
  const recent = talks.slice(0, 3);
  const isEmpty = recent.length === 0;

  return (
    <section id="charlas" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Comunidad
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
              Charlas y eventos
            </h2>
          </div>
          {!isEmpty && (
            <Link
              href="/talks"
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            >
              Ver todas
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {isEmpty ? (
          /* Empty state */
          <GlassCard hover={false} className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl glass-blue flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium mb-1">
              Próximamente
            </p>
            <p className="text-zinc-600 text-sm">
              Las charlas y eventos aparecerán acá.
            </p>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-4">
            {recent.map((talk) => (
              <GlassCard key={talk.id} className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={talk.upcoming ? "upcoming" : "default"}>
                        {talk.upcoming ? "Próximo" : "Pasado"}
                      </Badge>
                      <Badge variant="blue">{talk.role}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">{talk.title}</h3>
                    <p className="text-base text-zinc-500">
                      {talk.event} · {talk.date} · {talk.location}
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    {talk.slidesUrl && (
                      <a
                        href={talk.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Slides ↗
                      </a>
                    )}
                    {talk.eventUrl && (
                      <a
                        href={talk.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        Evento ↗
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
