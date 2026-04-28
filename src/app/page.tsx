import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experiences";
import Projects from "@/components/Projects";
import { portfolioData } from "@/lib/portfolio";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col pb-12 md:pb-16">
      <About />
      <Projects />
      <Experience />
      <Contact />

      <footer className="section-container mt-8 border-t border-border pt-8 text-center text-footer-foreground text-sm">
        <p>Copyright {currentYear} {portfolioData.about.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
