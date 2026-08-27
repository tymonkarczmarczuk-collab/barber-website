"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Body, Rule } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { content } from "@/lib/config/content";

/**
 * The manifesto. Almost nothing on screen at first: one sentence,
 * a great deal of air, and then the reasoning arrives underneath.
 */
export function Philosophy() {
  return (
    <Section id="philosophy" tone="dark" className="bg-navy-900 py-28 sm:py-40 lg:py-56">
      <Container>
        <Reveal kind="fade">
          <Eyebrow index={content.philosophy.index}>{content.philosophy.eyebrow}</Eyebrow>
        </Reveal>

        <TextReveal
          text={content.philosophy.statement}
          as="h2"
          className="mt-14 max-w-[18ch] font-display text-[2.1rem] font-light leading-[1.16] tracking-[-0.02em] text-ivory-50 sm:mt-20 sm:text-[3.1rem] lg:mt-24 lg:max-w-[16ch] lg:text-[4.25rem] xl:text-[5rem]"
          stagger={0.05}
          duration={1.15}
        />

        <div className="mt-24 grid gap-x-10 gap-y-12 sm:mt-32 lg:mt-44 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal kind="fade" delay={0.05}>
              <Rule className="mb-8 max-w-24" />
              <p className="font-display text-xl font-light italic leading-[1.5] text-silver-100/85 sm:text-2xl">
                {content.philosophy.pullQuote}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-7 lg:col-start-6">
            {content.philosophy.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06} distance={20}>
                <Body className="max-w-[58ch]">{paragraph}</Body>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
