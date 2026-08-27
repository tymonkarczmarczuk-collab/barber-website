"use client";

import type { ElementType, ReactNode } from "react";
import { useSurface } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/** Small uppercase section marker: a hairline, an index, a name. */
export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  const dark = useSurface() === "dark";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span
        aria-hidden="true"
        className={`h-px w-10 shrink-0 ${dark ? "bg-silver-300/40" : "bg-charcoal-900/25"}`}
      />
      {index ? (
        <span className={`label ${dark ? "text-gold-400" : "text-gold-600"}`}>{index}</span>
      ) : null}
      <span className={`label ${dark ? "text-silver-200" : "text-charcoal-500"}`}>{children}</span>
    </div>
  );
}

/** Display headline. Sizes are deliberately generous — headings breathe. */
export function Heading({
  children,
  as = "h2",
  size = "lg",
  className = "",
  reveal = true,
}: {
  children: string;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "display";
  className?: string;
  reveal?: boolean;
}) {
  const sizes = {
    sm: "text-2xl sm:text-3xl lg:text-4xl",
    md: "text-3xl sm:text-4xl lg:text-5xl",
    lg: "text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl",
    xl: "text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-7xl xl:text-8xl",
    display: "text-[3rem] leading-[1] sm:text-7xl lg:text-8xl xl:text-9xl",
  } as const;

  const cls = `font-display font-light ${sizes[size]} ${className}`;

  if (!reveal) {
    const Tag = as;
    return <Tag className={cls}>{children}</Tag>;
  }
  return <TextReveal text={children} as={as} className={cls} />;
}

/** Introductory paragraph beneath a heading. */
export function Lede({
  children,
  className = "",
  delay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const dark = useSurface() === "dark";
  return (
    <Reveal delay={delay}>
      <p
        className={`max-w-[46ch] text-[0.95rem] leading-[1.85] sm:text-base ${
          dark ? "text-silver-100/80" : "text-charcoal-700"
        } ${className}`}
      >
        {children}
      </p>
    </Reveal>
  );
}

/** Body copy inside editorial columns. */
export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const dark = useSurface() === "dark";
  return (
    <p
      className={`text-[0.9rem] leading-[1.9] sm:text-[0.95rem] ${
        dark ? "text-silver-100/72" : "text-charcoal-700"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Qualifiers, disclaimers and status notes. Never decorative. */
export function FinePrint({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const dark = useSurface() === "dark";
  return (
    <p
      className={`max-w-[62ch] text-[0.72rem] leading-[1.75] ${
        dark ? "text-silver-300/70" : "text-charcoal-500"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Hairline divider that reads correctly on either surface. */
export function Rule({ className = "" }: { className?: string }) {
  const dark = useSurface() === "dark";
  return (
    <hr
      className={`border-0 border-t ${dark ? "border-silver-200/12" : "border-charcoal-900/12"} ${className}`}
    />
  );
}
