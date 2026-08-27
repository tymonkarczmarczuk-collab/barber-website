"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/config/site";
import { content } from "@/lib/config/content";

/**
 * Full-screen navigation for small screens.
 *
 * Opens as a panel wipe with the links arriving one after another,
 * closes the same way in reverse. Locks background scrolling, traps
 * focus, closes on Escape, and returns focus where it came from.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const id = window.setTimeout(() => focusables()[0]?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-surface="dark"
          className="fixed inset-0 z-40 bg-navy-950 lg:hidden"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-[100dvh] flex-col justify-between px-6 pb-10 pt-[7rem] sm:px-8">
            <nav aria-label="Primary, mobile">
              <ul>
                {site.nav.map((item, i) => (
                  <motion.li
                    data-reveal
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.16 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-silver-200/10"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline gap-5 py-5 text-ivory-100 transition-opacity duration-[--duration-fast] hover:opacity-70"
                    >
                      <span className="label-sm w-6 shrink-0 text-gold-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl font-light sm:text-4xl">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              data-reveal
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <Link
                href="/#contact"
                onClick={onClose}
                className="group flex w-full items-center justify-between border border-silver-200/25 px-6 py-5 text-ivory-100"
              >
                <span className="label">Request details</span>
                <span aria-hidden="true" className="label text-gold-400">
                  →
                </span>
              </Link>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="label text-silver-200 transition-colors hover:text-ivory-100"
                >
                  {site.contact.email}
                </a>
                <span className="label-sm text-silver-400">{content.footerLine}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
