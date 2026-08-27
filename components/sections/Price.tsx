"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body, FinePrint } from "@/components/ui/Typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PurchaseCTA } from "@/components/ui/PurchaseCTA";
import { content } from "@/lib/config/content";
import { product, formatPrice } from "@/lib/config/product";

/**
 * Price. One figure, its reasoning, and the conditions under which it
 * could still move. No struck-through anchor, ever.
 */
export function Price() {
  return (
    <Section id="price" tone="light" className="bg-ivory-50 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.price.index}>{content.price.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-charcoal-900 sm:text-5xl lg:text-6xl">
              {content.price.title}
            </h2>
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.price.lede}</Lede>
          </div>
        </div>

        <div className="mt-20 grid items-start gap-14 sm:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label text-charcoal-500">{product.fullName}</p>
              <p className="figures mt-5 font-display text-[5rem] font-light leading-none tracking-[-0.03em] text-charcoal-900 sm:text-[7rem]">
                {formatPrice()}
              </p>
              <p className="label mt-6 text-gold-600">{product.priceLabel}</p>

              <div className="mt-9">
                <PurchaseCTA variant="solid" />
              </div>

              <FinePrint className="mt-8">
                This is the current target retail price, not a published offer. It depends on
                confirmed production quotations, tooling, licensing and landed cost.
                {product.alternatePrice
                  ? ` If landed cost comes in materially above the planning model, ${formatPrice(product.alternatePrice)} is the fallback under discussion — and it will be stated plainly rather than discovered at checkout.`
                  : ""}{" "}
                Taxes and shipping are shown separately at the point of sale.
              </FinePrint>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <RevealGroup className="border-t border-charcoal-900/12">
              {content.price.reasons.map((reason) => (
                <RevealItem
                  key={reason.label}
                  className="flex flex-col gap-2 border-b border-charcoal-900/12 py-7 sm:flex-row sm:gap-8"
                >
                  <span className="label w-full shrink-0 pt-1 text-charcoal-500 sm:w-40">
                    {reason.label}
                  </span>
                  <Body className="max-w-[46ch]">{reason.body}</Body>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[52ch] font-display text-xl font-light leading-[1.55] text-charcoal-900 sm:text-2xl">
                {content.price.honesty}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
