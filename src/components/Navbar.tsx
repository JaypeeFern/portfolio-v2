'use client'

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/lib/portfolio";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const { socialLinks } = portfolioData.about;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const sections = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Experiences", href: "#experiences" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        const handlePointerDown = (event: MouseEvent) => {
            if (!mobileMenuRef.current?.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [isMobileMenuOpen]);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-5 md:px-6 ${
                isScrolled 
                    ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-lg shadow-primary/5" 
                    : "bg-background/0 backdrop-blur-none border-b border-transparent py-3.5 md:py-4"
            }`}
        >
            <nav className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <a href="#about" className="font-display text-xl font-bold tracking-[-0.04em] hover:opacity-80 transition-opacity">
                    JP<span className="text-primary font-black">.</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                    {sections.map((section) => (
                        <li key={section.name}>
                            <a 
                                href={section.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {section.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2.5 md:gap-3">
                    <ThemeToggle />
                    <a 
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex bg-foreground text-background px-4 md:px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all active:scale-95"
                    >
                        Let&apos;s Connect
                    </a>
                    <button
                        type="button"
                        className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground md:hidden"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation-sheet"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-4.5 w-4.5 text-primary" strokeWidth={1.8} />
                        ) : (
                            <Menu className="h-4.5 w-4.5 text-primary" strokeWidth={1.8} />
                        )}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="fixed inset-0 -z-10 bg-background/15 backdrop-blur-[2px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="md:hidden absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-2rem))]">
                        <div
                            ref={mobileMenuRef}
                            id="mobile-navigation-sheet"
                            role="dialog"
                            aria-label="Mobile navigation"
                            className="glass rounded-[1.5rem] border-border/80 shadow-2xl shadow-primary/10 overflow-hidden"
                        >
                            <div className="px-5 py-4 border-b border-border/60">
                                <p className="section-label">Navigate</p>
                            </div>
                            <div className="p-3">
                                <div className="flex flex-col gap-1">
                                    {sections.map((section) => (
                                        <a
                                            key={section.name}
                                            href={section.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                                        >
                                            {section.name}
                                        </a>
                                    ))}
                                </div>
                                <a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-all active:scale-[0.99]"
                                >
                                    Let&apos;s Connect
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
