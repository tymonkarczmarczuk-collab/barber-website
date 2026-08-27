"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { WatchDial } from "@/components/media/WatchDial";
import { MediaFrame } from "@/components/media/MediaFrame";
import { useMediaAvailable } from "@/components/media/MediaProvider";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * The watch responds to the pointer — a few degrees of tilt and a
 * highlight that moves the way a polished bevel actually moves. The
 * ceiling is deliberately low: this should read as light behaving
 * correctly, not as a 3D toy.
 */
export function Presence() {
  const reduced = useSafeReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);
  const hasRender = useMediaAvailable(media.campaignPrimary.src);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], [4.5, -4.5]);
  const rotateX = useTransform(sy, [0, 1], [-4, 4]);
  const shiftX = useTransform(sx, [0, 1], [10, -10]);
  const shiftY = useTransform(sy, [0, 1], [7, -7]);
  const glareX = useTransform(sx, [0, 1], ["18%", "82%"]);
  const glareY = useTransform(sy, [0, 1], ["16%", "84%"]);
  const glare = useMotionTemplate`radial-gradient(38% 32% at ${glareX} ${glareY}, rgba(255,255,255,0.17), transparent 68%)`;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return;
    px.set((event.clientX - box.left) / box.width);
    py.set((event.clientY - box.top) / box.height);
    setEngaged(true);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setEngaged(false);
  };

  return (
    <Section id="presence" tone="dark" className="overflow-hidden bg-navy-900 py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_48%_at_50%_46%,rgba(46,78,124,0.2)_0%,transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.presence.index}>{content.presence.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.presence.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.presence.lede}</Lede>
          </div>
        </div>

        <Reveal kind="fade" duration={1.2} amount={0.15}>
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative mx-auto mt-16 flex max-w-[46rem] items-center justify-center sm:mt-20"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              style={
                reduced
                  ? undefined
                  : { rotateX, rotateY, x: shiftX, y: shiftY, transformStyle: "preserve-3d" }
              }
              className="relative w-[74%] max-w-[22rem] sm:w-[58%] lg:w-[52%]"
            >
              {hasRender ? (
                <MediaFrame
                  asset={media.campaignPrimary}
                  aspect="4 / 5"
                  sizes="(max-width: 1024px) 74vw, 32vw"
                />
              ) : (
                <WatchDial className="h-auto w-full" title="SARVEON Passage 01 — design rendering" />
              )}

              {!reduced ? (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-frame"
                  style={{ background: glare }}
                  animate={{ opacity: engaged ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </motion.div>

            <span className="pointer-events-none absolute bottom-0 label-sm text-silver-300/60">
              <span className="hidden lg:inline">{content.presence.hintDesktop}</span>
              <span className="lg:hidden">{content.presence.hintTouch}</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
