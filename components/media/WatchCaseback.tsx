"use client";

import { useId } from "react";
import { product } from "@/lib/config/product";

/**
 * PASSAGE 01 — vector rendering of the caseback.
 *
 * Layout follows the proposed engraving architecture: SARVEON on the
 * top arc, the model at the centre, the edition line on the lower arc,
 * the philosophical line and the serial beneath.
 *
 * The circular zone at the centre is deliberately empty. No Rotary
 * mark is drawn, approximated or redrawn anywhere in this codebase.
 * When written approval exists, set product.rotary.status to
 * "approved" and point product.rotary.approvedArtwork at the official
 * file supplied through Rotary channels; it is then placed here.
 */

const CX = 200;
const CY = 200;

export type WatchCasebackProps = {
  className?: string;
  /** Serial shown on the engraving. Illustrative — not an allocated piece. */
  serial?: string;
  title?: string;
};

export function WatchCaseback({
  className,
  serial = product.edition.serialFormat,
  title = "SARVEON Passage 01 — caseback engraving concept",
}: WatchCasebackProps) {
  const uid = useId().replace(/[:]/g, "");
  const id = (name: string) => `${uid}-${name}`;

  const graining = Array.from({ length: 52 }, (_, i) => 12 + i * 3.2);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={id("rim")} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f2f5f8" />
          <stop offset="0.28" stopColor="#c3cbd5" />
          <stop offset="0.55" stopColor="#767f8d" />
          <stop offset="0.8" stopColor="#ccd4dd" />
          <stop offset="1" stopColor="#7c8593" />
        </linearGradient>
        <radialGradient id={id("field")} cx="0.38" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#b9c1cc" />
          <stop offset="0.45" stopColor="#98a1ad" />
          <stop offset="0.8" stopColor="#7c8592" />
          <stop offset="1" stopColor="#666f7c" />
        </radialGradient>
        <linearGradient id={id("sweep")} x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={id("fieldClip")}>
          <circle cx={CX} cy={CY} r="176" />
        </clipPath>
        <path id={id("arcTop")} d="M 52 200 A 148 148 0 0 1 348 200" fill="none" />
        <path id={id("arcBottom")} d="M 46 200 A 154 154 0 0 0 354 200" fill="none" />
        <filter id={id("shadow")} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter={`url(#${id("shadow")})`}>
        <circle cx={CX} cy={CY} r="192" fill={`url(#${id("rim")})`} />
      </g>
      <circle cx={CX} cy={CY} r="192" fill={`url(#${id("rim")})`} />
      <circle cx={CX} cy={CY} r="182" fill="#000000" fillOpacity="0.2" />
      <circle cx={CX} cy={CY} r="176" fill={`url(#${id("field")})`} />

      {/* Fine circular graining */}
      <g clipPath={`url(#${id("fieldClip")})`}>
        {graining.map((r, i) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? "#ffffff" : "#4d5661"}
            strokeOpacity={i % 2 === 0 ? 0.085 : 0.075}
            strokeWidth="1.2"
          />
        ))}
        <circle cx={CX} cy={CY} r="176" fill={`url(#${id("sweep")})`} />
      </g>
      <circle cx={CX} cy={CY} r="176" fill="none" stroke="#39414b" strokeOpacity="0.5" strokeWidth="1" />

      {/* Engraved type — dark fill with a light lower edge reads as cut metal */}
      <g fontFamily="var(--font-sans)" fontWeight="500">
        <g fill="#ffffff" fillOpacity="0.36">
          <text fontSize="19" letterSpacing="7.2" transform="translate(0,1.1)">
            <textPath href={`#${id("arcTop")}`} startOffset="50%" textAnchor="middle">
              SARVEON
            </textPath>
          </text>
        </g>
        <text fontSize="19" letterSpacing="7.2" fill="#2b333d" fillOpacity="0.88">
          <textPath href={`#${id("arcTop")}`} startOffset="50%" textAnchor="middle">
            SARVEON
          </textPath>
        </text>

        <g fill="#ffffff" fillOpacity="0.3">
          <text fontSize="9.5" letterSpacing="3.4" transform="translate(0,1)">
            <textPath href={`#${id("arcBottom")}`} startOffset="50%" textAnchor="middle">
              {`${product.editionName.toUpperCase()} · ${product.editionYear}`}
            </textPath>
          </text>
        </g>
        <text fontSize="9.5" letterSpacing="3.4" fill="#2b333d" fillOpacity="0.82">
          <textPath href={`#${id("arcBottom")}`} startOffset="50%" textAnchor="middle">
            {`${product.editionName.toUpperCase()} · ${product.editionYear}`}
          </textPath>
        </text>
      </g>

      {/* Approval zone — intentionally empty until official artwork is supplied */}
      <g>
        <circle
          cx={CX}
          cy="150"
          r="46"
          fill="#000000"
          fillOpacity="0.07"
          stroke="#2b333d"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <circle cx={CX} cy="150" r="34" fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" />
        <g stroke="#2b333d" strokeOpacity="0.3" strokeWidth="1">
          <path d={`M${CX} 96 L${CX} 104`} />
          <path d={`M${CX} 196 L${CX} 204`} />
          <path d={`M${CX - 54} 150 L${CX - 46} 150`} />
          <path d={`M${CX + 46} 150 L${CX + 54} 150`} />
        </g>
      </g>

      {/* Centre engraving stack */}
      <g textAnchor="middle" fontFamily="var(--font-sans)">
        <text
          x={CX}
          y="236"
          fontSize="15"
          letterSpacing="5.4"
          fontWeight="500"
          fill="#2b333d"
          fillOpacity="0.9"
        >
          PASSAGE 01
        </text>
        <path d={`M${CX - 44} 250 L${CX + 44} 250`} stroke="#2b333d" strokeOpacity="0.3" strokeWidth="1" />
        <text x={CX} y="272" fontSize="8.6" letterSpacing="2.6" fill="#2b333d" fillOpacity="0.74">
          TIME. IN GOOD COMPANY.
        </text>
        <text x={CX} y="300" fontSize="9.4" letterSpacing="3" fill="#2b333d" fillOpacity="0.66">
          {serial}
        </text>
      </g>
    </svg>
  );
}
