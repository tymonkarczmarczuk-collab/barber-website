"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Cta } from "@/components/ui/Cta";
import { WatchDial } from "@/components/media/WatchDial";
import { MediaFrame, MediaVideo } from "@/components/media/MediaFrame";
import { useMediaAvailable } from "@/components/media/MediaProvider";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { site } from "@/lib/config/site";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * Hero.
 *
 * Deep navy, a great deal of empty space, the watch held to the right
 * and the language to the left. The watch drifts a little slower than
 * the page as you scroll; if a hero film exists it plays quietly
 * behind everything, and if it does not, nothing about the composition
 * changes.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const hasHeroImage = useMediaAvailable(media.heroWatch.src);
  const hasHeroVideo = useMediaAvailable(media.heroVideo.src);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const watchY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const watchScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <Section id="top" tone="dark" className="overflow-hidden bg-navy-950">
      <div ref={ref} className="relative flex min-h-[100svh] flex-col justify-center pb-10 pt-28 sm:pb-24 sm:pt-36 lg:min-h-screen lg:pb-20 lg:pt-40">
        {/* Optional background film — never required, never blocking. */}
        {hasHeroVideo ? (
          <div aria-hidden="true" className="absolute inset-0 opacity-30">
            <MediaVideo asset={media.heroVideo} className="h-full w-full" aspect="auto" rounded={false} />
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_35%,transparent_0%,var(--color-navy-950)_78%)]" />
          </div>
        ) : null}

        {/* A single, very quiet light source behind the watch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_52%_at_72%_44%,rgba(46,78,124,0.24)_0%,transparent_72%)]"
        />

        <Container wide className="relative">
          <div className="grid items-center gap-y-8 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <motion.div
              style={reduced ? undefined : { y: copyY }}
              className="lg:col-span-6 xl:col-span-6"
            >
              <motion.p
                data-reveal
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="label flex items-center gap-4 text-silver-300"
              >
                <span aria-hidden="true" className="h-px w-10 bg-silver-300/40" />
                {content.hero.eyebrow}
              </motion.p>

              <h1 className="mt-6 sm:mt-10">
                <motion.span
                  data-reveal
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="label block text-silver-200"
                >
                  {site.brand} · {content.hero.model}
                </motion.span>

                <span className="mt-4 block font-display text-[2.15rem] font-light leading-[1.05] tracking-[-0.02em] text-ivory-50 sm:mt-8 sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[5rem]">
                  {["Time.", "In good", "company."].map((line, i) => (
                    <span key={line} className="block overflow-hidden pb-[0.06em]">
                      <motion.span
                        data-reveal
                        className="block"
                        initial={reduced ? false : { y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.95, delay: 0.2 + i * 0.085, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </h1>

              <motion.p
                data-reveal
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-[42ch] text-[0.8rem] leading-[1.75] text-silver-100/75 sm:mt-10 sm:text-[0.95rem]"
              >
                {content.hero.lede}
              </motion.p>

              <motion.div
                data-reveal
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 flex flex-wrap items-center gap-3 sm:mt-12 sm:gap-5"
              >
                <Cta href="/#the-watch" variant="solid">
                  {content.hero.primaryCta}
                  <ArrowRight size={13} strokeWidth={1.4} aria-hidden="true" />
                </Cta>
                <Cta href="/#contact" variant="outline">
                  {content.hero.secondaryCta}
                </Cta>
              </motion.div>
            </motion.div>

            <motion.div
              data-reveal
              style={reduced ? undefined : { y: watchY, scale: watchScale }}
              initial={reduced ? false : { opacity: 0, scale: 0.965 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8"
            >
              {hasHeroImage ? (
                <MediaFrame
                  asset={media.heroWatch}
                  priority
                  sizes="(max-width: 1024px) 88vw, 46vw"
                  className="mx-auto max-h-[36svh] w-[54%] max-w-[16rem] sm:max-h-[58svh] sm:w-[56%] sm:max-w-[24rem] lg:max-h-none lg:w-full lg:max-w-[34rem]"
                />
              ) : (
                <FloatingWatch />
              )}
            </motion.div>
          </div>
        </Container>

        <motion.div
          style={reduced ? undefined : { opacity: fade }}
          className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
        >
          <span className="flex flex-col items-center gap-3 text-silver-300/70">
            <span className="label-sm">{content.hero.scrollHint}</span>
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { y: [0, 7, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={13} strokeWidth={1.2} />
            </motion.span>
          </span>
        </motion.div>
      </div>
    </Section>
  );
}

/** The vector watch, breathing very slightly, until real photography lands. */
function FloatingWatch() {
  const reduced = useSafeReducedMotion();
  return (
    <motion.div
      animate={reduced ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="flex w-full justify-center"
    >
      {/* Height-capped on short screens so the watch is never cropped. */}
      <WatchDial
        className="h-auto w-auto max-h-[34svh] max-w-[11.5rem] sm:max-h-[52svh] sm:max-w-[18rem] lg:max-h-[62svh] lg:max-w-[23rem] xl:max-w-[26rem]"
        title="SARVEON Passage 01 — design rendering"
      />
    </motion.div>
  );
}
