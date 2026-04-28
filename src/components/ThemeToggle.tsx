'use client'

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const storageKey = "portfolio-theme";

function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains("dark");
        const nextTheme = isDark ? "light" : "dark";

        applyTheme(nextTheme);
        window.localStorage.setItem(storageKey, nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="icon-button theme-toggle"
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            <span className="relative flex h-5 w-5 items-center justify-center text-primary">
                <Sun aria-hidden="true" className="theme-toggle__sun h-4 w-4" strokeWidth={1.8} />
                <Moon aria-hidden="true" className="theme-toggle__moon h-4 w-4" strokeWidth={1.8} />
            </span>
        </button>
    );
}
