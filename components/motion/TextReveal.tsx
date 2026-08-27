"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * Word-by-word mask reveal for display type. Each word rises out of a
 * clipped box, which reads as a line reveal without needing to measure
 * line breaks. Text stays selectable and correctly announced.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.055,
  duration = 1,
  amount = 0.4,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  amount?: number;
}) {
  const reduced = useSafeReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount }}
        variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              data-reveal
              className="inline-block"
              variants={{
                hidden: { y: "108%", opacity: 0 },
                shown: { y: "0%", opacity: 1 },
              }}
              transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
