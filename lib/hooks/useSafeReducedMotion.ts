"use client";

import { useEffect, useState } from "react";

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Deliberately reports `false` on the first render — server and client
 * must agree, and the server has no way to know the preference. The
 * real value arrives immediately after mount.
 *
 * To stop reduced-motion visitors seeing a single frame of
 * still-hidden content in that gap, reveal wrappers are marked with
 * `data-reveal`; globals.css forces those visible under
 * prefers-reduced-motion, before any JavaScript runs.
 */
export function useSafeReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
