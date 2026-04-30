const projects = [
  { name: "InnovativalLab", description: "Página de InnovativalLab" },
  { name: "Control Robots", description: "Página de control de robots" },
  { name: "Disendum", description: "Página de Disendum" },
  { name: "BS Dinner", description: "Página de BS Dinner" },
  { name: "Alice", description: "Página de Alice" },
  { name: "LabFabId", description: "Página de LabFabId" },
];

export default function Portfolio() {
  return (
    <section id="portafolio" className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-12">
          Portafolio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden group cursor-pointer"
            >
              <div className="h-44 bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
                Imagen del proyecto
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-zinc-900">{project.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-400 text-sm mt-10">
          ¡Y más próximamente!
        </p>
      </div>
    </section>
  );
}
