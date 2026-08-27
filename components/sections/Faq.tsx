"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Accordion } from "@/components/ui/Accordion";
import { content, faq } from "@/lib/config/content";

export function Faq() {
  return (
    <Section id="faq" tone="dark" className="bg-navy-900 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.faq.index}>{content.faq.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.faq.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.faq.lede}</Lede>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mx-auto lg:max-w-[64rem]">
          <Reveal kind="fade" amount={0.1}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
