"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSurface } from "@/components/ui/Section";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

type Variant = "solid" | "outline" | "link";
type Size = "sm" | "md";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Suppresses the magnetic pull, e.g. inside dense navigation. */
  still?: boolean;
  /**
   * Classes for the outer wrapper rather than the control itself —
   * use this for layout and visibility (`hidden sm:inline-flex`),
   * since the wrapper is what occupies space in the flow.
   */
  wrapperClassName?: string;
};

type CtaProps = BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "className" | "children">)
  );

/**
 * The site's single call-to-action element.
 *
 * Hover is a hairline that draws across the inside of the control —
 * no glow, no scale pop. On a fine pointer the control leans a few
 * pixels toward the cursor; both effects are dropped entirely under
 * prefers-reduced-motion.
 */
export function Cta({
  children,
  variant = "outline",
  size = "md",
  className = "",
  still = false,
  wrapperClassName,
  ...rest
}: CtaProps) {
  const surface = useSurface();
  const reduced = useSafeReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 190, damping: 18, mass: 0.35 });

  const magnetic = !reduced && !still;

  const onMove = (event: React.PointerEvent) => {
    if (!magnetic || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    x.set(Math.max(-7, Math.min(7, dx * 0.16)));
    y.set(Math.max(-5, Math.min(5, dy * 0.16)));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const dark = surface === "dark";

  const sizing =
    size === "sm"
      ? "px-5 py-2.5 text-[0.6rem]"
      : "px-6 py-3.5 text-[0.63rem] sm:px-9 sm:py-[1.15rem] sm:text-[0.66rem]";

  const variants: Record<Variant, string> = {
    solid: dark
      ? "bg-ivory-100 text-navy-900 hover:bg-ivory-50"
      : "bg-navy-900 text-ivory-100 hover:bg-navy-850",
    outline: dark
      ? "border border-silver-200/30 text-ivory-100 hover:border-silver-100/60"
      : "border border-charcoal-900/25 text-charcoal-900 hover:border-charcoal-900/60",
    link: dark ? "text-ivory-100" : "text-charcoal-900",
  };

  const base =
    variant === "link"
      ? `group relative inline-flex items-center gap-3 label ${variants.link} ${className}`
      : `group relative inline-flex items-center justify-center gap-3 overflow-hidden label transition-colors duration-[--duration-fast] ${sizing} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      {variant === "link" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current opacity-60 transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      ) : (
        <>
          {/* the hairline that draws across the control */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-0 z-10 h-px w-full origin-left scale-x-0 transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
              variant === "solid" ? "bg-gold-500" : dark ? "bg-gold-400/80" : "bg-gold-600/80"
            }`}
          />
          {/* barely-there wash, kept well under a highlight */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 translate-y-full transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${
              variant === "solid"
                ? "bg-transparent"
                : dark
                  ? "bg-ivory-100/[0.055]"
                  : "bg-navy-900/[0.045]"
            }`}
          />
        </>
      )}
    </>
  );

  const style = magnetic ? { x: sx, y: sy } : undefined;
  const wrapper = wrapperClassName ?? "inline-flex";

  if (typeof rest.href === "string") {
    const { href, ...linkRest } = rest as { href: string };
    return (
      <motion.span style={style} className={wrapper}>
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={base}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          {...linkRest}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  const buttonRest = rest as React.ComponentProps<"button">;
  return (
    <motion.span style={style} className={wrapper}>
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonRest.type ?? "button"}
        className={base}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        {...buttonRest}
      >
        {inner}
      </button>
    </motion.span>
  );
}
