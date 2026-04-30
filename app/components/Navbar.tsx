"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Charlas", href: "/charlas" },
  { label: "Blog", href: "/blog" },
  { label: "Bio", href: "/bio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/[0.08]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-zinc-100 font-semibold tracking-tight hover:text-blue-400 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Franco Balich
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/[0.05] transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl glass glass-hover"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-zinc-950/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`w-full text-center py-4 text-2xl font-semibold text-zinc-300 hover:text-zinc-100 border-b border-white/[0.06] transition-all duration-200 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pb-12 text-center text-sm text-zinc-600">
          francobalich.com
        </div>
      </div>
    </>
  );
}
