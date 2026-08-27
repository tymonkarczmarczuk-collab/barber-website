import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legalPages, legalSlugs } from "@/lib/config/legal";
import { site } from "@/lib/config/site";

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug];
  if (!page) return { title: "Not found" };
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/legal/${page.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages[slug];
  if (!page) notFound();

  return (
    <article data-surface="dark" className="bg-navy-900 pb-28 pt-36 text-ivory-100 sm:pt-44">
      <div className="mx-auto w-full max-w-[96rem] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <header className="lg:col-span-5">
            <p className="label flex items-center gap-4 text-silver-300">
              <span aria-hidden="true" className="h-px w-10 bg-silver-300/40" />
              Legal
            </p>
            <h1 className="mt-10 font-display text-[2.5rem] font-light leading-[1.06] tracking-[-0.02em] text-ivory-50 sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-8 max-w-[46ch] text-[0.95rem] leading-[1.85] text-silver-100/75">
              {page.intro}
            </p>

            <p className="label-sm mt-10 inline-flex items-center gap-3 border border-silver-200/25 px-3 py-2 text-silver-300">
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  page.status === "published" ? "bg-gold-400" : "bg-silver-300/70"
                }`}
              />
              {page.status === "published" && page.updated
                ? `Updated ${page.updated}`
                : "Working draft — pending legal review"}
            </p>
          </header>

          <div className="lg:col-span-6 lg:col-start-7">
            {page.status === "draft" ? (
              <p className="mb-12 border border-silver-200/15 bg-navy-850/60 px-6 py-5 text-[0.78rem] leading-relaxed text-silver-100/72">
                This page describes how {site.brand} intends to operate. It has not yet been reviewed
                by a qualified professional and is not a binding contract. Final wording will be
                published — and agreed at the point of purchase — before any order can be placed.
              </p>
            ) : null}

            <div className="flex flex-col gap-12">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-light text-ivory-50">
                    {section.heading}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="max-w-[62ch] text-[0.88rem] leading-[1.9] text-silver-100/72">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <nav aria-label="Other legal pages" className="mt-16 border-t border-silver-200/12 pt-8">
              <h2 className="label text-silver-300">Also here</h2>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {site.legal
                  .filter((item) => item.href !== `/legal/${page.slug}`)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.82rem] text-silver-100/75 underline-offset-4 transition-colors hover:text-ivory-50 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href="/#contact"
                    className="text-[0.82rem] text-silver-100/75 underline-offset-4 transition-colors hover:text-ivory-50 hover:underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
