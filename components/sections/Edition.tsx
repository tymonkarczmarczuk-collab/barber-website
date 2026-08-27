"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body, FinePrint } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { product } from "@/lib/config/product";
import { useSafeReducedMotion } from "@/lib/hooks/useSafeReducedMotion";

/**
 * The edition. One number, counted up once when it arrives — no
 * countdown clock, no stock ticker, no manufactured urgency.
 */
export function Edition() {
  return (
    <Section id="edition" tone="light" className="bg-ivory-100 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.edition.index}>{content.edition.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.edition.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-charcoal-900 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.edition.lede}</Lede>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <CountUp to={product.edition.size} />
            <p className="label mt-6 text-charcoal-500">Pieces in the first edition</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.06}>
              <h3 className="font-display text-2xl font-light text-charcoal-900 sm:text-3xl">
                {content.edition.numberingTitle}
              </h3>
              <Body className="mt-5 max-w-[48ch]">{content.edition.numberingBody}</Body>

              <div className="mt-8 inline-flex flex-col gap-3 border border-charcoal-900/15 px-7 py-6">
                <span className="label-sm text-charcoal-500">Serial format</span>
                <span className="figures font-display text-2xl font-light tracking-[0.12em] text-charcoal-900">
                  {product.edition.serialFormat}
                </span>
                <span className="text-[0.72rem] text-charcoal-500">
                  {product.edition.serialRange}. Numbers are allocated at purchase; the example above
                  is a format, not a reserved piece.
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <Reveal kind="clip" duration={1.2} className="lg:col-span-7">
            <MediaFrame asset={media.packaging} aspect="4 / 3" sizes="(max-width: 1024px) 100vw, 56vw" />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <MediaFrame asset={media.certificate} aspect="4 / 3" sizes="(max-width: 1024px) 100vw, 26vw" />
            <FinePrint className="mt-6">{content.edition.closing}</FinePrint>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Counts to the edition size once, on arrival. Static under reduced motion. */
function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useSafeReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setCounted(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to, duration]);

  /* Reduced motion simply reads the final number — no ticking. */
  const value = reduced ? to : counted;

  return (
    <p
      ref={ref}
      className="figures font-display text-[7rem] font-light leading-[0.85] tracking-[-0.04em] text-charcoal-900 sm:text-[11rem] lg:text-[13rem]"
    >
      <span className="sr-only">{to}</span>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
    </p>
  );
}
