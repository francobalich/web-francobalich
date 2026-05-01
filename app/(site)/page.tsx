import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsPreview from "./components/ProjectsPreview";
import TalksPreview from "./components/TalksPreview";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Franco Balich",
  url: "https://francobalich.com",
  jobTitle: "Full Stack Developer & Data Engineer",
  description:
    "Director del Laboratorio Creativo 3D, Doctorando en Informática, Full Stack Developer y Data Engineer.",
  sameAs: [
    "https://github.com/FrancoBalich",
    "https://linkedin.com/in/francobalich",
    "https://instagram.com/francobalich",
    "https://twitch.tv/francolabs",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <ProjectsPreview />
        <TalksPreview />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
