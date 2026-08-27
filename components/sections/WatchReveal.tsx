"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { WatchDial } from "@/components/media/WatchDial";
import { WatchCaseback } from "@/components/media/WatchCaseback";
import { useMediaAvailable } from "@/components/media/MediaProvider";
import { media, type MediaAsset } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

const assets: Record<string, MediaAsset> = {
  front: media.watchFront,
  threeQuarter: media.watchThreeQuarter,
  side: media.watchSide,
  caseback: media.watchCaseback,
};

/**
 * Product gallery.
 *
 * On a large screen the watch is held still while the writing moves
 * past it, and the view changes as each passage arrives. On a small
 * screen the same four views become a snap carousel with its own
 * layout rather than a squeezed version of the desktop one.
 */
export function WatchReveal() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="the-watch" tone="light" className="bg-ivory-100 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.watch.index}>{content.watch.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.watch.title}
              as="h2"
              className="mt-9 font-display text-[3rem] font-light leading-[1.02] tracking-[-0.02em] text-charcoal-900 sm:text-[4.5rem] lg:text-[5.25rem]"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.watch.lede}</Lede>
          </div>
        </div>

        {/* ---------- desktop: sticky view, moving text ---------- */}
        <div className="mt-20 hidden lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <div className="sticky top-[var(--header-h)] flex h-[calc(100vh-var(--header-h))] items-center">
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={content.watch.views[active].key}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ViewMedia viewKey={content.watch.views[active].key} />
                  </motion.div>
                </AnimatePresence>

                <ol className="mt-10 flex items-center gap-8" aria-label="Views">
                  {content.watch.views.map((view, i) => (
                    <li key={view.key}>
                      <span
                        aria-current={i === active ? "true" : undefined}
                        className={`label-sm flex items-center gap-3 transition-colors duration-[--duration-base] ${
                          i === active ? "text-charcoal-900" : "text-charcoal-300"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`block h-px transition-all duration-[--duration-base] ease-[--ease-out-expo] ${
                            i === active ? "w-8 bg-gold-600" : "w-3 bg-charcoal-900/20"
                          }`}
                        />
                        {view.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {content.watch.views.map((view, i) => (
              <div
                key={view.key}
                data-index={i}
                ref={(node) => {
                  blockRefs.current[i] = node;
                }}
                className="flex min-h-[82vh] flex-col justify-center"
              >
                <Reveal>
                  <span className="label text-gold-600">
                    {String(i + 1).padStart(2, "0")} — {view.label}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-light leading-tight text-charcoal-900 xl:text-4xl">
                    {view.title}
                  </h3>
                  <Body className="mt-6 max-w-[46ch]">{view.body}</Body>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- small screens: their own carousel ---------- */}
        <MobileGallery />
      </Container>
    </Section>
  );
}

function ViewMedia({ viewKey }: { viewKey: string }) {
  const asset = assets[viewKey] ?? media.watchFront;
  const hasFile = useMediaAvailable(asset.src);

  if (hasFile) {
    return <MediaFrame asset={asset} aspect="4 / 5" sizes="(max-width: 1024px) 92vw, 44vw" />;
  }

  if (viewKey === "caseback") {
    return (
      <VectorStage>
        <WatchCaseback className="h-auto w-[68%] max-w-[22rem]" />
      </VectorStage>
    );
  }

  if (viewKey === "front") {
    return (
      <VectorStage>
        <WatchDial className="h-auto w-[54%] max-w-[17rem]" />
      </VectorStage>
    );
  }

  return <MediaFrame asset={asset} aspect="4 / 5" sizes="(max-width: 1024px) 92vw, 44vw" />;
}

/** Neutral stage so the vector rendering sits in the same frame as a photograph would. */
function VectorStage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-frame border border-charcoal-900/10 bg-[radial-gradient(120%_100%_at_50%_18%,var(--color-ivory-50)_0%,var(--color-ivory-200)_62%,var(--color-ivory-300)_100%)]"
      style={{ aspectRatio: "4 / 5" }}
    >
      {children}
    </div>
  );
}

function MobileGallery() {
  const reduced = useSafeReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
      setActive(Math.max(0, Math.min(content.watch.views.length - 1, index)));
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-14 lg:hidden">
      <div
        ref={scrollerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Passage 01 views"
      >
        {content.watch.views.map((view, i) => (
          <article
            key={view.key}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${content.watch.views.length} — ${view.label}`}
          >
            <ViewMedia viewKey={view.key} />
            <span className="label mt-6 block text-gold-600">
              {String(i + 1).padStart(2, "0")} — {view.label}
            </span>
            <h3 className="mt-4 font-display text-2xl font-light text-charcoal-900">{view.title}</h3>
            <Body className="mt-4">{view.body}</Body>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        {content.watch.views.map((view, i) => (
          <button
            key={view.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${view.label}`}
            aria-current={i === active ? "true" : undefined}
            className="group py-3"
          >
            <span
              className={`block h-px transition-all duration-[--duration-base] ease-[--ease-out-expo] ${
                i === active ? "w-10 bg-gold-600" : "w-5 bg-charcoal-900/25 group-hover:bg-charcoal-900/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
