'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

/**
 * Wraps children in a subtle fade-up-on-scroll animation.
 * Designed for a professional accounting firm — no bouncing, no spring, just clean.
 *
 * Usage:
 *   <FadeUp delay={0.1}>
 *     <SomeSection />
 *   </FadeUp>
 */
export default function FadeUp({ children, delay = 0, className, threshold = 0.15 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: threshold });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.55,
                ease: [0.25, 0.1, 0.25, 1],
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

/** Stagger a list of items with FadeUp, each offset by `stagger` seconds */
export function FadeUpList({ children, stagger = 0.08, initialDelay = 0, className }) {
    return (
        <>
            {children.map((child, i) => (
                <FadeUp key={i} delay={initialDelay + i * stagger} className={className}>
                    {child}
                </FadeUp>
            ))}
        </>
    );
}