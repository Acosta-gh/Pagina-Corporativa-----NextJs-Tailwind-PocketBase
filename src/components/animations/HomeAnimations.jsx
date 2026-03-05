'use client';

import { motion } from 'motion/react';

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    }),
};

export default function HomeAnimations({ children, stats }) {
    return (
        <div className="relative">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={0}
            >
                <div className="relative">
                    {children}
                    <HeroTextAnimator />
                </div>
            </motion.div>
        </div>
    );
}

function HeroTextAnimator() {
    return (
        <style>{`
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      [data-hero-eyebrow] {
        animation: heroFadeUp 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) 0.05s both;
      }
      [data-hero-title] {
        animation: heroFadeUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) 0.18s both;
      }
      [data-hero-subtitle] {
        animation: heroFadeUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) 0.30s both;
      }
      [data-hero-cta] {
        animation: heroFadeUp 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) 0.44s both;
      }
    `}
        </style>
    );
}