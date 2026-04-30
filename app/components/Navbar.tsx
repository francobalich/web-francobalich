export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">Franco Balich</span>
        <ul className="flex items-center gap-8 text-sm text-zinc-600">
          <li>
            <a href="#sobre-mi" className="hover:text-zinc-900 transition-colors">
              Sobre mí
            </a>
          </li>
          <li>
            <a href="#habilidades" className="hover:text-zinc-900 transition-colors">
              Habilidades
            </a>
          </li>
          <li>
            <a href="#portafolio" className="hover:text-zinc-900 transition-colors">
              Portafolio
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className="px-4 py-2 bg-zinc-900 text-white rounded-full hover:bg-zinc-700 transition-colors"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
