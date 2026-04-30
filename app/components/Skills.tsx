const current = [
  "HTML5",
  "CSS3",
  "Python",
  "JavaScript",
  "C#",
  "Bootstrap",
  "Git",
  "Figma",
  "Node.js",
];

const learning = ["MySQL", "MongoDB", "React"];

const other = ["Inglés", "Arduino", "C++", "C"];

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="px-4 py-2 rounded-full border border-zinc-200 text-sm text-zinc-700 bg-white">
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="habilidades" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-12">
          Habilidades
        </h2>

        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              Hoy sé usar
            </p>
            <div className="flex flex-wrap gap-3">
              {current.map((s) => (
                <SkillBadge key={s} name={s} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              Interesado en aprender
            </p>
            <div className="flex flex-wrap gap-3">
              {learning.map((s) => (
                <SkillBadge key={s} name={s} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              Otras habilidades
            </p>
            <div className="flex flex-wrap gap-3">
              {other.map((s) => (
                <SkillBadge key={s} name={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
