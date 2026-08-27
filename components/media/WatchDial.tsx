"use client";

import { useId, useMemo } from "react";

/**
 * PASSAGE 01 — vector rendering of the dial side.
 *
 * This is a *designed* stand-in, not a placeholder box: it is drawn to
 * the published specification (39 mm case, thin bezel, deep navy sunray
 * dial, applied silver batons, faceted hands, muted-gold seconds hand,
 * no date, signed crown, navy leather strap). It carries the layout
 * until production photography exists, and is replaced simply by
 * dropping the real files into /public/media.
 *
 * All gradient / clip ids are namespaced with useId so several
 * instances can share a page without colliding.
 */

const CX = 200;
const CY = 300;
const R_CASE = 145;
const R_DIAL = 129;
const R_MIN_OUT = 121;
const R_MIN_IN = 115;
const R_IDX_OUT = 111;
const R_IDX_IN = 92;

const round = (n: number) => Math.round(n * 100) / 100;
const polar = (r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

function sunrayPath(count = 110, width = 0.9, r = R_DIAL - 1) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = (360 / count) * i;
    const [x1, y1] = polar(r, a - width / 2);
    const [x2, y2] = polar(r, a + width / 2);
    d += `M${CX} ${CY}L${round(x1)} ${round(y1)}A${r} ${r} 0 0 1 ${round(x2)} ${round(y2)}Z`;
  }
  return d;
}

function minuteTrackPath() {
  let d = "";
  for (let i = 0; i < 60; i++) {
    const a = i * 6;
    const long = i % 5 === 0;
    const [x1, y1] = polar(R_MIN_OUT, a);
    const [x2, y2] = polar(long ? R_MIN_IN - 2.5 : R_MIN_IN + 2, a);
    d += `M${round(x1)} ${round(y1)}L${round(x2)} ${round(y2)}`;
  }
  return d;
}

type Baton = { light: string; dark: string; body: string };

function baton(angle: number, halfWidth: number, offset: number): Baton {
  const rad = ((angle - 90) * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const px = -uy;
  const py = ux;
  const ox = CX + px * offset;
  const oy = CY + py * offset;
  const p = (r: number, w: number): [number, number] => [
    round(ox + ux * r + px * w),
    round(oy + uy * r + py * w),
  ];
  const [ax, ay] = p(R_IDX_OUT, -halfWidth);
  const [bx, by] = p(R_IDX_OUT, halfWidth);
  const [cx, cy] = p(R_IDX_IN, halfWidth);
  const [dx, dy] = p(R_IDX_IN, -halfWidth);
  const [mx1, my1] = p(R_IDX_OUT, 0);
  const [mx2, my2] = p(R_IDX_IN, 0);
  return {
    light: `M${ax} ${ay}L${mx1} ${my1}L${mx2} ${my2}L${dx} ${dy}Z`,
    dark: `M${mx1} ${my1}L${bx} ${by}L${cx} ${cy}L${mx2} ${my2}Z`,
    body: `M${ax} ${ay}L${bx} ${by}L${cx} ${cy}L${dx} ${dy}Z`,
  };
}

function indices(): Baton[] {
  const out: Baton[] = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    if (i === 0) {
      out.push(baton(a, 2.5, -5.4), baton(a, 2.5, 5.4));
    } else {
      out.push(baton(a, 3, 0));
    }
  }
  return out;
}

function hand(angle: number, len: number, baseHalf: number, midHalf: number, tailLen: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const px = -uy;
  const py = ux;
  const p = (r: number, w: number): [number, number] => [
    round(CX + ux * r + px * w),
    round(CY + uy * r + py * w),
  ];
  const shoulder = len * 0.14;
  const t = p(len, 0);
  const m1 = p(len * 0.58, midHalf);
  const m2 = p(len * 0.58, -midHalf);
  const s1 = p(shoulder, baseHalf);
  const s2 = p(shoulder, -baseHalf);
  const tl1 = p(-tailLen, baseHalf * 0.6);
  const tl2 = p(-tailLen, -baseHalf * 0.6);
  const c = p(-tailLen, 0);
  return {
    outline: `M${t[0]} ${t[1]}L${m1[0]} ${m1[1]}L${s1[0]} ${s1[1]}L${tl1[0]} ${tl1[1]}L${tl2[0]} ${tl2[1]}L${s2[0]} ${s2[1]}L${m2[0]} ${m2[1]}Z`,
    facet: `M${t[0]} ${t[1]}L${m1[0]} ${m1[1]}L${s1[0]} ${s1[1]}L${tl1[0]} ${tl1[1]}L${c[0]} ${c[1]}Z`,
  };
}

