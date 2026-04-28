"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

export default function AvailabilityStatusBadge() {
    return (
        <motion.span
            className="status-dot status-dot--small"
            aria-hidden="true"
            initial={false}
            animate={{
                scale: [1, 1.06, 1],
                filter: [
                    "brightness(1) saturate(1)",
                    "brightness(1.12) saturate(1.08)",
                    "brightness(1) saturate(1)",
                ],
            }}
            transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <motion.span
                className="status-dot__ring"
                initial={false}
                animate={{
                    opacity: [0.42, 0],
                    scale: [0.82, 1.36],
                }}
                transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </motion.span>
    );
}
