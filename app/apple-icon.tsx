import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Placeholder home-screen icon; replace once the final mark exists. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070d18",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="19" fill="none" stroke="#f3f0e9" strokeWidth="1.6" />
          <circle cx="32" cy="32" r="23" fill="none" stroke="#a9b3c1" strokeOpacity="0.35" strokeWidth="1" />
          <path d="M32 32 L32 17" stroke="#f3f0e9" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 32 L43 38" stroke="#f3f0e9" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 32 L24 43" stroke="#b08d57" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="32" cy="32" r="1.8" fill="#b08d57" />
        </svg>
      </div>
    ),
    size,
  );
}