const LUG =
  "M272 226 L272 148 C272 140 279 135 288 138 C297 141 303 150 306 162 C311 186 319 208 330 228 Z";
const LUG_BEVEL = "M276 220 L276 150 C276 144 281 141 287 143 C293 145 297 152 299 162";

export type WatchDialProps = {
  /** Time shown on the dial, as [hours, minutes, seconds]. */
  time?: [number, number, number];
  /** Fade the strap into the background instead of cutting it off. */
  fadeStrap?: boolean;
  /** Print the SARVEON wordmark on the dial. */
  showWordmark?: boolean;
  className?: string;
  title?: string;
};

export function WatchDial({
  time = [10, 9.6, 36],
  fadeStrap = true,
  showWordmark = true,
  className,
  title = "SARVEON Passage 01 — dial side",
}: WatchDialProps) {
  const uid = useId().replace(/[:]/g, "");
  const id = (name: string) => `${uid}-${name}`;

  const [h, m, s] = time;
  const geometry = useMemo(() => {
    const hourAngle = ((h % 12) + m / 60) * 30;
    const minuteAngle = m * 6;
    return {
      sunray: sunrayPath(),
      track: minuteTrackPath(),
      idx: indices(),
      hour: hand(hourAngle, 70, 7, 3.6, 13),
      minute: hand(minuteAngle, 104, 5.8, 2.9, 15),
      secondsAngle: s * 6,
    };
  }, [h, m, s]);

  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={id("steel")} x1="0.16" y1="0.02" x2="0.86" y2="1">
          <stop offset="0" stopColor="#dbe1e8" />
          <stop offset="0.18" stopColor="#b6bec9" />
          <stop offset="0.44" stopColor="#8b95a2" />
          <stop offset="0.62" stopColor="#a9b2bd" />
          <stop offset="0.84" stopColor="#7c8593" />
          <stop offset="1" stopColor="#5f6875" />
        </linearGradient>
        <linearGradient id={id("bevel")} x1="0.08" y1="0" x2="0.92" y2="1">
          <stop offset="0" stopColor="#f4f7fa" />
          <stop offset="0.3" stopColor="#c8d0da" />
          <stop offset="0.55" stopColor="#79828f" />
          <stop offset="0.78" stopColor="#cfd6df" />
          <stop offset="1" stopColor="#8a929e" />
        </linearGradient>
        <linearGradient id={id("lug")} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#c2cad4" />
          <stop offset="0.5" stopColor="#929ba8" />
          <stop offset="1" stopColor="#6b7481" />
        </linearGradient>
        <radialGradient id={id("dial")} cx="0.4" cy="0.32" r="0.82">
          <stop offset="0" stopColor="#1d3a61" />
          <stop offset="0.4" stopColor="#122747" />
          <stop offset="0.76" stopColor="#0a182e" />
          <stop offset="1" stopColor="#050c1a" />
        </radialGradient>
        <radialGradient id={id("vignette")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.74" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.42" />
        </radialGradient>
        <linearGradient id={id("sheen")} x1="0.05" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="0.42" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("glare")} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.025" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("leather")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#060d1a" />
          <stop offset="0.2" stopColor="#132340" />
          <stop offset="0.5" stopColor="#182c4c" />
          <stop offset="0.82" stopColor="#0e1c31" />
          <stop offset="1" stopColor="#050a14" />
        </linearGradient>
        <linearGradient id={id("gold")} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#e2caa0" />
          <stop offset="0.5" stopColor="#b08d57" />
          <stop offset="1" stopColor="#7d6440" />
        </linearGradient>
        <linearGradient id={id("handLight")} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e4e9ef" />
          <stop offset="1" stopColor="#b9c1cc" />
        </linearGradient>

        <linearGradient id={id("fadeTop")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" />
          <stop offset="0.5" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={id("fadeBottom")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#000000" />
          <stop offset="0.5" stopColor="#ffffff" />
        </linearGradient>
        <mask id={id("maskTop")}>
          <rect x="0" y="0" width="400" height="240" fill={`url(#${id("fadeTop")})`} />
        </mask>
        <mask id={id("maskBottom")}>
          <rect x="0" y="360" width="400" height="240" fill={`url(#${id("fadeBottom")})`} />
        </mask>

        <clipPath id={id("dialClip")}>
          <circle cx={CX} cy={CY} r={R_DIAL} />
        </clipPath>
        <filter id={id("shadow")} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        <filter id={id("blur")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Strap */}
      <g mask={fadeStrap ? `url(#${id("maskTop")})` : undefined}>
        <path
          d="M133 0 L267 0 C269 70 271 140 272 196 L274 232 L126 232 L128 196 C129 140 131 70 133 0 Z"
          fill={`url(#${id("leather")})`}
        />
        <g
          stroke="#8e99ab"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="6 7"
          strokeLinecap="round"
        >
          <path d="M145 4 C143 76 142 148 141 206" />
          <path d="M255 4 C257 76 258 148 259 206" />
        </g>
        <path d="M126 232 L274 232 L274 240 L126 240 Z" fill="#000000" fillOpacity="0.35" />
      </g>
      <g mask={fadeStrap ? `url(#${id("maskBottom")})` : undefined}>
        <path
          d="M133 600 L267 600 C269 530 271 460 272 404 L274 368 L126 368 L128 404 C129 460 131 530 133 600 Z"
          fill={`url(#${id("leather")})`}
        />
        <g
          stroke="#8e99ab"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="6 7"
          strokeLinecap="round"
        >
          <path d="M145 596 C143 524 142 452 141 394" />
          <path d="M255 596 C257 524 258 452 259 394" />
        </g>
        <path d="M126 360 L274 360 L274 368 L126 368 Z" fill="#000000" fillOpacity="0.35" />
      </g>

      <ellipse
        cx="200"
        cy="316"
        rx="152"
        ry="150"
        fill="#000000"
        fillOpacity="0.55"
        filter={`url(#${id("blur")})`}
      />

      {/* Lugs */}
      <g>
        <g fill={`url(#${id("lug")})`}>
          <path d={LUG} />
          <path d={LUG} transform="matrix(-1 0 0 1 400 0)" />
          <path d={LUG} transform="matrix(1 0 0 -1 0 600)" />
          <path d={LUG} transform="matrix(-1 0 0 -1 400 600)" />
        </g>
        <g fill="none" stroke="#eef2f6" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round">
          <path d={LUG_BEVEL} />
          <path d={LUG_BEVEL} transform="matrix(-1 0 0 1 400 0)" />
          <path d={LUG_BEVEL} transform="matrix(1 0 0 -1 0 600)" />
          <path d={LUG_BEVEL} transform="matrix(-1 0 0 -1 400 600)" />
        </g>
      </g>

      {/* Case */}
      <g filter={`url(#${id("shadow")})`}>
        <circle cx={CX} cy={CY} r={R_CASE} fill={`url(#${id("steel")})`} />
      </g>
      <circle cx={CX} cy={CY} r={R_CASE} fill={`url(#${id("steel")})`} />
      <circle
        cx={CX}
        cy={CY}
        r={R_CASE - 3.2}
        fill="none"
        stroke={`url(#${id("bevel")})`}
        strokeWidth="2.6"
      />
      <circle cx={CX} cy={CY} r={R_CASE - 8} fill="none" stroke="#000000" strokeOpacity="0.14" strokeWidth="1" />

      {/* Crown */}
      <g>
        <rect
          x={CX + R_CASE - 3}
          y={CY - 14}
          width="20"
          height="28"
          rx="3.5"
          fill={`url(#${id("lug")})`}
        />
        <g stroke="#5c6673" strokeWidth="0.85" strokeOpacity="0.6">
          <path d={`M${CX + R_CASE + 2} ${CY - 11} L${CX + R_CASE + 2} ${CY + 11}`} />
          <path d={`M${CX + R_CASE + 7} ${CY - 12} L${CX + R_CASE + 7} ${CY + 12}`} />
          <path d={`M${CX + R_CASE + 12} ${CY - 11} L${CX + R_CASE + 12} ${CY + 11}`} />
        </g>
        <rect x={CX + R_CASE - 3} y={CY - 14} width="20" height="4" fill="#ffffff" fillOpacity="0.28" />
      </g>

      {/* Dial */}
      <circle cx={CX} cy={CY} r={R_DIAL + 2} fill="#000000" fillOpacity="0.55" />
      <circle cx={CX} cy={CY} r={R_DIAL} fill={`url(#${id("dial")})`} />
      <g clipPath={`url(#${id("dialClip")})`}>
        <path d={geometry.sunray} fill="#ffffff" fillOpacity="0.034" />
        <circle cx={CX} cy={CY} r={R_DIAL} fill={`url(#${id("sheen")})`} />
        <circle cx={CX} cy={CY} r={R_DIAL} fill={`url(#${id("vignette")})`} />
      </g>

      <path d={geometry.track} stroke="#c9d1dc" strokeOpacity="0.66" strokeWidth="1" />

      {/* Applied indices */}
      <g>
        {geometry.idx.map((b, i) => (
          <path key={`s${i}`} d={b.body} fill="#000000" fillOpacity="0.45" transform="translate(1,1.6)" />
        ))}
        {geometry.idx.map((b, i) => (
          <g key={`i${i}`}>
            <path d={b.light} fill="#f0f3f7" />
            <path d={b.dark} fill="#8a95a4" />
          </g>
        ))}
      </g>

      {showWordmark && (
        <text
          x={CX}
          y={CY - 56}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12.5"
          letterSpacing="3.4"
          fill="#e9ecf1"
          fillOpacity="0.94"
          fontWeight="400"
        >
          SARVEON
        </text>
      )}

      {/* Hands */}
      <g>
        <path d={geometry.minute.outline} fill="#000" fillOpacity="0.42" transform="translate(2.4,3)" />
        <path d={geometry.hour.outline} fill="#000" fillOpacity="0.42" transform="translate(2.4,3)" />
        <path d={geometry.hour.outline} fill={`url(#${id("handLight")})`} />
        <path d={geometry.hour.facet} fill="#94a0b0" fillOpacity="0.8" />
        <path d={geometry.minute.outline} fill={`url(#${id("handLight")})`} />
        <path d={geometry.minute.facet} fill="#94a0b0" fillOpacity="0.8" />
      </g>

      {/* Seconds — the single gold accent */}
      <g transform={`rotate(${geometry.secondsAngle} ${CX} ${CY})`}>
        <rect x={CX - 1} y={CY - 116} width="2" height="136" fill={`url(#${id("gold")})`} />
        <circle cx={CX} cy={CY + 28} r="4.8" fill={`url(#${id("gold")})`} />
      </g>
      <circle cx={CX} cy={CY} r="4.4" fill={`url(#${id("gold")})`} />
      <circle cx={CX} cy={CY} r="1.5" fill="#050c1a" />

      {/* Sapphire */}
      <g clipPath={`url(#${id("dialClip")})`}>
        <path
          d={`M${CX - 129} ${CY - 34} L${CX + 30} ${CY - 129} L${CX + 129} ${CY - 129} L${CX - 129} ${CY + 66} Z`}
          fill={`url(#${id("glare")})`}
        />
      </g>
      <circle cx={CX} cy={CY} r={R_DIAL} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" />
    </svg>
  );
}
