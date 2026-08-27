"use client";

import { motion, type Variant, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

type RevealKind = "up" | "fade" | "clip" | "scale" | "left" | "right";

const build = (kind: RevealKind, distance: number): Variants => {
  const hidden: Record<RevealKind, Variant> = {
    up: { opacity: 0, y: distance },
    fade: { opacity: 0 },
    clip: { opacity: 0 },
    scale: { opacity: 0, scale: 1.06 },
    left: { opacity: 0, x: -distance },
    right: { opacity: 0, x: distance },
  };
  const shown: Record<RevealKind, Variant> = {
    up: { opacity: 1, y: 0 },
    fade: { opacity: 1 },
    clip: { opacity: 1 },
    scale: { opacity: 1, scale: 1 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };
  return { hidden: hidden[kind], shown: shown[kind] };
};

/**
 * Scroll-triggered reveal. Quiet by default: short distances, long
 * easing, one pass only. Collapses to a plain render when the visitor
 * prefers reduced motion.
 */
export function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration = 0.9,
  distance = 26,
  amount = 0.3,
  className,
  as = "div",
}: {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  /*
   * "clip" is a two-layer mask sweep rather than an animated clip-path:
   * the mask travels up while the content counter-travels, so the
   * picture appears to be uncovered rather than to slide.
   */
  if (kind === "clip") {
    return (
      <MotionTag
        className={`overflow-hidden ${className ?? ""}`}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount }}
      >
        <motion.div
          data-reveal
          variants={{ hidden: { y: "101%" }, shown: { y: "0%" } }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            data-reveal
            variants={{ hidden: { y: "-101%" }, shown: { y: "0%" } }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={build(kind, distance)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children of a Reveal group. Pair with <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.25,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: ElementType;
}) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  kind = "up",
  distance = 22,
  duration = 0.85,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  distance?: number;
  duration?: number;
  as?: ElementType;
}) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={build(kind, distance)}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
