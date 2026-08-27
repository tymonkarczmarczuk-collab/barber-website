"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { media, type MediaKey } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * Craft sequence: case → dial → indices → hands → crystal → crown → strap.
 *
 * On a wide screen the section pins and the sequence travels sideways
 * with the scroll. Under prefers-reduced-motion, or on a narrow
 * screen, it becomes an ordinary stack — same content, no pinning.
 */
export function Craft() {
  const reduced = useSafeReducedMotion();
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const horizontal = isWide && !reduced;

  return (
    <Section id="craft" tone="light" className="bg-ivory-50">
      <Container className="pt-24 sm:pt-32 lg:pt-40">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.craft.index}>{content.craft.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.craft.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-charcoal-900 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.craft.lede}</Lede>
          </div>
        </div>
      </Container>

      {horizontal ? <HorizontalTrack /> : <StackedTrack />}
    </Section>
  );
}

function CraftCard({
  index,
  step,
  title,
  body,
  mediaKey,
  className = "",
}: {
  index: number;
  step: string;
  title: string;
  body: string;
  mediaKey: string;
  className?: string;
}) {
  const asset = media[mediaKey as MediaKey] ?? media.detailCase;
  return (
    <article className={className}>
      <MediaFrame asset={asset} aspect="3 / 4" sizes="(max-width: 1024px) 88vw, 24rem" />
      <div className="mt-6 flex items-baseline gap-4">
        <span className="label text-gold-600">{String(index + 1).padStart(2, "0")}</span>
        <span className="label text-charcoal-500">{step}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-light text-charcoal-900">{title}</h3>
      <Body className="mt-3 max-w-[40ch]">{body}</Body>
    </article>
  );
}

function HorizontalTrack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative mt-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-start gap-8 pl-6 pr-[12vw] sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24"
        >
          {content.craft.steps.map((step, i) => (
            <CraftCard
              key={step.key}
              index={i}
              step={step.step}
              title={step.title}
              body={step.body}
              mediaKey={step.mediaKey}
              className="w-[19rem] shrink-0 xl:w-[21rem] 2xl:w-[23rem]"
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-6 bottom-10 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 xl:inset-x-24">
          <div className="h-px w-full bg-charcoal-900/12">
            <motion.div style={{ width: progress }} className="h-px bg-gold-600/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedTrack() {
  return (
    <Container className="pb-24 pt-16 sm:pb-32">
      <div className="grid gap-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16">
        {content.craft.steps.map((step, i) => (
          <Reveal key={step.key} delay={(i % 2) * 0.06}>
            <CraftCard
              index={i}
              step={step.step}
              title={step.title}
              body={step.body}
              mediaKey={step.mediaKey}
            />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
