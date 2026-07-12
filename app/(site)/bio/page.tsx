import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import SocialLinks from "../components/ui/SocialLinks";
import CopyButton from "./CopyButton";

export const metadata: Metadata = {
  title: "Biografía - Franco Balich",
  description:
    "Kit de prensa y recursos para medios. Bio, fotos y contacto de Franco Balich.",
};

const bioShort = `Investigador en robótica, IoT e IA, director de un laboratorio creativo 3D, Data Engineer y creador de contenido sobre tecnología en redes sociales.`;

const bioLong = `Soy investigador en Robótica e IA y Full Stack Developer. Dirijo el Laboratorio Creativo 3D, donde lidero proyectos en la intersección del software, los datos y el hardware.

Tengo más de 7 años de experiencia desarrollando plataformas web, sistemas IoT, pipelines de datos e inteligencia artificial. Me interesa especialmente la creación de proyectos propios y el emprendimiento tecnológico.

Soy docente universitario y formé a cientos de estudiantes en programación y ciencia de datos. Construí una comunidad de más de 120.000 seguidores con contenido sobre desarrollo, IoT y Python.

También doy charlas en eventos de tecnología en Argentina, sobre IoT, data engineering y educación tecnológica.`;

const expertise = [
  "Full Stack Development",
  "Data Engineering",
  "IoT",
  "Investigación Académica",
  "Laboratorio Creativo 3D",
  "Creación de Contenido",
  "Python",
  "Arduino",
];

export default function BioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-20">

          {/* ── Bloque 1: Presentación ── */}
          <section aria-label="Presentación">
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Biografía
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight mb-12">
              Franco Balich
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
              {/* Foto */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="relative w-44 h-44 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-blue-500/20 glow-blue flex-shrink-0">
                  <Image
                    src="/images/profile/franco.jpeg"
                    alt="Franco Balich - foto oficial"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 176px, 192px"
                    priority
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-zinc-300 font-semibold">Franco Balich</p>
                  <p className="text-zinc-500 text-sm">Full Stack Developer</p>
                  <p className="text-zinc-500 text-sm">Data Engineer · Doctorando</p>
                </div>
              </div>

              {/* Bios */}
              <div className="flex flex-col gap-6">
                {/* Bio corta */}
                <GlassCard hover={false} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                      Bio - {bioShort.length} / 200 caracteres
                    </span>
                    <CopyButton text={bioShort} />
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{bioShort}</p>
                </GlassCard>

                {/* Bio larga */}
                <GlassCard hover={false} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                      Bio en detalle - {bioLong.length} / 1000 caracteres
                    </span>
                    <CopyButton text={bioLong} />
                  </div>
                  <div className="flex flex-col gap-3">
                    {bioLong.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-zinc-300 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          {/* ── Bloque 2: Áreas de expertise ── */}
          <section aria-label="Áreas de expertise">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">
              Áreas de expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {expertise.map((area) => (
                <Badge key={area} variant="blue">
                  {area}
                </Badge>
              ))}
            </div>
          </section>

          {/* ── Bloque 5: CTA Invitame a hablar ── */}
          <section aria-label="Invitación a hablar">
            <GlassCard blue className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold text-zinc-100">
                    ¿Querés invitarme a hablar?
                  </h2>
                  <p className="text-zinc-400 leading-relaxed max-w-md">
                    Doy charlas sobre IoT, datos, laboratorios de innovación y
                    desarrollo de software. Si organizás un evento o meetup,
                    hablemos.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <a
                    href="https://linkedin.com/in/francobalich"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm text-center transition-colors duration-200"
                  >
                    Escribir por LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/francobalich"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl glass glass-hover text-zinc-300 hover:text-zinc-100 font-medium text-sm text-center transition-all duration-200"
                  >
                    Escribir por Instagram
                  </a>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* ── Bloque 4.5: Social proof ── */}
          <section aria-label="Organizaciones y eventos">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">
              Eventos y organizaciones
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              Eventos donde participé como speaker, instructor o panelista.
            </p>
            <GlassCard hover={false} className="p-10 text-center">
              <p className="text-zinc-600 text-sm">Logos de eventos - próximamente</p>
            </GlassCard>
          </section>

          {/* ── Bloque 3: Galería de fotos ── */}
          <section aria-label="Galería de fotos">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">
              Galería
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              Fotos en eventos, charlas y el laboratorio. Disponibles para uso
              en medios con crédito.
            </p>
            <GlassCard hover={false} className="p-10 text-center">
              <p className="text-zinc-600 text-sm">Fotos - próximamente</p>
            </GlassCard>
          </section>

          {/* ── Bloque 4 + 6: Kit de prensa ── */}
          <section aria-label="Kit de prensa">
            <GlassCard hover={false} className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-zinc-100">
                    Kit de Prensa
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Incluye foto oficial · bio en .txt · logos
                  </p>
                </div>
                <a
                  href="/press/press-kit.zip"
                  download
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-zinc-300 hover:text-zinc-100 font-medium text-sm transition-all duration-200 flex-shrink-0"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar Kit (.zip)
                </a>
              </div>
            </GlassCard>
          </section>

          {/* ── Bloque 7: Links y redes ── */}
          <section aria-label="Links y redes sociales">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">
              Redes y contacto
            </h2>
            <SocialLinks />
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
