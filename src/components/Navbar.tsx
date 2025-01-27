'use client'

import { useEffect, useRef, useState } from "react";
import portfolioData from '../../portfolio.json'

export default function Navbar() {
    const { currentStatus } = portfolioData.about;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigationElement = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!navigationElement) return
        const navigationHeight = navigationElement.current?.offsetHeight ?? 0;
        document.documentElement.style.setProperty(
            "--scroll-padding",
            navigationHeight + 5 + "px"
        );
    }, [])

    const sections = ["About", "Experiences", "Skills", "Projects"]

    return (
        <nav ref={navigationElement} className={`flex justify-between py-5 px-5 sticky top-0 transition-all duration-300 rounded-bl-md rounded-br-md ${isScrolled ? "bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
            <ul className="flex justify-center">
                {sections.map((section, index) => (
                    <li key={section + index} className="transition-colors duration-300 cursor-pointer">
                        <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href={`/#${section.toLowerCase()}`}>
                            <div className="text-sm uppercase text-white transition-colors duration-300 hover:text-gray-400">
                                {section}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-center gap-2 border-2 border-gray-600 bg-gray-800 bg-opacity-50 px-6 rounded-full">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm">{currentStatus}</span>
            </div>
        </nav>
    )
}