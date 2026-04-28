'use client'

import { ReactNode } from "react";
import { motion } from "motion/react";

interface MotionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
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
