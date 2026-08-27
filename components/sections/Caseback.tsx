"use client";

import { Section, Container } from "@/components/ui/Section";
import { Eyebrow, Lede, FinePrint } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { WatchCaseback } from "@/components/media/WatchCaseback";
import { useMediaAvailable } from "@/components/media/MediaProvider";
import { media } from "@/lib/config/media";
import { content } from "@/lib/config/content";

/** The reverse of the watch, shown large, as a record rather than a second logo. */
export function Caseback() {
  const hasPhoto = useMediaAvailable(media.watchCaseback.src);

  return (
    <Section id="caseback" tone="dark" className="bg-navy-950 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow index={content.caseback.index}>{content.caseback.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              text={content.caseback.title}
              as="h2"
              className="mt-9 font-display text-[2.25rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <Lede>{content.caseback.lede}</Lede>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Reveal kind="fade" duration={1.2} className="lg:col-span-7">
            {hasPhoto ? (
              <MediaFrame
                asset={media.watchCaseback}
                aspect="1 / 1"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            ) : (
              <div
                className="relative flex items-center justify-center overflow-hidden rounded-frame border border-silver-200/12 bg-[radial-gradient(120%_100%_at_50%_16%,var(--color-navy-800)_0%,var(--color-navy-900)_58%,var(--color-navy-950)_100%)]"
                style={{ aspectRatio: "1 / 1" }}
              >
                <WatchCaseback className="h-auto w-[74%] max-w-[30rem]" />
              </div>
            )}
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              <dl className="border-t border-silver-200/12">
                {content.caseback.layers.map((layer) => (
                  <div
                    key={layer.label}
                    className="flex flex-col gap-1.5 border-b border-silver-200/12 py-4"
                  >
                    <dt className="label-sm text-silver-400">{layer.label}</dt>
                    <dd className="text-[0.9rem] tracking-[0.04em] text-ivory-100">{layer.value}</dd>
                  </div>
                ))}
              </dl>
              <FinePrint className="mt-7">{content.caseback.note}</FinePrint>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
