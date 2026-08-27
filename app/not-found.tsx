import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      data-surface="dark"
      className="flex min-h-[80svh] items-center bg-navy-950 pb-24 pt-40 text-ivory-100"
    >
      <div className="mx-auto w-full max-w-[96rem] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <p className="label flex items-center gap-4 text-silver-300">
          <span aria-hidden="true" className="h-px w-10 bg-silver-300/40" />
          404
        </p>
        <h1 className="mt-10 max-w-[16ch] font-display text-[2.5rem] font-light leading-[1.08] text-ivory-50 sm:text-6xl lg:text-7xl">
          This page has not been made.
        </h1>
        <p className="mt-8 max-w-[46ch] text-[0.95rem] leading-[1.85] text-silver-100/75">
          The address you followed does not exist on this site. Everything about {site.brand} and
          Passage 01 lives on one page.
        </p>
        <Link
          href="/"
          className="label group relative mt-12 inline-flex items-center gap-3 border border-silver-200/30 px-8 py-4 transition-colors hover:border-silver-100/60"
        >
          Return to the beginning
          <span aria-hidden="true" className="text-gold-400">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
