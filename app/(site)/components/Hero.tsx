import SocialLinks from "./ui/SocialLinks";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./ui/FadeIn";

const stats = [
  { label: "Director de", value: "Lab Creativo 3D" },
  { label: "Investigación", value: "Robótica e IA" },
  { label: "Especialización", value: "IA · IoT · Web" },
  { label: "Ubicación", value: "Argentina" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full py-16 md:py-24">

        {/* Descriptor */}
        <FadeIn instant delay={0} className="flex items-center gap-4 mb-10">
          <span className="h-px w-10 bg-blue-500 flex-shrink-0" />
          <span className="text-sm md:text-base text-blue-400 font-medium tracking-widest uppercase">
            Full Stack · Investigador · Docente · Creador de contenido
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-20 items-stretch">

          {/* Texto */}
          <div className="flex flex-col gap-8 justify-center">

            <FadeIn instant delay={100}>
              <h1 className="font-bold leading-none tracking-tight">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-100">
                  Franco
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 pb-2">
                  Balich.
                </span>
              </h1>
            </FadeIn>

            <FadeIn instant delay={220} className="flex flex-col gap-3 max-w-xl">
              <p className="text-zinc-300 text-xl md:text-2xl font-light leading-snug">
                Data Engineer · Docente e Investigador
              </p>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Más de 7 años construyendo software en desarrollo, investigación
                y educación. Apasionado por la IA, el IoT y enseñar tecnología
                a más de 120k personas en redes sociales.
              </p>
            </FadeIn>

            <FadeIn instant delay={340} className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-base font-medium transition-colors duration-200"
              >
                Ver proyectos
              </Link>
              <Link
                href="/bio"
                className="px-7 py-3.5 rounded-xl glass glass-hover text-zinc-300 hover:text-zinc-100 text-base font-medium transition-all duration-200"
              >
                Descargar bio
              </Link>
            </FadeIn>

            <FadeIn instant delay={440}>
              <SocialLinks />
            </FadeIn>

          </div>

          {/* Foto */}
          <FadeIn instant delay={300} className="flex items-stretch justify-center lg:justify-end">
            <div className="relative w-80 md:w-96 min-h-80">
              <div className="absolute -inset-4 rounded-[2rem] glow-blue opacity-40 blur-2xl" />
              <div className="relative w-full h-full rounded-3xl border border-blue-500/20 overflow-hidden">
                <Image
                  src="/images/profile/franco.jpeg"
                  alt="Franco Balich"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Stats */}
        <FadeIn instant delay={500} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/[0.06]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="text-xs text-zinc-600 uppercase tracking-widest">
                {stat.label}
              </span>
              <span className="text-zinc-200 font-medium text-base md:text-lg">
                {stat.value}
              </span>
            </div>
          ))}
        </FadeIn>

      </div>
    </section>
  );
}
