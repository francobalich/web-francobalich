import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Franco Balich — Full Stack Developer & Data Engineer",
  description:
    "Director del Laboratorio Creativo 3D, Doctorando en Informática, Full Stack Developer y Data Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
