import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Franco Balich — Full Stack Developer & Data Engineer",
  description:
    "Director del Laboratorio Creativo 3D, Doctorando en Informática, Full Stack Developer y Data Engineer.",
  metadataBase: new URL("https://francobalich.com"),
  openGraph: {
    title: "Franco Balich — Full Stack Developer & Data Engineer",
    description:
      "Director del Laboratorio Creativo 3D, Doctorando en Informática, Full Stack Developer y Data Engineer.",
    url: "https://francobalich.com",
    siteName: "Franco Balich",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franco Balich — Full Stack Developer & Data Engineer",
    description:
      "Director del Laboratorio Creativo 3D, Doctorando en Informática, Full Stack Developer y Data Engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="min-h-screen font-sans antialiased">
        {/* Mesh gradient background — fixed, detrás de todo */}
        <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-zinc-950" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.12] rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/[0.08] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/[0.08] rounded-full blur-3xl" />
        </div>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
