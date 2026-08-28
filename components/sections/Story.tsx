"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Body, Lede } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

const moments = [
  media.storyMomentDinner,
  media.storyMomentFriends,
  media.storyMomentTravel,
] as const;

/**
 * The chapter about time spent with other people. A quiet filmstrip of
 * three moments — dinner, friends, a journey — stands in for the
 * cinematic sequence the brand document imagined; there is no video in
 * this build, so nothing here depends on one existing.
 */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const wordX = useTransform(scrollYProgress, [0, 1], ["6%", "-12%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 0.11, 0.11, 0]);
  const stripY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <Section id="story" tone="dark" className="overflow-hidden bg-navy-950 py-24 sm:py-32 lg:py-44">
      <div ref={ref}>
        <motion.span
          aria-hidden="true"
          style={reduced ? { opacity: 0.06 } : { x: wordX, opacity: wordOpacity }}
          className="pointer-events-none absolute left-0 top-[18%] hidden select-none whitespace-nowrap font-display text-[24vw] font-light leading-none text-ivory-100 sm:block"
        >
          TIME · TIME · TIME
        </motion.span>

        <Container className="relative">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Reveal kind="fade">
                <Eyebrow index={content.story.index}>{content.story.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-10 font-display text-[3rem] font-light leading-none tracking-[-0.02em] text-ivory-50 sm:text-[4.5rem] lg:text-[5.5rem]">
                  {content.story.title}
                </h2>
              </Reveal>
              <Lede className="mt-8">{content.story.lede}</Lede>
            </div>
          </div>

          <motion.div
            style={reduced ? undefined : { y: stripY }}
            className="mt-16 grid grid-cols-3 gap-3 sm:mt-20 sm:gap-5 lg:gap-6"
          >
            {moments.map((asset, i) => (
              <Reveal key={asset.src} kind="clip" duration={1.1} delay={i * 0.08}>
                <MediaFrame
                  asset={asset}
                  aspect="4 / 5"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 22vw"
                />
              </Reveal>
            ))}
          </motion.div>

          <div className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-2 lg:gap-x-16">
            {content.story.columns.map((column, i) => (
              <Reveal key={column.title} delay={i * 0.08}>
                <h3 className="font-display text-xl font-light text-ivory-50 sm:text-2xl">
                  {column.title}
                </h3>
                <Body className="mt-4">{column.body}</Body>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-10 sm:mt-28 lg:grid-cols-12 lg:gap-x-10">
            <Reveal kind="clip" duration={1.2} className="lg:col-span-7">
              <MediaFrame asset={media.storyTable} aspect="4 / 3" sizes="(max-width: 1024px) 100vw, 55vw" />
            </Reveal>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                <p className="font-display text-2xl font-light leading-[1.4] text-ivory-50 sm:text-3xl">
                  {content.story.closing}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
