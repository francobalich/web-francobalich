const pillars = [
  {
    title: "Desarrollo e Innovación",
    description:
      "Desarrollo soluciones full stack y sistemas IoT utilizando Python, integrando hardware y software para crear soluciones tecnológicas aplicadas.",
  },
  {
    title: "Análisis de Datos",
    description:
      "Implemento sistemas de análisis de datos y automatización, combinando investigación académica con desarrollo práctico de soluciones.",
  },
  {
    title: "Dirección de Laboratorio",
    description:
      "Dirijo el Laboratorio Creativo 3D, un espacio de innovación donde convergen el diseño, la tecnología y el desarrollo de soluciones con impacto real.",
  },
  {
    title: "Creador de Contenido",
    description:
      "Comparto conocimiento sobre tecnología, programación y desarrollo a través de redes sociales, ayudando a otros a aprender y crecer en el mundo tech.",
  },
];

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-8">
          ¿Quién soy?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <p className="text-zinc-600 leading-relaxed">
            Soy Franco Balich, Director del Laboratorio Creativo 3D, Doctorando
            en Informática, Full Stack Developer y Data Engineer, con una fuerte
            vocación por unir la investigación académica con el desarrollo de
            soluciones tecnológicas aplicadas. Como Director del Laboratorio
            Creativo 3D, lidero proyectos innovadores en Internet de las Cosas
            (IoT), análisis de datos y desarrollo de software, creando un espacio
            donde confluyen la innovación, el diseño y la tecnología.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Mi perfil combina una sólida formación técnica con experiencia
            práctica en proyectos interdisciplinarios. Utilizo principalmente
            Python para el desarrollo de sistemas inteligentes, automatización y
            análisis de datos, integrando hardware y software en soluciones
            reales. Me apasiona explorar nuevas formas de usar la tecnología para
            resolver problemas del mundo real y formar equipos que construyan
            productos con impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-xl p-6 border border-zinc-200"
            >
              <h3 className="font-semibold text-zinc-900 mb-3">{pillar.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
