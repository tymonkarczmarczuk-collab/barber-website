"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, FinePrint } from "@/components/ui/Typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { StatusTag } from "@/components/ui/StatusTag";
import { product } from "@/lib/config/product";
import { content } from "@/lib/config/content";

/**
 * Specifications, set as fine rules and serif figures rather than
 * cards. Anything still open carries its status next to it.
 */
export function Specifications() {
  return (
    <Section id="specifications" tone="light" className="bg-ivory-100 pb-24 pt-4 sm:pb-32 lg:pb-40">
      <Container>
        <div className="grid gap-y-8 border-t border-charcoal-900/12 pt-14 lg:grid-cols-12 lg:gap-x-10 lg:pt-20">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.specifications.index}>
                {content.specifications.eyebrow}
              </Eyebrow>
            </Reveal>
            <TextReveal
              text={content.specifications.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-charcoal-900 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.specifications.lede}</Lede>
          </div>
        </div>

        {/* Headline figures */}
        <RevealGroup className="mt-16 grid grid-cols-1 border-t border-charcoal-900/12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {product.keySpecs.map((spec) => (
            <RevealItem
              key={spec.label}
              className="flex flex-col gap-3 border-b border-charcoal-900/12 py-8 pr-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-charcoal-900/12 sm:[&:nth-child(odd)]:pr-8 lg:border-r lg:border-charcoal-900/12 lg:pr-8 lg:[&:nth-child(4n)]:border-r-0"
            >
              <span className="label text-charcoal-500">{spec.label}</span>
              <span className="figures font-display text-[2rem] font-light leading-none text-charcoal-900 xl:text-[2.5rem]">
                {spec.value}
              </span>
              {"note" in spec && spec.note ? (
                <span className="text-[0.72rem] leading-relaxed text-charcoal-500">{spec.note}</span>
              ) : null}
              <StatusTag status={spec.status} className="mt-auto w-fit" />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Full table */}
        <div className="mt-20 sm:mt-28">
          {product.fullSpecs.map((group) => (
            <Reveal key={group.group} kind="fade" amount={0.12}>
              <div className="grid gap-y-4 border-t border-charcoal-900/12 py-10 lg:grid-cols-12 lg:gap-x-10">
                <h3 className="label pt-1 text-gold-600 lg:col-span-3">{group.group}</h3>
                <dl className="lg:col-span-9">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-2 border-b border-charcoal-900/10 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <dt className="label w-full shrink-0 text-charcoal-500 sm:w-52">
                        {item.label}
                      </dt>
                      <dd className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-2">
                        <span className="text-[0.95rem] text-charcoal-900">{item.value}</span>
                        <StatusTag status={item.status} />
                        {"note" in item && item.note ? (
                          <span className="w-full text-[0.72rem] leading-relaxed text-charcoal-500">
                            {item.note}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal kind="fade">
          <FinePrint className="mt-10 border-t border-charcoal-900/12 pt-8">
            Passage 01 is in development. Values marked as a target or as to be confirmed are working
            figures from the design specification, not measurements from a finished production
            watch. Each will be restated here — and printed on the certificate — once the
            manufacturer confirms it.
          </FinePrint>
        </Reveal>
      </Container>
    </Section>
  );
}
