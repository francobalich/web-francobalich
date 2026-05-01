import SocialLinks from "./ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-zinc-300 font-semibold">Franco Balich</span>
            <span className="text-zinc-400 text-sm">© {year} Todos los derechos reservados.</span>
          </div>

          <SocialLinks size="sm" />

          <a
            href="#hero"
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200 flex items-center gap-1"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Volver al inicio
          </a>

        </div>
      </div>
    </footer>
  );
}
