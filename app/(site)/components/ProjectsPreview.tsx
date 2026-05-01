import Link from "next/link";
import GlassCard from "./ui/GlassCard";
import Badge from "./ui/Badge";
import FadeIn from "./ui/FadeIn";
import { projects } from "@/data/projects";

export default function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="proyectos" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn className="flex items-end justify-between mb-12">
          <div>
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Trabajo
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
              Mis proyectos
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            Ver todos
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 100}>
            <GlassCard className="overflow-hidden group h-full">
              {/* Imagen placeholder */}
              <div className="h-44 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 flex items-center justify-center border-b border-white/[0.05]">
                <span className="text-zinc-500 text-sm">{project.name}</span>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-zinc-100">{project.name}</h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors duration-200"
                    >
                      Demo
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors duration-200"
                    >
                      Código
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
            </FadeIn>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/projects"
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
          >
            Ver todos los proyectos →
          </Link>
        </div>

      </div>
    </section>
  );
}
