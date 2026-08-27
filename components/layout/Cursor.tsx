"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * A single hairline ring that trails the pointer on desktop and opens
 * over anything interactive. The system cursor is left visible; this
 * is an accent, not a replacement. Not rendered at all on touch
 * devices or under prefers-reduced-motion.
 */
export function Cursor() {
  const reduced = useSafeReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.4 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border mix-blend-difference lg:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        borderColor: "rgba(255,255,255,0.55)",
      }}
      animate={{
        width: active ? 46 : 26,
        height: active ? 46 : 26,
        opacity: visible ? (active ? 0.9 : 0.5) : 0,
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
