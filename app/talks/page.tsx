import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { talks, type Talk } from "@/data/talks";

export const metadata: Metadata = {
  title: "Charlas y Eventos — Franco Balich",
  description:
    "Charlas, workshops y eventos en los que Franco Balich ha participado como speaker, instructor o panelista.",
};

const roleLabel: Record<Talk["role"], string> = {
  speaker: "Speaker",
  instructor: "Instructor",
  panelist: "Panelista",
  organizer: "Organizador",
};

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={talk.upcoming ? "upcoming" : "default"}>
              {talk.upcoming ? "Próximo" : "Pasado"}
            </Badge>
            <Badge variant="blue">{roleLabel[talk.role]}</Badge>
            <span className="text-zinc-600 text-xs">
              {talk.date} · {talk.location}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-100">{talk.title}</h2>
          <p className="text-base text-zinc-500">{talk.event}</p>
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
          {talk.videoUrl && (
            <a
              href={talk.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Video ↗
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
  );
}

export default function TalksPage() {
  const upcoming = talks.filter((t) => t.upcoming);
  const past = talks
    .filter((t) => !t.upcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Comunidad
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight mb-4">
              Charlas y eventos
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl">
              Charlas, workshops y participaciones en eventos de la comunidad
              tech.
            </p>
          </div>

          {talks.length === 0 ? (
            <GlassCard hover={false} className="p-16 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl glass-blue flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="text-cyan-400"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              </div>
              <p className="text-zinc-300 font-medium text-lg mb-2">
                Próximamente
              </p>
              <p className="text-zinc-500 text-base">
                Las charlas y eventos aparecerán acá.
              </p>
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-12">
              {upcoming.length > 0 && (
                <section aria-label="Próximos eventos">
                  <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                    Próximos
                  </h2>
                  <div className="flex flex-col gap-4">
                    {upcoming.map((talk) => (
                      <TalkCard key={talk.id} talk={talk} />
                    ))}
                  </div>
                </section>
              )}
              {past.length > 0 && (
                <section aria-label="Eventos pasados">
                  <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                    Pasados
                  </h2>
                  <div className="flex flex-col gap-4">
                    {past.map((talk) => (
                      <TalkCard key={talk.id} talk={talk} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
