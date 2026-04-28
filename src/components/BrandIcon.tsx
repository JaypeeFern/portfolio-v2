import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import {
    SiDocker,
    SiFirebase,
    SiGit,
    SiGithub,
    SiMongodb,
    SiNestjs,
    SiNextdotjs,
    SiNginx,
    SiNodedotjs,
    SiPostgresql,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";

interface BrandIconProps {
    name: string;
    className?: string;
    useBrandColor?: boolean;
}

const iconMap: Record<string, IconType> = {
    docker: SiDocker,
    firebase: SiFirebase,
    git: SiGit,
    github: SiGithub,
    linkedin: FaLinkedin,
    mongodb: SiMongodb,
    nestjs: SiNestjs,
    "next.js": SiNextdotjs,
    nextjs: SiNextdotjs,
    nginx: SiNginx,
    "node.js": SiNodedotjs,
    nodejs: SiNodedotjs,
    postgresql: SiPostgresql,
    react: SiReact,
    "tailwind css": SiTailwindcss,
    tailwind: SiTailwindcss,
    typescript: SiTypescript,
};

const brandColors: Record<string, string> = {
    docker: "#2496ed",
    firebase: "#ffca28",
    git: "#f05032",
    github: "#181717",
    linkedin: "#0a66c2",
    mongodb: "#47a248",
    nestjs: "#e0234e",
    "next.js": "#000000",
    nextjs: "#000000",
    nginx: "#009639",
    "node.js": "#5fa04e",
    nodejs: "#5fa04e",
    postgresql: "#4169e1",
    react: "#61dafb",
    "tailwind css": "#06b6d4",
    tailwind: "#06b6d4",
    typescript: "#3178c6",
};

export default function BrandIcon({ name, className, useBrandColor = false }: BrandIconProps) {
    const normalizedName = name.toLowerCase();
    const Icon = iconMap[normalizedName];

    if (!Icon) {
        return null;
    }

    return (
        <Icon
            aria-hidden="true"
            className={`brand-icon ${className ?? ""}`}
            data-brand={normalizedName}
            style={useBrandColor ? { color: brandColors[normalizedName] } : undefined}
        />
    );
}
