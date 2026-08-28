import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/config/site";
import { product } from "@/lib/config/product";
import { faq } from "@/lib/config/content";
import { media } from "@/lib/config/media";
import { scanMediaManifest } from "@/lib/media/manifest";
import { MediaProvider } from "@/components/media/MediaProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/layout/Cursor";

/*
 * High-contrast display serif for headlines, neutral sans for
 * everything else. Fraunces is loaded as a variable font so its
 * optical-size axis can respond to type size on its own — a large
 * headline gets the dramatic high-contrast cut the brief calls for,
 * body-scale display type stays calmer, and neither needs a manual
 * font-variation-settings override.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export function generateMetadata(): Metadata {
  const manifest = scanMediaManifest();
  const ogImage = manifest[media.ogImage.src] || "/opengraph-image";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.seo.title,
      template: site.seo.titleTemplate,
    },
    description: site.seo.description,
    keywords: [...site.seo.keywords],
    applicationName: site.brand,
    authors: [{ name: site.brand }],
    creator: site.brand,
    publisher: site.brand,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.brand,
      title: site.seo.title,
      description: site.seo.description,
      url: site.url,
      locale: site.seo.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.brand} ${product.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05090f" },
    { media: "(prefers-color-scheme: light)", color: "#05090f" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data.
 *
 * The product node deliberately carries no `offers` block while
 * Passage 01 is enquiry-only: a target MSRP is not an offer, and
 * publishing one as though it were would be a false availability
 * signal. Set product.availability to "sale" and the offer is emitted
 * with the real price and availability.
 */
function structuredData() {
  const brand = {
    "@type": "Brand",
    "@id": `${site.url}#brand`,
    name: site.brand,
    slogan: site.tagline,
    description: site.shortDescription,
    url: site.url,
  };

  const productNode: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${site.url}#passage-01`,
    name: product.fullName,
    category: "Wristwatch",
    description: site.seo.description,
    brand: { "@id": `${site.url}#brand` },
    material: "316L stainless steel",
    url: `${site.url}#the-watch`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Case diameter", value: "39.0 mm" },
      { "@type": "PropertyValue", name: "Crystal", value: "Sapphire" },
      { "@type": "PropertyValue", name: "Movement", value: product.movement.type },
      { "@type": "PropertyValue", name: "Edition size", value: String(product.edition.size) },
    ],
  };

  if (product.availability === "sale") {
    productNode.offers = {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${site.url}#price`,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.brand,
        url: site.url,
        email: site.contact.email,
        slogan: site.tagline,
        description: site.shortDescription,
      },
      brand,
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.brand,
        publisher: { "@id": `${site.url}#organization` },
        inLanguage: "en-US",
      },
      productNode,
      {
        "@type": "FAQPage",
        "@id": `${site.url}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.note ? `${item.answer} ${item.note}` : item.answer,
          },
        })),
      },
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const manifest = scanMediaManifest();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <MediaProvider manifest={manifest}>
          <a
            href="#main"
            className="sr-focusable focus:label focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:bg-ivory-100 focus:px-5 focus:py-3 focus:text-navy-900 focus:[clip-path:none]"
          >
            Skip to content
          </a>
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MediaProvider>
      </body>
    </html>
  );
}
