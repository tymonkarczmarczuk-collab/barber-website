import { ImageResponse } from "next/og";
import { site } from "@/lib/config/site";
import { product } from "@/lib/config/product";

export const alt = `${site.brand} ${product.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated rather than exported by hand so it always
 * matches the current brand line. Drop /public/media/og-image.webp in
 * place and metadata uses that file instead.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #0e1a2c 0%, #070d18 52%, #05090f 100%)",
          padding: "72px 80px",
          color: "#f3f0e9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 1, background: "rgba(176,141,87,0.9)" }} />
          <div style={{ fontSize: 22, letterSpacing: 14, textTransform: "uppercase" }}>
            {site.brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 30, letterSpacing: 9, color: "#a9b3c1", textTransform: "uppercase" }}>
            {product.name}
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.04, letterSpacing: -1, color: "#faf8f4" }}>
            Time. In good company.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(169,179,193,0.22)",
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: 5,
            color: "#8791a1",
            textTransform: "uppercase",
          }}
        >
          <div>39 mm · Sapphire · Swiss quartz</div>
          <div>{`${product.edition.size} pieces`}</div>
        </div>
      </div>
    ),
    size,
  );
}
