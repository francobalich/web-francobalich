import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/social";

export const metadata: Metadata = {
  title: "Franco Balich - Links",
  description: "Todos los links de Franco Balich en un solo lugar.",
};

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default function LinksPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Profile */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-blue-500/20 glow-blue">
          <Image
            src="/images/profile/franco.jpeg"
            alt="Franco Balich"
            fill
            className="object-cover object-top"
            sizes="80px"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100">Franco Balich</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Full Stack Developer · Data Engineer
          </p>
        </div>
      </div>

      {/* Link list */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 rounded-2xl glass glass-hover text-zinc-300 hover:text-zinc-100 transition-all duration-200 group"
          >
            <span className="font-medium">{social.label}</span>
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <ArrowIcon />
            </span>
          </a>
        ))}

        <div className="border-t border-white/[0.06] my-1" />

        <Link
          href="/"
          className="flex items-center justify-between px-5 py-4 rounded-2xl glass-blue glass-hover text-blue-300 hover:text-blue-100 transition-all duration-200 group"
        >
          <span className="font-medium">Ver portafolio</span>
          <span className="text-blue-500/50 group-hover:text-blue-400 transition-colors">
            <ArrowIcon />
          </span>
        </Link>

        <a
          href="/bio"
          className="flex items-center justify-between px-5 py-4 rounded-2xl glass glass-hover text-zinc-300 hover:text-zinc-100 transition-all duration-200 group"
        >
          <span className="font-medium">Bio & Kit de prensa</span>
          <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
            <ArrowIcon />
          </span>
        </a>
      </div>

      <p className="mt-12 text-xs text-zinc-700">francobalich.com</p>
    </main>
  );
}
