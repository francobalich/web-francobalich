import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos - Franco Balich",
  description:
    "Proyectos de software, IoT y data engineering desarrollados por Franco Balich.",
};

const statusLabel: Record<string, string> = {
  wip: "En progreso",
  "coming-soon": "Próximamente",
};

const ExternalIcon = () => (
  <svg
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
              Trabajo
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight mb-4">
              Mis proyectos
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl">
              Soluciones en software, datos e IoT. Cada proyecto como case
              study: problema, enfoque y resultado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <GlassCard key={project.id} className="overflow-hidden flex flex-col">
                <div className="h-44 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 flex items-center justify-center border-b border-white/[0.05] relative flex-shrink-0">
                  <span className="text-zinc-700 text-sm">{project.name}</span>
                  {project.status !== "published" && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={
                          project.status === "wip" ? "upcoming" : "default"
                        }
                      >
                        {statusLabel[project.status]}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h2 className="text-lg font-semibold text-zinc-100">
                    {project.name}
                  </h2>
                  <p className="text-base text-zinc-500 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  {(project.demoUrl || project.repoUrl || project.socialUrl) && (
                    <div className="flex gap-3 pt-1">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors duration-200"
                        >
                          Demo <ExternalIcon />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors duration-200"
                        >
                          Código <ExternalIcon />
                        </a>
                      )}
                      {project.socialUrl && (
                        <a
                          href={project.socialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors duration-200"
                        >
                          Redes <ExternalIcon />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
