'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import { motion } from "motion/react";

interface MotionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

type IntroPhase = "art" | "portrait" | "hero" | "nav" | "technology";

interface EntranceSequenceProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function EntranceSequence({ children, className, id }: EntranceSequenceProps) {
    return (
        <main id={id} className={className} data-intro-assets-ready="false">
            {children}
            <noscript>
                <style>{`.portfolio-page [data-intro-assets-ready="false"] .cutaway-desktop .skill-cluster__reveal[data-intro="technology"] { animation: none !important; opacity: 1 !important; visibility: visible !important; }`}</style>
            </noscript>
        </main>
    );
}

interface EntranceProps extends ComponentPropsWithoutRef<"div"> {
    intro?: IntroPhase;
}

export function EntranceDiv({ children, intro, ...props }: EntranceProps) {
    return <div {...props} {...(intro ? { "data-intro": intro } : {})}>{children}</div>;
}

export function EntranceHeading({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"h1">) {
    return <h1 className={className} data-intro="hero" {...props}>{children}</h1>;
}

export function EntranceSubheading({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"h2">) {
    return <h2 className={className} {...props}>{children}</h2>;
}

export function EntranceText({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"p">) {
    return <p className={className} data-intro="hero" {...props}>{children}</p>;
}

export function EntranceLink({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"a">) {
    return <a className={className} data-intro="hero" {...props}>{children}</a>;
}

export function EntranceImage({ intro, alt, ...props }: ImageProps & { intro: "art" | "portrait"; alt: string }) {
    const imageRef = useRef<HTMLImageElement>(null);
    const markIntroArtworkReady = () => {
        document.querySelector("[data-intro-assets-ready]")?.setAttribute("data-intro-assets-ready", "true");
    };

    useEffect(() => {
        if (intro === "art" && imageRef.current?.complete) {
            document.querySelector("[data-intro-assets-ready]")?.setAttribute("data-intro-assets-ready", "true");
        }
    }, [intro]);

    return (
        <Image
            {...props}
            ref={imageRef}
            alt={alt}
            data-intro={intro}
            onLoad={intro === "art" ? markIntroArtworkReady : undefined}
            onError={intro === "art" ? markIntroArtworkReady : undefined}
        />
    );
}

export function MotionStagger({ children, className }: MotionProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.08,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function MotionItem({ children, className, delay = 0 }: MotionProps) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function MotionReveal({ children, className, delay = 0 }: MotionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                delay,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
