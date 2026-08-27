"use client";

import Link from "next/link";
import { site } from "@/lib/config/site";
import { content } from "@/lib/config/content";
import { product } from "@/lib/config/product";
import { Section, Container } from "@/components/ui/Section";
import { Wordmark } from "@/components/ui/Wordmark";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Section as="footer" tone="dark" className="bg-navy-950 pt-20 sm:pt-28" aria-label="Site footer">
      <Container wide>
        <Reveal kind="fade" duration={1.1}>
          <div className="flex flex-col gap-6 border-b border-silver-200/10 pb-16 sm:pb-20">
            <Wordmark size="xl" className="text-ivory-50" />
            <p className="font-display text-xl font-light tracking-[0.08em] text-silver-100/80 sm:text-2xl">
              {content.footerLine}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FooterColumn title="Explore">
            {site.nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {site.legal.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${site.contact.email}`}
              className="text-[0.82rem] text-silver-100/75 transition-colors duration-[--duration-fast] hover:text-ivory-50"
            >
              {site.contact.email}
            </a>
            <a
              href={`mailto:${site.contact.serviceEmail}`}
              className="text-[0.82rem] text-silver-100/75 transition-colors duration-[--duration-fast] hover:text-ivory-50"
            >
              {site.contact.serviceEmail}
            </a>
            <span className="text-[0.82rem] text-silver-300/70">{site.contact.locality}</span>
          </FooterColumn>

          <FooterColumn title="Follow">
            {site.social.map((channel) =>
              channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.82rem] text-silver-100/75 transition-colors duration-[--duration-fast] hover:text-ivory-50"
                >
                  {channel.label}
                </a>
              ) : (
                <span
                  key={channel.label}
                  className="flex items-center gap-3 text-[0.82rem] text-silver-300/55"
                >
                  {channel.label}
                  <span className="label-sm text-silver-400">Soon</span>
                </span>
              ),
            )}
          </FooterColumn>
        </div>

        {/* Claim discipline, stated where anyone can find it. */}
        <div className="border-t border-silver-200/10 py-10">
          <h2 className="label text-silver-300">Status of claims</h2>
          <div className="mt-5 grid gap-5 text-[0.72rem] leading-[1.75] text-silver-300/70 lg:grid-cols-2 lg:gap-10">
            <p>
              Passage 01 is in development. Dimensions, water resistance, movement caliber, warranty
              terms and final pricing are working targets and are marked as such throughout this
              site. Figures shown are not a production specification until they are confirmed and
              documented.
            </p>
            <p>
              {product.swissMadeClaim.statement} The {product.rotary.clubName} edition designation
              and any official mark are subject to written permission or licensing; no protected
              artwork is reproduced here in the meantime. Renderings are design concepts, not
              photographs of a finished product.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-silver-200/10 py-8 text-[0.68rem] text-silver-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.brand}. All rights reserved.</span>
          <span className="label-sm text-silver-400">
            Pronounced {site.pronunciation}
          </span>
        </div>
      </Container>
    </Section>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="label text-silver-300">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-fit text-[0.82rem] text-silver-100/75 transition-colors duration-[--duration-fast] hover:text-ivory-50"
    >
      {children}
    </Link>
  );
}
