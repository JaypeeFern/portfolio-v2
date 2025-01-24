import About from "@/components/About";
import Experience from "@/components/Experiences";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="*:py-56 *:flex *:justify-center *:items-center *:border-b-2 *:text-3xl">
      <About />
      <Experience />
      <Skills />
      <Projects />
    </div>
  );
}
