"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Tone = "dark" | "light";

const SurfaceContext = createContext<Tone>("dark");

/** Lets any nested component adapt its own contrast to the surface it sits on. */
export const useSurface = () => useContext(SurfaceContext);

/**
 * Declares a surface tone outside of a <Section> — the header, which
 * floats over whichever chapter happens to be beneath it.
 */
export function SurfaceProvider({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <SurfaceContext.Provider value={tone}>{children}</SurfaceContext.Provider>;
}

const toneClass: Record<Tone, string> = {
  dark: "bg-navy-900 text-ivory-100",
  light: "bg-ivory-100 text-charcoal-900",
};

export function Section({
  id,
  tone = "dark",
  className = "",
  children,
  as: Tag = "section",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "footer" | "header" | "article";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <SurfaceContext.Provider value={tone}>
      <Tag
        id={id}
        data-surface={tone}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={`relative ${toneClass[tone]} ${className}`}
      >
        {children}
      </Tag>
    </SurfaceContext.Provider>
  );
}

/** Consistent page gutters and maximum measure, from mobile to ultrawide. */
export function Container({
  className = "",
  children,
  wide = false,
}: {
  className?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 ${
        wide ? "max-w-[120rem]" : "max-w-[96rem]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
