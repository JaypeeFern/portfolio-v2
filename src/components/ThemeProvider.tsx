'use client'

import { useEffect } from "react";
import { applyTheme, getInitialTheme } from "@/lib/theme";

export default function ThemeProvider() {
    useEffect(() => {
        applyTheme(getInitialTheme());
    }, []);

    return null;
}
