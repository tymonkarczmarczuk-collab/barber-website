"use client";

import Image from "next/image";
import type { MediaAsset, Motif } from "@/lib/config/media";
import { useResolvedMediaSrc } from "@/components/media/MediaProvider";
import { useSurface } from "@/components/ui/Section";
import {
  CaseMotif,
  CasebackMotif,
  DialMotif,
  HorizonMotif,
  MovementMotif,
  StrapMotif,
} from "@/components/media/Motifs";

const motifMap: Record<Exclude<Motif, "none">, (p: { className?: string }) => React.ReactElement> = {
  dial: DialMotif,
  caseback: CasebackMotif,
  case: CaseMotif,
  strap: StrapMotif,
  movement: MovementMotif,
  horizon: HorizonMotif,
};

type MediaFrameProps = {
  asset: MediaAsset;
  className?: string;
  /** Overrides the aspect ratio declared on the asset. */
  aspect?: string;
  /** next/image sizes hint. */
  sizes?: string;
  priority?: boolean;
  /** Rendered inside the placeholder instead of the motif. */
  children?: React.ReactNode;
  /** Force the placeholder tone rather than inheriting the section surface. */
  tone?: "dark" | "light";
  rounded?: boolean;
};

/**
 * Renders the real photograph when the file exists in /public, and a
 * designed placeholder when it does not — same box, same rhythm, no
 * layout shift, no broken requests.
 */
export function MediaFrame({
  asset,
  className = "",
  aspect,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  children,
  tone,
  rounded = true,
}: MediaFrameProps) {
  const resolvedSrc = useResolvedMediaSrc(asset.src);
  const surface = useSurface();
  const resolvedTone = tone ?? surface;

  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-frame" : ""} ${className}`}
      style={{ aspectRatio: aspect ?? asset.aspect }}
    >
      {resolvedSrc ? (
        <Image
          src={resolvedSrc}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder asset={asset} tone={resolvedTone}>
          {children}
        </Placeholder>
      )}
    </div>
  );
}

function Placeholder({
  asset,
  tone,
  children,
}: {
  asset: MediaAsset;
  tone: "dark" | "light";
  children?: React.ReactNode;
}) {
  const Motif = asset.motif && asset.motif !== "none" ? motifMap[asset.motif] : null;
  const dark = tone === "dark";

  /*
   * The ground is set inline rather than as a utility class: the
   * brushed texture also writes background-image, and the two would
   * otherwise overwrite each other.
   */
  const ground = dark
    ? "linear-gradient(152deg, var(--color-navy-600) 0%, var(--color-navy-700) 40%, var(--color-navy-800) 76%, var(--color-navy-850) 100%)"
    : "linear-gradient(152deg, var(--color-ivory-100) 0%, var(--color-ivory-200) 46%, var(--color-ivory-300) 100%)";

  return (
    <div
      className="absolute inset-0"
      style={{ backgroundImage: ground }}
      aria-hidden={children ? undefined : "true"}
    >
      <span aria-hidden="true" className="brushed absolute inset-0" />
      {/* hairline frame + a single lit edge, the way a bezel catches light */}
      <div
        className={`pointer-events-none absolute inset-0 border ${
          dark ? "border-silver-200/22" : "border-charcoal-900/18"
        }`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          dark ? "bg-ivory-100/10" : "bg-white/70"
        }`}
      />
      <CornerTicks dark={dark} />

      {children ?? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center">
          {Motif ? (
            <Motif
              className={`h-[34%] max-h-36 w-auto ${dark ? "text-silver-100/22" : "text-charcoal-900/22"}`}
            />
          ) : null}

          <div className="flex flex-col items-center gap-2.5">
            <span className={`label ${dark ? "text-silver-100/85" : "text-charcoal-700"}`}>
              {asset.label}
            </span>
            <span
              className={`h-px w-8 ${dark ? "bg-gold-400/55" : "bg-gold-600/55"}`}
              aria-hidden="true"
            />
            <span className={`label-sm ${dark ? "text-silver-300/80" : "text-charcoal-500"}`}>
              {asset.caption}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function CornerTicks({ dark }: { dark: boolean }) {
  const color = dark ? "border-silver-100/35" : "border-charcoal-900/25";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className={`absolute left-3 top-3 h-3.5 w-3.5 border-l border-t ${color}`} />
      <span className={`absolute right-3 top-3 h-3.5 w-3.5 border-r border-t ${color}`} />
      <span className={`absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l ${color}`} />
      <span className={`absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r ${color}`} />
    </div>
  );
}
