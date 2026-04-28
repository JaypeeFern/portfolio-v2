'use client'

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getInitials } from "@/lib/format";
import { portfolioData } from "@/lib/portfolio";
import ThemeToggle from "./ThemeToggle";

const sections = [
    { name: "Home", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Experience", href: "#experiences" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const about = portfolioData.about;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
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
        <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
            <nav className="section-container flex items-center gap-10 py-4">
                <a href="#about" className="font-display text-2xl font-semibold text-primary transition-opacity hover:opacity-75">
                    {getInitials(about.name)}
                </a>

                <ul className="hidden items-center gap-7 md:flex">
                    {sections.map((section) => (
                        <li key={section.name}>
                            <a href={section.href} className="nav-link">
                                {section.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="ml-auto flex items-center gap-2.5">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="icon-button md:hidden"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation-sheet"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" strokeWidth={1.8} />
                        ) : (
                            <Menu className="h-5 w-5" strokeWidth={1.8} />
                        )}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="fixed inset-0 -z-10 bg-background/30 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute right-5 top-full mt-2 w-[min(20rem,calc(100vw-2.5rem))] md:hidden">
                        <div
                            ref={mobileMenuRef}
                            id="mobile-navigation-sheet"
                            role="dialog"
                            aria-label="Mobile navigation"
                            className="rounded-lg border border-border bg-surface p-2 shadow-2xl shadow-foreground/10"
                        >
                            {sections.map((section) => (
                                <a
                                    key={section.name}
                                    href={section.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-md px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                                >
                                    {section.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
