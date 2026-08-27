"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { site } from "@/lib/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { Cta } from "@/components/ui/Cta";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SurfaceProvider } from "@/components/ui/Section";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * Sticky header.
 *
 * Starts almost invisible over the hero, then contracts and picks up a
 * blurred ground once the page moves. It also watches which surface is
 * currently under it, so the type stays legible as the page alternates
 * between navy and ivory chapters.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useSafeReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A one-pixel band at the header's lower edge decides the header tone. */
  const observeSurfaces = useCallback(() => {
    const bandTop = 72;
    const sections = document.querySelectorAll<HTMLElement>("[data-surface]");
    if (!sections.length) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const next = entry.target.getAttribute("data-surface");
            if (next === "light" || next === "dark") setTone(next);
          }
        }
      },
      {
        rootMargin: `-${bandTop}px 0px -${Math.max(0, window.innerHeight - bandTop - 2)}px 0px`,
        threshold: 0,
      },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cleanup = observeSurfaces();
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cleanup();
        cleanup = observeSurfaces();
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      cleanup();
    };
  }, [observeSurfaces]);

  const dark = tone === "dark" || menuOpen;

  return (
    <SurfaceProvider tone={dark ? "dark" : "light"}>
      <motion.header
        data-scrolled={scrolled}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[--ease-out-expo] ${
          scrolled && !menuOpen
            ? dark
              ? "border-b border-silver-200/10 bg-navy-950/70 backdrop-blur-xl"
              : "border-b border-charcoal-900/10 bg-ivory-100/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[120rem] items-center justify-between px-6 transition-[height] duration-500 ease-[--ease-out-expo] sm:px-8 md:px-12 lg:px-16 xl:px-24 ${
            scrolled ? "h-[4.25rem]" : "h-[5.5rem] sm:h-[6.5rem]"
          } ${dark ? "text-ivory-100" : "text-charcoal-900"}`}
        >
          <Link
            href="/"
            aria-label={`${site.brand} — home`}
            className="shrink-0 transition-opacity duration-[--duration-fast] hover:opacity-70"
          >
            <Wordmark size={scrolled ? "md" : "lg"} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex xl:gap-11">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative label py-2 opacity-75 transition-opacity duration-[--duration-fast] hover:opacity-100"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Cta
              href="/#contact"
              variant="outline"
              size="sm"
              still
              wrapperClassName="hidden sm:inline-flex"
            >
              Request details
            </Cta>
            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} dark={dark} />
          </div>
        </div>

        {/* reading position — one hairline, gold, only once the page has moved */}
        {!reduced ? (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className={`h-px origin-left bg-gold-500/70 transition-opacity duration-500 ${
              scrolled && !menuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </SurfaceProvider>
  );
}

function MenuButton({
  open,
  onToggle,
  dark,
}: {
  open: boolean;
  onToggle: () => void;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="site-menu"
      className="group relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative block h-3 w-6" aria-hidden="true">
        <span
          className={`absolute left-0 block h-px w-full transition-all duration-[--duration-base] ease-[--ease-out-expo] ${
            dark ? "bg-ivory-100" : "bg-charcoal-900"
          } ${open ? "top-1.5 rotate-45" : "top-0 rotate-0 group-hover:w-5"}`}
        />
        <span
          className={`absolute left-0 block h-px w-full transition-all duration-[--duration-base] ease-[--ease-out-expo] ${
            dark ? "bg-ivory-100" : "bg-charcoal-900"
          } ${open ? "top-1.5 -rotate-45" : "top-3 rotate-0"}`}
        />
      </span>
    </button>
  );
}
