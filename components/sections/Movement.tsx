"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, Body, FinePrint } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { StatusTag } from "@/components/ui/StatusTag";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";
import { product } from "@/lib/config/product";

/**
 * The movement. Careful by design: the caliber is named here the day
 * it is contracted — set product.movement.caliber — and until then the
 * page says exactly that rather than implying more.
 */
export function Movement() {
  return (
    <Section id="movement" tone="dark" className="bg-navy-950 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.movement.index}>{content.movement.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.movement.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.movement.lede}</Lede>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Reveal kind="clip" duration={1.2} className="lg:col-span-7">
            <MediaFrame asset={media.movement} aspect="3 / 2" sizes="(max-width: 1024px) 100vw, 56vw" />
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <Reveal delay={0.06}>
              <dl className="border-t border-silver-200/12">
                <Row label="Type" value={product.movement.type} />
                <Row
                  label="Caliber"
                  value={product.movement.caliber ?? "Ronda 1003 family"}
                  note={
                    product.movement.caliber
                      ? undefined
                      : "Working specification, subject to quotation and availability"
                  }
                  status={product.movement.caliber ? undefined : "tbc"}
                />
                <Row label="Display" value="Three hands, no date" />
                <Row label="Serviceability" value="Repairable, parts held in reserve" status="target" />
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <MediaFrame
                asset={media.movementDrawing}
                aspect="1 / 1"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="flex flex-col gap-6 lg:col-span-6">
            {content.movement.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Body className="max-w-[56ch]">{paragraph}</Body>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="border border-silver-200/15 bg-navy-900/60 p-7 sm:p-9">
              <h3 className="label text-gold-400">{content.movement.disciplineTitle}</h3>
              <FinePrint className="mt-5 text-[0.82rem] text-silver-100/72">
                {content.movement.disciplineBody}
              </FinePrint>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Row({
  label,
  value,
  note,
  status,
}: {
  label: string;
  value: string;
  note?: string;
  status?: "target" | "tbc" | "pendingApproval";
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-silver-200/12 py-5">
      <dt className="label w-32 shrink-0 text-silver-300">{label}</dt>
      <dd className="flex flex-1 flex-wrap items-baseline gap-3">
        <span className="text-[0.95rem] text-ivory-100">{value}</span>
        {status ? <StatusTag status={status} /> : null}
        {note ? (
          <span className="w-full text-[0.72rem] leading-relaxed text-silver-300/70">{note}</span>
        ) : null}
      </dd>
    </div>
  );
}
