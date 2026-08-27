"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body } from "@/components/ui/Typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Cta } from "@/components/ui/Cta";
import { content } from "@/lib/config/content";
import { product } from "@/lib/config/product";
import { site } from "@/lib/config/site";

/**
 * After the sale. Warranty length is not invented here: while
 * product.service.warrantyYears is null the section says so and shows
 * the commitment being contracted instead.
 */
export function Service() {
  const warranty = product.service.warrantyYears;

  return (
    <Section id="service" tone="light" className="bg-ivory-100 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.service.index}>{content.service.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.service.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-charcoal-900 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.service.lede}</Lede>
          </div>
        </div>

        <RevealGroup className="mt-16 grid gap-px border-t border-charcoal-900/12 sm:mt-20 sm:grid-cols-2">
          {content.service.items.map((item) => (
            <RevealItem
              key={item.title}
              className="flex flex-col gap-4 border-b border-charcoal-900/12 py-9 pr-0 sm:pr-10 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-charcoal-900/12"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-2xl font-light text-charcoal-900">{item.title}</h3>
                <span className="label-sm shrink-0 border border-charcoal-900/20 px-2 py-1 text-charcoal-500">
                  {item.title === "Warranty" && warranty ? `${warranty} years` : item.status}
                </span>
              </div>
              <Body className="max-w-[46ch]">{item.body}</Body>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal kind="fade">
          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-[0.9rem] leading-relaxed text-charcoal-700">
              {content.service.contactPrompt}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Cta href={`mailto:${site.contact.serviceEmail}`} variant="link">
                {site.contact.serviceEmail}
              </Cta>
              <Cta href="/legal/warranty" variant="outline" size="sm">
                Warranty terms
              </Cta>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
