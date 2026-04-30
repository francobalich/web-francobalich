import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsPreview from "./components/ProjectsPreview";
import TalksPreview from "./components/TalksPreview";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
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
