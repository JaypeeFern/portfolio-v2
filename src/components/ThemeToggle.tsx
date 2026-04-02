'use client'

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const storageKey = "portfolio-theme";

function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") {
            return "dark";
        }

        const savedTheme = window.localStorage.getItem(storageKey) as Theme | null;
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        return savedTheme ?? preferredTheme;
    });

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        window.localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
    };

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
            <span className="relative flex h-5 w-5 items-center justify-center text-primary">
                <span
                    className={`absolute transition-all duration-300 ${isDark ? "scale-100 opacity-100 rotate-0" : "scale-75 opacity-0 -rotate-45"}`}
                >
                    <Sun aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span
                    className={`absolute transition-all duration-300 ${isDark ? "scale-75 opacity-0 rotate-45" : "scale-100 opacity-100 rotate-0"}`}
                >
                    <Moon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
            </span>
        </button>
    );
}
