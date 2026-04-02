import About from "@/components/About";
import Experience from "@/components/Experiences";
import Projects from "@/components/Projects";
import { portfolioData } from "@/lib/portfolio";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-2 pb-14 md:gap-6 md:pb-20">
      <About />
      <Projects />
      <Experience />

      <footer className="section-container border-t border-border pt-8 text-center text-footer-foreground text-sm">
        <p>Copyright {currentYear} {portfolioData.about.name}. Built with Next.js and Tailwind CSS.</p>
      </footer>
    </div>
  );
}
