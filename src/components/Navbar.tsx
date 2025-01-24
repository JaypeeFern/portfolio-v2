'use client'

import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sections = ["About", "Experiences", "Skills", "Projects"]

    return (
        <div className={`py-5 sticky top-0 transition-all duration-300 rounded-bl-md rounded-br-md ${isScrolled ? "bg-gray-600 bg-opacity-70 backdrop-blur-md" : "bg-transparent"}`}>
            <ul className="flex justify-center">
                {sections.map((section, index) => (
                    <li key={section + index} className="hover:text-pink-600 transition-colors duration-300 cursor-pointer">
                        <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href={`/#${section.toLowerCase()}`}>
                            <div className="text-sm uppercase text-white transition-colors duration-300 hover:text-pink-600">
                                {section}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}