"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ApprovalStatus } from "@/components/ui/ApprovalStatus";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { product } from "@/lib/config/product";

/**
 * The local edition.
 *
 * SARVEON stays the brand; the community is the context. Nothing here
 * reproduces, redraws or approximates a protected mark — the approval
 * state is stated openly instead, and switching it is a one-line
 * change in lib/config/product.ts.
 */
export function RotaryConnection() {
  return (
    <Section id="edition-context" tone="dark" className="bg-navy-900 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.rotary.index}>{content.rotary.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.rotary.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.rotary.lede}</Lede>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Reveal kind="clip" duration={1.2} className="lg:col-span-7">
            <MediaFrame asset={media.atascadero} aspect="16 / 9" sizes="(max-width: 1024px) 100vw, 56vw" />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <MediaFrame
              asset={media.atascaderoSecondary}
              aspect="3 / 4"
              sizes="(max-width: 1024px) 100vw, 26vw"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="flex flex-col gap-6 lg:col-span-6">
            {content.rotary.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Body className="max-w-[56ch]">{paragraph}</Body>
              </Reveal>
            ))}

            <Reveal delay={0.14}>
              <dl className="mt-4 border-t border-silver-200/12">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-silver-200/12 py-4">
                  <dt className="label w-32 shrink-0 text-silver-300">Placement</dt>
                  <dd className="text-[0.9rem] text-ivory-100">{product.rotary.placement}</dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-silver-200/12 py-4">
                  <dt className="label w-32 shrink-0 text-silver-300">On the dial</dt>
                  <dd className="text-[0.9rem] text-ivory-100">Nothing — the dial stays SARVEON</dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-silver-200/12 py-4">
                  <dt className="label w-32 shrink-0 text-silver-300">Contribution</dt>
                  <dd className="text-[0.9rem] text-ivory-100">
                    Not announced — any amount will be stated exactly, in writing
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <h3 className="label mb-5 text-silver-300">{content.rotary.approvalTitle}</h3>
              <ApprovalStatus />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
