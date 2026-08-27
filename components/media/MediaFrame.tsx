"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset, Motif } from "@/lib/config/media";
import { useMediaAvailable } from "@/components/media/MediaProvider";
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

type CommonProps = {
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
 * Renders the real asset when the file exists in /public, and a
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
}: CommonProps) {
  const available = useMediaAvailable(asset.src);
  const surface = useSurface();
  const resolvedTone = tone ?? surface;

  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-frame" : ""} ${className}`}
      style={{ aspectRatio: aspect ?? asset.aspect }}
    >
      {available ? (
        <Image
          src={asset.src}
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

/**
 * Video with a poster still and a graceful fall back to the placeholder.
 * Autoplay is muted, inline and looped; playback is skipped entirely for
 * visitors who ask for reduced motion, who get the poster instead.
 */
export function MediaVideo({
  asset,
  className = "",
  aspect,
  tone,
  rounded = true,
  children,
}: CommonProps) {
  const videoAvailable = useMediaAvailable(asset.src);
  const posterAvailable = useMediaAvailable(asset.poster);
  const surface = useSurface();
  const resolvedTone = tone ?? surface;
  const ref = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* Only decode the film while it is actually on screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !allowMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [allowMotion, videoAvailable]);

  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-frame" : ""} ${className}`}
      style={{ aspectRatio: aspect ?? asset.aspect }}
    >
      {videoAvailable && allowMotion ? (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={posterAvailable ? asset.poster : undefined}
          aria-label={asset.alt}
        >
          <source src={asset.src} type="video/mp4" />
        </video>
      ) : posterAvailable && asset.poster ? (
        <Image src={asset.poster} alt={asset.alt} fill sizes="100vw" className="object-cover" />
      ) : (
        <Placeholder asset={asset} tone={resolvedTone} kind="video">
          {children}
        </Placeholder>
      )}
    </div>
  );
}

function Placeholder({
  asset,
  tone,
  kind = "image",
  children,
}: {
  asset: MediaAsset;
  tone: "dark" | "light";
  kind?: "image" | "video";
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
          {kind === "video" ? (
            <FilmMark dark={dark} />
          ) : Motif ? (
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

/** Signals a moving-image slot without pretending to be a player. */
function FilmMark({ dark }: { dark: boolean }) {
  const color = dark ? "text-silver-100/30" : "text-charcoal-900/25";
  return (
    <span
      aria-hidden="true"
      className={`flex h-14 w-14 items-center justify-center rounded-full border ${
        dark ? "border-silver-100/25" : "border-charcoal-900/20"
      } ${color}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M9 6.5 18 12l-9 5.5z" />
      </svg>
    </span>
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
