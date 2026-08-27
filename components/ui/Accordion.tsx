"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useSurface } from "@/components/ui/Section";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

export type AccordionItem = {
  question: string;
  answer: string;
  /** Optional qualifier shown beneath the answer in fine print. */
  note?: string;
};

/**
 * Accessible disclosure list. One panel open at a time; the trigger is
 * a real <button> with aria-expanded and aria-controls, and the panel
 * is a region labelled by its trigger.
 */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId().replace(/[:]/g, "");
  const dark = useSurface() === "dark";
  const reduced = useSafeReducedMotion();

  return (
    <div className={`border-t ${dark ? "border-silver-200/12" : "border-charcoal-900/12"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `${baseId}-t-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div
            key={item.question}
            className={`border-b ${dark ? "border-silver-200/12" : "border-charcoal-900/12"}`}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span
                  className={`font-display text-lg font-light transition-colors duration-[--duration-fast] sm:text-xl lg:text-2xl ${
                    dark
                      ? isOpen
                        ? "text-ivory-50"
                        : "text-ivory-100/85 group-hover:text-ivory-50"
                      : isOpen
                        ? "text-charcoal-900"
                        : "text-charcoal-700 group-hover:text-charcoal-900"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1.5 shrink-0 transition-transform duration-[--duration-base] ease-[--ease-out-expo] ${
                    isOpen ? "rotate-45" : "rotate-0"
                  } ${dark ? "text-gold-400" : "text-gold-600"}`}
                >
                  <Plus size={16} strokeWidth={1.2} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  key="panel"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[62ch] pb-8 pr-8">
                    <p
                      className={`text-[0.88rem] leading-[1.9] ${
                        dark ? "text-silver-100/75" : "text-charcoal-700"
                      }`}
                    >
                      {item.answer}
                    </p>
                    {item.note ? (
                      <p
                        className={`mt-3 text-[0.72rem] leading-[1.75] ${
                          dark ? "text-silver-300/70" : "text-charcoal-500"
                        }`}
                      >
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
